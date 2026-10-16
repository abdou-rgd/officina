# Officina

Officina (Latin: the apothecary's workshop) is the umbrella for a local, verifiable DMPK toolchain built by Abdou as a portfolio project toward a PhD in DMPK/AI. Everything runs on one consumer PC (RTX 3060, 12 GB); nothing leaves the machine.

**In one sentence:** an open, deterministic and verified pharmacokinetic engine, with a local assistant that never computes a number itself. It is a research prototype: no agency accepts or endorses software, and Officina claims no regulatory status; what it offers is reproducibility (every number re-derivable from a pinned version) and a published validation record.

| component | role | repository | status |
|---|---|---|---|
| **Caladrius** | the instrument: open-source pharmacokinetic analysis in Rust (NCA, compartmental models, weighted fitting, plots), driven by stable commands from a desktop UI, a CLI and an MCP server | [`abdou-rgd/caladrius`](https://github.com/abdou-rgd/caladrius) (contract in [`AGENTS.md`](https://github.com/abdou-rgd/caladrius/blob/main/AGENTS.md)) | v0.2.0 released 2026-10-09 with Linux and Windows binaries: two compartments end to end, exact fit defaults with a reference preset, analysis.compare, validation report; multiple dosing and steady state in oracle and engine; conformance 48,955/48,955; CI with xtask lint and review |
| **Apothicaire** | the artisan: a local DMPK agent (own Python harness, OptChat memory, Bonsai 2 27B on llama.cpp) that plans, explains and calls Caladrius for every number | [`abdou-rgd/apothicaire`](https://github.com/abdou-rgd/apothicaire) (MIT OR Apache-2.0) | v0 Python: deterministic number gate, golden digest tests, 25-exercise benchmark with a deterministic gate and an oracle check (with analysis_compare exposed: 0/926 unverified numbers in first drafts, 170/175 turns correct by the oracle, 160/160 valid tool calls; before: 76/932, 168/175); stays in Python |
| OptChat prototype | the memory: endless chat remembered through a tree of summary lines, benchmarked 8/8 recall on the local model (after Victor Taelin's OptChat idea) | [`abdou-rgd/optchat`](https://github.com/abdou-rgd/optchat) (MIT OR Apache-2.0) | validated, imported unchanged by Apothicaire |

The three repositories live under the GitHub account `abdou-rgd` since 2026-10-16 (the organisation `officina-dmpk` is kept reserved and redirects). Name check on 2026-10-08: `officina` is free on crates.io, PyPI and npm. This is a name availability check, not a trademark search: the audit of 2026-10-14 found live US trademarks on "Caladrius" in pharma and software, so a trademark search (EUIPO, INPI, WIPO) is due before any wider communication; `caladrius` stays the crate name.

Roadmap, reordered on 2026-10-16 after an external audit (the audit itself is summarised in [METHOD.md](METHOD.md#6-the-audit-of-14-october)): merge the audit's documentation fixes (done) → publish OptChat (done) → frozen, pre-registered out-of-sample test set for Apothicaire → number gate v2 (typed rendering from the MCP `structuredContent`, so unsourced numbers and wrong units become impossible by construction) → run on upstream `llama.cpp` with the `Q2_0` packing (no vendor fork), 27B then 9B, judged on the frozen set → Caladrius validation kit (reference sets, tolerances, regenerable execution report, traceability to ICH M15/M13A, a script that regenerates every README figure and a CI check against drift) → an abstract for PAGE 2027 on the independent comparison of open NCA tools. First public demonstration: 17 November 2026.

Previous roadmap (reordered on 2026-10-09 after two independent reviews, `notes/review-*.md`): Caladrius steps 1-5 done (engine, CLI, MCP, UI) → v0.1.0 release with CI, CITATION.cff and an honest validation section (coverage per model, tolerance note, missing fit oracles) → deterministic number gate and digest tests in Apothicaire, hallucination rate reported with its denominator → DMPK benchmark of ~25 exercises simulated by Caladrius → two-compartment models with oracle → only then UI polish, wasm demo, decision models (routing and plot questions), Pi Durable if the benchmark justifies it. Apothicaire stays in Python until then.

## Repositories

- [abdou-rgd/caladrius](https://github.com/abdou-rgd/caladrius): the engine (Rust), with the agent contract `AGENTS.md`, the shared `board/`, the role definitions in `.claude/agents/`, the oracle and the generated conformance and validation documents.
- [abdou-rgd/apothicaire](https://github.com/abdou-rgd/apothicaire): the local assistant (Python), its number gate, benchmark and decision-harness spike.
- [abdou-rgd/optchat](https://github.com/abdou-rgd/optchat): the assistant's memory.
- This repository, [abdou-rgd/officina](https://github.com/abdou-rgd/officina): the map above, the method, and the notes (independent reviews, session notes, a bibliography) in [`notes/`](notes/). It contains no code of the three components. Locally the four live side by side in one folder; only the three components are repositories of their own.

## How it is run

The code is written by AI coding agents under a written contract, a shared board of small task cards, separate roles for whoever writes a number, whoever tests it and whoever reviews it, and independent reviews by other models; the human answers questions and decides what is published. [METHOD.md](METHOD.md) describes this, including what an outside audit of 14 October found.

## License

MIT OR Apache-2.0, at your option ([LICENSE-MIT](LICENSE-MIT), [LICENSE-APACHE](LICENSE-APACHE)), for the text in this repository. Each component carries its own license in its own repository.
