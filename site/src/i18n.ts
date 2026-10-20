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
  whyRust: `${GH}/caladrius#in-plain-words`,
  usage: `${GH}/caladrius#usage`,
  mcp: `${GH}/caladrius#mcp`,
  desktop: `${GH}/caladrius#desktop`,
  releases: `${GH}/caladrius/releases`,
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
    overview: 'L’ensemble',
    caladrius: 'Caladrius',
    why: 'Pourquoi Caladrius',
    validation: 'Validation',
    apothicaire: 'Apothicaire',
    local: 'Modèle local',
    roadmap: 'Feuille de route',
    menu: 'Sommaire'
  },
  ui: {
    langSwitchLabel: 'Read this page in English',
    themeLabel: 'Thème',
    themes: { system: 'Thème du système', light: 'Thème clair', dark: 'Thème sombre' },
    skip: 'Aller au contenu',
    section: '§'
  },
  hero: {
    eyebrow: 'Officina · chaîne d’outils DMPK locale et vérifiable',
    pair: [
      {
        key: 'caladrius',
        tag: 'Aucune IA',
        name: 'Caladrius',
        role: 'le moteur',
        body: 'Il calcule : NCA, modèles, ajustement. Déterministe, vérifié, utilisable seul.'
      },
      {
        key: 'apothicaire',
        tag: 'IA locale',
        name: 'Apothicaire',
        role: 'l’assistant',
        body: 'Il explique : un modèle local qui ne calcule jamais et demande chaque nombre à Caladrius.'
      }
    ],
    ctaCode: 'Voir le code',
    ctaWhy: 'Pourquoi un nouveau moteur ?',
    note: 'Prototype de recherche. Données synthétiques uniquement.'
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
      'Modèle oral à un compartiment simulé par Caladrius, bruit proportionnel de 6 %, puis analyse non compartimentale par la commande nca.run, conventions par défaut (aires lin-up/log-down). Aucun nombre de cette figure n’est écrit à la main.',
    script: 'Le script qui la produit',
    plotLabel: 'Profil concentration-temps et résultats de l’analyse non compartimentale'
  },
  facts: [
    { value: '48 955 / 48 955', label: 'valeurs conformes aux références indépendantes en R' },
    { value: '21', label: 'commandes à identifiant stable, pour les humains comme pour les agents' },
    { value: '1 PC', label: 'une carte graphique de 12 Go pour l’assistant, aucun appel au cloud' },
    { value: 'MIT / Apache-2.0', label: 'tout le code est ouvert, sous l’une ou l’autre licence' }
  ],
  overview: {
    kicker: 'L’ensemble',
    title: 'Trois outils, une règle',
    intro:
      'Le moteur calcule, l’assistant explique, la mémoire se souvient. La seule pièce qui peut se tromper, le modèle de langage, ne produit jamais un nombre : elle est entourée de pièces qui ne le peuvent pas.',
    items: [
      {
        key: 'caladrius',
        name: 'Caladrius',
        role: 'le moteur, sans IA',
        body: 'Moteur PK en Rust : analyse non compartimentale, modèles à un et deux compartiments, doses multiples, ajustement par moindres carrés pondérés. Une application de bureau, une ligne de commande et un serveur MCP appellent les mêmes commandes.',
        meta: 'Rust · v0.2.0 · MIT OR Apache-2.0'
      },
      {
        key: 'apothicaire',
        name: 'Apothicaire',
        role: 'l’assistant, IA locale',
        body: 'Un modèle de langage ouvert (Bonsai\u00a02\u00a027B sur llama.cpp) lit la demande, appelle Caladrius et explique le résultat. Une porte déterministe rejette tout nombre qui ne vient ni d’un résultat d’outil ni de votre message.',
        meta: 'Python · MIT OR Apache-2.0'
      },
      {
        key: 'optchat',
        name: 'OptChat',
        role: 'la mémoire',
        body: 'Mémoire de conversation sans fin : tout l’historique reste sur disque, le modèle voit les messages récents mot pour mot et les plus anciens fusionnés en lignes de résumé rangées en arbre. Rien n’est effacé. D’après une idée de Victor Taelin.',
        meta: 'Python · MIT OR Apache-2.0'
      }
    ],
    diagram: {
      title: 'Comment les pièces s’articulent',
      user: 'Vous',
      userSub: 'question en français ou en anglais',
      apothicaire: 'Apothicaire',
      apoTag: 'IA locale',
      model: 'Modèle de langage',
      modelSub: 'route et explique, ne calcule pas',
      memory: 'OptChat',
      memorySub: 'mémoire',
      gate: 'Porte des nombres',
      gateSub: 'Python, sans IA',
      caladrius: 'Caladrius',
      calTag: 'aucune IA',
      commands: '21 commandes',
      commandsSub: 'bureau · ligne de commande · MCP',
      engine: 'Moteur PK',
      engineSub: 'NCA · modèles · ajustement',
      oracle: 'Références R indépendantes',
      oracleSub: 'PKNCA · nls · formes closes en 256 bits',
      mcp: 'appels MCP',
      results: 'nombres avec unités',
      checked: '48 955 valeurs vérifiées',
      answer: 'réponse vérifiée',
      direct: 'ou directement, sans assistant : interface de bureau, ligne de commande',
      legendDet: 'déterministe, sans IA',
      legendAi: 'modèle de langage : peut se tromper, ne produit aucun nombre',
      caption:
        'Caladrius fonctionne seul. Apothicaire n’en est qu’un client, qui passe par les mêmes commandes que vous.'
    },
    repo: 'Dépôt'
  },
  caladrius: {
    kicker: 'Caladrius',
    title: 'Un moteur de calcul. Aucune IA à l’intérieur.',
    intro:
      'Caladrius fait les calculs standard de la pharmacocinétique, comme le ferait un package R : il ne devine rien, il calcule. Même entrée, même version, même nombre. Il s’utilise seul, sans Apothicaire.',
    spec: [
      {
        k: 'Analyse non compartimentale',
        v: 'Aires linéaires, lin-up/log-down ou mixtes ; λz choisi automatiquement ou à la main ; t½, AUMC, MRT, CL/F, Vz/F, Vss ; valeurs sous la limite de quantification et valeurs manquantes.'
      },
      {
        k: 'Modèles',
        v: 'Six modèles à un compartiment et six à deux compartiments (trois paramétrisations), avec doses multiples et état d’équilibre.'
      },
      {
        k: 'Ajustement',
        v: 'Moindres carrés pondérés (cinq pondérations), erreurs-types, CV %, intervalles de confiance, corrélations, AIC, SBC et diagnostics.'
      },
      {
        k: 'Données',
        v: 'CSV à virgule décimale et point-virgule, unités lues dans les en-têtes et montrées avant l’import ; un fichier de projet garde données, analyses et historique des commandes.'
      },
      { k: 'Hors périmètre', v: 'Modélisation de population, bioéquivalence, PBPK, IVIVC.' }
    ],
    doorsTitle: 'Une API, trois portes',
    doorsIntro:
      'Les 21 commandes ont un identifiant stable et un schéma JSON pour leurs paramètres et leurs résultats. L’interface, le terminal et un agent appellent exactement les mêmes : ils obtiennent les mêmes nombres, avec leurs unités.',
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
    screensMore: 'Toutes les captures de l’application',
    excerpt: 'extrait',
    cliCaption: 'La même analyse dans un terminal ; --format json donne le résultat complet.',
    mcpCaption:
      'Serveur MCP sur l’entrée et la sortie standard, sans réseau. Chaque outil publie son inputSchema et son outputSchema ; un résultat est du JSON avec structuredContent.'
  },
  why: {
    kicker: 'Pourquoi Caladrius',
    title: 'Pourquoi un nouveau moteur, quand des packages R existent ?',
    question:
      'C’est la première question des pharmacométriciens, et elle est juste. Elle suppose souvent que Caladrius est « un outil de NCA avec IA ». Ce n’est pas le cas.',
    callout: 'Caladrius ne contient aucune IA.',
    calloutBody:
      'C’est un logiciel de calcul classique, déterministe, qui s’utilise seul. L’IA d’Officina est ailleurs, dans Apothicaire, et elle n’a pas le droit de calculer.',
    stance:
      'Les packages R comme PKNCA restent des références : Caladrius est validé contre eux, valeur par valeur. Il ne cherche pas à les remplacer pour qui travaille en R. Il apporte ce qu’une bibliothèque ne vise pas.',
    items: [
      {
        title: 'Une application, pas une bibliothèque',
        body: 'Une archive de 8 Mo pour Windows (12 Mo pour Linux) contient l’application de bureau, la ligne de commande et le serveur MCP : ni R ni packages à installer, aucun code à écrire. L’interface lit un CSV exporté d’un tableur français et montre comment elle l’a compris avant d’importer.',
        proof: 'Version v0.2.0, binaires publiés',
        href: 'releases'
      },
      {
        title: 'Une seule API, pour les humains et pour les agents',
        body: '21 commandes à identifiant stable (nca.run, fit.run, model.simulate…), chacune avec un schéma JSON. L’interface, la ligne de commande et le serveur MCP passent par les mêmes : un agent obtient les mêmes nombres qu’un humain, unités comprises.',
        proof: 'README, section MCP',
        href: 'mcp'
      },
      {
        title: 'NCA, modèles et ajustement dans le même moteur',
        body: 'Analyse non compartimentale, douze modèles compartimentaux, doses multiples et état d’équilibre, ajustement pondéré avec toutes ses statistiques, simulation. Un seul format de projet, une seule logique d’unités.',
        proof: 'docs/validation.md, section 1',
        href: 'validation'
      },
      {
        title: 'Déterministe, et solide face aux mauvaises données',
        body: 'Même entrée et même version : même nombre. Le code ne contient aucun bloc unsafe et le linter interdit les plantages : un CSV mal formé ou une demi-vie non estimable donnent un message lisible, pas un crash.',
        proof: 'README, section Why Rust',
        href: 'whyRust'
      },
      {
        title: 'Une validation publiée, que vous pouvez rejouer',
        body: '48 955 valeurs comparées à PKNCA, à R nls et nlsLM et à des formes closes calculées en 256 bits. Une commande régénère la table de conformité, et ses seuils, vérifiés en intégration continue, ne peuvent que monter. Conçu pour être validé par l’utilisateur, preuves fournies.',
        proof: 'docs/validation.md',
        href: 'validation'
      },
      {
        title: 'Léger et rapide',
        body: 'Du Rust compilé, sans environnement à démarrer. Les calculs sont petits ; ce qui compte est qu’il n’y a rien à charger avant eux. Le même code compile en WebAssembly, et l’intégration continue le vérifie.',
        stat: '≈ 9 ms',
        statLabel:
          'l’analyse non compartimentale des 12 sujets du jeu Theoph, lancement du programme compris (médiane de 30 essais, conteneur Linux à 2,1 GHz)',
        proof: 'Commande caladrius-cli nca.run, README section Usage',
        href: 'usage'
      },
      {
        title: 'Ouvert et modulaire',
        body: 'Licence MIT ou Apache-2.0, au choix. Le moteur est fait de briques séparées (nca, models, fit, project) dont les dépendances sont vérifiées en intégration continue : chacune sert aussi bien dans un test, un terminal, un agent ou une fenêtre.',
        proof: 'AGENTS.md, section 4',
        href: 'layers'
      }
    ],
    limits:
      'Ce que Caladrius ne fait pas : modélisation de population, bioéquivalence, PBPK. Pour cela, R et les logiciels dédiés restent les bons outils.'
  },
  validation: {
    kicker: 'Validation',
    title: 'Chaque nombre recalculé ailleurs',
    intro:
      'Les valeurs attendues ne viennent d’aucun logiciel commercial. Elles sont produites par des calculs indépendants en R, à partir de données publiques ou synthétiques, avec des scripts versionnés.',
    headline: 'valeurs conformes',
    headlineNote: '16 autres valeurs sont des différences de méthode documentées, ni validées ni comptées comme échecs.',
    barLabel: 'Répartition des valeurs vérifiées par domaine',
    cols: { domain: 'Domaine', oracle: 'Référence indépendante', values: 'Valeurs', cases: 'Cas', tol: 'Tolérance relative' },
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
      { key: 'fit', domain: 'Ajustement pondéré', short: 'Ajustement', oracle: 'R nls et nlsLM, qui doivent s’accorder', values: 10500, cases: '30', tol: '1e-4' }
    ],
    meaning:
      '« Validé » a ici un sens étroit : un nombre produit par Caladrius est égal à un nombre calculé indépendamment, à une tolérance donnée, sur un cas donné. Les tolérances sont définies une seule fois, et les seuils de conformité vérifiés en intégration continue ne peuvent que monter.',
    honest:
      'Une référence R s’est trompée une fois, et le moteur avait raison : l’écart a été documenté puis corrigé dans le script, pas absorbé dans une tolérance.',
    linkReport: 'Rapport de validation',
    linkConformance: 'Table de conformité'
  },
  apothicaire: {
    kicker: 'Apothicaire',
    title: 'Un assistant local qui ne calcule jamais',
    intro:
      'Apothicaire est l’autre moitié d’Officina : un modèle de langage ouvert, sur un seul PC, qui lit la demande, appelle Caladrius et explique le résultat. Entre le modèle et vous, une porte écrite en Python, sans apprentissage, vérifie chaque nombre.',
    flow: {
      title: 'Une question, suivie jusqu’au bout',
      scenarioLabel: 'Choisir un cas',
      scenarios: { ok: 'Le nombre est vérifié', bad: 'Le nombre est rejeté' },
      replay: 'Rejouer',
      steps: ['Question', 'Choix de l’outil', 'Calcul par Caladrius', 'Porte des nombres'],
      ok: {
        question: 'Quelle est la demi-vie terminale de ce profil ?',
        tool: 'le modèle choisit l’analyse non compartimentale',
        draft: 'La demi-vie terminale est de [[hl]] (phase terminale de [[t1]] à [[t2]]).',
        verdict: 'Réponse affichée.',
        exempt: 'petit entier sans unité, exempté'
      },
      bad: {
        question: 'Et la clairance apparente ?',
        tool: 'le modèle relit le résultat de la même analyse',
        draft: 'CL/F vaut [[cl]], soit [[conv]].',
        conv: '62,5 mL/min',
        rejected: 'absent de tout résultat d’outil : une conversion faite par le modèle',
        verdict: 'Réponse retenue : une régénération est demandée, puis un avertissement visible si le nombre persiste.'
      },
      found: 'trouvé dans',
      caption:
        'Exemple construit pour illustrer le mécanisme et vérifié avec gate.py ; les nombres viennent de Caladrius, sur le profil synthétique du haut de la page. Les petits entiers sans unité (0 à 20) et les dates sont exemptés ; tout le reste est vérifié.'
    },
    benchTitle: 'Ce que mesure le benchmark',
    bench: [
      { value: '0 / 897', label: 'nombre non tracé dans les premiers jets du modèle' },
      { value: '193 / 200', label: 'tours corrects selon un second contrôle par oracle' },
      { value: '141 / 141', label: 'appels d’outils valides' },
      { value: '8 s', label: 'par tour, en moyenne, sur une carte de 12 Go' }
    ],
    benchSetup: '25 exercices synthétiques de 8 tours, Bonsai\u00a02\u00a027B sur llama.cpp sans fork, un seul passage.',
    benchCaveat:
      'Ces chiffres sont mesurés sur le jeu qui a servi à mettre au point l’outil : ce sont des comptes, pas des garanties. La porte ne voit pas un bon nombre attaché au mauvais paramètre ; c’est le rôle du second contrôle, et un jeu de test gelé, hors échantillon, est la prochaine étape.',
    benchLink: 'Rapport du benchmark',
    gateLink: 'Lire gate.py'
  },
  local: {
    kicker: 'Modèle local',
    title: 'Pourquoi un modèle local, plutôt qu’un grand modèle par abonnement ?',
    intro:
      'Apothicaire fait tourner un modèle ouvert de taille raisonnable sur une seule carte graphique grand public. Ce n’est pas un pis-aller : pour ce travail, c’est le bon outil.',
    items: [
      {
        word: 'Confidentialité',
        claim: 'Les données ne quittent pas la machine.',
        body: 'Concentrations, doses, notes d’étude : rien n’est envoyé à un serveur tiers, il n’y a aucune clé d’API, et l’assistant fonctionne hors ligne. Pour des données d’étude confidentielles, c’est une condition de départ.'
      },
      {
        word: 'Souveraineté',
        claim: 'Personne ne change le modèle à votre place.',
        body: 'Les poids sont sur le disque et leur version est figée : ni retrait imposé, ni changement de prix ou de conditions, ni dépendance à un fournisseur. La même chaîne, avec le même modèle, pourra être rejouée dans deux ans.'
      },
      {
        word: 'Proportion',
        claim: 'Pas besoin d’un colosse.',
        body: 'Le modèle ne calcule pas : il comprend la question, choisit l’outil et explique le résultat. Le calcul est fait par Caladrius et la vérification par la porte. Pour le reste, un modèle de 27 milliards de paramètres sur une carte de 12 Go suffit.'
      },
      {
        word: 'Spécialisation',
        claim: 'Un modèle adapté à la tâche.',
        body: 'Un modèle moyen bien entouré (outils typés, mémoire, consignes courtes) vaut mieux ici qu’un généraliste immense. Ses poids étant ouverts, on peut l’affiner sur des exercices de PK, le quantifier, ou confier les questions fermées à un modèle de décision encore plus petit, piste à l’étude.'
      },
      {
        word: 'Modularité',
        claim: 'Le modèle est une pièce remplaçable.',
        body: 'L’architecture ne dépend d’aucun modèle : tout modèle servi par llama.cpp qui sait appeler des outils peut remplacer Bonsai\u00a02\u00a027B, et le même benchmark dit s’il fait mieux. Le moteur et la porte ne changent pas.'
      }
    ],
    tableTitle: 'Deux façons de faire tourner un assistant',
    cols: { aspect: '', cloud: 'Modèle par abonnement', local: 'Modèle local (Apothicaire)' },
    rows: [
      { aspect: 'Où vont les données', cloud: 'sur les serveurs du fournisseur', local: 'nulle part : elles restent sur la machine' },
      { aspect: 'Qui choisit la version', cloud: 'le fournisseur', local: 'vous : poids sur disque, version figée' },
      { aspect: 'Hors ligne', cloud: 'non', local: 'oui' },
      { aspect: 'Coût', cloud: 'abonnement ou facturation à l’usage', local: 'le matériel, une fois' },
      { aspect: 'Modifier le modèle', cloud: 'dans les limites de l’offre', local: 'oui : poids ouverts, affinage, quantification' },
      { aspect: 'Matériel', cloud: 'les centres de données du fournisseur', local: 'un PC avec une carte graphique de 12 Go' }
    ],
    note:
      'Les grands modèles par abonnement sont remarquables, et le code d’Officina est d’ailleurs écrit avec eux. Mais pour router une question vers le bon calcul et en expliquer le résultat, ce n’est pas la taille du modèle qui limite la fiabilité : c’est la vérification.'
  },
  method: {
    kicker: 'Méthode',
    title: 'Comment le code est écrit',
    body: 'Le code est écrit par des agents IA sous un contrat écrit, avec un tableau de petites cartes, des rôles séparés pour qui écrit un nombre, qui le teste et qui relit, et des revues indépendantes par d’autres modèles. L’auteur répond aux questions et décide de ce qui est publié. Un audit externe du 14 octobre a relancé 2 559 tests et régénéré la table de conformité à l’identique.',
    link: 'Lire METHOD.md'
  },
  roadmap: {
    kicker: 'Feuille de route',
    title: 'Ce qui vient ensuite',
    items: [
      { title: 'Jeu de test gelé', body: 'Des exercices hors échantillon, fixés et pré-enregistrés avant d’être lancés, pour mesurer l’assistant honnêtement.' },
      {
        title: 'Porte des nombres v2',
        body: 'Un rendu typé : le modèle cite une référence au résultat d’un outil, et un code déterministe écrit la valeur du moteur, son signe, son unité et le nom de la grandeur.'
      },
      { title: 'Kit de validation', body: 'Jeux de référence, tolérances et rapport d’exécution régénérables, avec une vérification de dérive en intégration continue.' },
      { title: 'PAGE 2027', body: 'Un résumé sur la comparaison indépendante d’outils NCA ouverts.' }
    ]
  },
  about: {
    kicker: 'Auteur',
    title: 'Qui porte le projet',
    name: 'Abdallah Ragued',
    body: 'Étudiant en M2 Modélisation pharmacocinétique à l’Université Paris Cité, après un M2 Health Data Science à l’Université Paris-Saclay. Officina est le portfolio d’une thèse visée entre DMPK et intelligence artificielle. Le nom vient du latin : l’atelier de l’apothicaire.',
    github: 'GitHub : abdou-rgd'
  },
  footer: {
    repos: 'Dépôts',
    licenses: 'Licences',
    licenseText:
      'Code et textes sous MIT OR Apache-2.0, au choix. Composants d’animation React Bits sous leur propre licence (MIT + Commons Clause). Polices Newsreader et IBM Plex sous SIL Open Font License 1.1, servies par ce site.',
    credit: 'Logos de Caladrius et d’Apothicaire dessinés par Amina. Captures de l’application tirées du dépôt Caladrius.',
    privacy: 'Ce site n’utilise ni cookie, ni traceur, ni requête vers un autre site.',
    disclaimer: 'Prototype de recherche, sans statut réglementaire. Ne pas utiliser pour un patient ou une décision réelle.'
  }
};

