# Officina: brief for an independent review of the decision-harness spike (2026-10-09, night)

You are asked for an independent, critical opinion on one day of work and on where it leaves the project. Be concrete and ranked; say what is convincing, what is weak, what you would test next, and where we fool ourselves. Numbers below carry their denominators on purpose; if a claim lacks one, say so.

## Who and why

Abdallah (Abdou): Master's in pharmacokinetic modelling at Université Paris Cité (PBPK, PK/PD, population PK), after a Master's in health data science at Université Paris-Saclay; six months as a pharmacometrics intern at Sanofi R&D (optimal design with the Fisher information matrix in NONMEM, an R/Shiny app to compare designs; one of three awards at the Congrès Junior Pluridisciplinaire Paris-Saclay/ENS, May 2026). Goal: a PhD at the meeting point of DMPK and AI. Officina is the portfolio he attaches to spontaneous applications. Everything runs on one PC with an RTX 3060 (12 GB); nothing is sent to the cloud. The code is written by AI coding agents (Claude Code as orchestrator and engine, a DeepSeek agent as a second contributor and, from tonight, as an adversarial reviewer) under a written contract; the human answers questions, reviews and decides what is published.

## The components (public since 2026-10-09)

1. **Caladrius** (Rust, MIT OR Apache-2.0, github.com/abdou-rgd/caladrius, v0.2.0 with Linux and Windows binaries): a pharmacokinetic engine and desktop app. NCA, one- and two-compartment models (single and multiple dosing, steady state), weighted least-squares fitting with full statistics, plots. Every analysis is a command with a stable id, reachable from the UI, a CLI and an MCP server. Verification has one narrow meaning: an engine value equals an independent value within a stated tolerance on a stated case. Independent values come from PKNCA (R), R `nls` and `nlsLM`, and closed forms evaluated in 256-bit arithmetic cross-checked with a matrix exponential and an ODE solver. Conformance table: 48,955 of 48,955 expected values (tolerances 1e-6 NCA, 1e-12 model curves, 1e-4 fits). Not covered: two-compartment fits have no reference fit; no partial AUC, urine, sparse sampling; the commercial reference software was compared once, privately, on counts only, and nothing from it is in the repository (clean room). One reference script was wrong once (nine fits); the engine was upheld and the script corrected, which is documented rather than absorbed into a tolerance.
2. **Apothicaire** (Python, github.com/abdou-rgd/apothicaire): a local DMPK assistant that is not allowed to compute a number. Pipeline A ("27B + gate"): Bonsai 2 27B (PrismML ternary model, llama.cpp fork, 7.3 GB VRAM) + OptChat memory (Victor Taelin's idea: the chat history on disk, shown as a tree of summary lines) + Caladrius as MCP tools + a deterministic number gate that rejects any number in an answer not found in a tool result or in the user's message.
3. **The benchmark**: 25 exercises simulated by Caladrius (pk1 and pk2 models, IV bolus / infusion / oral with and without lag / zero-order; doses in mg and µg; concentrations in ng/mL and mg/L; times in h and min; two with values below the quantification limit), each a scripted conversation of 8 French turns (import and NCA; Cmax/Tmax; CL and Vz with units; half-life and % extrapolated; λz regression points and adjusted R²; recall of dose/route/method; compare two AUC methods; a parameter not available for that route). Scored by (i) the gate (numbers absent from tool results) and (ii) an oracle check that the number written after the label of the parameter asked is the engine's value for that parameter, from the right AUC method, with the unit the engine reports.

Pipeline A results (2026-10-09, one run each, one sampling): with six tools, 76 / 932 numbers in first drafts came from nowhere (all in the compare turn, arithmetic by the model), 0 / 827 after the gate's one regeneration; after the engine gained a `compare` command exposed as a seventh tool, 0 / 926 in first drafts, 170 / 175 turns oracle-correct, 549 / 556 numbers, 160 / 160 valid tool calls, 10.4 s per turn. Known weaknesses: the oracle check's label table was widened after reading the rerun (so 170 / 175 is not out-of-sample), the five failures are one repeated self-compare loop, one digest formatting bug (fixed tonight), three recall answers saying the dose had no unit.

## What was done tonight: the decision-harness spike (card `decision/PLAN.md`)

Idea, corrected from the human's first phrasing: a decision model never writes text and never emits a tool call; it answers closed questions with calibrated probabilities. So the model decides and a deterministic harness acts. Pipeline B:

- The harness builds a **state** (CSV header and first rows with units, number of rows, the dose/route sentence as the user wrote it, the analyses already run, the request text).
- The decision model answers **20 closed questions**: `analysis` (nca, fit_pk1, fit_pk2, simulate, compare, none_needed), `route` (iv_bolus, iv_infusion, oral, unknown), `auc_method` (linear, lin_up_log_down, not_applicable), `dose_has_unit` (yes/no), `is_not_available` (yes/no: the parameter asked does not exist for that route), `compare_pair` (which two analyses), and one yes/no per parameter (`asked_cmax`, `asked_tmax`, ... 14 keys).
- The harness calls Caladrius (`data_import`, `nca_run`, `analysis_get`, `analysis_compare`) and renders a French answer from templates using engine values with engine units only. No arithmetic, no generation: a hallucinated number cannot exist by construction. Missing route, dose or unit: it asks instead of guessing.

Steps and results:

| step | what | result |
|---|---|---|
| 1 | dataset in Unsloth's typed-decisions row format from Caladrius-simulated exercises; French wordings written by hand (4-5 per turn kind plus the benchmark's own); split by whole exercise | 3600 rows: train 1980 (55 new exercises), held-out 720 (20 new exercises), bench 900 (the 25 benchmark exercises, never trained on) |
| 2 | zero-shot baseline, Liquid AI d1 decision models, no training (7-question version of the rows) | d1-omni-600M (GPU): 61.8 % held-out, 62.2 % bench per decision; d1-3B (CPU only: the Windows torch wheel lacks the flash-attention kernel its code requires; every 6th to 8th row): 66.3 % / 66.8 %. Both below the always-majority baseline on `is_not_available`, `compare_pair` and `auc_method` |
| 4 | the harness with **perfect (gold) decisions** = the ceiling of pipeline B on the benchmark, same scorer as pipeline A | 175 / 175 oracle-correct turns, 558 / 558 numbers, 0 / 250 invalid tool calls, 1.4 ms per turn. First pass was 171 / 175: a template printed `1701680.0` for a six-significant-digit AUC; fixed, and the same bug fixed in the 27B digest |
| 4b | honest ceiling: `parameter_asked = several` let the harness print all 13 parameters and the scorer did not penalise over-answering; replaced by one yes/no per parameter | still 175 / 175; numbers written in answers drop from 1698 to 691 |
| 3 | fine-tune `unsloth/Qwen3.5-0.8B` with Unsloth's decision-model recipe, natively on Windows (no WSL), LoRA, 2 epochs, context 2560 | 58 min, 3.6 GB VRAM (torch peak). Held-out: 99.9 % per decision (14,386 / 14,400) against 84.6 % for always answering the majority label; ECE 0.001. Every question at 100 % except `is_not_available`: 98.1 % (majority 91.7 %), recall of its `true` class 77 % |
| 5 | the trained model drives the harness on the 25 benchmark exercises | 175 / 175 oracle-correct turns, 558 / 558 numbers, 0 / 250 invalid calls, 0 / 709 unverified numbers by the gate, 0.34 s per turn, 1.9 GB GPU |

