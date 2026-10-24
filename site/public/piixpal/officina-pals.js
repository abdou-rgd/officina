/* Officina pals: the two project mascots, drawn for Piixpal 0.4.0 (MIT, https://github.com/diiviikk5/Piixpal).
 * Loaded by src/Mascots.tsx after the Piixpal core and the two components that carry the behaviours
 * (pip.min.js brings `perch`, bitbug.min.js brings `crawl`). Grids are plain strings, one character
 * per pixel, '.' transparent; each pal has its own palette. */
(() => {
  const art = Piixpal.art;
  const pad = (w, rows) => rows.map(r => r.padEnd(w, '.'));

  /* CALADRIUS: the white healing bird of the logo, side view, facing right.
   * Perches on buttons and titles, flies off when the cursor comes close. */
  const CW = 24;
  const cal = pad(CW, [
    '.............k.k',
    '............kgkgk',
    '.............kwwwk',
    '............kwwwwwk',
    '..k........kwwwwwwwk',
    '..kk......kwwwwwwkkwk',
    '..kgk.....kwwwwwwkkwkoo',
    '..kggk....kwwwwwwwwwkooo',
    '...kggk...kwwwwwwwwk..o',
    '...kgwgkkkwwwwwwwwwk',
    '....kgwwgwwwwwwwwwk',
    '....kgwwwgwwwwwwwwk',
    '...kkgwwwwgwwwwwwk',
    '..kwkkgwwwwggwwwwk',
    '.kwk..kggwwwwwwwk',
    'kwk....kkkkkkkkk',
    'kgk......o...o',
    '.k'
  ]);
  const calBlink = art.put(cal, 17, 5, ['ww', 'kk']);
  const calLook = art.compose(cal, [17, 4, ['kk', 'kk', 'ww']]);
  const calPeck = art.compose(cal, [21, 6, ['o..', 'ooo', '.oo', '..o']]);
  /* flying: legs tucked, the wing stretched up or swept down */
  const calTucked = art.put(cal, 0, 16, ['kgk' + '.'.repeat(CW - 3)]);
  const calWingUp = art.compose(calTucked, [0, 0, ['k', 'kk', 'kgk', '.kgk']]);
  const calWingDown = art.compose(calTucked,
    [2, 4, ['..', '...', '....', '.....', '......', '.......k']],
    [3, 10, ['k']], [4, 9, ['.k']],
    [6, 15, ['kwwwwwk', '.kgwgk', '..kgk', '...k']]);

  /* APOTHICAIRE: the mortar and pestle of the logo, with a face and little feet.
   * Waddles along titles; a leaf of the logo's vine grows on its rim. */
  const AW = 16;
  const apo = pad(AW, [
    '............kk',
    '...........kBbk',
    '...lL.....kBbk',
    '..llL.....kbk',
    '.kkkkkkkkkbbkkk',
    'kBBBBBBBkbbBBBBk',
    'kddddddddkkddddk',
    '.kbbbbbbbbbbbbk',
    '.kbbwkbbbbwkbbk',
    '.kbbkkbbbbkkbbk',
    '..kpbbkbbkbbpk',
    '..kbbbbkkbbbbk',
    '...kkbbbbbbkk',
    '....kkkkkkkk',
    '.....k....k'
  ]);
  const apoBlink = art.compose(apo, [4, 8, ['bb']], [10, 8, ['bb']]);
  const apoStep = art.put(apo, 0, 14, ['....k......k....']);
  const apoHop = art.compose(apo, [6, 10, ['bkkb']], [6, 11, ['kppk']], [7, 12, ['kk']], [0, 14, ['.'.repeat(AW)]]);

  const pals = {
    caladrius: {
      w: CW, h: 19, scale: 3, does: 'perch',
      palette: { k: '#24563a', w: '#ffffff', g: '#83d383', o: '#e0a92b' },
      frames: {
        idle: [cal, cal, cal, calBlink, cal, cal],
        look: [calLook, calLook, cal],
        peck: [calPeck, cal, calPeck, cal],
        fly: [calWingUp, calWingDown]
      },
      fps: { idle: 3, look: 2, peck: 8, fly: 10 }
    },
    apothicaire: {
      w: AW, h: 15, scale: 3, does: 'crawl',
      palette: { k: '#4a3606', b: '#a27a0e', B: '#d6aa3c', d: '#6e5208', w: '#ffffff', p: '#f2a3a3', l: '#83d383', L: '#3f8a52' },
      frames: {
        idle: [apo, apo, apo, apoBlink],
        walk: [apo, apoStep],
        hop: [apoHop],
        flip: [apoHop]
      },
      fps: { idle: 2.5, walk: 5 }
    }
  };

  for (const [name, spec] of Object.entries(pals)) Piixpal.sprite(name, spec);
})();
