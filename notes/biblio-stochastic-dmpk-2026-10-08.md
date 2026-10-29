# Bibliography: stochastic processes and DMPK (Officina), 2026-10-08

Legend: [F] page fetched and read; unmarked = confirmed via search-result metadata only; [?] a detail (URL, title or page) not confirmed. Full texts were not read.

## 1. SDEs in PK/PD
- Tornøe, Overgaard, Agersø, Nielsen, Madsen, Jonsson 2005, "Stochastic differential equations in NONMEM", Pharm Res 22(8):1247-58. https://orbit.dtu.dk/en/publications/stochastic-differential-equations-in-nonmem-implementation-applic/ . Splits system noise from measurement noise via extended Kalman filter (EKF); system noise flags misspecification.
- Overgaard, Jonsson, Tornøe, Madsen 2005, "Non-linear mixed-effects models with SDEs: implementation of an estimation algorithm", J Pharmacokinet Pharmacodyn 32(1):85-107. Only the PAGE 2004 poster found: https://www.page-meeting.org/page/page2004/PAGE2004P55.pdf [?journal URL]. FOCE + EKF likelihood.
- Leander, Almquist, Ahlström, Gabrielsson, Jirstrand 2015, AAPS J 17(3):586-596. https://pmc.ncbi.nlm.nih.gov/articles/PMC4406960/ . Ignoring system noise biases parameters and inflates residual error.
- Wiqvist, Golightly, McLean, Picchini 2021, Comput Stat Data Anal 157:107151. https://arxiv.org/abs/1907.09851 . Bayesian SDE mixed-effects via correlated pseudo-marginal particle MCMC.
- Kristensen, Madsen, Jørgensen 2004, "Parameter estimation in stochastic grey-box models", Automatica 40:225-237, doi:10.1016/j.automatica.2003.10.001 [?not opened].
Maturity: linear/Gaussian EKF mature (R package PSM, CTSM). Open: positivity (Wiener noise on concentrations), non-Gaussian filters, identifiability of system vs measurement noise, scalability.

