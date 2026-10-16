# Review of the decision-harness spike by GPT Astra 6.1 (2026-10-09, night)

Independent review obtained by Abdou from the brief `review-brief-2026-10-09-astra.md`. The reviewer states it did not reproduce the runs nor audit the repositories. Verbatim text below, as pasted by Abdou; the orchestrator's reading is in `session-2026-10-09.md` and in `agent/decision/PLAN.md`.

---

I would keep the harness and make the next phase about testing its boundaries. The strongest result is the reduction in generative work needed to execute these workflows. The weakest claims concern generalization, calibration, and how much the learned model contributes.

I'm assessing the evidence in your review-brief-2026-10-09-astra.md; I have not reproduced the runs or audited the repositories. All project figures below come from that brief. Costs are approximate human effort on your existing setup, and overlap.

1. A versus B is a fair comparison of two systems on their shared workflow. It needs controls before supporting a claim about model size.

The reported result is practically interesting: B completes the scored tasks with roughly 31 times lower latency, calculated from 10.4/0.34, while using substantially less GPU memory. Specialization is a legitimate engineering advantage.

However, B simultaneously changes supervision, state representation, action selection, rendering, and supported scope. A reviewer could reasonably attribute much of the improvement to the harness. Your own six-tool/seven-tool experiment already suggests that putting the missing operation into the engine can remove an entire class of errors without changing the language model.

The cheapest informative comparisons are:

| Comparison using the identical harness | What it establishes |
|---|---|
| Rules or keyword matching | Whether the present wording families require learning |
| A supervised word/character TF-IDF classifier | Whether the 0.8B improves on inexpensive linguistic classification |
| The existing 27B selecting the same closed decisions | How much the shared state and renderer improve A's controller |
| Your trained 0.8B | Its quality, latency, and memory tradeoff under those controls |

These controls still would not isolate a pure model-size effect if training differs. They would explain the system result much better.

Also rerun A after its documented digest fix, using a new, frozen test set. The existing benchmark has influenced templates, the scorer, and training wordings. "Never trained on these exercises" does not make it untouched by system development. Preserve the historical results as development results.

Rough cost: 1-2 days for the simple baselines and common interface; modest inference time. This has higher information value than the Saluki substitution.

2. The next OOD test should challenge language, state, and scientific prerequisites together. Fifty difficult sentences alone will leave major gaps.

DeepSeek's blind set is a good first experiment. Give its author the supported capability contract, label definitions, and concrete conversation states. Withhold the generator, training examples, and system predictions. Being blind to the generator should not mean being uninformed about what the labels mean.

For the first 50 cases, I would require ten in each family:

| Family | Examples of what should change the correct response |
|---|---|
| Language and composition | Unfamiliar abbreviations; negation; "seulement la demi-vie"; several requested parameters; correction within a sentence |
| Conversation state | Corrected dose; another imported profile; several previous analyses; references to an earlier method rather than the latest one |
| Missing or conflicting inputs | Dose without a unit; two competing doses; conflicting header and message units; insufficient information to choose a comparison pair |
| Scientific prerequisites | Unusable terminal phase; substantial extrapolation; apparent versus absolute parameters; declared BLQ policies |
| Capability boundaries | Fit or simulation requests that B cannot execute; explanation requests; partially supported compound requests |

Include counterfactual pairs: the same request with a different relevant state, or nearly identical wording that requires a different action. Keep each pair together when reporting uncertainty. This kind of behavioral testing has a strong methodological precedent in CheckList (ACL Anthology).

A pharmacometrician should adjudicate the gold decisions before seeing predictions. Another model supplying both prompts and gold is useful test generation, but does not establish independent scientific correctness.

After the pilot guides fixes, retain it as regression data. For a small study, I would then freeze perhaps 100 fresh challenge cases plus 30 ordinary requests written independently by prospective users. Report the two populations separately: adversarial cases reveal failure mechanisms; ordinary requests provide a better indication of usefulness. Those counts are a feasible study design, not a statistical threshold that proves reliability.

Rough cost: half to 1 day for the first 50; another 2-4 days for a frozen extension and independent annotation. Expert time is the scarce resource.

3. The 99.9% figure is meaningful for the generator's mapping. The calibration claim is much less convincing.

