# Next piece for Officina: the ecosystem scout

Ecosystem scout, 2026-10-23: the pharmacometrics and DMPK tooling landscape, open and commercial, and the gaps Officina can
close. Sources [S1] to [S43], each opened on 2026-10-23, are listed at the end; method and assumptions are in section 6.

## 1. Summary

**Top pick: `qc.nca`, a second opinion that explains NCA disagreements.** Pharmacometrics went agentic in 2026 (Certara's MCP
server, PMxAgent) on copyleft NCA code, while a CRO still reconciles two NCA implementations with a blanket 10 % tolerance
because no tool names the convention behind a difference [S22, S24, S37]. Caladrius, the only maintained permissive NCA engine
found, already holds the oracle and convention catalogue this needs. First user: a Sanofi pharmacometrician doing QC. It answers
T-089, gives PAGE 2027 its method, and meets third-party data within days via the public PMxAgent benchmark (C2, the quick win
for 17 November).

## 2. The landscape in October 2026

| Tool | Licence | Latest release, status | Src |
|---|---|---|---|
| **NCA:** PKNCA | AGPL-3 | 0.12.1 (2025-08-19); SDTM input requested 2026-03, open | S1, S2 |
| NonCompart, ncar | GPL-3 | 0.8.4, 0.7.2 (2026-09); ncar uses SDTM terms | S3, S4 |
| ncappc | GPL-3 | 1.0.0 (2025-04-25) | S5 |
| aNCA (Roche, pharmaverse) | Apache-2.0, computes with PKNCA | 0.1.0 (2025-12-09) | S6 |
| pharmsol `nca`, PMcore (Rust) | GPL-3.0 | 0.29.4 (2026-10-20), 0.29.0; steady state; no validation claim | S8 |
| pynca; PKPy (Python) | none declared; not stated | 1.2.3 (2025-03-06); paper 2025-10-27 | S9, S10 |
| Pumas NCA; Phoenix | proprietary, free for academia; commercial | Phoenix: market context, never compared | S11 |
| **NLME, simulation:** nlmixr2, rxode2, babelmixr2; mrgsolve | GPL ≥ 3; GPL ≥ 2 | 7.0.1, 5.1.8, 0.1.12 (2026-08 to 10); 2.0.1 (2026-05-20) | S12 |
| Stan/Torsten | not stated | 0.89.0 (2021-06-25) | S15 |
| NONMEM; Monolix; Pumas | commercial; academic programmes for the last two | NONMEM 7.6, annual subscription | S13, S14, S11 |
| **Design:** PopED | LGPL ≥ 3 | 0.7.0 (2024-10-07) | S16 |
| PFIM | GPL-3 | 8.0.1 (2026-10-16) | S16 |
| PkStaMp | compiled Matlab | no current download found (unverified) | none |
| **Model building:** PsN; Pharmpy | GPL ≥ 2; LGPL ≥ 3 | 5.7.2 (2026-08-28); 2.2.0 (2026-08-26) | S17, S9 |
| pyDarwin; Pirana | GPL-3.0, needs NONMEM or Certara NLME; commercial | both Certara; brochure May 2026 | S18, S19 |
| **PBPK:** OSP Suite; Simcyp | GPLv2; commercial | v12.2, Sanofi on its management team | S20, S21 |
| **Standards:** ADNCA; ADPPK guides | CDISC | v1.0 2021-11-29; v1.0 2023-10-06 | S33 |
| admiral data; NMdata | Apache ≥ 2; MIT | NMdata 0.2.6 (2026-08-23) | S34, S36 |
| **Agents, MCP:** Certara RsNLME MCP, Certara.R | needs the NLME engine; LGPL-3 | blog 2026-08-03; ACoP workshop 2026-10-10 | S21, S22, S23 |
| PMxAgent | AGPL-3.0, Docker | CPT:PSP 15(10):e70325, listed 2026-10-01 | S24, S25 |
| PumasAide; nonmem-mcp-server | Pumas; MIT | docs 2026-10-22; first seen 2026-03-30 | S11, S27 |
| **TDM:** posologyr; Tucuxi | AGPL-3; open, licence not stated | 1.2.8 (2025-02-04); PAGE 2024 | S41, S42 |
| **Teaching** | | no CRAN package labelled for teaching | S7 |

