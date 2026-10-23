# The next piece: literature scout

One of five independent scouts. Written 2026-10-23. Lens: research from 2024 to October 2026 that Officina could turn into a
working, testable piece. The open-source, strategy, engineering and contrarian lenses belong to the other scouts.

**How this was done.** Read first: the READMEs of caladrius (`e1baee3`, v0.3.2), apothicaire (`b513f83`) and optchat
(`805ba4b`); caladrius `board/INDEX.md`, `board/RESUME.md`, `AGENTS.md` §1; apothicaire `GATE_V2.md`, `bench/FROZEN_SET.md`,
`bench/runs/decision/ANALYSIS.md`, `decision/LEDGER.md`. Then arXiv, PubMed, medRxiv, PAGE and conference pages. WebFetch worked.
Every source cited was opened (abstract page, PubMed record, repository file); "[unverified]" marks a claim no opened source
confirmed.

**Assumptions** (nobody could be asked):
1. `AGENTS.md` §1 still binds Caladrius: NLME stays out of scope, "not even to prepare". Work that needs NLME goes to Abdou as a
   contract change or a separate repository.
2. The frozen-set protocol is untouched. New configurations run on the development tier; one enters a frozen comparison only
   through a `bench/frozen/LEDGER.md` entry made before the system freeze. v1 stays the demo gate.
3. GPL, LGPL and AGPL packages serve only as executed oracles, as PKNCA (AGPL-3) already does; their code is never copied.

## 1. Summary

**Top pick: L1, numbers by reference only.** A per-answer grammar lets a digit appear only inside a typed engine reference or
as an exact copy of a user's number, so an invented number cannot be written at all. Closest prior art checks after the fact
(Proof-Carrying Numbers, 2025) or penalises logits and still leaks (LettucePrevent, 2026). Small, testable in three days on the
existing development tier, aimed at gate v2's measured costs, visible on 17 November. Runner-up: L2, certified sampling design.

## 2. Candidates

Scores, each from 0 to 3, in this order: demo on 2026-11-17, PhD and publication value, value for users and the community,
compounding.

### L1. Numbers by reference only: provenance-constrained decoding

- **Pitch.** At decoding time, the final answer can contain digits only inside a reference such as `{{call_3.cmax}}` (gate v2's
  closed tables) or as an exact copy of a number from the user's messages. Everything else is prose.
- **What gets built.** Apothicaire, `provenance_grammar.py`, about 250 lines plus tests:
  - **Grammar.** GBNF, built per answer: free text excludes digits and `{`; a reference is an alternation of the session's
    citable keys; user numbers are a closed list of literal strings.
  - **Wiring.** `APOTHICAIRE_GATE=v3`, over the v2 renderer, which keeps its word, unit and sign rules.
  - **Inline variant (v3b).** Stop at `}}`, insert the rendered `12.3457 ng/mL [Cmax]`, resume (Toolformer-style), so the model
    reads the unit instead of typing it; an append costs about 40 tokens on this hybrid model (optchat README).
  - **Tests.** Mutation tests in the style of `TestRedTeamMutations`.
- **Fit.** "Never computes a number" becomes a property of generation. No new dependency and no prompt growth (a llama.cpp
  grammar constrains output only). PMxAgent (L7) already puts PKNCA behind MCP; Officina can add control over the numbers the
  agent writes.
