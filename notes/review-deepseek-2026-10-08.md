# DeepSeek 4.1 Flash (max effort) review of Officina, 2026-10-08

Pasted by Abdou from DeepSeek, which read the brief and the repository. Kept verbatim for the record; the orchestrator's synthesis is in the session notes.

(Condensed by the orchestrator from the pasted text; the ranking and the costs are DeepSeek's.)

Verdict: Caladrius is a real instrument (35.6k lines of Rust, 524 tests, deny lints, 9970 conformance values, MCP surface). Everything the project would be judged on sits one layer up and rests on n=1: the agent's safety claim is contradicted by its own run 2 (6 hallucinated numbers vs 1 in run 1), no benchmark, the UI is the largest body of code (11.8k lines) while nothing is tagged or released. Freeze the UI, tag v0.1, build the benchmark with a deterministic number gate, move two compartments ahead of polish.

1. Clean-room questions still pending (Q-004 GPL/AGPL data; reader found the vendor documentation terms forbid automated reading; three search summaries incidentally quoted it). Reframe the public claim as "validated against PKNCA 0.12.1 and closed forms"; keep the reference-software comparison private. 0.5 day + email latency. [Orchestrator note: DeepSeek also listed Q-002 as pending; it is answered "yes, comparing is allowed; publication of numbers needs explicit approval".]
2. The unit hallucination is not fixed: the Python digest in apothicaire.py is the safety-critical component and has no test. Golden-file tests on frozen nca_run payloads + a deterministic output gate (allowed-number set from tool results, inputs and a closed unit table). 1 day.
3. The repo already answers the order question: UI 11.8k lines vs agent ~900 lines of Python, no tag, no release, no .github, no CITATION.cff, two roadmaps disagree. Minimal T-027, tag v0.1.0, README "what is verified / what is not", no more UI until the benchmark exists. 1.5 days.
4. "9970 values, 100%" is shaped to impress: fit oracles cover only pk1.iv_bolus and pk1.oral_1 (15 cases = 3 datasets x 5 weightings); 1e-4 fit tolerance reads as "tuned until it passed" (D-02 regenerated oracle). Replace with a per-model coverage table, add infusion, zero-order, Tlag and one multiple-dose oracle, justify 1e-4 in a paragraph with one hand-checked case at 1e-6. 2-3 days.
5. Reading run 2 (6 errors) as a success is the most dangerous habit: report the hallucination count with denominator as the primary metric from now on. 0.5 day.
6. The benchmark is the artifact that turns the project into a thesis: 25 frozen exercises simulated by Caladrius, 6-8 turn script, the gate as metric, JSON report per model; fine-tuning stays after it. 3-5 days.
7. specs/ux.md has 1 confirmed rule and 28 assumed; fit.md 21/28; Q-009 unanswered. Either demote the UI to "demonstration interface" in the README (free) or clear the assumed queue (2 days).
8. DMPK positioning is narrower than the ambition: individual PK only, no metabolism, no PBPK. One position page; two compartments (engine + oracle, no UI) right after the benchmark. 0.5 + 3-5 days.
9. Un-runnable in one command and un-citable: CI (cargo test --workspace + xtask conformance + layers), CITATION.cff, tag, validation report naming PKNCA/R versions, preprint after the benchmark. 0.5 / 0.5 / 1-2 / 3-5 days.
10. Keep Python; refuse the small decision model until the benchmark names a failure mode set membership cannot catch. 0 days.

Smaller: pin the exact llama.cpp build and quantisation in ATTRIBUTION.md; fix "quantitys" in docs/conformance.md (naive pluraliser in xtask/src/conformance.rs:504).

Cheapest change tomorrow: make board and roadmaps agree with git log, tag v0.1.0, put the hallucination count at the top of the agent README, then spend the week on the benchmark.