What the map says:

1. **Copyleft at the core.** Apart from Caladrius, every maintained open NCA engine found is GPL or AGPL, and the two newest
   open front ends compute with PKNCA [S6, S25]. pharmsol [S8] shows that a Rust NCA is not novel by itself.
2. **Agents arrived; number checks did not.** Vendors make code reviewable or tools deterministic [S22, S11, S24]; none, as
   documented, checks the numbers in the final answer. On the public NCA benchmark, Claude Sonnet 4.6 scores 93.21 % with
   neither tools nor skills and 98.18 to 98.65 % with PMxAgent's tools or Agent Skills [S26].
3. **Regulators ask for verification, not a brand.** ICH M15 (Step 4 on 2026-01-29, in force in the EU on 2026-07-23): "Modeling
   activities should use a valid computerized system that is reliable, reproducible, and traceable" [S30]. The FDA requires no
   particular software but expects conclusions "reproducible by the Agency with the available codes and data" [S31].
4. **Practitioners reconcile by hand.** A CRO accepts "discrepancies up to 10%" between production and QC NCA [S37]; the one
   multi-tool NCA comparison found (ACoP 2019) is not independent (tool authors co-sign it) and includes Phoenix [S38]; dataset assembly is the costly
   step of popPK submissions [S35].

## 3. Candidates

Scores 0 to 3: demo on 2026-11-17 / PhD and publication / users and community / compounding. Effort: S ≤ 1 week of agent
work, M 2 to 4 weeks, L more.

### C1. `qc.nca`: a second opinion that explains NCA disagreements (top pick)

- **Pitch.** Give Caladrius the concentrations and another tool's NCA table; it recomputes each parameter and marks every
  difference *equal*, *explained* (re-running under a named convention closes it to 1e-6) or *unexplained*.
- **Build.** `qc.nca` in `caladrius-engine` (L2), running `nca.run` variants over a closed, data-driven list of conventions (AUC
  rule; λz window read from the other table; BLQ policy; start and C0; Tlag; presets such as `reference_conventions`); readers for
  PKNCA output and SDTM PP through the vocabulary table of `specs/nca.md` §10; CLI, MCP, a web page. ~2,000 lines. **M.**
- **Fit.** Verification offered to others; no language model needed.
- **Evidence.** [S37]: "discrepancies up to 10% are acceptable", λz selection as the cause, and PKNCA 0.12.1 noting IV
  calculations "still under active development"; [S38] traces half-life gaps to λz selection order; [S30].
- **Prior art, new.** Double programming in R or with a second tool [S37]; aNCA and ncar reports. New: every difference
  attributed to a named convention, and 1e-6 instead of 10 %.
- **Prototype (2–3 days).** PKNCA 0.12.1 (pinned in `oracle/scripts/nca_pknca.R`) on Theoph, Indometh and the 14 edge cases
  under 12 option sets; `qc.nca` attributes blind. Success: ≥ 95 % of differing values attributed correctly, no false
  *equal*, under 10 s per subject. Kill: below 80 %, or hand rules per dataset.
- **Scores** 3 / 2 / 3 / 3. **First user:** a Sanofi pharmacometrician doing NCA QC.
- **Risks.** Users will feed it reference-software tables in private; Officina publishes PKNCA-based demos only. PKNCA stays an
  oracle, never shipped.
- **Board.** Answers T-089; extends T-042 and T-077 to external tables; builds on `specs/differences.md` (D-01 to D-05) and
  open items O-16, O-18, O-21; feeds T-086, the validation kit and PAGE 2027.

### C2. The public PMxAgent NCA benchmark, run on the 12 GB PC

