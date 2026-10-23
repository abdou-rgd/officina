# Next piece for Officina: the contrarian's report

Scout: contrarian, one of five; 2026-10-23. Read: caladrius `e1baee3` (v0.3.2), apothicaire `b513f83`, optchat `805ba4b`, officina `4e32b3c`, code before READMEs. WebFetch worked, PDFs were read through `pdftotext`, and the FDA's CSA page was blocked, so its Federal Register notice stands in.

## 1. Summary

- **Top pick: plan-first Officina (C1).** A typed, versioned analysis plan replaces the chat. A person or a small model drafts it and a person approves it. Caladrius runs it, and templates write the report with provenance on every number.
- **Why:** numbers are under control, intent is not. The best small model fully understood only 22 of 74 blind requests, and 77 of its 91 wrong decisions came at confidence ≥ 0.9. The development set is saturated: the no-LLM harness scores 600/600 on it.
- A plan shows every interpretation before any number exists and matches ICH M15's analysis plan and report. It also makes "does Apothicaire need a model?" a one-day test on stored data.
- **Stop:** gate v2, OptChat, decider training on generated wordings, new UI features and frontier-arm extensions.
- **Next:** C2 (installed-instance qualification and a real audit trail), then C3 (population design evaluation with the Fisher information matrix, after written IP clearance). An NLME estimator is a trap for now.

## Critique: the riskiest assumption, read from the code

Officina assumes the danger in a PK assistant is a model inventing numbers. Its own measurements point elsewhere.

1. **Numbers are under control; intent is not.**
   - Gate v1 checks set membership (`apothicaire/gate.py`) and v2 renders typed references from `structuredContent` (`GATE_V2.md`). Under v1, 0 of 926 numbers in the 27B's first drafts were unverified.
   - The gates certify provenance, not correctness: 12 to 13 of 600 development turns per 27B configuration were wrong with nothing flagged (`bench/runs/frontier-dev-2026-10-22-27b-scope/ANALYSIS.md`).
   - On 74 requests written blind by a reviewer, the v2 0.8B decider got 93.9 % of decisions but only 22/74 requests fully right, and it missed all 11 requests for an unavailable parameter.
   - Confidence cannot drive abstention: 1,461 of its 1,480 decisions came at ≥ 0.9, and only 94.7 % of those were right (`decision/ood/runs/2026-10-10-qwen35-0.8b-d01-v2-adapters/report.md`).
   - On the same form, the 27B scored 7/74 and rules 1/74 (`decision/PLAN.md`).
