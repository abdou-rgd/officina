# Officina: notes for Claude Code

The umbrella of the project: `README.md` (map of the components), `METHOD.md`, `notes/`, and the
public website in `site/`. No code of the components lives here; they are the caladrius, apothicaire
and optchat repositories.

- **Website** (`site/`, Vite + React + TypeScript, served at https://officina-dmpk.com/):
  `cd site && npm ci && npm run build` is what CI runs on every pull request touching `site/`.
  A push to `main` deploys to GitHub Pages, so site changes go through a pull request.
  `site/CNAME` must keep `officina-dmpk.com` as its only line. Every visible string is in
  `site/src/i18n.ts` (French and English); its numbers are copied from the components' reports, which
  the comments name. `site/README.md` has the rest.
- **Public text.** The README, `METHOD.md` and the site are read by others: check every figure against
  the component repository it comes from.
- `private/` and `sources/` are git-ignored and stay out of the repository.