- **Pitch.** Score Caladrius alone, the decider-only arm and the 27B with the gate on the 182-drug, 1,820-subject benchmark
  published with PMxAgent: an offline, zero-cost, permissive arm that neither the abstract nor the letter reports.
- **Build.** `apothicaire/bench/external/pmxagent/`: a download-and-hash script (data never committed), an adapter, a scorer
  checked against the letter's MIT `scoring/score_nca.py` [S26], a report. ~500 lines of Python. **S.**
- **Fit.** Outside ground truth, against the audit's "in-sample" criticism.
- **Evidence.** [S24]: 98.3 % against PKanalix, with deterministic tools where frontier agents rewrite code each run. [S26]: no
  tools 93.21 %, PMxAgent 98.18 %, Agent Skills up to 98.65 %, Haiku 4.5 at $0.09 per run; data CC BY-NC.
- **Prior art, new.** PMxAgent and Agent Skills, on hosted models. New: local GPU, offline, a no-LLM arm, gate counts.
- **Prototype (2 days).** Day 1: the 1,820 subjects through `nca.run`. Day 2: decider-only and 27B arms on 20 stratified drugs.
  Success: deterministic arm ≥ 98.3 % with every miss traced to a convention; 27B ≥ 98 % with 0 unverified
  numbers shown. Kill: deterministic arm below 95 % with unexplained misses; then publish the convention analysis, not a score.
