# Independent review of Officina (2026-10-08)

Reviewer: Claude (Fable 5.1), read-only; brief, READMEs, contract, board, conformance, specs, oracle, agent demo, OptChat notes and bench, `lambda_z.rs`, MCP server. Nothing under `private/`.

## Ranked insights

1. **"100% conformance" means 100% of PKNCA and of self-made references, not of the reference software.** `docs/conformance.md` compares NCA to PKNCA 0.12.1 (1e-6), models to closed forms (1e-12), fits to `nls`/`nlsLM` plus a custom fixed-point root finder (D-02: the oracle was regenerated after the engine disagreed; right, but it looks circular). The only reference-software comparison is one NCA exercise, counts only (T-019). Fit oracles cover only `pk1.iv_bolus` and `pk1.oral_1`; infusion, zero-order and lag models have none. `specs/fit.md` has 28 `assumed` rules versus 20 confirmed; Q-009 unanswered. State this in the README, add the four missing fit oracles, answer Q-009. 1-2 days.

2. **Benchmark before the Pi Durable port and before UI polish.** The agent conclusions rest on one exercise, four turns, two runs, with a number checker the authors call a first pass; the "27B + decision model" decision is taken on that sample. Twenty to thirty exercises simulated by Caladrius (free ground truth) turn anecdotes into numbers. 3-5 days.

3. **The TypeScript port is premature.** `comparatif.md` says Pi Durable 1.0.4 is experimental with a moving API and costs 2-4 days; the Python v0 (245 + 616 lines) works. The real problems (units, tool-output digests, model arithmetic) are host-independent. Keep Python until the benchmark says otherwise. Saves 3-4 days.

4. **Replace the LLM judge by a deterministic gate first.** "Does the answer contain a number absent from the tool result?" is set membership; `run_exo1.py` already does it. Ship it as a runtime gate; keep the fine-tuned decision model for routing and plot questions, after the benchmark. Reviewers trust a deterministic check more than a 600M classifier trained on simulated data. 1 day.

5. **The roadmaps disagree.** `README.md`: engine → agent → benchmark → UI; the brief: UI → wasm → agent → benchmark. For a PhD portfolio the weighty artefacts are a tagged v0.1 with conformance table, a validation report and benchmark numbers, not a wasm demo. Finish T-027 minimally (save/load), tag v0.1, then items 2 and 4; wasm when the website exists. 2 days.

6. **DMPK positioning gap.** This is individual PK analysis; an academic will ask where metabolism or clearance prediction is, and an industrial scientist will try a two-compartment IV dataset first. NLME is rightly excluded, but say so as a position ("verified individual PK, teaching, agent-safe calculation") and pull two-compartment closed forms ahead of UI polish. 3-5 days with oracle.

7. **Clean room is credible and well recorded**, but Q-004 (GPL data, AGPL output), Q-005, Q-006 and Q-007 are `pending` and the reader disclosed incidental exposure to documentation summaries. Close them in writing before any release. 0.5 day of the human.

8. **The OptChat 8/8 recall is weak evidence.** Facts are isolated and trivial (cat's name, SSH port), no updates or contradictions, seven of eight answers needed zero zooms: they simply fit in a 2.9k-token digest. Add updates, 200+ turns, tool-heavy turns. 1 day.

9. **Code quality is a strength.** Deny-lints enforced, no `unwrap` outside tests in nca/fit/mcp, bounded MCP reads and batches, 535 `#[test]` annotations, spec ids cited in code. 0 days.

10. **Missing for outsiders:** free GitHub Actions CI (allowed by the budget rule), `CITATION.cff`, a crates.io release, a validation report naming versions, a short JOSS-style paper. "80 commits in one day" by agents will raise eyebrows; `AGENTS.md` makes the process honest, so frame it as part of the thesis. CI 0.5 day, report 1-2 days, paper 3-5 days.

## Verdict

The idea is sound and the engine is genuinely good: a verified, command-driven, agent-callable PK engine with a documented clean room is a credible portfolio piece and a usable teaching tool. The weakness is in the claims and the order, not the code: "100% conformance" oversells what was compared, the agent and memory layers rest on n=1 evidence, and the roadmap spends weeks on UI, wasm and a TypeScript port before producing what a committee or PK scientist would weigh: a benchmark with numbers and a validation report. Reorder to release → benchmark → deterministic gate → two compartments, keep Python, answer the pending questions. The student-entrepreneur case is thin (MIT engine, local-only, nothing to sell); apply because it is cheap, but do not let it steer the roadmap.