Splitting by exercise is a sensible precaution. It establishes performance on new simulated exercises drawn from the same construction process. Since the wordings remain familiar, and include the benchmark's wording families, it provides limited evidence about unfamiliar requests.

There is also a more informative companion metric. If all 14 errors occur in the single is_not_available question, as stated, they affect 14 different rows. Therefore: complete decision-vector accuracy = 706/720 = 98.1%.

That remains strong within this distribution. But the reported 77% recall means roughly 23% of actual unavailable cases are missed. The positive-class denominator is not explicitly supplied; publish the confusion matrix rather than making readers reconstruct it from rounded percentages. Neither micro accuracy nor a majority baseline communicates that failure concentration well.

ECE deserves particular caution. Under conventional pooled, top-label ECE, a classifier assigning confidence 1.0 to every prediction, including every mistake, would obtain ECE = 1 - 14,386/14,400 = 0.000972, about 0.001. This is a counterexample using your counts, not a claim about your actual confidence outputs. It shows that ECE 0.001 can coexist with maximum confidence on every failure. The standard ECE definition supports this calculation (proceedings.mlr.press).

Furthermore, Unsloth's documented recipe calibrates on its held-out evaluation rows. Check whether your reported ECE is evaluated on those same calibration-fitting rows. If so, it is a calibration-fit diagnostic, rather than an independent calibration test (unsloth.ai).

Report per-question confusion, complete-vector correctness, and error among automatically executed requests versus the fraction executed as the confidence threshold changes. Select thresholds on separate development/calibration data. Calibration on familiar inputs does not establish calibration under distribution shift (proceedings.neurips.cc).

Rough cost: 2-4 hours if probabilities and predictions are logged; useful OOD conclusions depend on insight 2.

4. Define the numerical guarantee precisely, and audit the raw-input boundary before trusting the ceiling.

The architecture substantially restricts how unsupported numbers can enter answers. That is valuable. But a system can faithfully copy a number from the wrong profile, the wrong AUC method, or an analysis performed before a dose correction. It can also attach a correct value to an incorrect scientific label. Your formatting bug demonstrates that deterministic rendering still requires verification.

The defensible guarantee is approximately: each reported numerical quantity comes from an allowed, typed source field, through a tested renderer. Scientific correctness additionally requires the right source selection and interpretation.

Bind values to a record containing the dataset or subject, input version, analysis ID, parameter, method or interval, value, unit, and status. Test that relevant input changes prevent accidental reuse of incompatible analyses. Numeric membership in the set of previous tool outputs is too weak to establish this.

The brief also leaves an important interface unspecified: the 20 decisions include dose_has_unit, but do not describe extraction of the dose magnitude, dose-unit identity, CSV column meanings, or infusion duration. Who supplies those arguments? A deterministic parser may already handle them well. Alternatively, benchmark metadata may be doing work that a real user interface must perform. The brief does not let me distinguish these possibilities.

Run a clean replay starting only from the raw CSV and actual user messages, with fresh analysis IDs and no exercise object available to the operational harness. Inspect how every tool argument was obtained. Use a sentence containing an old dose and its correction, a decimal comma, ambiguous column names, and conflicting unit statements.

Rough cost: 2-4 hours to trace the interface and create focused cases; 1-2 days if provenance or parsing needs strengthening.

5. Move availability into the engine, but replace the binary concept with scientifically meaningful reasons.

This is the best proposed architectural change in your roadmap. A fact already determined by the engine's capabilities and prerequisites should generally come from that engine.

However, "not calculated" and "does not exist for this route" cover several different situations:

| Situation | Appropriate behavior |
|---|---|
| An identifiable apparent parameter is available | Report it with the correct scientific name |
| Required metadata are missing | Ask for the specific missing information |
| The data do not support the calculation | Explain the failed prerequisite |
| The implementation lacks the method | State the capability limitation |
| A supported calculation has simply not been run | Run it when requested |

Oral data with unknown bioavailability identify CL/F and Vz/F in the usual NCA formulation. Those quantities have the same dimensions as CL and Vz, so checking units alone will not catch a misleading label. PKNCA explicitly documents this distinction.

