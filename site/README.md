# Officina website

The project's public page: one static monograph in four chapters, French by default with an English
switch, light and dark themes following the system. Built with Vite, React and TypeScript, with no
third-party UI library; the one animation library is Piixpal, for the two mascots (see below), served
by the site itself. No cookies, no trackers, no request to another site.

```bash
npm ci
npm run dev       # http://localhost:5173/ (or /officina/ when CNAME is empty)
npm run build     # static files in dist/
```

- **Text.** Every visible string is in `src/i18n.ts`, French and English side by side. The numbers
  there are copied from the repositories' own reports, which the comments name; update them together.
  French typography (narrow no-break spaces, numbers kept with their units) is applied in code, at
  the end of that file.
- **The Caladrius figure.** The profile in the hero, the gate example and the terminal excerpts all
  come from one Caladrius run on a synthetic profile. `specimen/make_specimen.py` simulates it with
  `model.simulate`, adds fixed-seed noise, runs `nca.run` and rewrites `specimen/profile.csv` and
  `src/specimen.json`: `python3 make_specimen.py /path/to/caladrius-cli`, from `specimen/`. The
  excerpts in `src/Doors.tsx` are copied from the same run; rerun and recopy them together.
- **Components.** `Specimen.tsx` (the figure), `GateFlow.tsx` (a question followed through the number
  gate), `Doors.tsx` (desktop, command line, MCP) and `motion.ts` (scroll reveals). Every animation
  is skipped when the system asks for reduced motion.
- **Fonts.** Newsreader and IBM Plex Sans and Mono, from the Fontsource packages, under the SIL Open
  Font License 1.1. They are bundled into `dist/` and served by the site itself.
- **Mascots.** Two pixel-art pals drawn from the logos: the Caladrius bird perches on the hero figure
  and flies off when the cursor comes close; the Apothicaire mortar, given eyes and a smile, waddles
  along the rule under Chapter III's introduction. They run on [Piixpal](https://github.com/diiviikk5/Piixpal)
  0.4.0 (MIT): `public/piixpal/` holds `dist/core.min.js`, `dist/c/pip.min.js` (the `perch`
  behaviour) and `dist/c/bitbug.min.js` (the `crawl` behaviour) copied unchanged from the npm package
  `piixpal@0.4.0`, its `LICENSE`, and `officina-pals.js`, the two sprites as grids of characters.
  `src/Mascots.tsx` loads these four files after the page and places the pals; nothing is loaded
  when the system asks for reduced motion. About 64 KB in all.
- **Screenshots.** `public/screens/` holds three screenshots of the Caladrius desktop app, copied
  from `caladrius/docs/screens/` and converted to 1200 px wide WebP.
- **Caladrius in the browser** (`/app/`, the "Try Caladrius" button). Not in this repository: the
  workflow checks out Caladrius at the commit pinned by `CALADRIUS_REF` in `site.yml` and runs its
  `cargo xtask web --out site/dist/app` (the egui interface compiled to WebAssembly, `apps/caladrius-web`).
  Move `CALADRIUS_REF` on purpose when a new Caladrius should go online. To try it locally, from the
  caladrius checkout: `cargo xtask web --out ../officina/site/public/app` (git-ignored), then
  `npm run dev` and open `/app/`. The "Download" button points at the latest Caladrius release.
- **Deployment.** `.github/workflows/site.yml` builds on every pull request touching `site/` and
  deploys to GitHub Pages on `main`. One-time setup in the repository: Settings → Pages → Source:
  GitHub Actions. The site is at <https://officina-dmpk.com/> (before the domain, it was at
  <https://abdou-rgd.github.io/officina/>).
- **Own domain.** `site/CNAME` holds the domain, `officina-dmpk.com`, as its only line; the same
  domain is set in Settings → Pages → Custom domain. A non-empty `CNAME` makes the build serve from
  `/` instead of `/officina/`; emptying it goes back to the project page.
- **Logos.** `public/caladrius-logo-mono.svg`, `public/caladrius-logo-small-mono.svg`,
  `public/apothicaire-logo-mono.svg` and `public/apothicaire-logo-small-mono.svg` are the Caladrius
  and Apothicaire emblems (both drawn by Amina), copied from `assets/logo/` in their own
  repositories. The simplified `small` set is used in the hero; the full detailed engravings head
  Chapters I and III. Each marks its own tool only and is used as a CSS mask: the bird takes the
  theme's sage green (`--accent`), the mortar keeps Apothicaire's golden ochre (`--apothicaire`).
  Officina has no logo yet: the header uses a bicolour two-dot mark (`Caladrius` green +
  `Apothicaire` ochre) and `public/favicon.svg` is a placeholder monogram.