2. **The development benchmark is saturated.** pass^3 counts the exercises with every turn right on all three seeds (τ-bench's pass^k [S16]):

   | configuration | pass^3 |
   |---|---|
   | no-LLM arm | 100 % (600/600 turns) |
   | Sonnet 5.5 with a scope instruction | 84 % |
   | the 27B | 56 % |
   | Opus 5.5 without the instruction | 0 % (481/600 turns) |

   - Opus scores 0 % because the rubric penalises going beyond the script.
   - The gold is Caladrius's output on profiles it simulated (`bench/make_exercises.py`), and the training rows contain the benchmark's scripted wording (`decision/README.md`). The ledger itself calls the harness figure "a template test" (`decision/LEDGER.md` §7).
   - The frozen set (gold checked by PKNCA, T-101) reuses the generator and turn kinds, and its 24 sentences are to come from the system's owner and an LLM agent.
3. **The engine is narrower than "PK engine" suggests.**
   - `NcaInput` is "one subject, one analyte, one single dose given at time 0" (`caladrius-nca/src/lib.rs`).
   - The worksheet roles are time, concentration, subject, dose and route (`caladrius-project/src/worksheet.rs`).
   - Steady state, intervals, partial AUC, sparse sampling and urine are "not specified" (`specs/nca.md` §12).
4. **"48,955/48,955" is mostly self-consistency.** 3,744 values (7.6 %) are NCA against PKNCA on 20 cases. 34,711 (71 %) are the project's own closed forms, and 10,500 are fits against R (`docs/conformance.md`; T-086 is open).
5. **The regulator's first questions have no answer in the code.**
   - The history (`caladrius-engine/src/history.rs`) has no timestamp, user, reason or engine version. It sits in the editable project JSON, and the README advises removing it before sharing.
   - Exports carry no version and no input hash, though both READMEs promise every number "re-derivable from a pinned version".
   - The wording T-087 retires is still in `caladrius/README.md` (line 51) and `METHOD.md` (lines 12 and 41).

**Short answers.**
- **An LLM?** Not for today's task. Make the assistant a plan editor, and judge its model by the fields people no longer type, at a fixed error rate.
- **NLME?** Estimation is a trap (C8); design evaluation is within reach (C3).
- **Re-arrangement?** Around the plan (C1), not one repository; bindings and CDISC later (C7, C6).
- **Regulator?** Intended use, a test record for the installed copy, a who/when/why audit trail, requirement-to-test traceability and provenance on every number (C2). M15 does not list NCA among its methods; it names population PK first [S1].

**What I would stop.**
- **New UI features:** six UI cards landed on 2026-10-22 alone, and the UI is 19.5k of 63k Rust lines.
- **Gate v2** (T-063 to T-065, T-092): it lost the development decision, 6/25 against 14/25 exercises at pass^3.
- **OptChat** (T-074 to T-076): the project file is the memory.
- **Decider training on generated wordings.**
- **Frontier-arm extensions:** answered (21/25 against 14/25 exercises), and a paid API has no place in a zero-cost product.
- **The frozen set as headline:** run it once as pre-registered, without headlining it.

**Assumptions.** A modelling audience on 2026-11-17; no paid API in the product or demo; a standard IP clause in the internship agreement (not seen); scores are my judgement.

## 2. Candidates

### C1. Plan-first Officina (the radical one)

- **Pitch.** A typed, versioned analysis plan becomes the one interface between people, models and the engine.
- **Build.** M, 3 to 4 weeks:
  - a `caladrius-plan` crate (~1.5k lines), with `plan.validate`, `plan.run` and `plan.diff`. Its `Plan` schema generalises the 20 closed decisions of `apothicaire/decision/`: route, dose, AUC method, λz and BLQ rules, parameters, comparisons;
  - a report in the order of M15's analysis plan and report (MAP, MAR), with numbers from `structuredContent` only and C2's provenance block;
  - a Plan page in the app, where drafted fields are marked as proposals;
  - Apothicaire reduced to `draft(request) -> Plan`, abstaining field by field.
- **Fit.** "Never computes a number" becomes "never runs an analysis nobody approved". It stays local and deterministic, and the model becomes optional.
- **Evidence.**
  - M15 §4.1–4.2: define analyses in advance in a MAP, document deviations in the MAR [S1].
  - Dataflow synthesis maps each turn to a program over an inspectable state [S17].
  - LLM-written NONMEM code needed expert correction and was not reproducible [S18]; LLM reports need expert review [S19].
- **Prior art.** Roche's PMx-AI Bot, a cloud GPT-4 Turbo assistant evaluated qualitatively [S20]; aNCA's GUI [S8].
- **New.** A local plan-first NCA assistant, scored on blind requests by risk and coverage, whose errors are editable fields before any number exists.
- **Prototype.**
  - Day 1, stored data: risk–coverage of the v2 decider on the 74 blind requests (probabilities in `answers.jsonl`).
  - Success: at a threshold set on the v2 `heldout_wordings` file, ≥ 90 % of the 74 requests have no wrong auto-filled decision, while ≥ 60 % of their `analysis`, `route` and `auc_method` decisions are auto-filled.
  - Kill (the language front end only): no threshold meets both, which critique point 1 makes likely; then ship the plan as a form and publish why.
  - Days 2–3: plans reproduce all 3,744 NCA conformance values.
- **Scores.** Demo 3 · PhD 3 · users 2 · compounding 3. **Effort:** M.
- **Risks.** None on licence, hardware or cost, since the 0.8B runs on a CPU. MCP stays the transport.
- **Board.** Overlaps T-069, T-084 and T-090; supersedes T-063 to T-065, T-092 and T-093.

### C2. Qualify and trace

- **Pitch.** One command proves that this binary, on this machine, passes the published suite, and every result says what produced it.
- **Build.** S–M, 1 to 2 weeks:
  - `caladrius qualify` reruns all conformance cases from a per-release oracle bundle and reports binary SHA-256, OS, counts, failures and documented differences.
  - Every result and export carries provenance: version, commit, binary hash, input SHA-256, options, UTC time.
  - History v2 adds UTC time, an actor label and a reason per data edit, chained by SHA-256; a broken or missing chain prints "provenance: none".
  - `cargo xtask rtm` builds a requirement-to-test matrix from the rule ids.
- **Fit.** It makes "verified" and "re-derivable from a pinned version" true at the user's desk.
- **Evidence.**
  - M15 asks for "a valid computerized system that is reliable, reproducible, and traceable. Documentation of appropriate software testing should be available" [S1].
  - The EMA guideline covers statistical software and wants secure, timestamped, protected audit trails recording who, when and why [S2].
  - 21 CFR 11.10(e) [S3]; tests traced to requirements [S5]; risk-based assurance (device scope) [S4].
- **Prior art.** R Validation Hub practice [S5], and the project's conformance floors.
- **New.** Qualification regenerated on the user's machine.
- **Prototype.** Two days.
  - Success:
    - `qualify` runs in under 60 s on the Windows demo laptop, with counts identical to `docs/conformance.md`.
    - Every `confirmed by oracle` rule resolves to a test or an oracle case. A heuristic scan finds only 88 of 228 rule ids in `specs/` cited in a test file.
    - A one-cell edit of a saved project is reported on load.
  - Kill: Q-004 (GPL data, AGPL outputs) forbids bundling the oracle data; then ship counts and hashes.
- **Scores.** Demo 3 · PhD 1 · users 2 · compounding 3. **Effort:** S–M.
- **Risks.** Q-004 is pending. Never claim Part 11 compliance: there are no electronic signatures and no access control.
- **Board.** The README's "validation kit" has no card. Related: T-069, T-080, T-081, T-085, T-086.

### C3. Population design evaluation with the Fisher information matrix

- **Pitch.** Population capability without an estimator, on the predictions and derivatives Caladrius already checks to 1e-12.
- **Build.** M. A `caladrius-design` crate (~2k lines) with:
  - individual and population FIM (first-order approximation, block-diagonal then full);
  - exponential variability, with additive, proportional or combined error;
  - multiple-dose regimens through the existing superposition;
  - D-criterion and predicted RSE %;
  - `design.evaluate` and `design.compare` over MCP and WASM.
- **Fit.** Deterministic, checked against two tools, and in the browser. Abdou's internship skill becomes a public asset.
- **Evidence.**
  - Population FIM [S23, S24]; PopED (LGPL-3) [S11, S25]; PFIM 8.0.1 (GPL-3) [S12].
  - PopED's vignette prints a complete target [S11]:
    - one-compartment oral, 20 or 40 mg every 24 h, two groups of 20;
    - OFV 39.309;
    - RSE %: V 8.22, KA 10.09, CL 4.40, d_V 39.84, d_KA 60.66, d_CL 27.56, sig_prop 13.87.
- **Prior art.** PopED and PFIM.
- **New.** A permissive FIM engine that runs in the browser, is checked against both, and shares its kernels with NCA and fitting.
- **Prototype.** Three days: the vignette's design in PopED, then in PFIM.
  - Success: OFV within 1e-3 and all seven RSE % within 0.01, once PopED's FIM settings are matched. Its default approximation is unverified.
  - Kill: any RSE % still more than 1 % off, with no documented approximation to explain it.
- **Scores.** Demo 2 (3 if cleared) · PhD 3 · users 2 · compounding 3. **Effort:** M.
- **Risks.**
  - IP and perception: FIM-based design was the internship topic. Use public papers and package documentation only, never internship code or DE$IGN EXPLORER, and get the Sanofi supervisor's written confirmation before the demo.
  - PopED and PFIM run as oracles, never copied.
  - `AGENTS.md` §1 bans population modelling "not even to prepare": amend the contract first.
- **Board.** No card.

### C4. Dosing-aware NCA: dose records, intervals, steady state, sparse sampling

- **Pitch.** What a pharmacometrician tries first: a day-1 and day-14 study, a partial AUC, a mouse study with one sample per animal.
- **Build.** L, 6 to 8 weeks:
  - dose records (time, amount, route, duration), analyte, period, nominal and actual time;
  - AUCτ, Ctrough, Cavg, peak-trough ratio, swing, fluctuation, accumulation;
  - intervals, partial AUC and sparse AUC with standard errors;
  - PKNCA oracle scripts and the UI.
- **Fit.** Core scope, under the same oracle discipline.
- **Evidence.**
  - All of it is "not specified" in `specs/nca.md` §12.
  - PKNCA 0.12.1 has `ctrough`, `cav`, `ptr`, `swing`, `aucint` and `deg.fluc` [S6], and a sparse mode with Bailer's estimate and the Nedelman–Jia/Holder standard error [S7, S21, S22].
  - The blind requests already ask for steady state, multiple doses and urine.
- **Prior art.** PKNCA (AGPL-3) and aNCA (Apache-2.0), both in R [S6, S8].
- **New.** The same coverage in a permissive binary and in the browser.
- **Prototype.** Three days.
  - AUCτ, Ctrough and Cavg on five doses from the validated superposition, plus sparse AUClast on PKNCA's Holder example.
  - Success: all within 1e-6 of PKNCA.
  - Kill: the interval-bound rules cannot be specified from PKNCA's documentation (its source is off limits); then use our own rule as a documented difference.
- **Scores.** Demo 2 · PhD 1 · users 3 · compounding 3. **Effort:** L.
- **Risks / board.** PKNCA is an oracle only, and the Holder data's licence is unverified. No card; T-073 is adjacent.

### C5. The oracle as the product: a neutral NCA conformance suite

- **Pitch.** Caladrius's best asset, its oracle, becomes a separate suite that any NCA tool can run, with Caladrius as one participant.
- **Build.** M. A new repository with:
  - neutral cases, each expected value tagged by provenance (closed form, two tools agreeing, or disputed);
  - adapters for PKNCA, NonCompart, aNCA and Caladrius;
  - an agreement matrix, a difference register like `specs/differences.md`, and CI per tool release.
- **Fit.** Open, regenerable and permissive, and honest about the author's conflict of interest.
- **Evidence.**
  - A comparison run by one tool's author is not independent.
  - A 2019 poster compared PKNCA, Pumas and a commercial tool on 13,104 simulated scenarios, and traced the disagreements to half-life point selection [S15].
  - The public NCA oracle has 20 cases.
- **Prior art.** That poster [S15].
- **New.** Open tools only, continuous runs, an edge-case taxonomy and maintainer review.
- **Prototype.** Three days on the 20 public cases plus four λz-discriminating profiles, with PKNCA 0.12.1 and NonCompart 0.8.4.
  - Success: one reproducible, explained class of disagreement.
  - Kill: total agreement, or options that cannot be mapped between tools.
- **Scores.** Demo 1 · PhD 3 · users 3 · compounding 2. **Effort:** M.
- **Risks / board.** No commercial tool in the suite (constraint); copyleft tools run, not linked; Q-004. Related: the PAGE 2027 plan, T-086, T-089.

### C6. CDISC in, CDISC out

- **Pitch.** Read ADNCA and write the PP domain.
- **Build.** M, after C4: `data.import_adnca` (USUBJID, PARAMCD, AVAL, AFRLT, ARRLT, NFRLT and the dose variables) and `export.pp` (PPTESTCD rows).
- **Fit.** Standards-first, and testable on public data.
- **Evidence.** admiral builds ADNCA from SDTM `pc` and `ex` [S9], which pharmaversesdtm (Apache-2.0) supplies [S10].
- **Prior art.** aNCA (Roche) already writes ADNCA, PP and ADPP, in R [S8].
- **New.** Only the route without R.
- **Prototype.** Two days, against aNCA's PP on the same input.
  - Success: the same parameters, with values within 1e-6.
  - Kill: more than 30 % of records need periods, analytes or multiple doses (then C4 comes first).
- **Scores.** Demo 2 · PhD 1 · users 3 · compounding 2. **Effort:** M.
- **Risks / board.** Unverified: whether pharmaversesdtm's concentrations are synthetic, and the CDISC guides' access terms. No card.

### C7. The engine as a library for Python and R

- **Pitch.** `pip install caladrius` and an R package: a permissive NCA for teams that avoid the AGPL.
- **Build.** S: about 600 lines of PyO3 and extendr around `run(command_id, params_json)`, with wheels built in CI.
- **Fit and evidence.** The licence is the differentiator. PKNCA is AGPL-3 [S6], nlmixr2 is GPL-3 [S13], and pharmsol and PMcore are GPL-3 [S14].
- **Prior art.** PKNCA and pharmsol.
- **New.** Permissive and verified.
- **Prototype.** One day.
  - Success: JSON byte-identical to the CLI on Theoph, from the CI wheels.
  - Kill: no Windows wheel within a day.
- **Scores.** Demo 0 · PhD 1 · users 2 · compounding 2. **Effort:** S.
- **Risks / board.** Wheel upkeep; CRAN's rules on Rust code are unverified. No card.

### C8. An NLME estimator in Rust (the trap)

- **Pitch.** A permissive population estimator: FO, then FOCE-I.
- **Build.** L, months: estimation, the covariance step and diagnostics on the closed-form models, checked against nlmixr2.
- **Fit.** It is what a pharmacometrician expects, but it contradicts `AGENTS.md` §1.
- **Evidence and prior art.** nlmixr2 7.0.1 is mature and GPL-3 [S13], and PMcore is a GPL-3 Rust population estimator [S14]. NONMEM and Monolix lead the field.
- **New.** Only the licence and the record.
- **Prototype.** Three days: FO on Theoph against nlmixr2.
  - Success: OFV within 0.01 and estimates within 1e-3.
  - Kill: a miss after three days.
- **Scores.** Demo 1 · PhD 2 · users 1 · compounding 2. **Effort:** L.
- **Risks.** A validation burden beyond one student, and a NONMEM comparison that needs a licence.
- **Verdict.** Not now: C3 tests the shared machinery first.

## 3. Top 3

1. **C1, plan-first.** The only candidate that tests the riskiest assumption directly, in a day, on stored data. Either outcome is publishable: a draft that saves typing at a fixed error rate, or evidence that a small local model should not interpret PK requests alone. A demo (plan form, run, templated report on Theoph) fits before 2026-11-17.
2. **C2, qualify and trace.** The cheapest credibility gain with a pharma audience: it makes two README promises true and supplies C1's provenance block. First on the calendar.
3. **C3, FIM design evaluation.** "Where is the population?" answered without the NLME trap: the strongest PhD and CIFRE link, a printed target, two tools to check against, and a better PAGE abstract than an NCA comparison run by one tool's author, which the 2019 poster already did at far larger scale [S15]. Gated on IP clearance and a contract change.

C4 is a strong fourth and the default if C3's gate fails; it extends the current shape instead of changing it.

## 4. Rejected ideas

- **The assistant in the browser build.** The weights would dwarf the ~1.9 MB page, and the model is the part that fails on blind requests; under C1 the plan form runs there without one.
- **One repository.** Churn with no gain a reviewer would see; pinning by commit already works.
- **A bigger or hosted model by default.** Hosted breaks the zero-cost rule, bigger does not fit in 12 GB; C1 shrinks the model's job instead.
- **More gate work.** v2 lost, and C1 leaves no free-text numbers to check.
- **Bioequivalence.** Out of scope by contract, and it invites the banned comparison.
- **PBPK.** Large and off-core; nothing in the code builds towards it.
- **More generated training wordings.** All 720 held-out v1 requests appeared verbatim in training, and v2 still gets only 22/74 blind requests fully right.

## 5. Sources (all opened on 2026-10-23)

Repository evidence is cited by path at the commits above.

- [S1] ICH M15 guideline on general principles for model-informed drug development, Step 5, EMA/CHMP/ICH/496426/2024, 9 February 2026 (ICH Step 4: 29 January 2026; EU effect: 23 July 2026). https://www.ema.europa.eu/en/documents/scientific-guideline/ich-m15-guideline-general-principles-model-informed-drug-development-step-5_en.pdf
- [S2] EMA GCP IWG, Guideline on computerised systems and electronic data in clinical trials, EMA/INS/GCP/112288/2023, 9 March 2023, §6.2.1. https://www.ema.europa.eu/en/documents/regulatory-procedural-guideline/guideline-computerised-systems-electronic-data-clinical-trials_en.pdf
- [S3] 21 CFR 11.10, Controls for closed systems, current text. https://www.law.cornell.edu/cfr/text/21/11.10
- [S4] FDA, Computer Software Assurance for Production and Quality System Software, final guidance notice, Federal Register 2025-18468, 24 September 2025. https://www.federalregister.gov/api/v1/documents/2025-18468.json
- [S5] R Validation Hub, A Risk-based Approach for Assessing R package Accuracy within a Validated Infrastructure, 23 January 2020. https://www.pharmar.org/white-paper/
- [S6] PKNCA 0.12.1 reference manual, CRAN, 2025-08-19, AGPL-3. https://cran.r-project.org/web/packages/PKNCA/refman/PKNCA.html
- [S7] PKNCA vignette "Sparse NCA Calculations", undated. https://humanpred.r-universe.dev/PKNCA/doc/v04-sparse.html
- [S8] aNCA 0.1.0, CRAN, 2025-12-09, Apache-2.0, F. Hoffmann-La Roche. https://cran.r-project.org/web/packages/aNCA/index.html
- [S9] admiral vignette "pk_adnca", CRAN. https://cran.r-project.org/web/packages/admiral/vignettes/pk_adnca.html
- [S10] pharmaversesdtm 1.5.0, CRAN, 2026-07-01, Apache-2.0. https://cran.r-project.org/package=pharmaversesdtm
- [S11] PopED 0.7.0, CRAN, 2024-10-07, LGPL-3 (https://cran.r-project.org/package=PopED), and its vignette "intro-poped" (https://cran.r-project.org/web/packages/PopED/vignettes/intro-poped.html).
- [S12] PFIM 8.0.1, CRAN, 2026-10-16, GPL-3. https://cran.r-project.org/package=PFIM
- [S13] nlmixr2 7.0.1, CRAN, 2026-08-05, GPL-3. https://cran.r-project.org/package=nlmixr2
- [S14] PMcore, GPL-3.0 (https://github.com/lapkb/pmcore); pharmsol, GPL-3.0 (https://github.com/LAPKB/pharmsol); Otálvaro JD et al., pharmsol, JOSS, 18 August 2026 (https://joss.theoj.org/papers/10.21105/joss.10580).
- [S15] Ma Y, Guglieri-Lopez B, Gobburu J, Denney W, Ivaturi V. Comparison of non-compartmental analysis results between PKNCA, Pumas and Phoenix WinNonlin. ACOP 2019, poster T-102. http://www.humanpredictions.com/wp-content/uploads/2020/01/ACOP_2019_T102_NCA_performance_evaluation_Yingbo_revised.pdf
- [S16] Yao S et al. τ-bench. arXiv:2406.12045, 17 June 2024. https://arxiv.org/abs/2406.12045
- [S17] Semantic Machines et al. Task-oriented dialogue as dataflow synthesis. TACL 8, 2020. https://arxiv.org/abs/2009.11423
- [S18] Shin E, Yu Y, Bies RR, Ramanathan M. Evaluation of ChatGPT and Gemini large language models for pharmacometrics with NONMEM. J Pharmacokinet Pharmacodyn 2024;51(3):187–197. [doi:10.1007/s10928-024-09921-y](https://doi.org/10.1007/s10928-024-09921-y)
- [S19] Cha HJ, Choe K, Shin E, Ramanathan M, Han S. Leveraging large language models in pharmacometrics. J Pharmacokinet Pharmacodyn 2025;52(3):34. [doi:10.1007/s10928-025-09982-7](https://doi.org/10.1007/s10928-025-09982-7)
- [S20] Suekuer E. PMx-AI Bot. PAGE 32 (2024), abstract 11257. https://www.page-meeting.org/Abstracts/pmx-ai-bot-changing-the-way-of-traditional-pharmacometrics-work-with-ai-bots/
- [S21] Bailer AJ. Testing for the equality of area under the curves when using destructive measurement techniques. J Pharmacokinet Biopharm 1988;16(3):303–309. [doi:10.1007/BF01062139](https://doi.org/10.1007/BF01062139)
- [S22] Nedelman JR, Gibiansky E. The variance of a better AUC estimator for sparse, destructive sampling in toxicokinetics. J Pharm Sci 1996;85(8):884–886. [doi:10.1021/js960083a](https://doi.org/10.1021/js960083a)
- [S23] Retout S, Duffull S, Mentré F. Development and implementation of the population Fisher information matrix for the evaluation of population pharmacokinetic designs. Comput Methods Programs Biomed 2001;65(2):141–151. [doi:10.1016/s0169-2607(00)00117-6](https://doi.org/10.1016/s0169-2607(00)00117-6)
- [S24] Retout S, Mentré F. Further developments of the Fisher information matrix in nonlinear mixed effects models. J Biopharm Stat 2003;13(2):209–227. [doi:10.1081/BIP-120019267](https://doi.org/10.1081/BIP-120019267)
- [S25] Nyberg J et al. PopED: an extended, parallelized, nonlinear mixed effects models optimal design tool. Comput Methods Programs Biomed 2012;108(2):789–805. [doi:10.1016/j.cmpb.2012.05.005](https://doi.org/10.1016/j.cmpb.2012.05.005)

S18, S19 and S21 to S25 are records retrieved from PubMed (NLM); I read the abstracts, not the papers.