Similarly, terminal half-life availability depends on usable observations and the regression procedure, not just route. PKNCA's documented procedure accounts for these prerequisites.

Apply prerequisites to the requested operation. A blanket rule that asks for dose whenever dose is missing can unnecessarily block an observed Cmax request.

Keep all these cases in the outcome evaluation after removing the model question. Improving the architecture should improve user-level behavior; reducing the number of scored questions should not hide failures.

Rough cost: half to 1 day for a reason-coded status contract, templates, and targeted checks.

6. Repair the evaluation ledger so omissions, refusals, and repeated measurements cannot flatter the headline.

Several denominators need an explicit reconciliation:

| Figures in the brief | Missing explanation |
|---|---|
| 25 exercises x 8 turns versus 175 scored turns | Which 25 turns are excluded, and why? |
| 720 held-out rows from 20 exercises | There are 36 rows per exercise; explain how these relate to the conversation turns and added task types |
| 558 oracle numbers, 691 rendered numbers, 709 gate-checked numbers | Define each counting population |
| A's 549/556 versus B's 558/558 | Show whether the denominator is required answer slots or numbers actually emitted |
| d1-3B evaluated every sixth to eighth row | Supply exact sample counts and case IDs; periodic sampling could favor particular positions in the exercise blocks |

These can have legitimate explanations. At present the reader must infer them.

The primary answer score should use a fixed set of required facts and actions, established before the outputs exist. Missing a requested value must count as a failure even if it produces no number for the numeric scorer to inspect. Score incorrect extra claims, wrong analysis selection, inappropriate refusal, and unsupported explanations as well. Review a sample of apparent successes manually; your over-answering episode shows why this matters.

Treat exercises and wording families as sources of dependence. Neither 558 reported numbers nor 14,400 labels are that many independent demonstrations of reliability. For scale, even 25 independent, representative, all-success exercises would give a one-sided 95% upper failure-rate bound of about 11.3%. Your constructed benchmark does not establish those sampling assumptions, so this is an illustration of limited evidence, not an operational bound.

Rough cost: half to 1 day for the ledger, fixed required-slot score, and grouped reporting.

7. Caladrius's verification story is the strongest scientific foundation. Make its coverage easier to inspect and add observed profiles.

Independent R references, multiple ways of checking analytic solutions, and the documented correction of a reference script are substantive strengths. The reference-script incident is especially useful evidence of judgment: disagreement was investigated rather than accommodated by changing tolerance.

Still, 48,955 scalar agreements do not describe the diversity of verified pharmacometric cases. A densely sampled curve can contribute many closely related values. Add counts by profile, parameter regime, endpoint family, and distinct fitting problem. State whether tolerances are absolute, relative, or combined; pin reference versions and options.

Forward-curve agreement also does not establish inverse-problem identifiability or the reliability of fit statistics. Before extending the assistant's supported scope to two-compartment fitting, add independent comparisons covering multiple initializations and at least one weakly identifiable case. Compare objectives and predictions as well as parameter estimates, and inspect how unstable uncertainty estimates are reported.

An inexpensive observed-data check is available through R's Theoph dataset: 12 oral subjects, 132 observations, doses in mg/kg, body weights, times in hours, and concentrations in mg/L. It directly exercises subject separation and weight-normalized dosing.

Run subjects separately with independently prepared imports and pinned PKNCA settings. Add a small set of deliberately difficult profiles: truncated tails, insufficient terminal points, BLQ values in different positions, and samples during infusion. Specify the expected preprocessing policy before comparison; there is no benefit in silently treating one BLQ convention as universally correct.

These are complementary tests: observed profiles challenge the numerical/data workflow, while independently authored requests challenge language and state handling.

Rough cost: a few hours for coverage reporting; half to 1 day for observed profiles; 1-3 days for a focused fitting audit.

8. The decision/harness split is strong engineering with familiar foundations. It can grow, provided its action vocabulary remains explicit.

The architectural principle is established. Liquid's current d1 models produce decisions in a single forward pass, and Unsloth explicitly offers training of Qwen3.5-0.8B into a decision model. Those ingredients are available prior work, so they cannot carry the novelty claim by themselves.

Your useful contribution is the application of that principle to a scientific execution contract: restricted actions, explicit prerequisites, engine-owned numbers, and inspectable failures.

