# Officina website

The project's public page: one static page, French by default with an English switch, light and dark
themes following the system. Built with Vite, React and TypeScript, and two animation components from
[React Bits](https://github.com/DavidHDev/react-bits) (`src/vendor/react-bits/`, under their own
license, see that folder's README). No cookies, no trackers, no external fonts or requests.

```bash
npm ci
npm run dev       # http://localhost:5173/officina/
npm run build     # static files in dist/
```

- **Text.** Every visible string is in `src/i18n.ts`, French and English side by side. The numbers
  there are copied from the repositories' own reports, which the comments name; update them together.
- **Deployment.** `.github/workflows/site.yml` builds on every pull request touching `site/` and
  deploys to GitHub Pages on `main`. One-time setup in the repository: Settings → Pages → Source:
  GitHub Actions. The site is then at <https://abdou-rgd.github.io/officina/>.
- **Own domain.** Write the domain (for example `officina.example`) as the only line of `site/CNAME`
  and set the same domain in Settings → Pages → Custom domain. A non-empty `CNAME` makes the build
  serve from `/` instead of `/officina/`. Leave the file empty until the domain is bought.
- **Logo.** `public/caladrius*.svg` is the Caladrius logo. `caladrius-mono.svg` is used as a CSS mask,
  so it takes the theme's accent colour.