Comparison on the same 25 exercises and the same scorer:

| pipeline | oracle-correct turns | numbers | invalid tool calls | time per turn | GPU in service |
|---|---|---|---|---|---|
| A: 27B + gate | 170 / 175 | 549 / 556 | 0 / 160 | 10.4 s | ~7.3 GB |
| B: harness, gold decisions | 175 / 175 | 558 / 558 | 0 / 250 | 1 ms | none |
| B: harness, trained 0.8B | 175 / 175 | 558 / 558 | 0 / 250 | 0.34 s | 1.9 GB |

## What we think the limits are (please add yours)

- **In-distribution.** The held-out exercises are new, but their wordings are the generator's: the model learned our way of asking. An out-of-distribution test is the next step: tonight the DeepSeek agent was briefed as a devil's advocate to write, blind (without reading the generator), at least 50 hard French requests with its own gold decisions, then to reproduce our figures and try to refute them.
- **Closed world.** Eight scripted question kinds plus four added for class coverage (other NCA parameter, fit pk1, fit pk2, simulate); fits and simulation are not wired in the harness (refusal template). Free explanation and questions outside the closed set are lost; pipeline A keeps them.
- **The scorer is blind to some things.** It does not read free text, cannot distinguish the short refusal from a longer "the engine did not calculate it because..." answer (which is what the harness produces when `is_not_available` is missed), and its label table was adjusted on pipeline A's rerun.
- **One run, one seed, 25 exercises** for the benchmark figures; counts, not rates with intervals.
- **The harness asks the decider twice on the compare turn** (rerun with the other method, then choose the pair). Design decision, not a bug.
- **Serving.** A 0.8B decision model on CPU takes 12 s per row; on the GPU 0.2 s, next to the 27B (7.3 GB) it fits; next to Saluki 27B (7.9 GB weights) it does not.

## Roadmap after tonight

1. Out-of-distribution requests (DeepSeek, blind) → evaluate the 0.8B on them; if it collapses, that is the finding.
2. `is_not_available`: derive the refusal from the engine's own "not calculated" list rather than from the model (one question less).
3. Saluki 27B test for pipeline A (tool-calling benchmark of its authors: 88 vs 70 for Bonsai on 120 tasks), now with the knowledge that pipeline B needs 1.9 GB.
4. Out-of-sample benchmark of pipeline A (new exercises, fit turns). Then Caladrius T-050/T-051.

## Questions for you

1. Is the comparison A vs B fair? What would make a pharmacometrician or an ML reviewer reject it, and what is the cheapest fix?
2. Is 99.9 % on held-out a meaningful number or an artefact of the generator? What out-of-distribution design would you demand before believing anything?
3. The "model decides, harness acts" split: strong idea, obvious idea, or a dead end once requests become open-ended? What would you keep from pipeline A?
4. Is a 0.8B decision model trained on simulator data a credible research direction for a DMPK/AI PhD portfolio, or a toy? What would turn it into a result (a preprint, a dataset release, a comparison against what)?
5. What would you cut, and what is missing to make this credible to outsiders?

Answer with a ranked list of at most ten insights, each with the reason and the rough cost, then a one-paragraph verdict.
