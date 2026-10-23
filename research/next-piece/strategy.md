# Next piece for Officina: the strategy view

*Strategy scout, one of five. Lens: Abdou's goals (the demo of 2026-11-17, a PhD in DMPK/AI with a possible Sanofi CIFRE, a publication by April 2027, visibility). Written 2026-10-23 from caladrius v0.3.2, apothicaire `b513f83` and optchat `main`. I opened every linked source that day; dates in parentheses are the documents' own. Every benchmark figure here comes from the development set: in-sample and exploratory.*

## 1. Summary

**Top pick: write the paper now.** A pre-registered evaluation of Apothicaire (every number traced to the engine, judged on a frozen set, against a no-LLM decider and a frontier model on the same harness), condensed into a Lewis Sheiner Student Session abstract for PAGE 2027 (Lyon, 9–11 June). It turns Officina's most rigorous asset into what PhD and CIFRE committees read, costs no new compute, and answers the question PMxAgent now raises: what is new here? Then a private CIFRE draft for 17 November, then a verified design module once the former tutor agrees.

## 2. Candidates

Facts checked today that shape every candidate:

- **PAGE allows one abstract per participant.** It requires concrete results and registration (with payment) before submitting. The Lewis Sheiner Student Session takes MSc work: 800–1,000 words in 2026, a €300 grant, blinded review. The 2026 student fee was €120 with a poster and needed a supervisor's letter; the deadline was 1 March. The 2027 guideline page is still empty. Open-source, non-commercial software is demonstrated free ([2026 meeting](https://www.page-meeting.org/2026-dubrovnik-croatia/), [2026 guidelines](https://www.page-meeting.org/2026-dubrovnik-croatia/abstract-submission-guidelines/), [Sheiner](https://www.page-meeting.org/about-us/the-lewis-sheiner-student-session/), [2027](https://www.page-meeting.org/2027-lyon-france/)). So the roadmap's "open NCA tools" abstract and an Apothicaire abstract compete for one slot.
- **Agent + MCP + NCA is already published.** PMxAgent (Bloomingdale and Khot, [CPT:PSP, Oct 2026](https://doi.org/10.1002/psp4.70325)) puts PKNCA behind an MCP server. It reports deterministic NCA, benchmarked against four frontier agents on 182 drugs. An Amgen tutorial teaches context engineering with verification criteria ([CPT:PSP, Aug 2026](https://doi.org/10.1002/psp4.70317)). PAGE 2026 had 30 posters under "Methodology – AI/Machine Learning", at least four of them on LLM agents ([category](https://www.page-meeting.org/2026-dubrovnik-croatia/abstracts/category/poster-methodology-ai-machine-learning/)). Still Officina's own: provenance checked on the final text, a pre-registered frozen set scored per exercise, a no-LLM control, one 12 GB card.
- **The audience values evaluation.** Sanofi R&D Montpellier pharmacometrics published PMX-CovEval, an open framework to evaluate covariate-selection methods ([PAGE 33 (2025) Abstr 11492](https://www.page-meeting.org/?abstract=11492)), and a cross-study benchmarking framework ([PAGE 34 (2026) Abstr 12182](https://www.page-meeting.org/?abstract=12182)). The first one's lead author is affiliated with both LIRMM and Sanofi Montpellier, and that author's review asks for an open benchmark ([Karlsen et al., CPT:PSP, 2025](https://doi.org/10.1002/psp4.13306)). In PubMed, Sanofi and IAME co-publish ([Riglet, AAPS J, 2020](https://doi.org/10.1208/s12248-019-0388-9), with Mentré and Bertrand), and some authors list both affiliations ([Pitoy, CPT:PSP, 2024](https://doi.org/10.1002/psp4.13206)). An IAME–Ipsen student presented FIM-based design in the 2026 Sheiner session ([Fayette, Brendel, Mentré](https://www.page-meeting.org/Abstracts/new-methods-based-on-the-fisher-information-matrix-for-evaluation-and-optimisation-of-designs-testing-relevance-of-covariates-in-pharmacometrics/)).
- **CIFRE** ([scheme](https://www.anrt.asso.fr/fr/le-dispositif-cifre-7844), [preparation](https://www.anrt.asso.fr/fr/preparer-sa-cifre-7845)). The company files, possibly before the Master's diploma, and ANRT answers within three months. An expert judges the project and the candidate's fit; "a few pages" suffice. The salary is at least €27,600 gross a year and the company gets €14,000 a year. The candidate may have spent at most 9 months hired or enrolled on the project.
- **Venues within six months:**
  - **JOSS** desk-rejects repositories public for under six months and checks commit distribution ([rules](https://joss.readthedocs.io/en/latest/submitting.html), [blog, 2026-01-05](https://blog.joss.theoj.org/2026/01/preparing-joss-for-a-generative-ai-future)). Caladrius started on 2026-10-08, and 192 of its 275 commits fall on 8–9 October.
  - **ACoP 2027** is in Colorado in October 2027 ([Rutgers, 2026-07-23](https://bme.rutgers.edu/bme-professor-appointed-conference-chair-2027-american-conference-pharmacometrics)); the 2026 window ran 9 February to 13 April ([ISoP](https://www.isop.org/blogs/isop/2026/02/05/acop-2026-abstract-submission-period-is-open)).
  - **CPT:PSP** charges up to €3,650 per article ([DOAJ](https://doaj.org/api/search/journals/issn%3A2163-8306)). **JPKPD** is not in DOAJ, so its subscription route is presumably free (the publisher's page did not load).
  - **arXiv** needs an endorser for a first submission ([policy](https://info.arxiv.org/help/endorsement.html)).

Scores, each 0–3: demo on 2026-11-17 / PhD and publication / users and community / compounding.

### C1. The paper: a pre-registered evaluation of a local PK assistant that quotes only the engine

- **Pitch.** Publish what the frozen-set machinery already measures: near-97 % per-turn accuracy hides exercise-level failures, a 0.8B decider with templates reaches the ceiling, and a frontier model's score swings on a two-sentence prompt.
- **Built.** In `officina/papers/2027-page/`: a manuscript of about 4,000 words for JPKPD, the Sheiner abstract, and `make_figures.py`, which regenerates every number from `bench/runs/*/analysis.json` and `bench/frozen/LEDGER.md`. After the demo, release the read demo tier (40 exercises, wordings, scorer, PKNCA gold) as a public benchmark; FROZEN_SET.md §2 makes it development data once read anyway. About a week of writing, plus the planned frozen runs.
- **Fit.** The method is the product: pre-registration, denominators, published failures.
- **Evidence.** The ledger ([LEDGER.md](https://github.com/abdou-rgd/apothicaire/blob/main/bench/frozen/LEDGER.md), 2026-10-21/22):
  - the 27B with gate v1 passes 14/25 exercises on all three seeds, with 583/600 turns correct;
  - the two hosted frontier models of `FRONTIER_ARM.md` pass 0/25;
  - one of them with a two-sentence scope instruction passes 21/25; the 27B with the same instruction passes 14/25 (McNemar p = 0.092);
  - the decider-only arm gets 600/600 turns ([analysis](https://github.com/abdou-rgd/apothicaire/blob/main/bench/runs/nolm-dev-2026-10-21/ANALYSIS.md)).
- **Prior art, and what is new.** PMxAgent checks a tool's NCA against a reference. This paper checks the answer text instead, on a pre-registered set scored per exercise (pass^k), with no-LLM and frontier arms under one harness.
- **Prototype (2 days).** Draft the Sheiner abstract and the script on the development figures, labelled in-sample.
  - **Measures.** (1) The share of the draft's numbers the script regenerates. (2) A blind novelty test: a model reviewer (METHOD.md §5) and one human (a classmate or the M2 supervisor) read this abstract and PMxAgent's, and write what the first adds.
  - **Success.** 100 % regenerated, and both readers name text-level provenance, pre-registered per-exercise scoring or the no-LLM control.
  - **Kill.** Both say "nothing new": lead with the decider-only result, or fall back to C4.
- **Scores.** 2 / 3 / 2 / 3. **Effort.** M.
- **Risks.** The frozen demo run must exist, and the case freeze still waits on `wordings.json` from Abdou and dsh. The PAGE tier wants an external wording author. No new paid API runs: the frontier arm has cost 43.43 USD so far. The PAGE fee is the one unavoidable cost. Overlaps the PAGE tier of FROZEN_SET.md, T-082 and T-091.

### C2. A CIFRE project draft for 17 November (private)

- **Pitch.** Arrive with a four-page thesis project the team can carry internally, instead of waiting for one.
- **Built.** `private/cifre/projet.md`: in French, git-ignored, never pushed, in ANRT's four parts. Plus one closing slide with two or three subjects and candidate labs backed by the evidence above: IAME for design, or LIRMM, with which Sanofi Montpellier already co-publishes. One day of writing, then iterations with the former tutor.
- **Fit.** Officina becomes the preliminary-results section. The positioning sentence becomes the research question: when can an AI system be trusted with model-informed decisions if it never computes a number?
- **Evidence.** ANRT pages and the Sanofi–IAME and Sanofi–LIRMM records above; FIM-design work is on the Sheiner list (Fayette 2026, Bazzoli 2010).
- **Prior art, and what is new.** Not applicable: the company must own the subject.
- **Prototype.** Send the draft to the former tutor before 17 November.
  - **Success.** The tutor agrees to discuss a subject and a lab.
  - **Kill.** No CIFRE headcount in 2027, or the subject is not theirs. Then reuse the draft for doctoral-school applications in spring 2027. I found no open DMPK/AI PhD call in two searches today.
- **Scores.** 2 / 3 / 0 / 3. **Effort.** S.
- **Risks.** Nothing confidential from the internship may go in. Keep it out of the repository. Do not present a subject as Sanofi's before they agree.

### C3. Verified design evaluation: `design.evaluate`, with PopED and PFIM as oracles

- **Pitch.** Take the verified engine into the team's own field, Fisher-information design. Check it against the two reference packages, and let the assistant answer "what if we drop the 12 h sample?" with engine numbers.
- **Built.** A crate `caladrius-design` with `design.evaluate`, then `design.optimize`: individual and first-order population FIM on the existing pk1/pk2 closed forms and analytic derivatives, additive, proportional and combined error, predicted RSE, D-criterion. R oracle scripts call [PopED 0.7.0](https://cran.r-project.org/package=PopED) (LGPL ≥ 3, Uppsala, 2024-10-07) and [PFIM 8.0.1](https://cran.r-project.org/package=PFIM) (GPL-3, Inserm, 2026-10-16) as external references, the way PKNCA is used today. Plus an MCP tool; about 3,000–5,000 lines with the oracle grid.
- **Fit.** Deterministic and verified, moving from DMPK's routine (NCA) to pharmacometrics' own ground. The browser build makes it a one-click demo.
- **Evidence.** Uppsala's Clinical Trial Design group develops FIM methods, PopED and MBAOD ([group page](https://www.uu.se/en/department/pharmacy/research/pharmacometrics/our-research)). PAGE 2026 had 15 study-design posters, PFIM 7.1 among them, plus a FIM oral in the Sheiner session.
- **Prior art, and what is new.** PopED, PFIM and NONMEM's $DESIGN already exist. New: a permissive single binary with a browser build, an assistant that can only quote the engine's RSE, and a published three-way concordance of PFIM, PopED and Caladrius (none found in today's searches; unverified).
- **Prototype (3 days).** pk1 first-order oral, 30 designs (2–6 samples, 1–3 groups), three error models.
  - **Success.** Caladrius matches PopED and PFIM on predicted RSE within 1e-6 relative, under a matching FIM type, and every PopED–PFIM gap above that is explained.
  - **Kill.** The two oracles disagree beyond 1e-3 with no explanation within 3 days, or the tutor raises an IP concern.
- **Scores.** 2 / 3 / 2 / 3. The demo score is 3 if the module is verified and cleared, and 0 if it reads as internship work. **Effort.** L.
- **Risks.** IP and perception: the internship was FIM-based design at Sanofi, so use only published methods, nothing from DE$IGN EXPLORER, and ask first. Scope: AGENTS.md line 19 puts population modelling out of scope, "not even to prepare", so Abdou must amend it first. The copyleft oracles stay outside the shipped code. CPU only.

### C4. The independent comparison of open NCA tools (the roadmap's PAGE abstract)

- **Pitch.** Run every open NCA tool on the same public and synthetic profiles, and publish where and why they differ.
- **Built.** A regenerable harness for [PKNCA 0.12.1](https://cran.r-project.org/package=PKNCA) (AGPL-3), [NonCompart 0.8.4](https://cran.r-project.org/package=NonCompart) (GPL-3, 2026-09-21), [ncappc 1.0.0](https://cran.r-project.org/package=ncappc), [qpNCA 1.1.6](https://cran.r-project.org/package=qpNCA) (both GPL-3), [aNCA 0.1.0](https://cran.r-project.org/package=aNCA) (Apache-2.0, built on PKNCA) and Caladrius. Output: a divergence table with root causes. Size M.
- **Fit.** Pure verification.
- **Evidence.** PAGE accepts tool-validation posters: a vendor validation of PKanalix against the reference commercial software agreed to 1e-8 ([PAGE 30 (2022) Abstr 10121](https://www.page-meeting.org/?abstract=10121)). IQnca was presented in 2021 ([Abstr 9660](https://www.page-meeting.org/?abstract=9660)).
- **Prior art, and what is new.** Vendor self-validations and single-package posters exist. I found no independent multi-tool comparison.
- **Prototype (2 days).** PKNCA, NonCompart and ncappc on Theoph and Indometh, with two AUC methods.
  - **Success.** At least three convention differences documented with their cause.
  - **Kill.** Mapping a tool takes more than a day, or everything agrees to 1e-8.
- **Scores.** 1 / 2 / 3 / 2. **Effort.** M.
- **Risks.** The copyleft tools stay external references; show the maintainers the results first. If C1 takes the single PAGE abstract, this becomes a JPKPD short communication or a colleague's poster (co-authoring is allowed).

### C5. The demo kit (precondition)

- **Pitch.** Make 17 November unbreakable.
- **Built.** T-089 (the reference-software answer), T-090 (the scope slide) and T-091 (in-sample labels), all todo; the case freeze and frozen runs of FROZEN_SET.md; a 3-minute recorded fallback; a one-page French leave-behind; a Q&A sheet that includes "How is this different from PMxAgent?".
- **Fit, evidence, prior art.** The cards, the red-team triage behind them, and the audience's benchmarking record above; nothing new to claim.
- **Prototype (2 days).** A timed rehearsal in front of one person, plus ten hostile questions from a model reviewer.
  - **Success.** Every figure is labelled in-sample or out-of-sample, and every question is answered within a minute, with a file to point to.
  - **Kill.** None. If the frozen run is not done by 10 November, show development figures labelled in-sample.
- **Scores.** 3 / 1 / 1 / 1. **Effort.** S.
- **Risks.** The frozen result may be poor. Pre-registration means showing it anyway.

### C6. A local comparison kit against a company's own reference

- **Pitch.** Answer "does it reproduce our software?" with a command the team runs on its own exports, behind its own firewall. Officina itself never publishes a comparison.
- **Built.** A CLI command that reads any NCA results table plus a name-mapping file, reruns Caladrius with the same data and options, and writes a local concordance report. It builds on the private-oracle loader of T-019 (`canonical_name`). Size S–M.
- **Fit.** Verification handed to the user. **Evidence.** T-089 and T-019; the 1e-8 bar of Abstr 10121 is what a company expects.
- **Prior art, and what is new.** Vendors validate their own tools; I did not search for third-party local kits.
- **Prototype (2 days).** Feed Caladrius's own PKNCA tables in as the "foreign" reference. Success: 3,744/3,744 values agree with the 16 D-01 values flagged, and every planted perturbation is caught with no false alarm. Kill: the mapping cannot stay generic without naming a vendor, which the lint forbids.
- **Scores.** 2 / 0 / 2 / 1. **Effort.** S.
- **Risks.** AGENTS.md naming rules only.

### C7. Two explainer videos (3 and 10 minutes, French with English subtitles)

- **Pitch.** A link a potential supervisor actually clicks.
- **Built.** Screencasts of officina-dmpk.com/app/ and of the assistant on the PC, plus one animated number-gate scene from Onizuka's video plan (T-105).
- **Fit.** The positioning sentence in action, with no new claim. **Evidence; prior art.** None opened; not searched.
- **Prototype (1 day).** Three people outside the field watch the short cut. Success: all three can restate "the model never computes a number". Kill: an M2 teacher finds a technical error that editing cannot fix.
- **Scores.** 1 / 1 / 2 / 1. **Effort.** S. **Risks.** Time only.

### C8. A regenerable validation dossier for Caladrius

- **Pitch.** The roadmap's validation kit as one auditable document: versions, tests, conformance, tolerances, documented differences, traceability.
- **Built.** A CI job that renders `docs/validation.md` and a requirement-to-test matrix into a dated PDF for each release. Overlaps T-081, T-085 and T-086, all todo.
- **Fit.** Reproducibility made legible to quality-assurance readers. **Evidence.** The umbrella README roadmap. **Prior art.** Not searched.
- **Prototype (2 days).** Give a reviewer agent only the dossier. Success: it reproduces 3 of 3 random conformance values, and two CI runs give byte-identical dossiers. Kill: the output is not deterministic.
- **Scores.** 1 / 1 / 2 / 2. **Effort.** M. **Risks.** No regulatory claim may creep into the wording.

## 3. Top 3, ranked

C5 is not ranked: it is the floor, and it is mostly existing cards. Finish it by 10 November.

1. **C1, the paper.** Joint-best total (10, with C3) at medium rather than large effort, and robust.
   - Whatever the frozen run says, a pre-registered result is publishable, and the Sheiner committee reviews blind.
   - It is the honest reply to PMxAgent: stop competing as "an agent with an MCP NCA tool" and become the study that shows how to test one, a framing that suits a team that builds evaluation frameworks itself.
   - Timeline: a draft before 17 November, so the talk previews it; a preprint in January, once an arXiv endorser is found (an M2 teacher who posts there); the Sheiner abstract by about 1 March; JPKPD in March.
   - The cost: the NCA comparison waits.
2. **C2, the CIFRE draft.** It is small and decisive.
   - The answer comes in early 2027, and an ANRT file needs a short project the company signs.
   - A draft that maps Officina onto what the Montpellier team already works on (evaluating AI methods, design) gives the tutor something to carry.
   - Everything hinges on one conversation, which is why it ranks below C1.
3. **C3, verified design evaluation.** It is the strongest PhD seed and the closest match to the team, IAME and Uppsala.
   - But it is large, outside the current scope rule, and open to an IP misreading of the internship.
   - Ask at the demo. If the answer is yes, run the 3-day prototype in December as the CIFRE's preliminary result.
   - Keep it off the stage unless it is verified.

## 4. Rejected, and why

- **JOSS now.** Below six months of public history and with commits concentrated in two days, it is an automatic desk rejection. Revisit late in 2027, once Caladrius has outside users.
- **ACoP 2027.** October 2027 in the US: acceptance would fall outside the six months, and travel is unaffordable.
- **CPT:PSP as the first journal.** Up to €3,650 an article. Use it later, if a Sanofi co-author pays.
- **SNEE (committee 2027-01-07).** It requires the ambition to create or take over an activity ([Pépite France](https://www.pepite-france.fr/)). Officina has no revenue model by design, and a CIFRE makes Abdou a Sanofi employee. It would take days for nothing the PhD needs.
- **A popPK estimation engine.** Years of work against mature tools, and outside the scope rule.
- **A covariate-selection benchmark.** The Montpellier team already has PMX-CovEval: offer to run it, do not rebuild it.
- **More gate v2, UI polish, Apothicaire in Rust, swapping models.** v1 is the demo gate; none changes what a committee or the team reads.
- **More frontier API runs.** They cost money and would re-answer a question already settled on the development set.

## Assumptions and method

- PAGE 2027 keeps the 2026 rules (mid-January to about 1 March, one abstract, registration first, student rate with a supervisor's letter).
- Abdou will still be a full-time MSc student on 9–11 June 2027.
- The demo audience is the Sanofi R&D Montpellier modelling team. The affiliations above suggest it; they do not confirm it.
- The frozen demo run finishes by about 10 November.
- There will be no further paid API calls.
- Unreachable today: the IAME website (connection reset) and the Wiley, Springer and bioRxiv pages (bot challenges). Statements on Sanofi–IAME links rest on PubMed affiliations.
- "Found none" means two or three searches, not a systematic review.
