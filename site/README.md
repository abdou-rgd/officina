# Officina website

The project's public page: one static page, French by default with an English switch, light and dark
themes following the system. Built with Vite, React and TypeScript, and two animation components from
[React Bits](https://github.com/DavidHDev/react-bits) (`src/vendor/react-bits/`, under their own
license, see that folder's README). No cookies, no trackers, no request to another site.

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
- **Components.** `Specimen.tsx` (the figure), `Architecture.tsx` (the diagram, as SVG on wide
  screens and as a stacked list on phones), `GateFlow.tsx` (a question followed through the number
  gate), `Doors.tsx` (desktop, command line, MCP) and `motion.ts` (scroll reveals). Every animation
  is skipped when the system asks for reduced motion.
- **Fonts.** Newsreader and IBM Plex Sans and Mono, from the Fontsource packages, under the SIL Open
  Font License 1.1. They are bundled into `dist/` and served by the site itself.
- **Screenshots.** `public/screens/` holds three screenshots of the Caladrius desktop app, copied
  from `caladrius/docs/screens/` and converted to 1200 px wide WebP.
- **Deployment.** `.github/workflows/site.yml` builds on every pull request touching `site/` and
  deploys to GitHub Pages on `main`. One-time setup in the repository: Settings → Pages → Source:
  GitHub Actions. The site is at <https://officina-dmpk.com/> (before the domain, it was at
  <https://abdou-rgd.github.io/officina/>).
- **Own domain.** `site/CNAME` holds the domain, `officina-dmpk.com`, as its only line; the same
  domain is set in Settings → Pages → Custom domain. A non-empty `CNAME` makes the build serve from
  `/` instead of `/officina/`; emptying it goes back to the project page.
- **Logos.** `public/caladrius-logo-small-mono.svg` is the Caladrius logo (drawn by Amina), copied from
  `caladrius/assets/logo/`; it marks the Caladrius card only and is used as a CSS mask, so it takes
  the theme's accent colour. Officina and Apothicaire have no logo yet: the header is text only and
  `public/favicon.svg` is a plain placeholder monogram.
