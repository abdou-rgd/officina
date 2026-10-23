# Next piece: the engineering and technology scout

One of five independent scouts. Lens: technology, language, tool or workflow changes that make Officina more verified,
reproducible, portable or productive. Written on 2026-10-23 from caladrius `e1baee3` (v0.3.2), apothicaire `b513f83`, optchat
`805ba4b` and officina `4e32b3c`. Web sources were opened that day. Measurements ran in a Linux x86_64 container (4 cores, no
GPU, no Windows), and the scratch code stays outside the repositories.

## 1. Summary

**Top pick: bit-identical numerics on every target, with a result digest and `project.replay`.** One Caladrius commit gives
different bits on the desktop and in the browser. Of 70,509 numbers from 50 engine commands, 19,165 differ between the native
Linux and WebAssembly builds, and one fit stops an iteration earlier in the browser. The cause is `f64::exp`, `ln` and `powf`,
whose precision Rust documents as platform-dependent. Routing the 106 call sites through the pure-Rust `libm` made both
outputs byte-identical. `docs/conformance.md` stayed unchanged (48,955/48,955) and 2,087 tests passed. The change is small, can
be shown at the 17 November demo ("open my project in your browser, get my hash"), and signed results, reports and bindings
build on it.

Assumptions, since nobody could answer questions:

- the demo runs on the RTX 3060 PC under Windows 11;
- site visitors use Chrome or Edge;
- an agent-session is one Claude Code session on one card;
- `FROZEN_SET.md` stays binding, so any new assistant configuration is exploratory or enters before the system freeze.

## 2. Candidates

### C1. Bit-identical numerics, result digests and replay in the browser

- **Pitch.** Same bits on Linux, Windows, macOS and WebAssembly; a digest on every result; replay of any project file in the
  browser to the same digest.
- **Built.** About 600 lines:
  - a 30-line module in `caladrius-nca`, `-models`, `-fit` and `-engine` forwarding `exp`, `exp_m1`, `ln`, `ln_1p`, `powf`,
    `powi`, `sin` and `log10` to `libm`, with the 106 call sites in 18 files rewritten;
  - `disallowed-methods` in `clippy.toml`, which I tested: clippy flags `f64::exp`, `ln` and `powi` in both call syntaxes, and
    CI already runs clippy with `-D warnings`;
  - a SHA-256 of each result's canonical JSON, with engine version and commit, in the history;
  - `project.replay` (CLI and MCP), which re-runs a history and names the first divergence;
  - a CI matrix (ubuntu, windows, macos-arm64, wasm under Node) comparing a conformance digest;
  - "Verify a project" in `/app/`.