## 2. Population PK inference and MIPD
- Kuhn & Lavielle 2005, SAEM coupled with MCMC, ESAIM P&S 8:115-131 [?URL; see https://www.page-meeting.org/Abstracts/maximum-likelihood-estimation-in-nonlinear-mixed-effects-models/]. Basis of Monolix.
- Margossian, Zhang, Gillespie 2022, "Flexible and efficient Bayesian pharmacometrics modeling using Stan and Torsten, Part I", CPT:PSP 11(9):1151-69. https://pmc.ncbi.nlm.nih.gov/articles/PMC9469701 (HMC/NUTS).
- Thoma, Hartung, Opper, Huisinga 2025, "Hierarchical Bayesian estimation for continual learning during MIPD", arXiv 2505.20240 [F]. https://arxiv.org/abs/2505.20240 . Nested particle filter; closest paper to your friend's profile.
- Maier, Hartung, de Wiljes, Kloft, Huisinga 2019, arXiv 1909.09451 [F]. https://arxiv.org/abs/1909.09451 . Bayesian data assimilation for chemotherapy decisions.
- Darwich et al. 2021, MIPD review, Annu Rev Pharmacol Toxicol. https://annualreviews.org/doi/pdf/10.1146/annurev-pharmtox-033020-113257
Maturity: SAEM/NUTS routine for ODE models; sequential Monte Carlo (SMC) for online MIPD is young; randomized outcome evidence for MIPD is thin.

## 3. Interacting particles and mean-field limits
- Del Moral 2004, Feynman-Kac Formulae, Springer. https://link.springer.com/book/9781441919021
- Del Moral, Doucet, Jasra 2006, "Sequential Monte Carlo samplers", JRSS-B 68:411-436. https://arxiv.org/abs/cond-mat/0212648
- Chaintron & Diez 2022, "Propagation of chaos: a review", Kinet Relat Models 15(6). https://arxiv.org/abs/2203.00446 (Part II https://arxiv.org/abs/2106.14812)
- Garbuno-Inigo, Hoffmann, Li, Stuart 2020, ensemble Kalman sampler, SIADS 19(1):412-441. https://arxiv.org/abs/1903.08866 ; correction by Nüsken & Reich https://arxiv.org/abs/1908.10890
- Collin, Prague, Moireau 2022, population-based Kalman filter on PK benchmarks, MathS In Action 11(1):213-242 [F]. https://msia.centre-mersenne.org/articles/10.5802/msia.25
- Chae & Choi 2026, tumour-phenotype McKean-Vlasov, arXiv 2603.12802 (no drug term). https://arxiv.org/abs/2603.12802
Maturity: theory deep, but I found no PK-specific mean-field or propagation-of-chaos paper (a gap). Linear PK is the trivial non-interacting limit; interaction appears in saturable binding, cell PD, and in the algorithms (SMC, ensemble Kalman).

## 4. Diffusion in tissue, imaging
- Le Bihan et al. 1988, IVIM, Radiology 168(2):497-505. https://pubmed.ncbi.nlm.nih.gov/3393671/ . Biexponential diffusion + pseudo-diffusion model: same fitting problem as PK.
- Grebenkov 2007, "NMR survey of reflected Brownian motion", Rev Mod Phys 79:1077. https://link.aps.org/doi/10.1103/RevModPhys.79.1077
- Tofts et al. 1999, DCE-MRI standardized symbols, JMRI 10(3):223-232. https://pubmed.ncbi.nlm.nih.gov/10508281
- Patlak 1983 JCBFM 3:1-7 (doi:10.1038/jcbfm.1983.1); Logan 1990 JCBFM 10:740-747 (doi:10.1038/jcbfm.1990.127); Innis 2007 JCBFM 27:1533-39 https://journals.sagepub.com/doi/10.1038/sj.jcbfm.9600493
- Korzekwa, Radice, Nagar 2022, permeability+perfusion PBPK, Clin Transl Sci 15:2035 [F]. https://pmc.ncbi.nlm.nih.gov/articles/PMC9372417 ; Thompson & Beard 2011, J Pharm Sci [F]. https://pmc.ncbi.nlm.nih.gov/articles/PMC3314064
- Islam, Barua, Barua 2017, Brownian dynamics of nanoparticle tissue penetration, BMC Syst Biol. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5702122/
Maturity: imaging kinetics mature but noise-naive (Logan has known noise-induced bias); particle/Brownian-dynamics tissue models are research-grade, rarely linked to clinical PK.

## 5. UQ, calibration, regulation
- Angelopoulos & Bates 2023, conformal prediction, FnTML. https://arxiv.org/abs/2107.07511
- Guo, Pleiss, Sun, Weinberger 2017, calibration, ICML. https://proceedings.mlr.press/v70/guo17a.html
- Cranmer, Brehmer, Louppe 2020, simulation-based inference, PNAS 117:30055. https://pmc.ncbi.nlm.nih.gov/articles/PMC7720103
- Fagerholm et al. 2022 (preprint), conformal intervals for human PK parameters. https://www.biorxiv.org/content/10.1101/2022.11.10.515917.full.pdf
- FDA draft guidance, AI for regulatory decision-making, Jan 2025 (risk-based credibility, context of use). https://www.fda.gov/regulatory-information/search-fda-guidance-documents/considerations-use-artificial-intelligence-support-regulatory-decision-making-drug-and-biological
- EMA/FDA ten Good AI Practice principles, Jan 2026. https://www.raps.org/resource/ema-fda-issue-joint-ai-guiding-principles-for-drug.html ; ICH M15 (MIDD, final Jan 2026). https://www.ema.europa.eu/en/documents/scientific-guideline/ich-m15-guideline-general-principles-model-informed-drug-development-step-5_en.pdf
Maturity: no conformal work on population PK or MIPD found; coverage under dosing histories and per-patient (conditional) validity are open.

## 6. Market and open source
- The leading commercial PK software vendor, FY2025 annual report: revenue $418.8M, software $183.3M. https://www.sec.gov/Archives/edgar/data/1827090/000182709026000011/cert-20251231.htm
- Simulations Plus bought Lixoft (Monolix) April 2020, about $6M; Monolix about 20% of software revenue. https://www.simulations-plus.com/resource/simulations-plus-acquires-lixoft-expanding-modeling-software-offerings-and-broadening-presence-in-europe/
- Pumas-AI (Julia; DeepNLME neural-embedded models). https://tutorials.pumas.ai/html/DeepPumas/01-getting_started.html
- InsightRX (claims over 1,000 hospital sites; vendor claim) https://blog.insight-rx.com/press-releases/insightrx-surpasses-1000-customer-sites ; DoseMe (Bayesian dosing; acquired by Fairlong 2023) https://www.cbinsights.com/company/doseme
- Open source: PKNCA (Denney 2015, doi:10.1007/s10928-015-9432-2); nlmixr (Fidler 2019, doi:10.1002/psp4.12445; Schoemaker 2019, doi:10.1002/psp4.12471); mrgsolve https://metrumrg.com/publication/simulation-ode-based-population-pkpd-systems-pharmacology-models-r-mrgsolve/ ; Stan https://www.jstatsoft.org/v76/i01 ; Torsten (see section 2).
Maturity: consolidated incumbents; NLME is commoditised by nlmixr/Stan. Differentiators are PBPK libraries, regulatory validation, and Bayesian MIPD. I found no mainstream SDE-NLME product (Monolix SDE support seen only as a PAGE abstract).

## Synthesis: three bridges, by feasibility
1. SDE-PK with particle filtering in Caladrius (high): one-compartment SDE with positivity-preserving noise (log-OU or CIR), bootstrap/auxiliary particle filter versus EKF, validated on simulated truth. Extend to online Bayesian updating for MIPD (Thoma 2025). Runs on CPU or one GPU; clear theorems (filter stability, bias) for a probabilist.
2. Calibration and conformal guarantees for Apothicaire decision models, with Caladrius as simulator for simulation-based inference (medium-high): exchangeability fails under dosing histories, a genuine probabilistic question; maps onto FDA/ICH M15 credibility language.
3. Imaging kinetics (IVIM, Tofts, Patlak, Logan) with reflected-Brownian forward models (medium-low): NeuroSpin access helps, but data governance and domain depth are heavy. Mean-field/propagation-of-chaos for cell-population PD is publishable theory but not an engineering deliverable.
