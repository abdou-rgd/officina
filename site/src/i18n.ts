// Every visible string of the site, in French (default) and English.
// Numbers quoted here come from the repositories' own reports; the comments name each source.
// The numbers of the worked example (specimen) are not here: they are read from specimen.json,
// which Caladrius writes (see specimen/make_specimen.py).

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
  whyRust: `${GH}/caladrius/blob/main/docs/history.md#in-plain-words-as-it-was-written-on-2026-10-29`,
  usage: `${GH}/caladrius#usage`,
  mcp: `${GH}/caladrius#mcp`,
  desktop: `${GH}/caladrius#desktop`,
  releases: `${GH}/caladrius/releases`,
  // The desktop application of the latest Caladrius release (Windows and Linux archives).
  download: `${GH}/caladrius/releases/latest`,
  layers: `${GH}/caladrius/blob/main/AGENTS.md`,
  gate: `${GH}/apothicaire/blob/main/gate.py`,
  specimen: `${GH}/officina/blob/main/site/specimen/make_specimen.py`,
  // bench/runs/2026-10-17-27b-upstream-full/report.md: 193/200 turns, 0/897 unverified numbers,
  // 141/141 valid tool calls, 8.0 s per turn.
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
  nav: {
    caladrius: 'I · Caladrius',
    validation: 'II · Validation',
    apothicaire: 'III · Apothicaire',
    atelier: 'IV · L’Atelier',
    menu: 'Sommaire'
  },
  ui: {
    langSwitchLabel: 'Read this page in English',
    themeLabel: 'Thème',
    themes: { system: 'Thème du système', light: 'Thème clair', dark: 'Thème sombre' },
    skip: 'Aller au contenu'
  },
  hero: {
    eyebrow: 'Officina · un moteur PK sans IA, un assistant local sous contrôle',
    intro:
      'Officina (du latin : l’officine, l’atelier de l’apothicaire) réunit deux outils qui ne se mélangent pas. Caladrius, le moteur de calcul, ne contient aucune IA : même entrée, même nombre, et il s’utilise seul. Apothicaire, l’assistant local, ne calcule jamais : il demande chaque nombre à Caladrius, et une porte en Python contrôle sa réponse avant l’écran. Derrière l’atelier, une question : à quelles conditions peut-on confier des nombres pharmacocinétiques à une petite IA locale ?',
    pair: [
      {
        key: 'caladrius',
        tag: 'Aucune IA · Instrument',
        name: 'Caladrius',
        role: 'le moteur de calcul',
        body: 'Il mesure : analyse non compartimentale, modèles à 1 et 2 compartiments, ajustement pondéré. Un binaire Rust déterministe, vérifié sur 48 955 valeurs face à R, qui s’utilise seul.',
        repoLabel: 'abdou-rgd/caladrius'
      },
      {
        key: 'apothicaire',
        tag: 'IA locale · Artisan',
        name: 'Apothicaire',
        role: 'l’assistant sous contrôle',
        body: 'Il explique : un modèle ouvert sur une carte de 12 Go (Bonsai 2 27B) doté d’un registre en arbre (OptChat), qui demande chaque nombre à Caladrius sous la garde d’une porte en Python.',
        repoLabel: 'abdou-rgd/apothicaire'
      }
    ],
    ctaTry: 'Essayer Caladrius',
    ctaDownload: 'Télécharger Caladrius',
    ctaCode: 'Voir les dépôts',
    // The browser build is apps/caladrius-web in the caladrius repository, served under /app/.
    tryNote:
      'Caladrius s’ouvre dans le navigateur, sans rien installer : quelques mégaoctets chargés une fois, puis tout se calcule dans la page. Vos fichiers n’en sortent pas. Mieux sur un ordinateur. Le téléchargement donne l’application de bureau, pour Windows et Linux.',
    soon: 'Apothicaire : une version installable arrive bientôt. Le code, lui, est déjà public.',
    note: 'Prototype de recherche. Données synthétiques uniquement, sans statut réglementaire.'
  },
  specimen: {
    title: 'Un calcul de Caladrius',
    synthetic: 'profil synthétique',
    linear: 'Linéaire',
    semilog: 'Semi-log',
    scaleLabel: 'Échelle de l’axe des concentrations',
    time: 'Temps',
    conc: 'Concentration',
    observed: 'observé',
    lzPoints: 'points de λz',
    lzLine: 'régression terminale',
    extrapolated: 'aire extrapolée',
    zeroHidden: 'le point à 0 n’est pas tracé en semi-log',
    keys: { cmax: 'Cmax', 'half.life': 't½', 'aucinf.obs': 'AUC0-∞', 'cl.obs': 'CL/F' },
    lzNote: (n: string, from: string, to: string, r2: string) =>
      `λz sur ${n} points, de ${from} à ${to} h, R² ajusté ${r2}`,
    caption:
      'Modèle oral à un compartiment simulé par Caladrius, bruit proportionnel de 6 %, puis analyse non compartimentale par la commande nca.run (aires lin-up/log-down). Aucun nombre de cette figure n’est écrit à la main.',
    script: 'Le script qui la produit',
    plotLabel: 'Profil concentration-temps et résultats de l’analyse non compartimentale'
  },
  caladrius: {
    kicker: 'Chapitre I · Caladrius · L’instrument (aucune IA)',
    title: 'Un moteur de calcul à livres ouverts. Aucune IA à l’intérieur.',
    intro:
      'Dans les bestiaires médiévaux, le caladrius est l’oiseau blanc qui se pose au chevet du malade et regarde le mal en face. Le moteur qui porte son nom exécute les calculs classiques de la pharmacocinétique, comme le ferait un package R : il ne devine rien, il calcule. Même entrée, même version, même nombre. Il s’utilise seul, sans Apothicaire.',
    specTitle: 'Périmètre mathématique (v0.3.2)',
    spec: [
      {
        k: 'Analyse non compartimentale',
        v: 'Aires linéaires, lin-up/log-down ou mixtes ; λz choisi automatiquement ou à la main ; t½, AUMC, MRT, CL/F, Vz/F, Vss ; valeurs sous la limite de quantification et valeurs manquantes.'
      },
      {
        k: 'Modèles compartimentaux',
        v: 'Six modèles à un compartiment et six à deux compartiments (trois paramétrisations), avec doses multiples et état d’équilibre.'
      },
      {
        k: 'Ajustement pondéré',
        v: 'Moindres carrés pondérés (cinq pondérations), erreurs-types, CV %, intervalles de confiance, matrices de corrélation, AIC, SBC et diagnostics.'
      },
      {
        k: 'Données et traçabilité',
        v: 'CSV à virgule décimale et point-virgule, unités lues dans les en-têtes et vérifiées avant l’import ; un fichier de projet unique conserve données, analyses et historique des commandes.'
      },
      {
        k: 'Hors périmètre aujourd’hui',
        v: 'Modélisation de population, bioéquivalence, PBPK, IVIVC. Pour ces domaines, R et les logiciels dédiés restent les bons outils.'
      }
    ],
    doorsTitle: 'Une seule API, trois portes',
    doorsIntro:
      'Les 25 commandes (nca.run, fit.run, model.simulate, analysis.compare…) ont un identifiant stable et un schéma JSON strict. L’application de bureau, la page dans le navigateur, le terminal et le serveur MCP appellent exactement les mêmes : un agent obtient les mêmes nombres qu’un humain, unités comprises.',
    doors: {
      desktop: 'Interface de bureau',
      cli: 'Ligne de commande',
      mcp: 'Serveur MCP'
    },
    doorsShort: {
      desktop: 'Bureau',
      cli: 'Terminal',
      mcp: 'MCP'
    },
    desktopCaption:
      'L’analyse non compartimentale dans l’application de bureau (egui). L’interface ne contient aucun code numérique : chaque valeur et chaque courbe viennent des commandes du moteur.',
    screensAlt: {
      nca: 'Page NCA de Caladrius : options, résultats et courbe concentration-temps',
      import: 'Aperçu d’import d’un CSV français, point-virgule et virgule décimale',
      fit: 'Résultats d’un ajustement : estimations, intervalles, résidus'
    },
    screensMore: 'Toutes les captures',
    excerpt: 'extrait',
    cliCaption: 'La même analyse dans un terminal ; --format json donne le résultat complet.',
    mcpCaption:
      'Serveur MCP sur l’entrée et la sortie standard, sans réseau. Chaque outil publie son inputSchema et son outputSchema ; un résultat est du JSON avec structuredContent.',
    whyTitle: 'Pourquoi un binaire Rust, quand des packages R existent ?',
    whyIntro:
      'C’est la première question des pharmacométriciens, et elle est juste. Les packages R comme PKNCA restent nos références : Caladrius est vérifié contre eux, valeur par valeur. Il ne cherche pas à remplacer R pour qui travaille en R ; il apporte ce qu’une bibliothèque de scripts ne vise pas.',
    pillars: [
      {
        n: '01',
        title: 'Une application autonome de 9 Mo, pas une bibliothèque',
        body: 'Une seule archive (9 Mo sous Windows, 12 Mo sous Linux) contient l’interface de bureau, le terminal et le serveur MCP : ni R ni packages à installer, aucune ligne de code à écrire pour lancer une analyse. Le même code compile en WebAssembly : la même interface tourne dans le navigateur.',
        proof: 'Binaires v0.3.2 publiés',
        href: 'releases'
      },
      {
        n: '02',
        title: 'Un contrat typé qui interdit le bricolage',
        body: 'Au lieu de laisser un modèle de langage écrire du code R à la volée, Caladrius expose 25 commandes fermées dont les entrées, les sorties et les unités sont fixées par schéma. L’humain dans sa fenêtre et l’agent par MCP passent par la même porte.',
        proof: 'Documentation MCP',
        href: 'mcp'
      },
      {
        n: '03',
        title: 'Une erreur lisible plutôt qu’un plantage (≈ 9 ms sur Theoph)',
        body: 'Le code ne contient aucun bloc unsafe et le linter interdit unwrap et panic! dans les briques de calcul : un CSV mal formé ou une demi-vie non estimable renvoie un motif explicite au lieu de planter. L’analyse complète des 12 sujets de Theoph prend environ 9 ms, démarrage compris.',
        proof: 'Pourquoi Rust (historique de Caladrius)',
        href: 'whyRust'
      },
      {
        n: '04',
        title: 'Ouvert, modulaire et gouverné par tests',
        body: 'Publié sous licence MIT ou Apache-2.0. Les briques numériques (nca, models, fit, project) sont isolées de l’interface et vérifiées en intégration continue : aucune règle mathématique ne vit cachée dans un bouton.',
        proof: 'Contrat d’architecture (AGENTS.md)',
        href: 'layers'
      }
    ]
  },
  validation: {
    kicker: 'Chapitre II · Validation · Le standard de vérification',
    title: 'Chaque nombre recalculé ailleurs, avant d’être cru.',
    intro:
      'Toutes les valeurs attendues sont produites par des calculs indépendants en R, à partir des équations des manuels et de données publiques ou synthétiques, avec des scripts versionnés que chacun peut rejouer.',
    headline: 'valeurs conformes sur 490 cas de test',
    headlineNote:
      '16 autres valeurs sont des différences de méthode documentées (comme le choix d’arrondi ou de convention aux bornes), ni validées ni comptées comme échecs.',
    cols: { domain: 'Domaine', oracle: 'Oracle indépendant en R', values: 'Valeurs', cases: 'Cas', tol: 'Tolérance relative' },
    rows: [
      { key: 'nca', domain: 'Analyse non compartimentale', short: 'NCA', oracle: 'PKNCA 0.12.1', values: 3744, cases: '20', tol: '1e-6' },
      {
        key: 'models',
        domain: 'Modèles à 1 et 2 compartiments, doses multiples',
        short: 'Modèles',
        oracle: 'formes closes en arithmétique 256 bits (Rmpfr), recoupées par expm et deSolve',
        values: 34711,
        cases: '440',
        tol: '1e-12'
      },
      { key: 'fit', domain: 'Ajustement pondéré (WLS)', short: 'Ajustement', oracle: 'R nls et nlsLM, qui doivent s’accorder entre eux', values: 10500, cases: '30', tol: '1e-4' }
    ],
    meaningTitle: 'Un sens étroit et mesurable',
    meaning:
      '« Validé » signifie ici qu’un nombre produit par Caladrius est égal à un nombre calculé indépendamment en R, à une tolérance fixée une seule fois, sur un cas précis. Une commande régénère la table de conformité, et ses seuils en intégration continue ne peuvent que monter.',
    honestTitle: 'Quand l’oracle se trompe',
    honest:
      'Une référence R s’est trompée une fois, et le moteur avait raison : l’écart a été diagnostiqué, documenté puis corrigé dans le script de référence, jamais absorbé en élargissant une tolérance.',
    linkReport: 'Rapport de validation (docs/validation.md)',
    linkConformance: 'Table de conformité (docs/conformance.md)'
  },
  apothicaire: {
    kicker: 'Chapitre III · Apothicaire · L’artisan local sous contrôle',
    title: 'Un assistant local qui ne calcule jamais.',
    intro:
      'Apothicaire est l’autre moitié du banc d’essai : un harnais local qui entoure un modèle de langage ouvert de trois garde-fous complémentaires pour qu’aucun chiffre inventé ou déformé ne parvienne à l’utilisateur.',
    parts: [
      {
        tag: '01 · Le routeur (IA locale)',
        title: 'Bonsai 2 27B sur llama.cpp',
        body: 'Logé sur une seule carte graphique de 12 Go, le modèle lit votre question en français ou en anglais, choisit parmi les commandes MCP de Caladrius et explique ce que le moteur a renvoyé, sans jamais poser une opération lui-même.',
        href: 'apothicaire',
        linkLabel: 'abdou-rgd/apothicaire'
      },
      {
        tag: '02 · La porte des nombres (Python, sans IA)',
        title: 'Contrôle déterministe par gate.py',
        body: 'Placée entre le modèle et l’écran, une porte écrite en Python pur inspecte chaque réponse et signale tout nombre mesuré qui ne figure ni dans les sorties d’outils de Caladrius ni dans votre propre message : le modèle régénère une fois sa réponse, et un nombre encore non tracé reste marqué à l’écran.',
        href: 'gate',
        linkLabel: 'Lire gate.py'
      },
      {
        tag: '03 · Le registre (OptChat)',
        title: 'Mémoire en arbre où rien n’est effacé',
        body: 'Une étude compte vite des dizaines de tours qui saturent 12 Go de mémoire vidéo. D’après une idée de Victor Taelin, OptChat conserve tout sur disque et montre au modèle les messages récents mot pour mot et les plus anciens fusionnés en arbre de résumés (8, 7 et 8 faits plantés sur 8 retrouvés après 32 tours, sur trois runs).',
        href: 'optchat',
        linkLabel: 'abdou-rgd/optchat'
      }
    ],
    flow: {
      title: 'Une question, suivie jusqu’au bout',
      scenarioLabel: 'Choisir un cas',
      scenarios: { ok: 'Le nombre est vérifié', bad: 'Le nombre est rejeté' },
      replay: 'Rejouer',
      steps: ['Question', 'Choix de l’outil (IA)', 'Calcul (Caladrius)', 'Porte des nombres (Python)'],
      ok: {
        question: 'Quelle est la demi-vie terminale de ce profil ?',
        tool: 'le modèle choisit l’analyse non compartimentale',
        draft: 'La demi-vie terminale est de [[hl]] (phase terminale de [[t1]] à [[t2]]).',
        verdict: 'Réponse affichée : chaque nombre mesuré provient d’une sortie de Caladrius.',
        exempt: 'petit entier sans unité, exempté'
      },
      bad: {
        question: 'Et la clairance apparente ?',
        tool: 'le modèle relit le résultat de la même analyse',
        draft: 'CL/F vaut [[cl]], soit [[conv]].',
        conv: '62,5 mL/min',
        rejected: 'absent de tout résultat d’outil : une conversion d’unité faite de tête par le modèle',
        verdict: 'Réponse retenue par gate.py : une régénération sans calcul mental est exigée.'
      },
      found: 'trouvé dans',
      caption:
        'Exemple réel vérifié avec gate.py sur le profil synthétique du haut de page. Les petits entiers sans unité (0 à 20) et les dates sont exemptés ; toute valeur mesurée est contrôlée.'
    },
    benchTitle: 'Ce que mesure le benchmark (et la leçon des 76 nombres)',
    benchStory:
      'Sur 25 exercices synthétiques de 8 tours (200 questions), les premiers jets du modèle contenaient 76 nombres non tracés sur 932 : tous concentrés dans la seule question qui le tentait de soustraire deux résultats de tête. Dès que Caladrius a reçu une commande dédiée (analysis.compare), le compteur est tombé à 0 sur 926 (et il reste à 0 sur 897 sur le runtime actuel). On ne rend pas un modèle fiable en lui demandant d’être prudent, mais en lui retirant le calcul.',
    bench: [
      { value: '0 / 897', label: 'nombre non tracé dans les premiers jets (après ajout de analysis.compare)' },
      { value: '193 / 200', label: 'tours entièrement corrects (tous les nombres attendus présents)' },
      { value: '141 / 141', label: 'appels d’outils MCP valides, aucun refusé ni en échec' },
      { value: '8 s', label: 'par tour en moyenne, en local sur une carte graphique de 12 Go' }
    ],
    benchCaveat:
      'Réserve méthodologique : ces chiffres sont mesurés in-sample, sur le jeu de 25 exercices qui a servi à mettre au point l’outil. Ce sont des comptes, et non des garanties. Un second contrôle par oracle, qui vérifie que le nombre cité est celui du paramètre demandé, valide 166 / 175 tours. La porte actuelle ne détecte pas un bon nombre attaché au mauvais paramètre ; un jeu de test gelé hors échantillon est en préparation pour la mesurer, et la Porte v2 (rendu typé) a été construite pour la lever.',
    benchLink: 'Rapport complet du benchmark',
    gateLink: 'Lire gate.py',
    localTitle: 'Pourquoi un modèle local sur 12 Go, plutôt qu’un grand modèle par abonnement ?',
    localIntro:
      'Les grands modèles en ligne sont remarquables, et le code d’Officina est d’ailleurs écrit avec leur aide. Mais pour interroger des données d’étude et en expliquer les résultats, un modèle ouvert local bien entouré s’impose sur quatre terrains :',
    localPillars: [
      {
        word: 'Confidentialité',
        claim: 'Les données ne quittent jamais la machine.',
        body: 'Concentrations, doses, notes d’étude : rien n’est envoyé à un serveur tiers, aucune clé d’API n’est requise, et l’assistant fonctionne hors ligne. Pour des données pharmacocinétiques sensibles, c’est la condition de départ.'
      },
      {
        word: 'Souveraineté',
        claim: 'Personne ne change le modèle dans votre dos.',
        body: 'Les poids sont sur le disque et leur version est figée : ni retrait imposé, ni changement silencieux de comportement ou de tarif, ni dépendance à un fournisseur. La même chaîne pourra être rejouée à l’identique dans deux ans.'
      },
      {
        word: 'Proportion',
        claim: 'Pas besoin d’un colosse quand le moteur calcule.',
        body: 'Le modèle ne fait aucune mathématique : il comprend la demande, choisit l’outil et explique le résultat. Le calcul revient à Caladrius et le contrôle à la porte Python. Pour ce rôle précis, 27 milliards de paramètres sur 12 Go suffisent.'
      },
      {
        word: 'Modularité',
        claim: 'Une pièce ouverte, adaptable et remplaçable.',
        body: 'Les poids étant ouverts, on peut les quantifier, les affiner sur des exercices de PK ou déléguer le routage à un modèle encore plus léger. Tout modèle servi par llama.cpp peut remplacer Bonsai 2 27B demain et passer le même benchmark.'
      }
    ],
    localQuote:
      'Pour router une question vers le bon calcul et en expliquer le résultat, ce n’est pas la taille du modèle qui limite la fiabilité : c’est la vérification.'
  },
  atelier: {
    kicker: 'Chapitre IV · L’Atelier · Démarche, méthode et feuille de route',
    title: 'Pourquoi j’ai bâti Officina, et comment l’atelier fonctionne.',
    authorSubtitle: 'La démarche et l’auteur',
    authorName: 'Abdallah',
    authorRole: 'M2 Modélisation pharmacocinétique (Université Paris Cité) · M2 Health Data Science (Université Paris-Saclay)',
    authorParagraphs: [
      'Mon cheminement vers la pharmacométrie n’a pas suivi une ligne droite (une licence d’économie, un M1 de santé publique avec un stage de biostatistique à l’IHU ICAN de la Pitié-Salpêtrière, un M2 Health Data Science à Paris-Saclay, et aujourd’hui le M2 Modélisation pharmacocinétique à l’Université Paris Cité), mais il se lit après coup comme une seule question abordée sous trois angles : comment mesurer, modéliser et expliquer proprement l’effet d’un médicament.',
      'Officina est né de deux envies, pendant mes cours. D’abord, comprendre jusqu’au bout les calculs standards de la pharmacocinétique : je les ai reconstruits un par un à partir des manuels de référence (Gabrielsson & Weiner, Gibaldi & Perrier, Rowland & Tozer), avec un test pour chaque règle. Ensuite, mettre à l’épreuve la question que je souhaite porter en thèse de doctorat, à la rencontre de la DMPK et de l’intelligence artificielle : peut-on confier des nombres pharmacocinétiques à une petite IA locale, et sous quelles garanties d’architecture ?',
      'Je travaille seul sur Officina, en orchestrant des agents de programmation sous un contrat écrit (AGENTS.md) fondé sur la séparation des pouvoirs : l’agent qui code le moteur ne rédige jamais les oracles R, un relecteur indépendant traque les chemins de panique et les tolérances relâchées, et d’autres modèles sont mandatés à l’aveugle pour attaquer mes résultats. Le 10 octobre, une revue contradictoire à l’aveugle (74 requêtes difficiles) a réfuté le score de 99,9 % d’un petit modèle de décision (0,8B), qui reposait sur la mémorisation des tournures d’entraînement : j’ai retiré le chiffre flatteur et publié l’échec, qui sert désormais de base au jeu de test gelé. Le 14 octobre, un audit indépendant a relancé les 2 559 tests et régénéré la table de conformité à l’identique.'
    ],
    methodLink: 'Lire le contrat de méthode (METHOD.md)',
    githubLink: 'Profil GitHub (abdou-rgd)',
    roadmapSubtitle: 'Ce qui vient ensuite : une ambition mesurée',
    roadmapIntro:
      'Officina ne vise pas l’étendue d’une suite complète : son périmètre reste étroit et vérifié. La suite tient en quatre chantiers :',
    roadmap: [
      {
        title: '1 · Jeu de test gelé et pré-enregistré',
        body: 'Évaluer Apothicaire hors échantillon sur des requêtes aveugles figées avant l’exécution, avec un barème fixe pour comparer honnêtement plusieurs petits modèles locaux (27B, 9B et micro-modèles de décision).'
      },
      {
        title: '2 · Porte des nombres v2 (rendu typé)',
        body: 'Au lieu d’écrire un chiffre en texte libre, le modèle émet une référence ({{call.param}}) et un code déterministe injecte la valeur, son signe, son unité et le nom de la grandeur directement depuis le schéma MCP de Caladrius. Construite et mesurée in-sample le 21 octobre : 562 / 600 tours corrects contre 583 / 600 pour la porte actuelle, qui reste donc celle de la démonstration.'
      },
      {
        title: '3 · Kit de validation ouvert & PAGE 2027',
        body: 'Publier un kit de validation régénérable (jeux de référence, tolérances, contrôle de dérive en intégration continue) et soumettre à PAGE 2027 une comparaison indépendante des outils NCA ouverts.'
      },
      {
        title: '4 · Caladrius dans le navigateur & extension PK/PD',
        body: 'La version WebAssembly est en ligne (/app/) : étudiants et chercheurs vérifient un profil sans rien installer. La suite : élargir pas à pas le périmètre mathématique.'
      }
    ]
  },
  footer: {
    repos: 'Les quatre dépôts',
    licenses: 'Licences et crédits',
    licenseText:
      'Code et textes publiés sous double licence MIT OR Apache-2.0, au choix. Polices Newsreader et IBM Plex sous SIL Open Font License 1.1, hébergées directement par ce site.',
    credit:
      'Les emblèmes de Caladrius (l’oiseau) et d’Apothicaire (le mortier) ont été dessinés à la main par Amina, une talentueuse amie, puis vectorisés pour l’atelier.',
    privacy: 'Ce site n’utilise ni cookie, ni traceur, ni requête vers un serveur tiers.',
    disclaimer: 'Prototype de recherche, sans statut réglementaire. Ne jamais utiliser pour un patient ou une décision clinique.'
  }
};

