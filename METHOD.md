# How Officina is run

Officina is written by AI coding agents. The human, Abdou, answers questions, reviews and decides what is published. That makes the process part of the evidence: a reader who doubts a number should be able to see who produced it, who tried to break it, and what was left unverified. This page describes the process as it actually runs; where a file in one of the repositories is the source of truth, it is linked rather than copied.

Contents: [1. The contract](#1-the-contract) · [2. The board](#2-the-board) · [3. Roles](#3-roles) · [4. Cards and iterations](#4-cards-and-iterations) · [5. Independent review](#5-independent-review) · [6. The audit of 14 October](#6-the-audit-of-14-october) · [7. Push and publication rules](#7-push-and-publication-rules) · [8. Limits of the method](#8-limits-of-the-method)

## 1. The contract

[`AGENTS.md`](https://github.com/abdou-rgd/caladrius/blob/main/AGENTS.md) in the Caladrius repository is read by every agent before it does anything, and wins over any instruction that conflicts with it. It fixes:

- **The motto**, "we should be more ambitious", with its limit: ambitious in what we build and test, never in what we claim. Every report ends with one bolder next step, which the human decides on; "no speculative work" still holds.
- **Scope**, with an explicit out-of-scope list (population modelling, bioequivalence, IVIVC): "do not start them, not even to prepare".
- **Golden rules.** Clean room (reproduce behaviour, never code); tests are the gate and conformance floors only go up; engine first, everything is a command with a stable id reachable from the UI, the CLI and the MCP server; nothing baked into the core; never crash (no `unwrap`, `panic!` or input-derived indexing outside tests, enforced by deny lints); thin data-driven UI; wasm never broken.
- **What the human does**, as a closed list (section 2). Everything else is the agents' job, and a question for the human goes in a file, together with the decision taken meanwhile, so that work never blocks.
- **Oracle and tolerances** (section 5). Expected values come from independent sources (PKNCA in R, R `nls`, closed forms in 256-bit arithmetic, a second naive implementation). Tolerances are defined once and never loosened inside a test. A gap beyond tolerance is a documented method difference, not a reason to widen it.
- **Budget rules** (section 10): always resumable after each task, small tasks, no loops (three failed attempts and the card becomes `blocked`), no speculative work, no paid service.

The contract is itself under test: `cargo xtask lint` and `cargo xtask review` run in CI and check, among other things, forbidden names, leaks of the private folder, lint headers, tolerances defined once, board hygiene, the sections of each iteration card, and the agent files (at most 200 lines each, with the model and effort that the contract tabulates). Their first runs found real inconsistencies in the board, which were corrected.

## 2. The board

The board lives in [`board/`](https://github.com/abdou-rgd/caladrius/tree/main/board) of the Caladrius repository and is versioned, so it doubles as the project's memory from one session to the next:

| file | who writes it | what it holds |
|---|---|---|
| [`INDEX.md`](https://github.com/abdou-rgd/caladrius/blob/main/board/INDEX.md) | the orchestrator only | one line per task: id, title, role, state, dependencies |
| [`tasks/T-nnn.md`](https://github.com/abdou-rgd/caladrius/tree/main/board/tasks) | the assignee, plus the orchestrator | one card per task |
| [`LOG.md`](https://github.com/abdou-rgd/caladrius/blob/main/board/LOG.md) | append-only | one entry per finished task |
| [`QUESTIONS.md`](https://github.com/abdou-rgd/caladrius/blob/main/board/QUESTIONS.md) | agents and human | questions for the human, the decision taken meanwhile, the answer |
| [`RESUME.md`](https://github.com/abdou-rgd/caladrius/blob/main/board/RESUME.md) | the orchestrator | how a fresh session restarts |
| `messages/` | one file per message | agent-to-agent notes; agents do not talk to each other directly, the orchestrator relays |

One file per task and per message is what stops two agents from editing the same file. A session can be cut at any moment (the subscription quota stops it without warning); the next one restarts from the board, not from conversation memory.

## 3. Roles

Roles are defined in [`.claude/agents/`](https://github.com/abdou-rgd/caladrius/tree/main/.claude/agents), one short file each (at most 200 lines, in the same five parts: who the agent is, what the motto means for it, what it does, how, and its report), with the model and the reasoning effort in the front matter. Section 8 of `AGENTS.md` tabulates them with the reason for each choice. The point of the split is separation of duties, and the models follow two ideas: the reviewer is a stronger model than the authors it checks, and the most expensive model reads the least.

- **orchestrator** (Opus, maximum effort): plans the iteration, writes cards, delegates, integrates, keeps the board and re-runs the verification itself, because a subagent's report is a claim, not a proof. It does not write code and does not read large files. It holds the longest context, which is why it does not run on the most expensive model.
- **engine** (Opus, high effort): everything that produces a number (`caladrius-nca`, `-models`, `-fit`).
- **oracle** (Sonnet, high): the ground truth, the R scripts and the tests that must fail first. *Whoever writes an oracle test does not write the code under test*, and the oracle never edits the engine to make a test pass. It is also a different model from the engine it checks.
- **reader** (Sonnet, high): the only agent allowed to read the public documentation of the reference software, which is not named in the code or docs. It writes behaviour specifications in its own words and formulas, each rule tagged `confirmed by oracle`, `documented, untested` or `assumed`. Implementers read only `specs/` and the oracle. This is the clean room.
- **interface** (Sonnet, high): workspace and developer tooling, project model, command registry, UI, CLI, MCP server; never numerical code.
- **reviewer** (Fable, high): reviews a diff it did not see being written and hunts panic paths, loosened tolerances, tests that cannot fail, machine-dependent numbers, clean-room violations and claims beyond the evidence. It does not modify the reviewed code. Every change to the three numerical crates goes through it before a card is marked done, and it audits the whole diff of each iteration. It reasons hardest and wrote none of the code; to keep within the budget it gets a diff and its card, never a whole crate, and one Fable agent runs at a time.
- **janitor** (Haiku, low): formatting, renames, board housekeeping; takes no decision.
- **onizuka** (Opus, high): the human's teacher. It explains any part of Officina in French from the real code, citing `file:line` and the status of each statement, and writes the learning page of each iteration. It never edits a repository.
- **contributor-dsh**: a second, independent coding agent (DeepSeek, run headless through its own harness) that takes cards on the same terms as anyone else. Its first cards ([T-043](https://github.com/abdou-rgd/caladrius/blob/main/board/tasks/T-043.md), T-045, T-048: release workflow, validation document, checksum line endings) were delivered on a branch, not pushed, and merged only after the orchestrator read the diff.

Parallel work follows three rules: at most two agents at a time, never two on the same crate or file, and a new module per feature instead of growing a shared file.

## 4. Cards and iterations

A card states a **goal**, the **allowed files** (nothing else may change), a **verifiable completion criterion** (a command and its expected result), dependencies, a state (`todo`, `in progress`, `to review`, `done`, `blocked`) and a dated thread of notes. A subagent gets exactly one card and returns a report of at most ten lines: what was done, the numbers, what is still open, and one bolder next step.

Finishing a card means the tree builds, tests are green, `cargo clippy -D warnings` and `cargo xtask layers` pass, `cargo xtask conformance` is regenerated if a number changed (never edited by hand), the card is updated, `LOG.md` has an entry, and the commit message starts with the task id. Review findings are fixed or recorded on the card before it closes.

From the end of October 2026, work is planned in **iterations**, one per session. An iteration is itself a card on the board, so there is no second planning file. Its brief is written before any work: goal, deliverables, the published figures it may change, done criteria, and a plan by waves of cards. The independent cards of a wave run in parallel; the orchestrator integrates them and runs the full verification itself; the reviewer audits the whole diff. The outcome goes into the same card, with denominators, lessons and a bolder next step that the human decides on. Onizuka then writes a learning page in French for the human, linked from the card. `cargo xtask lint` checks that the brief and the outcome are there.

## 5. Independent review

An author, human or machine, is a poor judge of its own claims, so outside models are asked to attack the work. Their texts are kept verbatim in [`notes/`](notes/):

- **Claude (Fable 5.1), read-only, 8 October** ([review](notes/review-fable-2026-10-08.md)): "100% conformance" meant 100% of PKNCA and of self-made references, not of the reference software; the agent's claims rested on one exercise; replace an LLM judge by a deterministic gate; reorder the roadmap.
- **DeepSeek, 8 October** ([review](notes/review-deepseek-2026-10-08.md)): same direction from a different model: report hallucination counts with their denominator, add a per-model coverage table, tag a release before more UI.
- **GPT Astra 6.1, 9 October** ([brief](notes/review-brief-2026-10-09-astra.md), [review](notes/review-astra-2026-10-09.md)): asked from a brief only, and says so; it asked for controls under an identical harness, a frozen test set and a fixed scoring rubric.
- **DeepSeek as devil's advocate, 9 to 10 October** (findings summarised in [the session note](notes/session-2026-10-10.md)). It is briefed to refute, never to assist: write at least 50 hard requests blind, without reading the generator, with its own gold labels, then reproduce the published figures and try to break them. It reproduced the dataset byte for byte and the gold ceiling exactly, and it refuted the headline figure: 99.9 % on held-out requests was wording memorisation (every held-out request was a verbatim training sentence); on its 74 blind requests the first model got 4 right. The honest numbers replaced the flattering ones, and the 74 requests became the frozen test set.

Rules for review: the reviewer gets the claims **with their denominators**; the brief asks what is convincing, what is weak, what to test next and where the authors are fooling themselves; findings are ranked with a rough cost; and they change the plan. The reviews of 8 and 9 October reordered the roadmap (tag v0.1.0, then a deterministic number gate, then a benchmark, then two compartments, and only then UI polish).

## 6. The audit of 14 October

On 14 October 2026 an independent audit (Claude Fable 5.1, 207 sources, repositories read at Caladrius `ff53386` and Apothicaire `33f9bfd`) checked the work from outside. In short:

**What held.** 2,559 tests re-run; conformance 48,955 of 48,955 regenerated identically; NCA recomputed independently to 1e-15. The engine is the asset.

**Three discrepancies between prose and code**, all documentation, all since corrected and merged ([caladrius#4](https://github.com/abdou-rgd/caladrius/pull/4), [apothicaire#1](https://github.com/abdou-rgd/apothicaire/pull/1)): `docs/validation.md` was stale (32,036 against 48,955 values); the README sentence "indexing is forbidden by the linter" was false (40 `indexing_slicing` sites outside tests, none in the numerical crates); Apothicaire's "147 tests" were in fact 356, of which only 81 run without OptChat.

**The commercial thesis did not hold; the technical promise did.** No agency "accepts" software. What regulators ask for (ICH M15, FDA population PK guidance) is a valid, reliable, reproducible and traceable computerised system, and reproducibility by the agency. So the positioning sentence became: *an open, deterministic and verified PK engine, with a local assistant that never computes a number.* Banned wording: "accepted by agencies", "state-of-the-art AI", "clean-room" as a selling point. A Rust PK engine behind an MCP server is no longer novel by itself; what remains distinctive is the permissive licence on NCA and fitting, a published and regenerable validation record, a single binary, and the number gate.

**Apothicaire is an honest experiment, not a product.** "0 of 926 unverified numbers" is in-sample; at exercise level the 95 % upper bound is 11 %; 22 of 74 blind requests were out of distribution. The gate lets through the right number for the wrong parameter, a changed unit, a flipped sign, numbers written in words, small integers and two-digit coincidences. The structural answer is **gate v2, typed rendering**: the model emits a reference such as `{{call_3.aucinf.obs}}` and a deterministic renderer prints, from the MCP server's `structuredContent` validated against its `outputSchema`, the engine's value with its sign, its unit and the name of the quantity (`123.457 h*ng/mL [AUCinf,obs]`). Only quantities of closed tables can be cited, never a raw JSON path or a model-written label. The digits, sign, unit and name printed for a cited quantity are therefore the engine's; the words the model writes around them (a unit elsewhere in the sentence, a sign or a number in words) are checked by closed pattern rules, not proven, and a wrong selection is visible to the reader but not rejected. Selection error is what the frozen set measures.

**Fragile dependencies:** the llama.cpp fork of a single vendor (largely resolved by the upstream `Q2_0` format), OptChat unpublished and unlicensed (published since, MIT OR Apache-2.0), and a decision-model licence with a revenue threshold (kept as a zero-shot baseline only).

**Consequences for the order of work:** documentation fixes first, OptChat published, a frozen pre-registered out-of-sample set, gate v2, the upstream-llama.cpp run judged on that set, then a Caladrius validation kit (reference sets, tolerances, regenerable report, traceability to ICH M15 and M13A, a script that regenerates every README figure and a CI check against drift). The audit also found that no independent comparison of the open NCA tools has been published, which is the natural subject of a first abstract.

## 7. Push and publication rules

- Agents do **not** push, change a repository's visibility, delete files outside the repository, install software outside package managers or touch `private/` (other than reading it) without written agreement in `board/QUESTIONS.md`. Section 11 of `AGENTS.md` is explicit.
- The human decides every publication: pushing, making a repository public, and any numeric comparison with the reference software.
- Work from a second contributor arrives on its own branch and is merged after the orchestrator has read the diff. Documentation fixes from the audit were opened as **draft** pull requests and merged after the human took them out of draft.
- Nothing from `private/` (coursework data, exports and screenshots of the reference software) may appear in a versioned file, a commit message or the board. When coursework numbers were found in early test fixtures of Apothicaire, the fixtures were replaced by synthetic values and the history was rewritten before the repository went public; run transcripts are git-ignored. The same rule governs this repository: raw agent transcripts, third-party PDFs and anything touching personal or coursework data are kept out.
- Claims carry their denominator and their scope. Officina makes no regulatory claim: what it offers is reproducibility and a published validation record.

## 8. Limits of the method

- One human, one machine: the review is independent of the authors' models, not of the author's judgement about what to ask.
- Reviewers see a brief, not always the code. The GPT review says it did not reproduce anything; the DeepSeek review did, which is why it carried more weight.
- Oracles are independent calculations, not a regulator's reference. "Conformance" means an engine value equals an independent value within a stated tolerance on a stated case, and each repository says what is not covered.
- Benchmarks of Apothicaire are development results until the frozen out-of-sample set has been run.
- Agent-written code at this speed (about 80 commits on the first day) is only credible because the contract, the board, the gates and the reviews are public and checkable. Where this page and a repository disagree, the repository is right and this page has a bug.
