# Officina

Officina (Latin: the apothecary's workshop) is the umbrella for a local, verifiable DMPK toolchain built by Abdou as a portfolio project toward a PhD in DMPK/AI. Everything runs on one consumer PC (RTX 3060, 12 GB); at run time the assistant sends nothing off the machine.

**In one sentence:** an open, deterministic and verified pharmacokinetic engine, with a local assistant that never computes a number itself. It is a research prototype: no agency accepts or endorses software, and Officina claims no regulatory status; what it offers is reproducibility (every number re-derivable from a pinned version) and a published validation record.

| component | role | repository |
|---|---|---|
| **Caladrius** | the instrument: open-source pharmacokinetic analysis in Rust (NCA, one- and two-compartment models, weighted fitting, plots), driven by stable commands from a desktop UI, the same UI in the browser ([officina-dmpk.com/app/](https://officina-dmpk.com/app/)), a CLI and an MCP server | [`abdou-rgd/caladrius`](https://github.com/abdou-rgd/caladrius) (contract in [`AGENTS.md`](https://github.com/abdou-rgd/caladrius/blob/main/AGENTS.md)) |
| **Apothicaire** | the artisan: a local DMPK agent (own Python harness, OptChat memory, a local language model on llama.cpp) that plans, explains and calls Caladrius for every number | [`abdou-rgd/apothicaire`](https://github.com/abdou-rgd/apothicaire) |
| OptChat | the memory: endless chat remembered through a tree of summary lines (after Victor Taelin's OptChat idea), imported unchanged by Apothicaire | [`abdou-rgd/optchat`](https://github.com/abdou-rgd/optchat) |

## Where the figures are

This README states no measured figure, so that it never goes stale. Each figure lives in the file that owns it:

- Caladrius: what is validated and what is not, [`docs/validation.md`](https://github.com/abdou-rgd/caladrius/blob/main/docs/validation.md); the generated conformance table, [`docs/conformance.md`](https://github.com/abdou-rgd/caladrius/blob/main/docs/conformance.md); the releases, [GitHub Releases](https://github.com/abdou-rgd/caladrius/releases).
- Apothicaire: the benchmark, the gates and the runtimes, in [`docs/`](https://github.com/abdou-rgd/apothicaire/tree/main/docs).
- OptChat: the recall benchmark, [`BENCH.md`](https://github.com/abdou-rgd/optchat/blob/main/BENCH.md).
- What comes next: the board, [`caladrius/board/INDEX.md`](https://github.com/abdou-rgd/caladrius/blob/main/board/INDEX.md). The dated status, the roadmaps and the naming record this README used to carry: [HISTORY.md](HISTORY.md).

## Repositories

- [abdou-rgd/caladrius](https://github.com/abdou-rgd/caladrius): the engine (Rust), with the agent contract `AGENTS.md`, the shared `board/`, the role definitions in `.claude/agents/`, the oracle and the generated conformance and validation documents.
- [abdou-rgd/apothicaire](https://github.com/abdou-rgd/apothicaire): the local assistant (Python), its number gate, benchmark and decision-harness spike.
- [abdou-rgd/optchat](https://github.com/abdou-rgd/optchat): the assistant's memory.
- This repository, [abdou-rgd/officina](https://github.com/abdou-rgd/officina): the map above, the method, and the notes (independent reviews, session notes, a bibliography) in [`notes/`](notes/). It contains no code of the three components. The project's website is in [`site/`](site/) (static, deployed to GitHub Pages). Locally the four live side by side in one folder; only the three components are repositories of their own.

## How it is run

The code is written by AI coding agents under a written contract, a shared board of small task cards, separate roles for whoever writes a number, whoever tests it and whoever reviews it, and independent reviews by other models; the human answers questions and decides what is published. [METHOD.md](METHOD.md) describes this, including what an outside audit of 14 October found.

## License

MIT OR Apache-2.0, at your option ([LICENSE-MIT](LICENSE-MIT), [LICENSE-APACHE](LICENSE-APACHE)), for the text in this repository. Each component carries its own license in its own repository.
