// Every visible string of the site, in French (default) and English.
// Numbers quoted here come from the repositories' own reports; each one names its source file.

export type Lang = 'fr' | 'en';

const GH = 'https://github.com/abdou-rgd';

export const links = {
  officina: `${GH}/officina`,
  caladrius: `${GH}/caladrius`,
  apothicaire: `${GH}/apothicaire`,
  optchat: `${GH}/optchat`,
  method: `${GH}/officina/blob/main/METHOD.md`,
  validation: `${GH}/caladrius/blob/main/docs/validation.md`,
  conformance: `${GH}/caladrius/blob/main/docs/conformance.md`,
  // bench/runs/2026-10-17-27b-upstream-full/report.md: 193/200 turns, 0/897 unverified numbers.
  bench: `${GH}/apothicaire/blob/main/bench/runs/2026-10-17-27b-upstream-full/report.md`,
  profile: GH
};

export const positioning: Record<Lang, { lead: string; shine: string }> = {
  fr: {
    lead: 'Moteur PK ouvert, déterministe et vérifié, avec un assistant local ',
    shine: 'qui ne calcule jamais.'
  },
  en: {
    lead: 'An open, deterministic and verified pharmacokinetic engine, with a local assistant ',
    shine: 'that never computes a number itself.'
  }
};