- **Evidence.**
  - [Proof-Carrying Numbers, arXiv 2509.06902, 2025-09-08](https://arxiv.org/abs/2509.06902): claim-bound tokens checked by a
    fail-closed renderer at presentation time; formal properties, no empirical evaluation in the abstract.
  - [LettucePrevent, 2026-07-29](https://huggingface.co/blog/lebe1/lettuceprevent-blogpost): drops top-k numbers absent from the
    context; digit hallucinations fall 65–86 %, about two dozen remain per model, correct derived values are suppressed.
  - [Tam et al., 2024](https://arxiv.org/abs/2408.02442) and [CRANE, ICML 2025](https://arxiv.org/abs/2502.09061): restrictive
    formats and grammars hurt reasoning; CRANE restores it with extra grammar rules.
  - [llama.cpp grammars README](https://github.com/ggml-org/llama.cpp/blob/master/grammars/README.md) (per-request `grammar`, known
    performance issues); [Toolformer, 2023](https://arxiv.org/abs/2302.04761) (inline tool results).
  - [Context-engineering tutorial, CPT:PSP 2026-08](https://doi.org/10.1002/psp4.70317): pharmacometric agents rely on prompts and
    verification layers, not decoding constraints.
  - Officina, development tier, 3 seeds (`ANALYSIS.md`):

    | gate | turns correct | pass^3 | unverifiable quantity shown | regenerations | median s/turn |
    |---|---|---|---|---|---|
    | v1 | 583/600 | 14/25 | 3/25 exercises | 12 | 4.5 |
    | v2 | 562/600 | 6/25 | 17/25 exercises | 188 | 6.85 |
- **Prior art, and what is new.** Placeholders and post-hoc checks exist. New: an exact decode-time guarantee inside an agent
  loop, references enumerated from MCP `structuredContent` and `outputSchema`, a pre-registered rubric, a local 27B. Two searches
  found no prior instance.
- **Prototype, 1–3 days.**
  - **Day 1.** Grammar builder and tests. If llama-server refuses a custom grammar with `tools` ([unverified]), the final answer
    is regenerated under the grammar without tools.
  - **Days 2–3.** v3 on the development tier (25 exercises × 3 seeds, about 3 h of GPU), scored by `run_frozen.py analyse`.
  - **Success.** 0 free digits shown (any other count is a bug); an unverifiable quantity in ≤ 3/25 exercises; ≥ 576/600 turns
    correct; ≤ 50 regenerations; median ≤ 9 s per turn.
  - **Kill.** < 562/600 turns, a median above 13.5 s, or a grammar that still cannot be enforced after two attempts.
  - **Out of reach.** Selection errors (a right number for the wrong parameter: 13 unflagged wrong values with v1, 28 with v2).
- **Scores** 3 / 2 / 2 / 3. **Effort** S.
- **Risks.** No licence, IP, hardware or cost risk. The technical risk is the reasoning loss of CRANE and Tam, which the kill
  criterion measures. The frontier arm's hosted API takes no grammar. Overlaps T-064 and T-092 (v3b may make them moot). Must not
  touch the demo configuration (C1) before the freeze.

### L2. Certified optimal sampling design

- **Pitch.** Caladrius returns a design's Fisher information matrix (FIM), predicted RSE % and a D-optimal schedule, with an
  equivalence-theorem certificate anyone can recheck; the assistant explains it and computes nothing.
- **What gets built.** Crate `caladrius-design` (L0), about 1,500–2,000 lines with tests; commands `design.evaluate` and
  `design.optimize` with an MCP `outputSchema`.
  - **Derivatives.** `caladrius_models::jacobian` (analytic for the IV bolus and two compartments; the rest from `caladrius-fit`
    or forward differences).
  - **Stage 1.** Individual and Bayesian FIM (prior Ω added); multiplicative algorithm on a time grid; exact n-point design by
    exchange.
  - **Certificate.** max over t of d(t, ξ) ≤ p, and D-efficiency ≥ p / max d (textbook result [no source opened]).
  - **Stage 2.** The block-diagonal population FIM: NLME, so Abdou's contract decision.
- **Fit.** It reuses verified sensitivities, adds a class of checkable numbers, and gives the assistant a question it answers
  without arithmetic ("where should I sample?").
- **Evidence.**
  - [Fayette, Brendel, Mentré, Pharm Res 2026-03](https://doi.org/10.1007/s11095-026-04024-4) (IAME, Université Paris Cité, with
    Ipsen): PFIM, PopED, NONMEM $DESIGN, MlxDesignEval and Pumas agree on RSE and D-criterion for a given FIM approximation.
  - [Nyberg et al. 2015, Br J Clin Pharmacol](https://pmc.ncbi.nlm.nih.gov/articles/PMC4294071/): in the warfarin example, five
    tools share the block-diagonal RSEs of Table 4 (ka 13.9, CL/F 4.7, V/F 2.8, ω² 25.8/25.6/30.3, σ² 11.2 %).
  - [PopED's `ex.2.a.warfarin.evaluate.R`](https://github.com/andrewhooker/PopED/blob/master/inst/examples/ex.2.a.warfarin.evaluate.R):
    the same design (70 mg, 32 subjects, 0.5–120 h); PopED is LGPL ≥ 3.
  - [PFIM 8.0.1, CRAN, 2026-10-16](https://cran.r-project.org/web/packages/PFIM/index.html): GPL-3.
  - Demand from precision dosing for sampling choices: [busulfan, J Clin Pharmacol 2026](https://doi.org/10.1002/jcph.70281);
    [cefepime, Ther Drug Monit 2026](https://doi.org/10.1097/FTD.0000000000001483).
- **Prior art, and what is new.** FIM tools are mature, in R or commercial, under GPL or LGPL. New: a permissive single
  binary, conformance against a published cross-tool consensus, a certificate in typed output, an assistant on top. Whether PFIM
  or PopED print an equivalence-theorem check was not verified.
- **Prototype, 1–3 days (stage 1).** FIM and RSE for the 12 models, additive, proportional and combined error; R oracle with
  numDeriv and its own multiplicative algorithm.
  - **Success.** FIM within 1e-8 relative of the oracle on 30 random (model, θ, design) triples (1e-4 with finite differences);
    the engine's optimum passes its certificate (max d ≤ p(1 + 1e-6)) on all 12 models, D-efficiency ≥ 0.999 against R's.
  - **Kill.** Three failed attempts at either check (`AGENTS.md` §10). The WLS-versus-ML error-model convention is a documented
    difference, not a failure. Stage 2 target: Nyberg's Table 4 to the printed digit.
- **Scores** 2 / 3 / 2 / 3. **Effort** M.
- **Risks.** **IP and optics:** the internship topic was FIM-based design. Use published sources only (no Sanofi code, models,
  data, or a UI resembling DE$IGN EXPLORER), and tell the Sanofi supervisor before showing it there. Stage 2 is NLME. Licence,
  hardware, cost: none. No card overlaps; it builds on spec MOD-2C-23.

### L3. Identifiability as a verified engine output

- **Pitch.** For every model, route and design, state which parameters are structurally and practically identifiable, with the
  same wording in the UI, the CLI and the assistant.
- **What gets built.** In `caladrius-fit`, about 600 lines: a generic-rank test (SVD of the Jacobian at random θ) and a profile
  likelihood of the WLS objective. An oracle table from StructuralIdentifiability.jl (MIT) for the 12 models.
- **Fit.** It tests spec MOD-2C-23 (status `assumed`) and open items OF-08 and OM-09. The `singular` fit status already names
  the eigenvector.
- **Evidence.** [StructuralIdentifiability.jl](https://github.com/SciML/StructuralIdentifiability.jl) and its
  [tutorial, Bull Math Biol 2026](https://doi.org/10.1007/s11538-026-01648-w).
  [Forcing functions such as dosing schedules restore identifiability, with a PK example, Math Biosci 2026-09](https://doi.org/10.1016/j.mbs.2026.109814).
  [Practical identifiability in NLME, Bull Math Biol 2026](https://doi.org/10.1007/s11538-025-01583-2).
- **Prior art, and what is new.** The methods are mature. New: a two-method-verified table for every Caladrius model and route,
  which the assistant cites to refuse (for example, Vp from single-phase data).
- **Prototype.** Day 1: StructuralIdentifiability.jl on the 12 models. Day 2: the Rust rank test. Success: 12/12 agree wherever
  SI.jl is conclusive. Kill: an unexplained disagreement after three attempts; the table is then kept as documentation.
- **Scores** 1 / 1 / 2 / 2. **Effort** S. It can be stage 0 of L2.
- **Risks.** None on licence, IP, hardware or cost; Julia is needed on the oracle side only.

### L4. MAP Bayesian estimation with an open, verified core

- **Pitch.** `fit.map`: individual estimation under published log-normal priors, with Laplace posterior SDs, shrinkage and the
  forecast of the next level or AUC, checked against two R references.
- **What gets built.** In `caladrius-fit`, about 1,000 lines: prior pseudo-residuals appended to the WLS problem. Combined with
  L2's Bayesian FIM, it gives sampling times for therapeutic drug monitoring.
- **Fit.** Individual fitting with priors as data; forecasts the assistant can cite instead of compute.
- **Evidence.**
  - [posologyr, Pharmaceutics 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC8879752/): 35 models × 4,000 simulated subjects;
    MAP agreement with NONMEM POSTHOC rated excellent in 98.7 % of cases.
  - Licences from the DESCRIPTION files: mapbayr 0.10.2 is GPL-3, posologyr is AGPL-3.
  - The 2026 sampling papers of L2 rely on Bayesian individual estimation (MAP for busulfan).
  - [NCA against Bayesian methods for busulfan, Ther Drug Monit 2026](https://doi.org/10.1097/FTD.0000000000001488).
- **Prior art, and what is new.** The field is crowded, with commercial MIPD tools and two open R packages. New: a permissive
  licence, conformance against both references, and typed output.
- **Prototype.** 200 synthetic patients, a one-compartment infusion model, 1–3 samples each. Success: MAP within 1e-4 relative
  of mapbayr for ≥ 99 % of patients, and Laplace SD within 1e-3. Kill: unexplained systematic gaps after three attempts.
- **Scores** 1 / 2 / 2 / 2. **Effort** M.
- **Risks.** Contract scope is Abdou's call. Clinical use would make it medical-device software, so it stays a research
  prototype. Licence: oracles executed only. Hardware, cost: none.

### L5. Amortized but verified Bayesian inference

- **Pitch.** A neural posterior trained on Caladrius simulations proposes. Caladrius' exact likelihood checks each dataset by
  Pareto-smoothed importance sampling. A failure falls back to Laplace or MCMC, and the result carries a typed `verified` flag.
- **What gets built.** A Python package on BayesFlow 2.0.14 (MIT), plus a `model.loglik` command in Caladrius; about 1,500
  lines.
- **Fit.** The network only proposes; every number shown stays traceable to the deterministic engine.
- **Evidence.**
  - [Arruda et al., ICML 2024](https://proceedings.mlr.press/v235/arruda24a.html): neural posterior estimation for NLME.
  - [Amortized Bayesian Workflow, TMLR, 2024–2026](https://arxiv.org/abs/2409.04332): diagnostics per dataset, then fallback.
  - [AICMET, 2025–2026](https://arxiv.org/abs/2508.15659) and [Prior-Fitted Functional Flow, 2026-04](https://arxiv.org/abs/2604.17670):
    in-context PK models that claim calibration; their abstracts describe no exact per-dataset check.
- **Prior art, and what is new.** The amortized-plus-diagnostics pattern exists. New: a deterministic, conformance-tested
  likelihood as judge, and a fail-closed typed output.
- **Prototype, 3 days.** One-compartment oral, 3 parameters, 4–8 samples.
  - **Success.** Simulation-based calibration within its 99 % bands; ≥ 80 % of 1,000 test datasets accepted at k̂ < 0.7 (the
    usual PSIS threshold [unverified]); accepted means within 1 % of the reference.
  - **Kill.** < 50 % of datasets accepted, or > 5 % of the accepted off by more than 5 %.
- **Scores** 0 / 3 / 1 / 2. **Effort** L.
- **Risks.** Time. Training fits the RTX 3060; licences MIT; no cost. No neural number is ever displayed without the flag.

### L6. Conformal "ask before acting" for the decider

- **Pitch.** Calibrate an abstention threshold so that, among the requests acted on, wrong decisions stay below α; otherwise ask
  the user.
- **What gets built.** In apothicaire `decision/`, about 300 lines that work on stored predictions.
- **Fit.** An assistant that asks rather than guesses, with a stated error rate.
- **Evidence.**
  - [KnowNo, CoRL 2023](https://arxiv.org/abs/2307.01928).
  - [Conformal abstention, 2024](https://arxiv.org/abs/2405.01563).
  - [Conformal Risk Control, v4 2025](https://arxiv.org/abs/2208.02814).
  - [CROQ/CP-OPT, ICML 2025](https://arxiv.org/abs/2501.00555).
  - For tool calls: [role-stratified conformal risk control, 2026-07](https://arxiv.org/abs/2607.24343) and
    [ToolChain-CRC, 2026-06](https://arxiv.org/abs/2606.18467), with guarantees under exchangeability or recalibration only.
- **Prior art, and what is new.** The method exists. New: a stress test under wording shift on a PK assistant. `decision/LEDGER.md`
  §6 gives a pessimistic prior: on the reviewer's 74 requests, 135 of the v1 decider's 143 wrong decisions came at p ≥ 0.90.
- **Prototype, 1 day, stored data only.** Calibrate on held-out wordings and test on the 74 requests. Scores tried: 1 − max p,
  reader-parse failure, and disagreement between adapters and merged model. Success: error ≤ 5 % while answering ≥ 50 % of
  requests. Kill: error > 10 % at every threshold that answers ≥ 30 %.
- **Scores** 1 / 2 / 1 / 1. **Effort** S.
- **Risks.** None on licence, IP, hardware or cost; the risk is statistical (the shift itself).

### L7. An open, verified benchmark for PK agents

- **Pitch.** Publish the development tier, the generator, the PKNCA-checked gold, the typed rubric and a runner that scores any
  OpenAI-compatible model or MCP agent per exercise, with pass^k.
- **What gets built.** `bench/` packaged as an installable runner, with data under MIT OR Apache-2.0; about 500 lines plus
  documentation. It overlaps T-099 to T-101, T-070 and T-082. The frozen tiers stay sealed until their runs are done.
- **Fit.** It exports Officina's most distinctive asset, its measurement discipline.
- **Evidence.**
  - [MedCalc-Bench](https://github.com/ncbi-nlp/MedCalc-Bench) (NeurIPS 2024 D&B, search only for the venue): ±5 % tolerance;
    its data are CC-BY-SA, so they cannot be reused here.
  - [CMedCalc-Bench, EMNLP 2025](https://aclanthology.org/2025.emnlp-main.1302/): scores extraction apart from computation.
  - [DMPKBench, NeurIPS 2025 workshop](https://neurips.cc/virtual/2025/126041): over 100,000 questions, accuracy 11–89 %, no NCA
    computation listed.
  - [Silent numerical failures, medRxiv 2026-04](https://www.medrxiv.org/content/10.64898/2026.04.27.26351582v1): 4 of 200 runs
    of LLM-written PK code gave wrong numbers without any error; one more crashed.
  - [Shin & Ramanathan, J Pharmacokinet Pharmacodyn 2023](https://doi.org/10.1007/s10928-023-09892-6): high error rates in
    calculations with exponentials.
  - [PMxAgent, CPT:PSP 2026-10](https://doi.org/10.1002/psp4.70325): MCP over PKNCA; 98.3 % NCA accuracy on 182 drugs, against a
    commercial reference.
  - [τ-bench, 2024](https://arxiv.org/abs/2406.12045): introduces pass^k.
  - [Six LLMs on dosing, Pharmacotherapy 2026-10](https://doi.org/10.1002/phar.70207): 63 % concordance with the literature.
- **Prior art, and what is new.** Medical-calculation and DMPK-knowledge benchmarks exist. None found is PK-computational with
  typed scoring (value, unit, parameter and method), independent gold, and inference at the exercise level.
- **Prototype, 2 days.** Success: rescoring the stored development runs reproduces `analysis.json` byte for byte, and a new
  local model runs end to end with < 1 % harness errors. Kill: > 5 % of a new model family's turns need hand adjudication.
- **Scores** 2 / 2 / 3 / 3. **Effort** S–M.
- **Risks.** Contamination once public, hence the sealed tiers. The data licence stays permissive. Never a column for the
  reference software.

## 3. Top 3

1. **L1.** No prior instance found, central to the identity, testable in three days on existing data and visible in the
   demo. It reuses gate v2, and its kill criterion is the documented failure mode of grammars. Run it now as
   an exploratory development-tier arm; it enters the LEDGER before the system freeze only if it meets its threshold.
2. **L2, with L3 as stage 0.** The best PhD and publication value: it matches the FIM line of IAME (Université Paris Cité),
   whose 2025–2026 papers were co-written with industry, and Abdou's internship topic, with a published cross-tool consensus as
   oracle. Start after the demo, given the IP conversation and the NLME decision for stage 2.
3. **L7.** The cheapest public good: gold, rubric and runner exist, and publishing makes the frozen-set discipline citable and
   comparable from outside, for L1 and every later arm. A natural companion to the PAGE 2027 abstract.

L5 is the best seed for a PhD proposal, not for this autumn. L6 is a one-day falsification to run on stored data first.

## 4. Rejected

- **LLM-guided popPK model search**
  ([Ferrara et al., PAGE 2026](https://www.page-meeting.org/Abstracts/large-language-model-guided-discovery-of-population-pharmacokinetic-structural-models-evaluation-across-synthetic-and-real-data/):
  correct structure in 7 of 10 synthetic cases;
  [Berrah & Woillard, PAGE 2026](https://www.page-meeting.org/Abstracts/toward-autonomous-pharmacometrics-a-multi-agent-framework-for-structure-discovery-covariate-selection-and-gray-box-modeling/);
  [PKGPT 2026](https://doi.org/10.3390/pharmaceutics18040501); [pyDarwin, AAPS J 2026](https://doi.org/10.1208/s12248-026-01321-z)):
  NLME is out of scope, the engines are paid or GPL, the field is crowded.
- **Neural-ODE, PINN and symbolic-regression discovery** ([NODE-LASSO, CPT:PSP 2026](https://doi.org/10.1002/psp4.70285);
  [D-PINNs 2026](https://doi.org/10.1007/s10928-026-10019-w); [ChemODE 2026](https://doi.org/10.1021/acsomega.6c04487)): Caladrius has
  no user ODE models, so a discovered model could not be checked against an independent closed form.
- **Training an in-context PK foundation model** (AICMET, PF3): large pretraining and real data; engage through L5 instead.
- **SDE-PK with particle filters** (first bridge of `notes/biblio-stochastic-dmpk-2026-10-08.md`): a good PhD theme, but no
  assistant link before 2027, and it needs L4's likelihood first.
- **Conformal intervals for PK predictions**: PubMed finds only ADME property work
  ([Lombardo et al. 2024](https://doi.org/10.1021/acs.molpharmaceut.3c00812)); exchangeability across dosing histories is open.
- **Logit-level number filtering** (LettucePrevent): leaks by design; L1's grammar is exact.
- **LLM-written PK reports** ([Clin Transl Sci 2026](https://doi.org/10.1111/cts.70644)): an application of L1, not a piece.
- **NONMEM code generation and reading** ([Zheng et al. 2025](https://doi.org/10.1002/psp4.70125);
  [Cha et al. 2025](https://doi.org/10.1007/s10928-025-09982-7)): out of scope; paid tools.