- **Scores** 3 / 3 / 1 / 2. **First user:** a Sanofi pharmacometrician weighing agentic tools.
- **Risks.** CC BY-NC: research use only (it matters if SNEE leads to a company); the reference is PKanalix output (not
  Phoenix; publishing is Abdou's call); the paper's metric was unreadable (publisher 403), so the letter's scorer stands in.
- **Board.** T-099, T-101, `bench/NO_LM_ARM.md`, `bench/FRONTIER_ARM.md`; the first external data for C1.

### C3. A number-provenance proxy for any PK MCP server

- **Pitch.** The gate as a stdio MCP proxy between any host (Claude Code, Cursor) and any PK server (Caladrius, PMxAgent,
  Certara's): it logs tool results and labels each number of the final answer as from a tool, from the user, or unverified.
- **Build.** A Python package reusing `gate.py` and `gate_v2.py`, a manifest per answer, a report page. ~1,500 lines. **M.**
- **Fit.** The gate, the asset no vendor ships, becomes a check anyone can run.
- **Evidence.** Certara keeps "an independent, inspectable R script at every stage" [S22] and Certara.R emits "audit-ready R
  scripts" [S21]: provenance of code, not of numbers. MCP: servers MUST conform to `outputSchema`; clients SHOULD validate
  results and log tool usage for audit [S29].
- **Prior art, new.** Script audit trails and deterministic tools [S21, S22, S24]. New: per-number provenance of the prose
  answer, across vendors.
- **Prototype (3 days).** Proxy Caladrius and PMxAgent's NCA container; the 25 development exercises with the 27B; 100 injected
  computed or converted numbers. Success: all flagged, ≤ 2 % false flags, the same behaviour on both servers. Kill: over
  5 % false flags without structured output; then require `structuredContent`.
- **Scores** 2 / 3 / 2 / 3. **First user:** a Sanofi pharmacometrician trying an MCP assistant.
- **Risks.** Never bundle AGPL code; PMxAgent's images are linux/amd64 only [S25], so Docker on Windows; Certara's server needs
  the NLME engine and stays out of the prototype.
- **Board.** T-054 to T-058, T-063 to T-065, T-069, T-084, T-093.

### C4. Permissive Python and R bindings

- **Pitch.** `pip install caladrius` and an R package that call the verified engine through the command registry, with the
  conformance table re-run in each language.
- **Build.** PyO3/maturin and extendr wrappers over the JSON commands (`caladrius-cli commands --format json` already exports
  their schemas). ~1,000 lines. **S to M.**
- **Fit.** The same verified numbers in a notebook as in the app and the agent.
- **Evidence.** The licences of section 2; on PyPI, pynca declares no licence and was last uploaded on 2025-03-06 [S9]; PKPy
  cites tools that "require commercial licenses or complex installation procedures" [S10].
- **Prior art, new.** pynca, PKPy, pharmsol (GPL, no bindings in its README [S8]). New: permissive and oracle-checked.
- **Prototype (1–2 days).** A wheel with `nca.run` on a DataFrame; the 20 NCA oracle cases from Python. Success: 3,744 of
  3,744 values bit-identical to Rust, wheel under 15 MB, Windows install under a minute. Kill: engine logic duplicated outside
  the registry.
- **Scores** 1 / 1 / 3 / 3. **First user:** a student or a Python-first data scientist.
- **Risks.** Maintenance in two more ecosystems.
- **Board.** No card.

### C5. CDISC round trip: SDTM PC and EX in, PP out

- **Pitch.** SDTM PC and EX in (XPT or CSV), the verified NCA, SDTM PP out with CDISC test codes, offline and in the browser.
- **Build.** An XPT reader and the PC/EX mapping (a new L1 crate); `data.import_sdtm` and `export.pp`, using the CDISC column of
  `specs/nca.md` §10. ~2,000 lines. **M.**
- **Fit.** Industry PK data travel as CDISC [S33, S35]; Caladrius reads CSV and pasted tables only.
- **Evidence.** [S33]; admiral builds ADNCA and ADPPK from EX and PC [S34]; SDTM input to PKNCA was requested on 2026-03-16
  to simplify aNCA's data mapping and welcomed by the maintainer on 2026-04-17, with no word on PP output [S2]; [S4]; [S35].
- **Prior art, new.** admiral, ncar, aNCA, Pumas NCA. New: one binary, the browser, MCP, PP rows that carry their verification
  status.
- **Prototype (2–3 days).** EX from pharmaversesdtm (Apache ≥ 2) [S34], PC simulated by Caladrius. Success: every PPTESTCD
  valid, values equal to PKNCA within 1e-6. Kill: over 30 % of records need study-specific time rules.
- **Scores** 2 / 1 / 3 / 2. **First user:** a Sanofi PK programmer or pharmacometrician.
- **Risks.** Terminology versions drift; the pilot data's origin is unconfirmed, so PC stays simulated; several subjects per
  analysis is on the "afterwards" list of `AGENTS.md` §1.
- **Board.** T-097, T-098, T-108.

### C6. A NONMEM dataset checker in the browser and over MCP

- **Pitch.** A deterministic linter for NONMEM datasets (EVID, MDV, AMT, CMT, RATE, II, ADDL and SS coherence, time order,
  doses before samples, BLQ flags, duplicates) that overlays each subject on a Caladrius superposition curve, offline.
- **Build.** A parser, 20 checks with typed findings, `dataset.check`, a web page. ~2,000 lines. **M.**
- **Fit.** Deterministic, typed and local, where practitioners lose the most time.
- **Evidence.** [S35]: "complex dosing schedules, imputing missing/partial exposure data, reconstructing Pharmacokinetic (PK)
  timepoints"; [S31] on reproducibility; [S30] asks for the dataset-building scripts; [S32]; NMdata "Rigorously checks final
  Nonmem datasets" [S36].
- **Prior art, new.** NMdata (MIT, R), Pharmpy, Certara's column mapping [S22]. New: no R, the browser, MCP findings, an
  engine-checked plausibility overlay.
- **Prototype (3 days).** The 25 bench exercises in NONMEM format plus 200 mutants, against NMdata. Success: ≥ 95 %
  caught, ≤ 5 % false alarms, at least NMdata's rate on shared checks. Kill: NMdata already catches 95 % and three
  pharmacometricians see no use for a non-R tool.
- **Scores** 2 / 1 / 3 / 2. **First user:** a Sanofi pharmacometrician; students learning NONMEM.
- **Risks.** Population datasets border the NLME exclusion of `AGENTS.md` §1: Abdou decides.
- **Board.** T-049, T-103.

### C7. Individual design evaluation, checked against PopED and PFIM

- **Pitch.** Predict each parameter's RSE for a proposed sampling schedule, and search D-optimal times, from Caladrius's
  oracle-checked derivatives; cross-check against PopED and PFIM.
- **Build.** `caladrius-design` (L0): Fisher information JᵀWJ for the 12 models and the usual error models, RSE, D-criterion,
  exchange search; `design.evaluate`, `design.optimize`. ~1,500 lines. **M.** Individual designs only until the contract
  changes.
- **Fit.** Design is the fit's JᵀWJ, from oracle-checked closed-form derivatives (T-030, T-033), before the data exist.
- **Evidence.** FDA: "Sponsors are encouraged to prospectively plan the PK sampling schedule so that the population PK model is
  maximally informative" [S31]; PFIM 8.0.1 (2026-10-16); PopED last on CRAN on 2024-10-07 [S16].
- **Prior art, new.** PopED, PFIM, PkStaMp, babelmixr2's PopED link [S12]. New: permissive, interactive in the browser,
  conformance for design values, MCP questions such as "what if we drop the 24 h sample?".
- **Prototype (3 days).** Ten individual designs (one-compartment oral, two-compartment IV) against PopED and PFIM. Success: RSE
  equal within 1e-6 relative, or each difference documented as a convention. Kill: a reference's conventions cannot be matched
  or written down.
- **Scores** 2 / 3 / 2 / 2. **First user:** a Sanofi pharmacometrician planning sampling.
- **Risks.** IP: DE$IGN EXPLORER is not Officina's: public papers and package docs only, exposure recorded, naming and
  interface unlike it. To the team that owns it, it can look like a rebuild; present it as individual-only.
- **Board.** No card.

### C8. An engine-graded teaching lab in the web app

- **Pitch.** Bilingual exercises in officina-dmpk.com/app: data simulated from a seed, answers graded by the engine at a stated
  tolerance, with the reason shown (λz points, AUC rule).
- **Build.** An exercise format, `exercise.check`, a pane in the egui interface. ~1,000 lines. **S to M.**
- **Fit.** Caladrius began with coursework software that "shows results but not its reasoning" (README); no install.
- **Evidence.** No CRAN package is labelled for teaching [S7]; simulation modules gave a 21 % post-test gain and 16 % on a
  mid-term [S43].
- **Prior art, new.** Web modules of 2012, Shiny apps, free academic licences [S11]. New: offline, verified, graded with the
  reason.
- **Prototype (2 days).** Three exercises (oral NCA, IV bolus fit, steady state), five classmates. Success: 5 of 5 finish in
  30 minutes unaided; grades match the teacher's key 15 of 15. Kill: two teachers asked decline class time.
- **Scores** 1 / 1 / 3 / 2. **First user:** a teacher of the Université Paris Cité PK Master's.
- **Risks.** Low; exercises stay synthetic and coursework stays in `private/`.
- **Board.** T-103, T-106, T-109, T-110.

### C9. A MAP Bayesian sandbox for teaching drug monitoring

- **Pitch.** MAP estimation (the weighted fit plus a prior) from a published-style popPK model, with regimen forecasts, for
  teaching and verification, never dosing advice.
- **Build.** A prior penalty in `caladrius-fit`; `fit.map` and `regimen.forecast`; model cards as data; posologyr as the oracle.
  ~1,500 lines. **M.**
- **Fit.** A small engine step into a market that keeps its code closed.
- **Evidence.** "None of the software tools provide their source code to the user, except for AutoKinetics"; validation
  procedures "are not standardized"; two tools CE-marked [S39]. 28 MIPD tools, 10 unavailable [S40]. posologyr is AGPL-3 [S41];
  Tucuxi is open source [S42].
- **Prior art, new.** posologyr, Tucuxi, commercial MIPD. New: permissive, in the browser, checked against an open reference.
- **Prototype (3 days).** Three synthetic models, 50 synthetic patients, against posologyr. Success: estimates within 1e-4,
  forecasts within 1e-6. Kill: agreement depends on undocumented posologyr internals.
- **Scores** 1 / 2 / 2 / 2. **First user:** a hospital pharmacologist teaching TDM to residents.
- **Risks.** Patient use would fall under medical-device rules (two CE-marked tools in [S39]); population priors border the
  NLME exclusion; posologyr stays an oracle.
- **Board.** No card.

## 4. Top 3, ranked

1. **C1, `qc.nca`.** The best total: Officina's real asset (an oracle plus written conventions) becomes a weekly tool, "within
   10 %" becomes "explained to 1e-6", T-089 is answered within the Phoenix rule, and PAGE 2027 gets its method, since
   differences between tools are worth publishing only once explained. No GPU, no model.
2. **C2, the PMxAgent benchmark.** Least effort, largest outside signal: third-party data, a published figure to meet, a
   zero-cost offline arm, ready for 17 November. Run it first: its misses are C1's first external test.
3. **C3, the provenance proxy.** It takes the number gate, Officina's most original idea, to the agents practitioners are being
   offered: a methods paper and a PhD thread on numeric trust. Third because its demo needs a second server.

C7 is the alternative third if the CIFRE talks centre on design: the best PhD fit, with IP and scope risks.

## 5. Rejected

- **Population NLME in Rust:** crowded (nlmixr2, NONMEM, Monolix, Pumas, pharmsol), out of scope (`AGENTS.md` §1), L.
- **A PBPK engine or PK-Sim bridge:** the OSP Suite is open (GPLv2), qualified and co-managed by industry, Sanofi included [S20].
- **pyDarwin-like model search:** needs NONMEM or Certara NLME [S18]; NLME scope.
- **Another assistant writing NONMEM or Julia code:** Certara, PumasAide and Roche's PAGE 2024 bot exist [S22, S11, S28]; it
  contradicts "never computes".
- **Steady-state, partial, urine, sparse NCA as the piece:** a real gap against PKNCA and pharmsol, but engine work for the
  engineering lens; C1 and C2 will show which gap costs most.
- **Bioequivalence, a hosted service, a Phoenix-compatible clone:** out of scope, recurring cost, hard constraint.

## 6. Method and assumptions

- **Repositories** (cloned 2026-10-23, Caladrius v0.3.2): the four READMEs and METHOD.md; Caladrius `AGENTS.md` §1, `board/`
  INDEX and RESUME, `specs/nca.md` §10 to 12, `specs/differences.md`, `docs/validation.md`; Apothicaire `bench/NO_LM_ARM.md`
  and `bench/FRONTIER_ARM.md`.
- **Web.** WebFetch and WebSearch worked; crates.io and PyPI via their JSON APIs; PDFs by local text extraction. Unreadable:
  the PMxAgent full text (publisher 403; its abstract record and the letter's repository instead), Europe PMC (403), the FDA
  HTML page (401; its PDF was read), and the GitHub API (third-party repositories were read as web pages). Claims resting on
  search results alone are marked unverified.
- **Assumptions.** The Sanofi team does NCA QC and sampling design and will be offered Certara's MCP tools; demo pieces must be
  ready by 2026-11-17 without paid services; the PMxAgent benchmark counts as synthetic (simulated subjects); CC BY-NC is
  acceptable for non-commercial research; no candidate relaxes a hard constraint. Scores are judgement calls.

## Sources

All opened on 2026-10-23.

- [S1] PKNCA on CRAN, 0.12.1, 2025-08-19, AGPL-3: <https://cran.r-project.org/package=PKNCA>
- [S2] PKNCA issue #516, "Feature request: SDTM input functions", opened 2026-03-16, replies 2026-04-17 and 2026-06-13:
  <https://github.com/humanpred/pknca/issues/516>
- [S3] NonCompart on CRAN, 0.8.4, 2026-09-21: <https://cran.r-project.org/package=NonCompart>
- [S4] ncar on CRAN, 0.7.2, 2026-09-25: <https://cran.r-project.org/package=ncar>
- [S5] ncappc on CRAN, 1.0.0, 2025-04-25: <https://cran.r-project.org/package=ncappc>
- [S6] aNCA on CRAN, 0.1.0, 2025-12-09: <https://cran.r-project.org/package=aNCA>
- [S7] CRAN Task View: Analysis of Pharmacokinetic Data, 2026-01-30: <https://cran.r-project.org/web/views/Pharmacokinetics.html>
- [S8] pharmsol and PMcore on crates.io (API), 2026-10-20 and 2026-09-15: <https://crates.io/crates/pharmsol>,
  <https://crates.io/crates/pmcore>; the `nca` module: <https://docs.rs/pharmsol/latest/pharmsol/nca/index.html>; README:
  <https://github.com/LAPKB/pharmsol>
- [S9] PyPI JSON: pynca 1.2.3 <https://pypi.org/pypi/pynca/json>; pharmpy-core 2.2.0 <https://pypi.org/pypi/pharmpy-core/json>
- [S10] Kong, Kim, Zhang. PKPy. PeerJ, 2025-10-27, e20258: <https://pmc.ncbi.nlm.nih.gov/articles/PMC12574595/>
- [S11] Pumas home page: <https://pumas.ai/>; PumasAide, built 2026-10-22: <https://docs.pumas.ai/dev/aitools/overview/>
- [S12] CRAN: nlmixr2 7.0.1 (2026-08-05), rxode2 5.1.8 (2026-10-13), mrgsolve 2.0.1 (2026-05-20), babelmixr2 0.1.12
  (2026-10-16): <https://cran.r-project.org/package=nlmixr2>, <https://cran.r-project.org/package=rxode2>,
  <https://cran.r-project.org/package=mrgsolve>, <https://cran.r-project.org/package=babelmixr2>
- [S13] NONMEM, ICON: <https://www.iconplc.com/solutions/technologies/nonmem>
- [S14] MonolixSuite, Simulations Plus: <https://www.simulations-plus.com/software/monolix/>
- [S15] Torsten, 0.89.0, 2021-06-25: <https://metrumresearchgroup.github.io/Torsten/>
- [S16] PopED 0.7.0 (2024-10-07) and PFIM 8.0.1 (2026-10-16) on CRAN: <https://cran.r-project.org/package=PopED>,
  <https://cran.r-project.org/package=PFIM>
- [S17] PsN 5.7.2, 2026-08-28: <https://uupharmacometrics.github.io/PsN/>
- [S18] pyDarwin: <https://github.com/certara/pyDarwin>
- [S19] Pirana brochure, Certara, May 2026: <https://www.certara.com/wp-content/uploads/2026/05/Pirana-Brochure.pdf>
- [S20] OSP Suite: <https://www.open-systems-pharmacology.org/>, <https://github.com/Open-Systems-Pharmacology/Suite>
- [S21] Certara.R 2.0.0 and its MCP server: <https://certara.github.io/R-Certara/index.html>
- [S22] Bos, Craig. "RsNLME meets MCP". Certara blog, 2026-08-03:
  <https://www.certara.com/blog/rsnlme-meets-mcp-the-pharmacometric-ai-assistant-scientists-have-been-asking-for/>
- [S23] Certara at ACoP 2026, workshop of 2026-10-10: <https://www.certara.com/conference/acop/>
- [S24] Bloomingdale, Khot. "PMxAgent: an agentic platform for pharmacometrics". CPT Pharmacometrics Syst Pharmacol,
  doi:10.1002/psp4.70325, abstract record: <https://www.citedrive.com/en/discovery/pmxagent-an-agentic-platform-for-pharmacometrics/>;
  listed by Europe PMC on 2026-10-01 per <https://github.com/Nakamarusan/poppk-ai-literature-monitor/issues/51>
- [S25] PMxAgent repository, AGPL-3.0-only: <https://github.com/peterbloomingdale/pmxagent>
- [S26] Letter-to-the-editor benchmark, Agent Skills against PMxAgent (MIT code, CC BY-NC data):
  <https://github.com/heyiamnotacoder/pmxagent-skills-benchmark>
- [S27] nonmem-mcp-server, MIT, tools first seen 2026-03-30: <https://glama.ai/mcp/servers/sueinchoi/nonmem-mcp-server>
- [S28] Suekuer. "PMx-AI Bot". PAGE 32 (2024), abstract 11257:
  <https://www.page-meeting.org/Abstracts/pmx-ai-bot-changing-the-way-of-traditional-pharmacometrics-work-with-ai-bots/>
- [S29] Model Context Protocol specification 2025-06-18, Tools:
  <https://modelcontextprotocol.io/specification/2025-06-18/server/tools>
- [S30] ICH M15, Step 5, EMA/CHMP/ICH/496426/2024, 9 February 2026:
  <https://www.ema.europa.eu/en/documents/scientific-guideline/ich-m15-guideline-general-principles-model-informed-drug-development-step-5_en.pdf>;
  RAPS, 2026-02-10: <https://www.raps.org/resource/ich-adopts-m15-guideline-on-model-informed-drug-de.html>
- [S31] FDA. Population Pharmacokinetics, Guidance for Industry, February 2022: <https://www.fda.gov/media/128793/download>
- [S32] ISoP webinar on the FDA popPK guidance's dataset changes, recorded 2023-09-29:
  <https://learn.isop.org/products/changes-to-population-pkpd-data-and-supplemental-information-based-on-fda-guidance-for-poppk>
- [S33] CDISC ADaMIG for NCA Input Data v1.0, 2021-11-29:
  <https://www.cdisc.org/standards/foundational/adam/adamig-non-compartmental-analysis-input-data-v1-0>; ADaM popPK IG v1.0,
  2023-10-06: <https://www.cdisc.org/standards/foundational/adam/basic-data-structure-adam-poppk-implementation-guide-v1-0>
- [S34] admiral PK vignette (read on a CRAN mirror): <https://cran.ms.unimelb.edu.au/web/packages/admiral/vignettes/pk_adnca.html>;
  pharmaversesdtm: <https://pharmaverse.github.io/pharmaversesdtm/>
- [S35] Muppalla, Harite (Exelixis). PharmaSUG 2026, paper PK-282:
  <https://pharmasug.org/proceedings/2026/PK/PharmaSUG-2026-PK-282.pdf>
- [S36] NMdata on CRAN, 0.2.6, 2026-08-23: <https://cran.r-project.org/package=NMdata>
- [S37] Menda, Evans (IDDI). PK NCA using R. PHUSE US Connect 2026, paper PP16:
  <https://iddi.com/wp-content/uploads/2026/08/IDDI-Paper-PK-NCA-Using-R.pdf>
- [S38] Ma et al. Comparison of NCA results between PKNCA, Pumas and Phoenix WinNonlin. ACoP 2019, poster T-102:
  <http://www.humanpredictions.com/wp-content/uploads/2020/01/ACOP_2019_T102_NCA_performance_evaluation_Yingbo_revised.pdf>
- [S39] Kantasiripitak et al. Front Pharmacol 2020;11:620: <https://pmc.ncbi.nlm.nih.gov/articles/PMC7224248/>
- [S40] Del Valle-Moreno et al. Pharmaceutics 2023;15(7):1859: <https://pmc.ncbi.nlm.nih.gov/articles/PMC10386689/>
- [S41] posologyr on CRAN, 1.2.8, 2025-02-04: <https://cran.r-project.org/package=posologyr>
- [S42] Thoma. "Tucuxi: open source MIPD software". PAGE 32 (2024), abstract 10892:
  <https://www.page-meeting.org/Abstracts/tucuxi-open-source-mipd-software/>
- [S43] Mehvar. Effects of simulations on the learning of pharmacokinetic concepts. Curr Pharm Teach Learn 2012;4(4):278-284:
  <https://digitalcommons.chapman.edu/pharmacy_articles/166>