const fr = {
  nav: { tools: 'Outils', validation: 'Validation', method: 'Méthode', roadmap: 'Feuille de route', about: 'Auteur' },
  ui: {
    langSwitch: 'English',
    langSwitchLabel: 'Read this page in English',
    themeLabel: 'Thème',
    themes: { system: 'Système', light: 'Clair', dark: 'Sombre' },
    skip: 'Aller au contenu'
  },
  hero: {
    eyebrow: 'Officina · chaîne d’outils DMPK locale et vérifiable',
    sub: 'Trois outils open source pour la pharmacocinétique : un moteur de calcul vérifié contre des références indépendantes, un assistant qui tourne sur un seul PC, et sa mémoire. Rien ne quitte la machine.',
    note: 'Prototype de recherche. Données synthétiques uniquement.',
    ctaCode: 'Voir le code',
    ctaValidation: 'Lire la validation'
  },
  facts: [
    { value: '48 955 / 48 955', label: 'valeurs conformes aux références indépendantes' },
    { value: '1 PC', label: 'une carte graphique de 12 Go, aucun appel au cloud' },
    { value: 'MIT / Apache-2.0', label: 'tout le code est ouvert, sous l’une ou l’autre licence' }
  ],
  tools: {
    title: 'Trois outils, une règle',
    intro: 'Le modèle de langage lit, choisit le calcul et explique. Il ne produit jamais un nombre pharmacocinétique : ce rôle revient au moteur, et une vérification sans IA contrôle chaque réponse.',
    items: [
      {
        key: 'caladrius',
        name: 'Caladrius',
        role: 'l’instrument',
        body: 'Moteur PK en Rust : analyse non compartimentale, modèles à un et deux compartiments, doses multiples et état d’équilibre, ajustement par moindres carrés pondérés. Chaque analyse est une commande à identifiant stable, la même depuis l’interface de bureau, la ligne de commande et un serveur MCP.',
        meta: 'Rust · v0.2.0 · MIT OR Apache-2.0'
      },
      {
        key: 'apothicaire',
        name: 'Apothicaire',
        role: 'l’artisan',
        body: 'Assistant DMPK local : un modèle de langage ouvert (Bonsai 2 27B sur llama.cpp) lit la demande, appelle Caladrius et explique le résultat. Une porte déterministe rejette tout nombre qui ne vient ni d’un résultat d’outil ni du message de l’utilisateur.',
        meta: 'Python · MIT OR Apache-2.0'
      },
      {
        key: 'optchat',
        name: 'OptChat',
        role: 'la mémoire',
        body: 'Mémoire de conversation sans fin : tout l’historique reste sur disque, le modèle voit les messages récents mot pour mot et les plus anciens fusionnés en lignes de résumé rangées en arbre binaire. Rien n’est effacé. D’après une idée de Victor Taelin.',
        meta: 'Python · MIT OR Apache-2.0'
      }
    ],
    diagram: {
      title: 'Comment les trois pièces s’articulent',
      user: 'Utilisateur',
      userSub: 'question en français ou en anglais',
      apothicaire: 'Apothicaire',
      model: 'Modèle de langage',
      modelSub: 'route et explique',
      memory: 'OptChat',
      memorySub: 'mémoire',
      gate: 'Porte des nombres',
      gateSub: 'Python, sans IA',
      caladrius: 'Caladrius',
      engine: 'Moteur PK',
      engineSub: 'NCA, modèles, ajustement',
      oracle: 'Références R',
      oracleSub: 'PKNCA, nls, 256 bits',
      mcp: 'appels MCP',
      results: 'nombres avec unités',
      checked: 'vérifié par',
      answer: 'réponse dont chaque nombre est tracé',
      caption: 'Le modèle de langage est la seule pièce qui peut se tromper ; il est entouré de pièces qui ne le peuvent pas.'
    }
  },
  validation: {
    title: 'Chaque nombre recalculé ailleurs',
    intro: 'Les valeurs attendues ne viennent d’aucun logiciel commercial. Elles sont produites par des calculs indépendants en R, à partir de données publiques ou synthétiques, avec des scripts versionnés.',
    headline: 'valeurs conformes',
    headlineNote: '16 autres valeurs sont des différences de méthode documentées, ni validées ni comptées comme échecs.',
    cols: { domain: 'Domaine', oracle: 'Référence indépendante', values: 'Valeurs', cases: 'Cas', tol: 'Tolérance relative' },
    rows: [
      { domain: 'Analyse non compartimentale', oracle: 'PKNCA 0.12.1', values: '3 744', cases: '20', tol: '1e-6' },
      { domain: 'Modèles à 1 et 2 compartiments, doses multiples', oracle: 'formes closes en arithmétique 256 bits (Rmpfr), recoupées par expm et deSolve', values: '34 711', cases: '440', tol: '1e-12' },
      { domain: 'Ajustement pondéré', oracle: 'R nls et nlsLM, qui doivent s’accorder', values: '10 500', cases: '30', tol: '1e-4' }
    ],
    meaning: '« Validé » a ici un sens étroit : un nombre produit par Caladrius est égal à un nombre calculé indépendamment, à une tolérance donnée, sur un cas donné. Les tolérances sont définies une seule fois et les seuils de conformité vérifiés en intégration continue ne peuvent que monter.',
    scope: 'Hors périmètre : modélisation de population, bioéquivalence, PBPK, IVIVC.',
    linkReport: 'Rapport de validation',
    linkConformance: 'Table de conformité'
  },
  method: {
    title: 'Une IA locale qui ne produit aucun nombre',
    steps: [
      { title: 'Le modèle route', body: 'Il lit les données et la question, choisit l’analyse et appelle l’outil Caladrius qui convient.' },
      { title: 'Le moteur calcule', body: 'Caladrius renvoie chaque valeur avec son unité. C’est la seule source des nombres pharmacocinétiques.' },
      { title: 'La porte vérifie', body: 'Un filtre en Python, sans apprentissage, relit chaque réponse. Un nombre absent des résultats d’outil et du message de l’utilisateur déclenche une régénération, puis un avertissement visible.' }
    ],
    benchTitle: 'Ce que mesure le benchmark',
    bench: 'Sur 25 exercices synthétiques de 8 tours chacun : 0 nombre non tracé sur 897 dans les premiers jets, et 193 tours corrects sur 200 selon un second contrôle par oracle (Bonsai 2 27B, llama.cpp sans fork).',
    benchCaveat: 'Ces chiffres sont mesurés sur le jeu qui a servi à mettre au point l’outil, en un seul passage : ce sont des comptes, pas des garanties. Un jeu de test gelé, hors échantillon, est la prochaine étape.',
    benchLink: 'Rapport du benchmark',
    buildTitle: 'Comment le code est écrit',
    build: 'Le code est écrit par des agents IA sous un contrat écrit, avec un tableau de petites cartes, des rôles séparés pour qui écrit un nombre, qui le teste et qui relit, et des revues indépendantes par d’autres modèles. L’auteur répond aux questions et décide de ce qui est publié.',
    buildLink: 'Lire METHOD.md'
  },
  roadmap: {
    title: 'Feuille de route',
    items: [
      { title: 'Jeu de test gelé', body: 'Des exercices hors échantillon, fixés et pré-enregistrés avant d’être lancés, pour mesurer l’assistant honnêtement.' },
      { title: 'Porte des nombres v2', body: 'Un rendu typé à partir des résultats structurés des outils, pour qu’un nombre sans source ou une unité fausse soient impossibles par construction.' },
      { title: 'Kit de validation', body: 'Jeux de référence, tolérances et rapport d’exécution régénérables, avec une vérification de dérive en intégration continue.' },
      { title: 'PAGE 2027', body: 'Un résumé sur la comparaison indépendante d’outils NCA ouverts.' }
    ]
  },
  about: {
    title: 'Qui porte le projet',
    name: 'Abdallah Ragued',
    body: 'Étudiant en M2 Modélisation pharmacocinétique à l’Université Paris Cité, après un M2 Health Data Science à l’Université Paris-Saclay. Officina est le portfolio d’une thèse visée entre DMPK et intelligence artificielle. Le nom vient du latin : l’atelier de l’apothicaire.',
    github: 'GitHub : abdou-rgd'
  },
  footer: {
    repos: 'Dépôts',
    licenses: 'Licences',
    licenseText: 'Code et textes sous MIT OR Apache-2.0, au choix. Composants d’animation React Bits sous leur propre licence (MIT + Commons Clause).',
    credit: 'Logo de Caladrius dessiné par Amina.',
    privacy: 'Ce site n’utilise ni cookie, ni traceur, ni police externe.',
    disclaimer: 'Prototype de recherche, sans statut réglementaire. Ne pas utiliser pour un patient ou une décision réelle.'
  }
};