- **Fit.** "Every number re-derivable from a pinned version" becomes checkable by anyone in a browser tab.
- **Evidence.**
  - [Rust 1.99.1 `f64` docs](https://doc.rust-lang.org/std/primitive.f64.html): for `exp`, `ln`, `exp_m1`, `powf` and
    `powi`, "the precision of this function is non-deterministic. This means it varies by platform, Rust version, and can
    even differ within the same execution". `sqrt` and `mul_add` are correctly rounded.
  - [`libm` 0.2.16](https://github.com/rust-lang/compiler-builtins/tree/main/libm) is MIT. Its `src/math/arch/mod.rs` uses
    hardware only for exactly rounded operations (sqrt, fma, rint); exp, log and pow are software on x86_64, aarch64 and
    wasm32.
  - Measured with probes calling `Engine::execute` (Rust 1.97.0, glibc 2.39, `wasm32-unknown-unknown` in Node 22.22.0) on 2
    `nca.run` (Theoph), 30 `fit.run` (Indometh, 6 subjects × 5 weightings) and 18 command examples. Before the change:
    - 19,165 of 70,509 numbers differed, in 34 of 50 results, by at most 1e-8 relative outside the minimization trace;
    - for Indometh subject 2 with 1/ŷ weighting, the trace has 6 entries natively and 5 in wasm, with estimates 4e-10 apart;
    - `exp` differed from `libm::exp` on 195,324 of 2,000,000 PK-range inputs, always by 1 ulp;
    - in wasm32, std equalled `libm` on all 10⁷ inputs tried.

    After the change: 0 differences and the same SHA-256 on both builds, a byte-identical `docs/conformance.md`, 2,087 tests
    passing on the pinned 1.99.1, and 0.07–0.09 s for the workload either way. Windows and macOS arm64 are not measured yet.
- **Prior art and what is new.** [`core-math`](https://docs.rs/core-math) 1.4.0 (MIT) binds the correctly rounded CORE-MATH C
  library: a stronger guarantee than needed, at the cost of C in the wasm build. I found no PK tool claiming identical bits
  between desktop and browser, without searching exhaustively.
- **Prototype (1–2 days).** Module, clippy rule and conformance digest, then the matrix.
  - Success: one digest on all four targets, with the conformance file unchanged.
  - Kill: an unfixable Windows or arm64 difference, which narrows the claim to Linux plus browser.
- **Scores.** Demo 3 · PhD 2 · users 2 · compounding 3. **Effort** S (about 4 agent-sessions).
- **Risks.**
  - `libm::exp` costs 11 ns per call against 5 ns, which does not show at PK sizes.
  - Native outputs move by 1 ulp, so Apothicaire's goldens may need one regeneration. The change must land before the
    frozen-set system freeze hashes the MCP binary.
  - No card covers this. It relates to golden rule 9, T-080, and T-068 and T-069, whose "project hash" this provides.

### C2. Attested builds and a third-party timestamp for the pre-registration

- **Pitch.** Sign where each binary, browser bundle and frozen-set manifest came from, so the chain from commit to artifact to
  result is checkable without trusting the author.
- **Built.** About 150 lines:
  - `actions/attest@v4` in `release.yml`;
  - `site.yml` deploys a tag's attested web archive after `gh attestation verify`, instead of rebuilding from `CALADRIUS_REF`;
  - `xtask web` pins `wasm-opt`, which today runs "when it is on the PATH" (`xtask/src/web.rs:5`);
  - Apothicaire CI pins its siblings, which are `ref: main` today (`ci.yml:28,33`);
  - two RFC 3161 timestamps and a Sigstore signature for `MANIFEST.json`.
- **Fit.** The audit's traceability (METHOD.md §6) extends to artifacts and to the pre-registration.
- **Evidence.**
  - GitHub: "Artifact attestations by itself provides SLSA v1.0 Build Level 2", public repositories use the Sigstore Public
    Good Instance, and reusable workflows reach L3 ([concepts](https://docs.github.com/en/actions/concepts/security/artifact-attestations),
    [how-to](https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds)).
  - [SLSA v1.0](https://slsa.dev/spec/v1.0/levels): L2 "prevents tampering after the build through digital signatures".
  - [Trusted Time in Sigstore](https://blog.sigstore.dev/trusted-time/) (2023-08-02): Rekor's time "comes from Rekor's internal
    clock, which is not externally verifiable", and RFC 3161 authorities (FreeTSA, DigiCert) work through
    `--timestamp-server-url`.
  - [rustc](https://doc.rust-lang.org/rustc/remap-source-paths.html): the MSVC linker writes host paths into `.pdb` files.
    Cargo `trim-paths` is [still unstable](https://doc.rust-lang.org/cargo/reference/unstable.html).
  - Measured: two Linux release builds of `caladrius-cli` from different checkout paths gave the same SHA-256.
  - FROZEN_SET.md §9 relies on "Each freeze commit is pushed to GitHub, which timestamps it publicly". But commit dates are
    written by their author, and Apothicaire's history was rewritten once (METHOD.md §7).
- **Prior art and what is new.** Package registries attest builds. New: attesting a pre-registered benchmark.
- **Prototype (1 day).** Attest an `-rc` tag, timestamp a test manifest, and build Windows twice.
  - Success: every archive verifies.
  - Kill: none for attestation. If the Windows builds differ, claim reproducibility for Linux and wasm only.
- **Scores.** Demo 1 · PhD 2 · users 1 · compounding 2. **Effort** S (about 2 sessions).
- **Risks.** No licence or cost issue. The site would serve tagged versions only. It overlaps T-080 and T-082.

### C3. Property-based, metamorphic and mutation testing

- **Pitch.** Test millions of generated profiles against relations that need no reference value, and measure how many
  injected bugs the suite misses.
- **Built.** About 800 lines:
  - `proptest` generators of valid and hostile profiles (NaN, ±∞, 1e±300, ties);
  - about 10 metamorphic relations: concentration scaling scales AUC and Cmax; dose scaling scales CL/F and V; minutes rescale
    time parameters; row order is irrelevant; log trapezoid ≤ linear when declining; a regimen equals its summed doses; λz is
    invariant to concentration scaling;
  - never-crash properties for `data.import` and `project.load` on arbitrary bytes;
  - a weekly `cargo mutants` job whose missed count may only go down, like the conformance floors.
- **Fit.** Golden rule 2 ("tests are the gate") gets a measure of the gate itself.
- **Evidence.**
  - Measured: [cargo-mutants](https://github.com/sourcefrog/cargo-mutants) 27.1.0 (MIT) on `caladrius-nca` with its own
    tests. Of 584 mutants, 511 were caught, 35 missed and 38 unviable (93.6 %), in 11 min with 3 jobs on 4 cores.
  - Some survivors are equivalent (`first.time - DOSE_TIME` with `DOSE_TIME = 0.0`; a `<` after an `==` in `validate.rs:48`).
    Others are real gaps: the λz non-finite-sum guard (`lambda_z.rs:81`) and +∞ serialisation (`float.rs:31`) are never
    exercised, and hostile generators produce exactly those inputs.
  - [proptest](https://github.com/proptest-rs/proptest) is MIT/Apache, shrinks failures and stores them as regressions.
  - [Kanewala (2015)](https://mountainscholar.org/items/54e6e8b0-e096-4745-99b0-e190057b06ed/full), PhD thesis: metamorphic
    relations "can serve as automated partial test oracles in scientific software".
  - No test in the numerical crates draws random inputs today; the consistency tests use fixed oracle cases.
- **Prior art and what is new.** The techniques are established. New: every NCA tool must satisfy these relations, which makes
  them a tool-agnostic method for the PAGE 2027 comparison.
- **Prototype (2 days).** 10 relations × 100,000 cases, then mutants on models and fit.
  - Success: each relation holds or exposes a defect, and nca's missed count halves.
  - Kill: no failure in 10⁶ cases and at least 90 % of survivors equivalent. Keep the job and stop there.
- **Scores.** Demo 1 · PhD 2 · users 1 · compounding 2. **Effort** S (about 3 sessions).
- **Risks.** Development-only. It overlaps T-085 and the reviewer's hunt for "tests that cannot fail".

### C4. Grammar-constrained regeneration in gate v2

- **Pitch.** When gate v2 finds a problem, regenerate under a llama.cpp grammar in which digits appear only inside resolvable
  references, and no unit follows a reference.
- **Built.** About 250 lines of Python:
  - `gate_v2.grammar(refs, user_numbers)` emits per-turn GBNF from the closed tables of `gate_v2.py` (`PARAMETERS`, λz and
    compare fields, `CONVENTIONS`) and the turn's references;
  - free text excludes digits and braces; numbers enter as an enumerated reference, a closed label (AUC(0-tlast), t1/2, R²) or
    a number the user typed;
  - it is applied on the regeneration call, which already sends `tools=None` (`apothicaire.py:576`).
- **Fit.** "The model never types a number" becomes a construction for the second draft, and the gate still checks it.
- **Evidence.**
  - The 3-seed development runs of v2 (`bench/runs/decision/ANALYSIS.md`) show 188 regenerations, a marker in 17/25 exercises,
    and 6/25 exercises passed against 14/25 for v1.
  - My regex classification of their 651 first-draft findings: 347 are a unit after a reference (`{{call_2.aucpext.obs}} %`),
    246 a reference that does not resolve (`{{call_2.half_life}}`), 53 a bare number and 5 words; 93 remain shown. The grammar
    excludes 646 of the 651 by construction.
  - llama.cpp b11700 refuses a custom grammar while tools are active unless `tool_choice` is `none`
    ([`server-common.cpp:1398-1401`](https://github.com/ggml-org/llama.cpp/blob/b11700/tools/server/server-common.cpp#L1398-L1401)).
    The [GBNF README](https://github.com/ggml-org/llama.cpp/blob/b11700/grammars/README.md) warns of performance gotchas, and
    [LLGuidance](https://github.com/ggml-org/llama.cpp/blob/b11700/docs/llguidance.md) needs Rust at build time.
  - Risk: [Tam et al. (2024)](https://arxiv.org/abs/2408.02442) find that format restrictions degrade reasoning, more so when
    stricter. [JSONSchemaBench (2025)](https://arxiv.org/abs/2501.10868) compares constrained decoders.
- **Prior art and what is new.** OptChat already constrains its compaction with a JSON schema. Constraining prose so that
  numbers come only from typed engine results seems new (unverified).
- **Prototype (1 day plus about 3 h of GPU).** First offline: the grammar must accept every stored draft without a finding.
  Then the development set, seeds 1–3.
  - Success: markers in at most 3/25 exercises, with at least 562/600 turns correct.
  - Kill: a clean draft the grammar cannot express, fewer correct turns, or more than 2 % LOOP and ABSTAINED.
- **Scores.** Demo 2 · PhD 3 · users 1 · compounding 2. **Effort** S (about 2 sessions).
- **Risks.**
  - The demo gate is already v1 (FROZEN_SET.md §8).
  - Masking runs on the CPU, so tokens per second must be measured on the 3060 PC.
  - It overlaps T-063 to T-065 and T-092.

### C5. Forward-mode automatic differentiation of the model kernels

- **Pitch.** Kernels generic over the number type, so that dual numbers give exact derivatives for every model and regimen,
  on stable Rust.
- **Built.**
  - A `Real` trait for `f64` and `num_dual::Dual64`.
  - `kernel.rs`, `dosing.rs`, `superpose.rs`, `steady.rs` and `two.rs` made generic, about 2,500 lines.
  - Regimen Jacobians, refused today (`caladrius-models/src/jacobian.rs:8-10`, `caladrius-fit/src/engine.rs:282-290`).
  - Dual checks of the hand-written derivatives.
- **Fit.** The next scope step is user-written ODE models (AGENTS.md §1), whose fit derivatives AD provides for free.
  Fisher-information work would be Abdou's scope decision and reuses no internship code.
- **Evidence.**
  - [`std::autodiff`](https://doc.rust-lang.org/nightly/std/autodiff/index.html) is "a nightly-only experimental API" needing
    `lto="fat"`; its [tracking issue](https://github.com/rust-lang/rust/issues/124509) reads "Exploration".
  - [`num-dual`](https://github.com/itt-ustutt/num-dual) is MIT/Apache, on rustc ≥ 1.81.
- **Prior art and what is new.** Stan and Julia differentiate PK models (unverified). New here: exact multiple-dose
  Jacobians.
- **Prototype (2–3 days).** pk1 bolus and oral kernels with superposition, checked against `closed_forms.rs`.
  - Success: agreement within 1e-13, with the f64 path bit-identical.
  - Kill: any conformance change, or more than 20 % slowdown.
- **Scores.** Demo 0 · PhD 2 · users 1 · compounding 3. **Effort** M (about 6 sessions).
- **Risks.** The numerical crates change, so the reviewer role applies. wasm support is unverified. It relates to T-030 and
  T-049.

### C6. Bounded model checking of "never crash" with Kani

- **Pitch.** Prove that selected functions cannot panic or overflow for any input up to a small size.
- **Built.** About 300 lines of harnesses (λz selection, cleaning, BLQ, superposition counter, CSV sniffer) and a Linux CI job.
- **Fit.** Golden rule 6 is enforced by lints. Kani checks what lints miss, such as overflow and slicing outside the linted
  crates.
- **Evidence.** Kani runs on Linux and macOS only ([install](https://model-checking.github.io/kani/install-guide.html)). Its
  `expf64`, `logf64` and `powf64` support is "Partial: results are overapproximated"
  ([intrinsics](https://model-checking.github.io/kani/rust-feature-support/intrinsics.html)), so it proves no value.
- **Prior art and what is new.** It would be new for a PK engine, within the size bound.
- **Prototype (2 days).** Five harnesses, up to 4 points.
  - Success: each finishes in under 10 minutes.
  - Kill: no proof at 3 points.
- **Scores.** Demo 0 · PhD 1 · users 0 · compounding 1. **Effort** M (about 3 sessions).
- **Risks.** No Windows support, so it runs in CI or WSL; as a development tool it ships nothing. C3 covers most of the value.
  It follows T-053.

### C7. Apothicaire without a GPU: the decider and the engine in the browser

- **Pitch.** The decider-only arm (Qwen3.5-0.8B, deterministic harness, templates) next to the wasm engine, in one tab.
- **Built.** The decider exported to wllama or transformers.js, `decision/harness.py` (624 lines) ported to Rust/wasm, and a
  page in `/app/`.
- **Fit.** "Nothing leaves the machine" on any laptop.
- **Evidence.**
  - [wllama](https://github.com/ngxson/wllama) (MIT): CPU or WebGPU, at most 2 GB per file.
  - [transformers.js](https://github.com/huggingface/transformers.js) and [WebLLM](https://github.com/mlc-ai/web-llm)
    (Apache-2.0) run on WebGPU, which [Chrome 113](https://developer.chrome.com/blog/webgpu-release) shipped on Windows.
  - [Qwen3.5-0.8B](https://huggingface.co/Qwen/Qwen3.5-0.8B) is Apache-2.0 and a Gated DeltaNet hybrid; browser support is
    unverified.
  - The merged model "never answers `is_not_available` true" (`bench/NO_LM_ARM.md` §2).
- **Prior art and what is new.** Chat models already run in browsers. New: the engine in the same tab.
- **Prototype (3 days).** The 600 development states in Chrome on Windows.
  - Success: at least 99 % agreement with the PC, under 5 s per turn.
  - Kill: no runtime runs the architecture.
- **Scores.** Demo 2 · PhD 1 · users 3 · compounding 2. **Effort** L (about 9 sessions).
- **Risks.** The licences are fine (Apache-2.0 model, MIT/Apache runtimes). The download size is unmeasured, and it is not
  realistic before 17 November. It relates to T-106 and `decision/PLAN.md`.

### C8. Regenerable analysis reports with Typst

- **Pitch.** `report.render` turns a project into a PDF with data, plots, results, flags, versions and digests, byte-identical
  on regeneration.
- **Built.** About 400 lines: a template, a command writing its JSON, SVG plots from `export.plot` (T-110), and the `typst`
  CLI first.
- **Fit.** It is the roadmap's "regenerable execution report".
- **Evidence.**
  - [Typst](https://github.com/typst/typst) is Apache-2.0 and installs with winget.
  - [`json()`](https://typst.app/docs/reference/data-loading/json/) turns whole numbers into integers, so the engine must send
    formatted text.
  - The [0.15.1 man page](https://man.archlinux.org/man/extra/typst/typst-compile.1.en) documents `--creation-timestamp` and
    `--ignore-system-fonts`.
- **Prior art and what is new.** Commercial tools export reports. New: every number points to a digest.
- **Prototype (1–2 days).** A Theoph report.
  - Success: identical bytes across runs and operating systems.
  - Kill: it differs even with both flags.
- **Scores.** Demo 2 · PhD 1 · users 3 · compounding 2. **Effort** M (about 3 sessions).
- **Risks.** The bundled fonts' licences are unverified, which needs Abdou's call.

### C9. Python and R packages of the engine

- **Pitch.** `pip install` and an R package that call the same registry, with the same digests.
- **Built.** About 300 lines each: `execute(id, params_json)` and `describe()` through PyO3 and maturin, and extendr for R.
- **Fit.** Pharmacometricians use R, and the PAGE comparison could call Caladrius next to PKNCA.
- **Evidence.** [maturin](https://github.com/PyO3/maturin) is MIT/Apache and builds Windows, Linux and macOS wheels.
  [extendr](https://extendr.rs/) is MIT and documents CRAN publishing.
- **Prior art and what is new.** PKNCA and NonCompart are R packages. New: identical bits across R, Python, the CLI and the
  browser (with C1).
- **Prototype (2 days).** Windows CI builds.
  - Success: the Theoph digest equals the CLI's.
  - Kill: CRAN rejects Rust builds.
- **Scores.** Demo 1 · PhD 2 · users 3 · compounding 2. **Effort** M (about 5 sessions).
- **Risks.** CRAN's Rust policy is unverified, and the PyPI name meets the trademark question. No card covers this.

## 3. Top 3, ranked

| candidate | demo | PhD | users | compounding | effort |
|---|---|---|---|---|---|
| C1 bit-identical numerics and replay | 3 | 2 | 2 | 3 | S |
| C2 attested builds and timestamps | 1 | 2 | 1 | 2 | S |
| C3 property, metamorphic and mutation tests | 1 | 2 | 1 | 2 | S |
| C4 constrained regeneration | 2 | 3 | 1 | 2 | S |
| C5 dual-number AD | 0 | 2 | 1 | 3 | M |
| C6 Kani | 0 | 1 | 0 | 1 | M |
| C7 browser assistant | 2 | 1 | 3 | 2 | L |
| C8 Typst report | 2 | 1 | 3 | 2 | M |
| C9 Python and R packages | 1 | 2 | 3 | 2 | M |

1. **C1.** It is the only candidate with both a measured defect and a measured fix. It is small, demonstrable on 2026-11-17,
   and C2, C8 and C9 build on its digests. Order: module, clippy rule and digest (1 session), matrix (1), replay (1–2), site
   (1), all before the frozen-set system freeze.
2. **C4.** It is the cheapest test that could change the assistant's headline: 646 of 651 stored findings are excludable, and
   the first check runs offline. For the PhD, it is an intervention that can be pre-registered.
3. **C3.** It measures "tests are the gate" (93.6 % for nca) and gives the PAGE comparison tool-agnostic oracles, with no GPU
   and no R.

Next come C5, when user-written models start, and C2 alongside T-080.

## 4. Rejected

- **`std::autodiff`:** nightly-only with fat LTO (C5), while the toolchain is pinned to stable on purpose.
- **Verus, Creusot, Prusti, Aeneas:** they need specifications or a verifiable subset. Verus "currently supports a subset of
  Rust" ([README](https://github.com/verus-lang/verus)); I did not open the others.
- **CORE-MATH:** stronger than bit-identity needs, and it adds C (C1).
- **The 27B in the browser:** a 5.9 GB download per visitor, which wllama could load only split into files under 2 GB.
- **A Rust rewrite of Apothicaire:** it was decided to stay in Python, and a rewrite gains no verification.
- **Nix or Guix:** not native on Windows (not verified here).
- **A monorepo:** churn, when pinning sibling commits (C2) is enough.
- **cargo-fuzz:** nightly-only on Linux or macOS (not verified here), whereas proptest (C3) runs on Windows.
- **Notebooks:** they follow from C9.