export type Dict = typeof fr;

const en: Dict = {
  nav: {
    overview: 'Overview',
    caladrius: 'Caladrius',
    why: 'Why Caladrius',
    validation: 'Validation',
    apothicaire: 'Apothicaire',
    local: 'Local model',
    roadmap: 'Roadmap',
    menu: 'Contents'
  },
  ui: {
    langSwitchLabel: 'Lire cette page en français',
    themeLabel: 'Theme',
    themes: { system: 'System theme', light: 'Light theme', dark: 'Dark theme' },
    skip: 'Skip to content',
    section: '§'
  },
  hero: {
    eyebrow: 'Officina · a local, verifiable DMPK toolchain',
    pair: [
      {
        key: 'caladrius',
        tag: 'No AI',
        name: 'Caladrius',
        role: 'the engine',
        body: 'It computes: NCA, models, fitting. Deterministic, verified, usable on its own.'
      },
      {
        key: 'apothicaire',
        tag: 'Local AI',
        name: 'Apothicaire',
        role: 'the assistant',
        body: 'It explains: a local model that never computes and asks Caladrius for every number.'
      }
    ],
    ctaCode: 'See the code',
    ctaWhy: 'Why a new engine?',
    note: 'Research prototype. Synthetic data only.'
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
  facts: [
    { value: '48,955 / 48,955', label: 'values matching independent references in R' },
    { value: '21', label: 'commands with stable ids, for people and agents alike' },
    { value: '1 PC', label: 'one 12 GB graphics card for the assistant, no cloud call' },
    { value: 'MIT / Apache-2.0', label: 'all the code is open, under either license' }
  ],
  overview: {
    kicker: 'Overview',
    title: 'Three tools, one rule',
    intro:
      'The engine computes, the assistant explains, the memory remembers. The one part that can be wrong, the language model, never produces a number: it is surrounded by parts that cannot be wrong that way.',
    items: [
      {
        key: 'caladrius',
        name: 'Caladrius',
        role: 'the engine, no AI',
        body: 'A PK engine in Rust: non-compartmental analysis, one- and two-compartment models, multiple dosing, weighted least-squares fitting. A desktop application, a command line and an MCP server call the same commands.',
        meta: 'Rust · v0.2.0 · MIT OR Apache-2.0'
      },
      {
        key: 'apothicaire',
        name: 'Apothicaire',
        role: 'the assistant, local AI',
        body: 'An open language model (Bonsai\u00a02\u00a027B on llama.cpp) reads the request, calls Caladrius and explains the result. A deterministic gate rejects any number that comes neither from a tool result nor from your message.',
        meta: 'Python · MIT OR Apache-2.0'
      },
      {
        key: 'optchat',
        name: 'OptChat',
        role: 'the memory',
        body: 'Endless chat memory: the whole history stays on disk, and the model sees recent messages verbatim and older ones merged into summary lines arranged as a tree. Nothing is deleted. After an idea by Victor Taelin.',
        meta: 'Python · MIT OR Apache-2.0'
      }
    ],
    diagram: {
      title: 'How the pieces fit together',
      user: 'You',
      userSub: 'a question in French or English',
      apothicaire: 'Apothicaire',
      apoTag: 'local AI',
      model: 'Language model',
      modelSub: 'routes and explains, does not compute',
      memory: 'OptChat',
      memorySub: 'memory',
      gate: 'Number gate',
      gateSub: 'Python, no AI',
      caladrius: 'Caladrius',
      calTag: 'no AI',
      commands: '21 commands',
      commandsSub: 'desktop · command line · MCP',
      engine: 'PK engine',
      engineSub: 'NCA · models · fitting',
      oracle: 'Independent R references',
      oracleSub: 'PKNCA · nls · 256-bit closed forms',
      mcp: 'MCP calls',
      results: 'numbers with units',
      checked: '48,955 values checked',
      answer: 'checked answer',
      direct: 'or directly, with no assistant: desktop interface, command line',
      legendDet: 'deterministic, no AI',
      legendAi: 'language model: can be wrong, produces no number',
      caption: 'Caladrius works on its own. Apothicaire is just one of its clients, using the same commands you do.'
    },
    repo: 'Repository'
  },
  caladrius: {
    kicker: 'Caladrius',
    title: 'A calculation engine. No AI inside.',
    intro:
      'Caladrius does the standard calculations of pharmacokinetics, as an R package would: it guesses nothing, it computes. Same input, same version, same number. It is used on its own, without Apothicaire.',
    spec: [
      {
        k: 'Non-compartmental analysis',
        v: 'Linear, lin-up/log-down or mixed areas; λz chosen automatically or by hand; t½, AUMC, MRT, CL/F, Vz/F, Vss; values below the limit of quantification and missing values.'
      },
      {
        k: 'Models',
        v: 'Six one-compartment and six two-compartment models (three parameterisations), with multiple dosing and steady state.'
      },
      {
        k: 'Fitting',
        v: 'Weighted least squares (five weightings), standard errors, CV%, confidence intervals, correlations, AIC, SBC and diagnostics.'
      },
      {
        k: 'Data',
        v: 'CSV files with decimal commas and semicolons, units read from the headers and shown before import; one project file keeps data, analyses and the history of commands.'
      },
      { k: 'Out of scope', v: 'Population modelling, bioequivalence, PBPK, IVIVC.' }
    ],
    doorsTitle: 'One API, three doors',
    doorsIntro:
      'The 21 commands have a stable id and a JSON schema for their parameters and results. The interface, the terminal and an agent call exactly the same ones: they get the same numbers, with their units.',
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
    screensMore: 'All screenshots of the application',
    excerpt: 'excerpt',
    cliCaption: 'The same analysis in a terminal; --format json gives the full result.',
    mcpCaption:
      'An MCP server on standard input and output, with no network. Every tool publishes its inputSchema and outputSchema; a result is JSON with structuredContent.'
  },
  why: {
    kicker: 'Why Caladrius',
    title: 'Why a new engine, when R packages exist?',
    question:
      'It is the first question pharmacometricians ask, and a fair one. It often assumes that Caladrius is “an NCA tool with AI”. It is not.',
    callout: 'Caladrius contains no AI.',
    calloutBody:
      'It is ordinary, deterministic calculation software, used on its own. Officina’s AI lives elsewhere, in Apothicaire, and it is not allowed to compute.',
    stance:
      'R packages such as PKNCA remain references: Caladrius is validated against them, value by value. It does not try to replace them for people who work in R. It brings what a library does not aim for.',
    items: [
      {
        title: 'An application, not a library',
        body: 'An 8 MB archive for Windows (12 MB for Linux) holds the desktop application, the command line and the MCP server: no R or packages to install, no code to write. The interface reads a CSV exported from a French spreadsheet and shows how it understood it before importing.',
        proof: 'Release v0.2.0, published binaries',
        href: 'releases'
      },
      {
        title: 'One API, for people and for agents',
        body: '21 commands with stable ids (nca.run, fit.run, model.simulate…), each with a JSON schema. The interface, the command line and the MCP server go through the same ones: an agent gets the same numbers as a person, units included.',
        proof: 'README, section MCP',
        href: 'mcp'
      },
      {
        title: 'NCA, models and fitting in one engine',
        body: 'Non-compartmental analysis, twelve compartmental models, multiple dosing and steady state, weighted fitting with all its statistics, simulation. One project format, one way of handling units.',
        proof: 'docs/validation.md, section 1',
        href: 'validation'
      },
      {
        title: 'Deterministic, and robust to bad data',
        body: 'Same input and same version: same number. The code has no unsafe block and the linter forbids crashes: a malformed CSV or a non-estimable half-life gives a readable message, not a crash.',
        proof: 'README, section Why Rust',
        href: 'whyRust'
      },
      {
        title: 'A published validation you can replay',
        body: '48,955 values compared with PKNCA, R nls and nlsLM, and closed forms computed in 256-bit arithmetic. One command regenerates the conformance table, and its floors, checked in continuous integration, can only go up. Designed to be validated by the user, with the evidence provided.',
        proof: 'docs/validation.md',
        href: 'validation'
      },
      {
        title: 'Light and fast',
        body: 'Compiled Rust, with no environment to start. The calculations are small; what matters is that nothing has to load before them. The same code compiles to WebAssembly, and continuous integration checks it.',
        stat: '≈ 9 ms',
        statLabel:
          'non-compartmental analysis of the 12 subjects of the Theoph dataset, program start included (median of 30 runs, Linux container at 2.1 GHz)',
        proof: 'Command caladrius-cli nca.run, README section Usage',
        href: 'usage'
      },
      {
        title: 'Open and modular',
        body: 'MIT or Apache-2.0 license, at your option. The engine is made of separate building blocks (nca, models, fit, project) whose dependencies are checked in continuous integration: each works as well in a test, a terminal, an agent or a window.',
        proof: 'AGENTS.md, section 4',
        href: 'layers'
      }
    ],
    limits:
      'What Caladrius does not do: population modelling, bioequivalence, PBPK. For those, R and dedicated software remain the right tools.'
  },
  validation: {
    kicker: 'Validation',
    title: 'Every number computed twice',
    intro:
      'No expected value comes from commercial software. They are produced by independent calculations in R, from public or synthetic data, with versioned scripts.',
    headline: 'values matching',
    headlineNote: '16 further values are documented method differences, neither validated nor counted as failures.',
    barLabel: 'Checked values by domain',
    cols: { domain: 'Domain', oracle: 'Independent reference', values: 'Values', cases: 'Cases', tol: 'Relative tolerance' },
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
      { key: 'fit', domain: 'Weighted fitting', short: 'Fitting', oracle: 'R nls and nlsLM, which must agree', values: 10500, cases: '30', tol: '1e-4' }
    ],
    meaning:
      '“Validated” has a narrow meaning here: a number produced by Caladrius equals a number computed independently, within a stated tolerance, on a stated case. Tolerances are defined once, and the conformance floors checked in continuous integration can only go up.',
    honest:
      'An R reference was wrong once, and the engine was right: the gap was documented, then fixed in the script, not absorbed into a tolerance.',
    linkReport: 'Validation report',
    linkConformance: 'Conformance table'
  },
  apothicaire: {
    kicker: 'Apothicaire',
    title: 'A local assistant that never computes',
    intro:
      'Apothicaire is the other half of Officina: an open language model, on a single PC, that reads the request, calls Caladrius and explains the result. Between the model and you, a gate written in plain Python, not learned, checks every number.',
    flow: {
      title: 'One question, followed to the end',
      scenarioLabel: 'Pick a case',
      scenarios: { ok: 'The number is verified', bad: 'The number is rejected' },
      replay: 'Replay',
      steps: ['Question', 'Choice of tool', 'Computed by Caladrius', 'Number gate'],
      ok: {
        question: 'What is the terminal half-life of this profile?',
        tool: 'the model picks the non-compartmental analysis',
        draft: 'The terminal half-life is [[hl]] (terminal phase from [[t1]] to [[t2]]).',
        verdict: 'Answer shown.',
        exempt: 'small integer with no unit, exempt'
      },
      bad: {
        question: 'And the apparent clearance?',
        tool: 'the model reads the result of the same analysis again',
        draft: 'CL/F is [[cl]], that is [[conv]].',
        conv: '62.5 mL/min',
        rejected: 'found in no tool result: a conversion made by the model',
        verdict: 'Answer held back: one regeneration is requested, then a visible warning if the number persists.'
      },
      found: 'found in',
      caption:
        'An example built to illustrate the mechanism and checked with gate.py; the numbers come from Caladrius, on the synthetic profile at the top of the page. Small integers with no unit (0 to 20) and dates are exempt; everything else is checked.'
    },
    benchTitle: 'What the benchmark measures',
    bench: [
      { value: '0 / 897', label: 'untraced numbers in the model’s first drafts' },
      { value: '193 / 200', label: 'turns correct by a second, oracle-based check' },
      { value: '141 / 141', label: 'valid tool calls' },
      { value: '8 s', label: 'per turn on average, on a 12 GB card' }
    ],
    benchSetup: '25 synthetic exercises of 8 turns, Bonsai\u00a02\u00a027B on llama.cpp without a fork, a single run.',
    benchCaveat:
      'These figures are measured on the set used to develop the tool: they are counts, not guarantees. The gate cannot see a right number attached to the wrong parameter; that is the second check’s job, and a frozen, out-of-sample test set is the next step.',
    benchLink: 'Benchmark report',
    gateLink: 'Read gate.py'
  },
  local: {
    kicker: 'Local model',
    title: 'Why a local model, rather than a large subscription model?',
    intro:
      'Apothicaire runs an open model of reasonable size on a single consumer graphics card. It is not a fallback: for this job, it is the right tool.',
    items: [
      {
        word: 'Privacy',
        claim: 'The data never leave the machine.',
        body: 'Concentrations, doses, study notes: nothing is sent to a third-party server, there is no API key, and the assistant works offline. For confidential study data, that is the starting condition.'
      },
      {
        word: 'Sovereignty',
        claim: 'Nobody changes the model for you.',
        body: 'The weights are on disk and their version is pinned: no forced retirement, no change of price or terms, no dependence on a vendor. The same chain, with the same model, can be replayed in two years.'
      },
      {
        word: 'Proportion',
        claim: 'No need for a giant.',
        body: 'The model does not compute: it understands the question, picks the tool and explains the result. The calculation is done by Caladrius and the checking by the gate. For the rest, a 27-billion-parameter model on a 12 GB card is enough.'
      },
      {
        word: 'Specialisation',
        claim: 'A model fitted to the task.',
        body: 'A mid-sized model with good surroundings (typed tools, memory, short instructions) beats a huge generalist here. Since its weights are open, it can be fine-tuned on PK exercises, quantised, or relieved of closed questions by an even smaller decision model, an idea under study.'
      },
      {
        word: 'Modularity',
        claim: 'The model is a replaceable part.',
        body: 'The architecture depends on no particular model: any model served by llama.cpp that can call tools can replace Bonsai\u00a02\u00a027B, and the same benchmark tells whether it does better. The engine and the gate do not change.'
      }
    ],
    tableTitle: 'Two ways to run an assistant',
    cols: { aspect: '', cloud: 'Subscription model', local: 'Local model (Apothicaire)' },
    rows: [
      { aspect: 'Where the data go', cloud: 'to the vendor’s servers', local: 'nowhere: they stay on the machine' },
      { aspect: 'Who picks the version', cloud: 'the vendor', local: 'you: weights on disk, pinned version' },
      { aspect: 'Offline', cloud: 'no', local: 'yes' },
      { aspect: 'Cost', cloud: 'a subscription or pay-per-use', local: 'the hardware, once' },
      { aspect: 'Changing the model', cloud: 'within the limits of the offer', local: 'yes: open weights, fine-tuning, quantisation' },
      { aspect: 'Hardware', cloud: 'the vendor’s data centres', local: 'a PC with a 12 GB graphics card' }
    ],
    note:
      'Large subscription models are remarkable, and Officina’s code is in fact written with them. But to route a question to the right calculation and explain its result, it is not the size of the model that limits reliability: it is verification.'
  },
  method: {
    kicker: 'Method',
    title: 'How the code is written',
    body: 'The code is written by AI coding agents under a written contract, with a board of small task cards, separate roles for whoever writes a number, whoever tests it and whoever reviews it, and independent reviews by other models. The author answers questions and decides what is published. An outside audit on 14 October re-ran 2,559 tests and regenerated the conformance table identically.',
    link: 'Read METHOD.md'
  },
  roadmap: {
    kicker: 'Roadmap',
    title: 'What comes next',
    items: [
      { title: 'Frozen test set', body: 'Out-of-sample exercises, fixed and pre-registered before they are run, to measure the assistant honestly.' },
      {
        title: 'Number gate v2',
        body: 'Typed rendering: the model cites a reference to a tool result, and deterministic code writes the engine’s value, its sign, its unit and the name of the quantity.'
      },
      { title: 'Validation kit', body: 'Reference sets, tolerances and a regenerable execution report, with a drift check in continuous integration.' },
      { title: 'PAGE 2027', body: 'An abstract on the independent comparison of open NCA tools.' }
    ]
  },
  about: {
    kicker: 'Author',
    title: 'Who is behind it',
    name: 'Abdallah Ragued',
    body: 'Master’s student in pharmacokinetic modelling at Université Paris Cité, after a Master’s in health data science at Université Paris-Saclay. Officina is the portfolio for a PhD at the meeting point of DMPK and artificial intelligence. The name is Latin for the apothecary’s workshop.',
    github: 'GitHub: abdou-rgd'
  },
  footer: {
    repos: 'Repositories',
    licenses: 'Licenses',
    licenseText:
      'Code and text under MIT OR Apache-2.0, at your option. React Bits animation components under their own license (MIT + Commons Clause). Newsreader and IBM Plex fonts under the SIL Open Font License 1.1, served by this site.',
    credit: 'Caladrius and Apothicaire logos drawn by Amina. Screenshots of the application taken from the Caladrius repository.',
    privacy: 'This site uses no cookies, no trackers and no request to another site.',
    disclaimer: 'Research prototype with no regulatory status. Not for use on a patient or for a real decision.'
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
