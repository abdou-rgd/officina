# Vendored React Bits components

These two components are copied unchanged from [React Bits](https://github.com/DavidHDev/react-bits)
by David Haz, TypeScript + CSS variant (`src/ts-default/`), commit
`e12c22192ac7b4b452c5e2feb9b586d74765d696` (2026-10-19):

| component | source path |
|---|---|
| `ShinyText` | `src/ts-default/TextAnimations/ShinyText/` |
| `SpotlightCard` | `src/ts-default/Components/SpotlightCard/` |

**License.** These files are under the React Bits license, MIT + Commons Clause
([LICENSE.md](LICENSE.md)), not under the MIT OR Apache-2.0 license of the rest of this
repository. They are used here as part of a website, which that license permits; they may not be
sold, sublicensed or redistributed on their own. Keep the copyright notice and this folder's
LICENSE.md with them.

Both components read `prefers-reduced-motion` themselves and stop animating when it is set.