The decider still determines which computation happens. Moving tool-call construction into code constrains its authority and makes behavior easier to test; it does not remove semantic decision errors. The real boundary is what the schema can express. Twenty outputs cannot represent arbitrary scientific requests, regardless of classifier accuracy. Run the gold harness on the new challenge cases too: failures with perfect interpretation expose limitations of the schema, executor, or renderer.

I would retain A for explanations, exploratory dialogue, and helping formulate a sequence of supported analyses. Numerical outputs should continue through the typed scientific path. Keep exact analysis state in structured records; conversational summaries can support context, but should not be the sole record of dose, units, or analysis identity.

For uncertainty within a supported operation, clarification is often the right action. Automatically handing every uncertain request to a larger model would require its own evaluation.

Rough cost: half day to document the boundary and retain the useful parts of A. Defer a general planner; even a small hybrid deserves several additional days of testing.

9. This is a credible PhD portfolio direction. A publishable result needs a sharper research question than "trained on simulator data."

Most current labels appear recoverable from request wording and explicit metadata. Selecting asked_cmax or an AUC method may require no understanding of the concentration-time curve. The simulator can supply useful workflow examples without the model learning pharmacokinetics.

Test this cheaply: remove concentration rows, or vary simulated kinetic parameters while preserving the request and relevant metadata. Evaluate only decisions whose gold answers should remain unchanged. Separately remove history when history should matter. These ablations tell you what information the classifier actually uses.

A defensible research question would be: how much reliable execution coverage can a small local language controller achieve for pharmacometric workflows under changes in wording, metadata, data quality, and conversation history?

That can support an applied methods paper or benchmark release if it includes the common-harness baselines, independently adjudicated cases, error-versus-coverage results, scientific failure categories, and reproducible traces. Release the generator, schemas, annotation rules, frozen splits, scorer, model adapter, dependency versions, and exact run configurations. Add a small number of training seeds after fixing the protocol; repeated seeds quantify training variability but do not replace independent test cases.

For the portfolio, Abdou's scientific contribution should be visible in the rationale for the cases, assumptions, refusals, and adjudications. His optimal-design experience provides a distinctive eventual extension through sampling adequacy or identifiability. There is no need to build that extension before applying for PhDs.

Rough cost: a few hours for the relevance ablations; roughly 2-4 focused weeks for a defensible small study and release, assuming access to independent domain reviewers.

10. Cut model shopping and additional generated-data volume until the current uncertainty is resolved.

I would postpone Saluki, fighting the d1 Windows serving stack, broad fit/simulation wiring, and expanding the current generator merely to raise row counts. None resolves the central uncertainty: whether B interprets unfamiliar, scientifically consequential requests correctly.

The next work should produce a frozen evaluation contract, an audit of raw-input parsing, a simple parser baseline, the first independently checked challenge set, and reason-coded availability. Those can share fixtures and traces, so their costs are not additive.

Preserve the local serving result, but report its conditions: context length, warm versus cold operation, median and tail latency, and measured total GPU memory. The Saluki coexistence claim needs an observed memory explanation: 7.9 GB of weights plus B's reported 1.9 GB is below 12 GB, but runtime allocations and caches can exhaust the remainder. Weight totals alone cannot decide feasibility.

Then stop optimizing serving unless measurement identifies a concrete blocker. At a reported 0.34 seconds per turn, linguistic and scientific correctness appear to have much higher marginal value than shaving another fraction of a second.

Rough cost: approximately 3-5 focused days for a coherent first evidence package, including several items above; a few hours for serving measurements.

Verdict: I would take Officina seriously as a PhD portfolio project. The independent numerical references, explicit calculation boundary, and willingness to expose flaws in the reference script and scorer are convincing signs of scientific judgment. The current results establish a promising specialist workflow under tightly controlled conditions; they leave substantial uncertainty about unfamiliar language, state interpretation, and useful confidence estimates. The next release should make those uncertainties measurable through simple baselines and independently adjudicated cases. If a lexical classifier matches the 0.8B, or the model fails on new wording, that is still a valuable finding when reported under a frozen protocol. The project becomes more persuasive through precise evidence about where it works and why it fails.