export type Dict = typeof fr;

const en: Dict = {
  nav: { tools: 'Tools', validation: 'Validation', method: 'Method', roadmap: 'Roadmap', about: 'Author' },
  ui: {
    langSwitch: 'Français',
    langSwitchLabel: 'Lire cette page en français',
    themeLabel: 'Theme',
    themes: { system: 'System', light: 'Light', dark: 'Dark' },
    skip: 'Skip to content'
  },
  hero: {
    eyebrow: 'Officina · a local, verifiable DMPK toolchain',
    sub: 'Three open-source tools for pharmacokinetics: a calculation engine checked against independent references, an assistant that runs on one PC, and its memory. Nothing leaves the machine.',
    note: 'Research prototype. Synthetic data only.',
    ctaCode: 'See the code',
    ctaValidation: 'Read the validation'
  },
  facts: [
    { value: '48,955 / 48,955', label: 'values matching independent references' },
    { value: '1 PC', label: 'one 12 GB graphics card, no cloud call' },
    { value: 'MIT / Apache-2.0', label: 'all the code is open, under either license' }
  ],
  tools: {
    title: 'Three tools, one rule',
    intro: 'The language model reads, picks the calculation and explains. It never produces a pharmacokinetic number: that is the engine’s job, and a check with no AI in it reads every answer.',
    items: [
      {
        key: 'caladrius',
        name: 'Caladrius',
        role: 'the instrument',
        body: 'A PK engine in Rust: non-compartmental analysis, one- and two-compartment models, multiple dosing and steady state, weighted least-squares fitting. Every analysis is a command with a stable id, the same from the desktop interface, the command line and an MCP server.',
        meta: 'Rust · v0.2.0 · MIT OR Apache-2.0'
      },
      {
        key: 'apothicaire',
        name: 'Apothicaire',
        role: 'the artisan',
        body: 'A local DMPK assistant: an open language model (Bonsai 2 27B on llama.cpp) reads the request, calls Caladrius and explains the result. A deterministic gate rejects any number that comes neither from a tool result nor from the user’s message.',
        meta: 'Python · MIT OR Apache-2.0'
      },
      {
        key: 'optchat',
        name: 'OptChat',
        role: 'the memory',
        body: 'Endless chat memory: the whole history stays on disk, and the model sees recent messages verbatim and older ones merged into summary lines arranged as a binary tree. Nothing is deleted. After an idea by Victor Taelin.',
        meta: 'Python · MIT OR Apache-2.0'
      }
    ],
    diagram: {
      title: 'How the three pieces fit together',
      user: 'User',
      userSub: 'question in French or English',
      apothicaire: 'Apothicaire',
      model: 'Language model',
      modelSub: 'routes and explains',
      memory: 'OptChat',
      memorySub: 'memory',
      gate: 'Number gate',
      gateSub: 'Python, no AI',
      caladrius: 'Caladrius',
      engine: 'PK engine',
      engineSub: 'NCA, models, fitting',
      oracle: 'R references',
      oracleSub: 'PKNCA, nls, 256-bit',
      mcp: 'MCP calls',
      results: 'numbers with units',
      checked: 'checked by',
      answer: 'answer with every number traced',
      caption: 'The language model is the one part that can be wrong; it is surrounded by parts that cannot.'
    }
  },
  validation: {
    title: 'Every number computed twice',
    intro: 'No expected value comes from commercial software. They are produced by independent calculations in R, from public or synthetic data, with versioned scripts.',
    headline: 'values matching',
    headlineNote: '16 further values are documented method differences, neither validated nor counted as failures.',
    cols: { domain: 'Domain', oracle: 'Independent reference', values: 'Values', cases: 'Cases', tol: 'Relative tolerance' },
    rows: [
      { domain: 'Non-compartmental analysis', oracle: 'PKNCA 0.12.1', values: '3,744', cases: '20', tol: '1e-6' },
      { domain: 'One- and two-compartment models, multiple dosing', oracle: 'closed forms in 256-bit arithmetic (Rmpfr), cross-checked with expm and deSolve', values: '34,711', cases: '440', tol: '1e-12' },
      { domain: 'Weighted fitting', oracle: 'R nls and nlsLM, which must agree', values: '10,500', cases: '30', tol: '1e-4' }
    ],
    meaning: '“Validated” has a narrow meaning here: a number produced by Caladrius equals a number computed independently, within a stated tolerance, on a stated case. Tolerances are defined once, and the conformance floors checked in continuous integration can only go up.',
    scope: 'Out of scope: population modelling, bioequivalence, PBPK, IVIVC.',
    linkReport: 'Validation report',
    linkConformance: 'Conformance table'
  },
  method: {
    title: 'A local AI that produces no number',
    steps: [
      { title: 'The model routes', body: 'It reads the data and the question, picks the analysis and calls the matching Caladrius tool.' },
      { title: 'The engine computes', body: 'Caladrius returns every value with its unit. It is the only source of pharmacokinetic numbers.' },
      { title: 'The gate checks', body: 'A plain Python filter, not a learned one, reads every answer. A number found neither in the tool results nor in the user’s message triggers one regeneration, then a visible warning.' }
    ],
    benchTitle: 'What the benchmark measures',
    bench: 'On 25 synthetic exercises of 8 turns each: 0 untraced numbers out of 897 in the first drafts, and 193 of 200 turns correct by a second, oracle-based check (Bonsai 2 27B, llama.cpp without a fork).',
    benchCaveat: 'These figures are measured on the set used to develop the tool, in one run: they are counts, not guarantees. A frozen, out-of-sample test set is the next step.',
    benchLink: 'Benchmark report',
    buildTitle: 'How the code is written',
    build: 'The code is written by AI coding agents under a written contract, with a board of small task cards, separate roles for whoever writes a number, whoever tests it and whoever reviews it, and independent reviews by other models. The author answers questions and decides what is published.',
    buildLink: 'Read METHOD.md'
  },
  roadmap: {
    title: 'Roadmap',
    items: [
      { title: 'Frozen test set', body: 'Out-of-sample exercises, fixed and pre-registered before they are run, to measure the assistant honestly.' },
      { title: 'Number gate v2', body: 'Typed rendering from the tools’ structured results, so that an unsourced number or a wrong unit is impossible by construction.' },
      { title: 'Validation kit', body: 'Reference sets, tolerances and a regenerable execution report, with a drift check in continuous integration.' },
      { title: 'PAGE 2027', body: 'An abstract on the independent comparison of open NCA tools.' }
    ]
  },
  about: {
    title: 'Who is behind it',
    name: 'Abdallah Ragued',
    body: 'Master’s student in pharmacokinetic modelling at Université Paris Cité, after a Master’s in health data science at Université Paris-Saclay. Officina is the portfolio for a PhD at the meeting point of DMPK and artificial intelligence. The name is Latin for the apothecary’s workshop.',
    github: 'GitHub: abdou-rgd'
  },
  footer: {
    repos: 'Repositories',
    licenses: 'Licenses',
    licenseText: 'Code and text under MIT OR Apache-2.0, at your option. React Bits animation components under their own license (MIT + Commons Clause).',
    credit: 'Caladrius logo drawn by Amina.',
    privacy: 'This site uses no cookies, no trackers and no external fonts.',
    disclaimer: 'Research prototype with no regulatory status. Not for use on a patient or for a real decision.'
  }
};

export const dict: Record<Lang, Dict> = { fr, en };