export type Dict = typeof fr;

const en: Dict = {
  nav: {
    caladrius: 'I · Caladrius',
    validation: 'II · Validation',
    apothicaire: 'III · Apothicaire',
    atelier: 'IV · The Workshop',
    menu: 'Contents'
  },
  ui: {
    langSwitchLabel: 'Lire cette page en français',
    themeLabel: 'Theme',
    themes: { system: 'System theme', light: 'Light theme', dark: 'Dark theme' },
    skip: 'Skip to content'
  },
  hero: {
    eyebrow: 'Officina · a PK engine with no AI, a local assistant kept in check',
    intro:
      'Officina (Latin for the apothecary’s workshop) brings together two tools that never blur. Caladrius, the calculation engine, contains no AI: same input, same number, and it works on its own. Apothicaire, the local assistant, never computes: it asks Caladrius for every number, and a Python gate checks its answer before it reaches the screen. Behind the workshop sits one question: under what guarantees can a small local AI be trusted with pharmacokinetic numbers?',
    pair: [
      {
        key: 'caladrius',
        tag: 'No AI · The Instrument',
        name: 'Caladrius',
        role: 'the calculation engine',
        body: 'It measures: non-compartmental analysis, 1- and 2-compartment models, weighted fitting. A deterministic Rust binary checked across 48,955 values against R, usable on its own.',
        repoLabel: 'abdou-rgd/caladrius'
      },
      {
        key: 'apothicaire',
        tag: 'Local AI · The Artisan',
        name: 'Apothicaire',
        role: 'the checked assistant',
        body: 'It explains: an open model on a single 12 GB card (Bonsai 2 27B) with a tree-structured ledger (OptChat), asking Caladrius for every number behind a plain Python gate.',
        repoLabel: 'abdou-rgd/apothicaire'
      }
    ],
    ctaTry: 'Try Caladrius',
    ctaDownload: 'Download Caladrius',
    ctaCode: 'Browse the repositories',
    tryNote:
      'Caladrius opens in your browser with nothing to install: a few megabytes, loaded once, and every number is computed inside the page. Your files stay on your computer. Best on a computer. The download is the desktop application, for Windows and Linux.',
    soon: 'Apothicaire: an installable version is on its way. The code is already public.',
    note: 'Research prototype. Synthetic data only, with no regulatory status.'
  },
  specimen: {
    title: 'A calculation by Caladrius',
    synthetic: 'synthetic profile',
    linear: 'Linear',
    semilog: 'Semi-log',
    scaleLabel: 'Scale of the concentration axis',
    time: 'Time',
    conc: 'Concentration',
    observed: 'observed',
    lzPoints: 'λz points',
    lzLine: 'terminal regression',
    extrapolated: 'extrapolated area',
    zeroHidden: 'the point at 0 is not drawn on the log scale',
    keys: { cmax: 'Cmax', 'half.life': 't½', 'aucinf.obs': 'AUC0-∞', 'cl.obs': 'CL/F' },
    lzNote: (n: string, from: string, to: string, r2: string) =>
      `λz on ${n} points, from ${from} to ${to} h, adjusted R² ${r2}`,
    caption:
      'One-compartment oral model simulated by Caladrius, 6 % proportional noise, then non-compartmental analysis by the nca.run command with its default conventions (lin-up/log-down areas). No number in this figure is typed by hand.',
    script: 'The script that makes it',
    plotLabel: 'Concentration-time profile and results of the non-compartmental analysis'
  },
  caladrius: {
    kicker: 'Chapter I · Caladrius · The instrument (no AI)',
    title: 'An open-book calculation engine. No AI inside.',
    intro:
      'In medieval bestiaries, the caladrius is the white bird that sits by the patient’s bed and looks the illness in the eye. The engine that bears its name performs the standard calculations of pharmacokinetics, just as an R package would: it guesses nothing, it computes. Same input, same version, same number. It works on its own, without Apothicaire.',
    specTitle: 'Mathematical scope (v0.3.2)',
    spec: [
      {
        k: 'Non-compartmental analysis',
        v: 'Linear, lin-up/log-down or mixed areas; λz chosen automatically or by hand; t½, AUMC, MRT, CL/F, Vz/F, Vss; values below the limit of quantification and missing values.'
      },
      {
        k: 'Compartmental models',
        v: 'Six one-compartment and six two-compartment models (three parameterisations), with multiple dosing and steady state.'
      },
      {
        k: 'Weighted fitting',
        v: 'Weighted least squares (five weightings), standard errors, CV%, confidence intervals, correlation matrices, AIC, SBC and diagnostics.'
      },
      {
        k: 'Data and traceability',
        v: 'CSV files with decimal commas and semicolons, units read from headers and checked before import; a single project file keeps data, analyses and the command history.'
      },
      {
        k: 'Out of scope today',
        v: 'Population modelling, bioequivalence, PBPK, IVIVC. For those domains, R and dedicated software remain the right tools.'
      }
    ],
    doorsTitle: 'One API, three doors',
    doorsIntro:
      'All 25 commands (nca.run, fit.run, model.simulate, analysis.compare…) have a stable id and a strict JSON schema. The desktop window, the browser page, the terminal and the MCP server call the exact same functions: an agent gets the same numbers as a person, units included.',
    doors: {
      desktop: 'Desktop interface',
      cli: 'Command line',
      mcp: 'MCP server'
    },
    doorsShort: {
      desktop: 'Desktop',
      cli: 'Terminal',
      mcp: 'MCP'
    },
    desktopCaption:
      'Non-compartmental analysis in the desktop application (egui). The interface holds no numerical code: every value and every curve comes from the engine’s commands.',
    screensAlt: {
      nca: 'Caladrius NCA page: options, results and concentration-time curve',
      import: 'Import preview of a French CSV, with semicolons and decimal commas',
      fit: 'Fit results: estimates, intervals, residuals'
    },
    screensMore: 'All screenshots',
    excerpt: 'excerpt',
    cliCaption: 'The same analysis in a terminal; --format json gives the full result.',
    mcpCaption:
      'An MCP server on standard input and output, with no network. Every tool publishes its inputSchema and outputSchema; a result is JSON with structuredContent.',
    whyTitle: 'Why a Rust binary, when R packages exist?',
    whyIntro:
      'It is the first question pharmacometricians ask, and a fair one. R packages such as PKNCA remain our references: Caladrius is checked against them, value by value. It does not try to replace R for people who work in R; it brings what a script library does not aim for.',
    pillars: [
      {
        n: '01',
        title: 'A 9 MB self-contained application, not a library',
        body: 'One archive (9 MB on Windows, 12 MB on Linux) holds the desktop application, the command line and the MCP server: no R runtime or packages to install, no code to write before running an analysis. The same code compiles to WebAssembly: the same interface runs in the browser.',
        proof: 'Published v0.3.2 binaries',
        href: 'releases'
      },
      {
        n: '02',
        title: 'A typed contract that forbids ad-hoc scripting',
        body: 'Rather than letting a language model write R scripts on the fly, Caladrius exposes 21 closed commands whose inputs, outputs and units are fixed by schema. A person in the window and an agent over MCP use the same door.',
        proof: 'MCP documentation',
        href: 'mcp'
      },
      {
        n: '03',
        title: 'A readable error instead of a crash (≈ 9 ms on Theoph)',
        body: 'The code contains no unsafe block, and the linter forbids unwrap and panic! across the numerical crates: a malformed CSV or a non-estimable half-life returns an explicit reason instead of a crash. Running NCA on all 12 subjects of Theoph takes about 9 ms, startup included.',
        proof: 'Why Rust (Caladrius history)',
        href: 'whyRust'
      },
      {
        n: '04',
        title: 'Open, modular and governed by tests',
        body: 'Dual-licensed under MIT or Apache-2.0. The numerical crates (nca, models, fit, project) are isolated from the interface and checked in continuous integration: no mathematical rule hides inside a UI button.',
        proof: 'Architecture contract (AGENTS.md)',
        href: 'layers'
      }
    ]
  },
  validation: {
    kicker: 'Chapter II · Validation · The verification standard',
    title: 'Every number computed twice, before it is trusted.',
    intro:
      'Every expected value is produced by an independent calculation in R, from textbook equations and public or synthetic datasets, through versioned scripts anyone can re-run.',
    headline: 'values matching across 490 test cases',
    headlineNote:
      '16 further values are documented method differences (such as rounding conventions or boundary rules), neither validated nor counted as failures.',
    cols: { domain: 'Domain', oracle: 'Independent R oracle', values: 'Values', cases: 'Cases', tol: 'Relative tolerance' },
    rows: [
      { key: 'nca', domain: 'Non-compartmental analysis', short: 'NCA', oracle: 'PKNCA 0.12.1', values: 3744, cases: '20', tol: '1e-6' },
      {
        key: 'models',
        domain: 'One- and two-compartment models, multiple dosing',
        short: 'Models',
        oracle: 'closed forms in 256-bit arithmetic (Rmpfr), cross-checked with expm and deSolve',
        values: 34711,
        cases: '440',
        tol: '1e-12'
      },
      { key: 'fit', domain: 'Weighted fitting (WLS)', short: 'Fitting', oracle: 'R nls and nlsLM, which must agree with each other', values: 10500, cases: '30', tol: '1e-4' }
    ],
    meaningTitle: 'A narrow, measurable meaning',
    meaning:
      '“Validated” means one specific thing here: a number produced by Caladrius equals a number computed independently in R, within a tolerance defined once, on a stated case. One command regenerates the conformance table, and its continuous-integration floors can only go up.',
    honestTitle: 'When the oracle was wrong',
    honest:
      'An R reference script was wrong once, and the engine was right: the discrepancy was diagnosed, documented and fixed in the reference script, never absorbed by widening a tolerance.',
    linkReport: 'Validation report (docs/validation.md)',
    linkConformance: 'Conformance table (docs/conformance.md)'
  },
  apothicaire: {
    kicker: 'Chapter III · Apothicaire · The checked local artisan',
    title: 'A local assistant that never computes.',
    intro:
      'Apothicaire is the other half of the workbench: a local harness that surrounds an open language model with three complementary safeguards so that no invented or altered figure reaches the user.',
    parts: [
      {
        tag: '01 · The router (local AI)',
        title: 'Bonsai 2 27B on llama.cpp',
        body: 'Running on a single 12 GB graphics card, the model reads your question in French or English, picks among Caladrius’s MCP commands and explains what the engine returned, without ever doing arithmetic itself.',
        href: 'apothicaire',
        linkLabel: 'abdou-rgd/apothicaire'
      },
      {
        tag: '02 · The number gate (Python, no AI)',
        title: 'Deterministic check via gate.py',
        body: 'Standing between the model and the screen, a plain Python gate inspects every draft and flags any measured number that appears neither in Caladrius’s tool outputs nor in your own message: the model regenerates its answer once, and a number still untraced stays marked on screen.',
        href: 'gate',
        linkLabel: 'Read gate.py'
      },
      {
        tag: '03 · The ledger (OptChat)',
        title: 'Tree-structured memory where nothing is erased',
        body: 'A study conversation quickly grows past what 12 GB of video memory can hold. Following an idea by Victor Taelin, OptChat keeps the full history on disk and shows the model recent messages verbatim and older ones merged into a binary tree of summaries (8, 7 and 8 of 8 planted facts recalled after 32 turns, over three runs).',
        href: 'optchat',
        linkLabel: 'abdou-rgd/optchat'
      }
    ],
    flow: {
      title: 'One question, followed to the end',
      scenarioLabel: 'Pick a case',
      scenarios: { ok: 'The number is verified', bad: 'The number is rejected' },
      replay: 'Replay',
      steps: ['Question', 'Tool choice (AI)', 'Calculation (Caladrius)', 'Number gate (Python)'],
      ok: {
        question: 'What is the terminal half-life of this profile?',
        tool: 'the model picks the non-compartmental analysis',
        draft: 'The terminal half-life is [[hl]] (terminal phase from [[t1]] to [[t2]]).',
        verdict: 'Answer shown: every measured number traces back to a Caladrius output.',
        exempt: 'small integer with no unit, exempt'
      },
      bad: {
        question: 'And the apparent clearance?',
        tool: 'the model reads the result of the same analysis again',
        draft: 'CL/F is [[cl]], that is [[conv]].',
        conv: '62.5 mL/min',
        rejected: 'found in no tool result: a unit conversion done in the model’s head',
        verdict: 'Answer held back by gate.py: a regeneration without mental arithmetic is requested.'
      },
      found: 'found in',
      caption:
        'A real check run with gate.py on the synthetic profile at the top of the page. Small integers with no unit (0 to 20) and dates are exempt; every measured value is checked.'
    },
    benchTitle: 'What the benchmark measures (and the lesson of the 76 numbers)',
    benchStory:
      'Across 25 synthetic exercises of 8 turns (200 questions), the model’s first drafts initially contained 76 untraced numbers out of 932: every single one occurred in the one question that tempted it to subtract two results in its head. Once Caladrius was given a dedicated command (analysis.compare), that count dropped to 0 out of 926 (and it stays at 0 out of 897 on the current runtime). You do not make a model reliable by asking it to be careful; you take arithmetic away from it.',
    bench: [
      { value: '0 / 897', label: 'untraced numbers in first drafts (after adding analysis.compare)' },
      { value: '193 / 200', label: 'turns fully correct (every expected number present)' },
      { value: '141 / 141', label: 'valid MCP tool calls, none rejected or failed' },
      { value: '8 s', label: 'per turn on average, locally on a single 12 GB graphics card' }
    ],
    benchCaveat:
      'Methodological caveat: these figures are measured in-sample, on the 25 exercises used to develop the tool. They are counts, not guarantees. A second, oracle check, which verifies that each quoted number belongs to the parameter asked for, passes 166 / 175 turns. The current gate cannot catch a right number attached to the wrong parameter; a frozen out-of-sample test set is being prepared to measure it, and Gate v2 (typed rendering) was built to remove it.',
    benchLink: 'Full benchmark report',
    gateLink: 'Read gate.py',
    localTitle: 'Why a local model on 12 GB, rather than a large subscription model?',
    localIntro:
      'Large subscription models are remarkable, and Officina’s code is in fact written with their help. Yet for querying study data and explaining pharmacokinetic results, a well-surrounded open model on a local machine wins on four counts:',
    localPillars: [
      {
        word: 'Privacy',
        claim: 'The data never leave the machine.',
        body: 'Concentrations, doses, study notes: nothing is sent to a third-party server, no API key is needed, and the assistant runs offline. For confidential study data, that is the starting condition.'
      },
      {
        word: 'Sovereignty',
        claim: 'Nobody changes the model behind your back.',
        body: 'The weights sit on disk and their version is pinned: no forced retirement, no silent shift in behaviour or pricing, no vendor lock-in. The exact same chain can be replayed two years from now.'
      },
      {
        word: 'Proportion',
        claim: 'No need for a giant when the engine computes.',
        body: 'The model does no maths: it understands the request, picks the tool and explains the result. Calculation belongs to Caladrius and checking to the Python gate. For that job, 27 billion parameters on a 12 GB card are enough.'
      },
      {
        word: 'Modularity',
        claim: 'An open, adaptable and replaceable part.',
        body: 'Because the weights are open, they can be quantised, fine-tuned on PK exercises or paired with a tiny decision model. Any model served by llama.cpp can replace Bonsai 2 27B tomorrow and face the same benchmark.'
      }
    ],
    localQuote:
      'To route a question to the right calculation and explain its result, it is not the size of the model that limits reliability: it is verification.'
  },
  atelier: {
    kicker: 'Chapter IV · The Workshop · Approach, method and roadmap',
    title: 'Why I built Officina, and how the workshop is run.',
    authorSubtitle: 'The approach and the author',
    authorName: 'Abdallah',
    authorRole: 'M2 Pharmacokinetic Modelling (Université Paris Cité) · M2 Health Data Science (Université Paris-Saclay)',
    authorParagraphs: [
      'My path to pharmacometrics was not a straight line (a bachelor’s degree in economics, a first master’s year in public health with a biostatistics internship at IHU ICAN at Pitié-Salpêtrière, an M2 in Health Data Science at Université Paris-Saclay, and now the M2 in Pharmacokinetic Modelling at Université Paris Cité), but in retrospect it reads as one question approached from three angles: how to measure, model and explain a clinical effect properly.',
      'Officina grew out of two wishes during my coursework. First, to understand standard pharmacokinetic calculations all the way down: I rebuilt them one by one from the textbooks (Gabrielsson & Weiner, Gibaldi & Perrier, Rowland & Tozer), with a test for every rule. Second, to test the research question I aim to pursue in a PhD at the meeting point of DMPK and artificial intelligence: can a small local AI be trusted with pharmacokinetic numbers, and under what architectural guarantees?',
      'I build Officina on my own by orchestrating coding agents under a written contract (AGENTS.md) built on separation of duties: whoever writes the engine never writes the R oracle, an independent reviewer hunts panic paths and loosened tolerances, and outside models are briefed blind to break my claims. On 10 October, a blind adversarial review (74 hard requests) refuted the 99.9 % score of a small decision model (0.8B), which rested on training-phrasing memorisation: I dropped the flattering figure and published the failure, which now seeds the frozen test set. On 14 October, an outside audit re-ran all 2,559 tests and regenerated the conformance table identically.'
    ],
    methodLink: 'Read the method contract (METHOD.md)',
    githubLink: 'GitHub profile (abdou-rgd)',
    roadmapSubtitle: 'What comes next: a measured ambition',
    roadmapIntro:
      'Officina does not aim for the breadth of a full suite: its scope stays narrow and verified. What comes next fits in four tracks:',
    roadmap: [
      {
        title: '1 · Pre-registered frozen test set',
        body: 'Evaluate Apothicaire out-of-sample on blind requests fixed before execution, under a single rubric to compare small local models honestly (27B, 9B and tiny decision models).'
      },
      {
        title: '2 · Number gate v2 (typed rendering)',
        body: 'Instead of writing a number in free text, the model emits a reference ({{call.param}}) and deterministic code injects the value, its sign, its unit and the quantity name straight from Caladrius’s MCP schema. Built and measured in-sample on 21 October: 562 / 600 turns correct against 583 / 600 for the current gate, which therefore stays the gate of the demonstration.'
      },
      {
        title: '3 · Open validation kit & PAGE 2027',
        body: 'Publish a regenerable validation kit (reference sets, tolerances and CI drift checks) and submit an independent comparison of open NCA tools to PAGE 2027.'
      },
      {
        title: '4 · Caladrius in the browser & PK/PD expansion',
        body: 'The WebAssembly build is online (/app/): students and researchers check a profile with zero installation. Next: expand the mathematical scope step by step.'
      }
    ]
  },
  footer: {
    repos: 'The four repositories',
    licenses: 'Licences and credits',
    licenseText:
      'Code and text published under MIT OR Apache-2.0, at your option. Newsreader and IBM Plex fonts under the SIL Open Font License 1.1, served by this site.',
    credit:
      'The emblems of Caladrius (the bird) and Apothicaire (the mortar) were drawn by hand by Amina, a talented friend, and vectorised for the workshop.',
    privacy: 'This site uses no cookies, no trackers and no request to any third-party server.',
    disclaimer: 'Research prototype with no regulatory status. Never use for a patient or a clinical decision.'
  }
};

// French typography: a narrow no-break space before ; : ! ? », after «, and inside numbers
// (48 955), so that a line never starts with a colon or splits a number.
// Applies a string transform to every string of a dictionary, leaving functions untouched.
function mapStrings<T>(value: T, f: (s: string) => string): T {
  if (typeof value === 'string') return f(value) as T;
  if (Array.isArray(value)) return value.map(v => mapStrings(v, f)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, mapStrings(v, f)])) as T;
  }
  return value;
}

// Keeps a number with its unit or noun, and "≈" with its number, on the same line.
const keepUnits = (s: string) => s.replace(/(\d) (?=[A-Za-zµÀ-ÿ])/g, '$1\u00a0').replace(/≈ /g, '≈\u00a0');

// French typography: narrow no-break spaces before ; : ! ? » and %, after «, and as thousands separators.
const frenchSpaces = (s: string) =>
  keepUnits(
    s
      .replace(/ ([;:!?»])/g, '\u202f$1')
      .replace(/« /g, '«\u202f')
      .replace(/(\d) (\d{3})/g, '$1\u202f$2')
      .replace(/ %/g, '\u202f%')
  );

export const dict: Record<Lang, Dict> = { fr: mapStrings(fr, frenchSpaces), en: mapStrings(en, keepUnits) };
