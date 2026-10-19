import type { CSSProperties } from 'react';
import ShinyText from './vendor/react-bits/ShinyText/ShinyText';
import SpotlightCard from './vendor/react-bits/SpotlightCard/SpotlightCard';
import Diagram from './Diagram';
import { dict, links, positioning } from './i18n';
import { useLang, useTheme, type ThemeChoice } from './prefs';

// The bird is Caladrius's logo (drawn by Amina), so it marks the Caladrius card only;
// Officina and Apothicaire get their own logos later.
const caladriusLogo = { '--logo-url': `url(${import.meta.env.BASE_URL}caladrius-logo-small-mono.svg)` } as CSSProperties;

// ShinyText parses its colours on a canvas, so it needs literal colours rather than CSS variables.
const shine = {
  light: { color: '#2c6e3a', shineColor: '#9be29b' },
  dark: { color: '#83d383', shineColor: '#f2fff2' }
};

const themeChoices: ThemeChoice[] = ['system', 'light', 'dark'];

export default function App() {
  const [lang, setLang] = useLang();
  const [themeChoice, setThemeChoice, theme] = useTheme();
  const t = dict[lang];
  const p = positioning[lang];

  return (
    <>
      <a className="skip" href="#main">{t.ui.skip}</a>
      <header className="topbar">
        <div className="wrap topbar__inner">
          <a className="brand" href="#top">
            <span className="brand__name">Officina</span>
          </a>
          <nav className="nav" aria-label="Sections">
            <a href="#tools">{t.nav.tools}</a>
            <a href="#validation">{t.nav.validation}</a>
            <a href="#method">{t.nav.method}</a>
            <a href="#roadmap">{t.nav.roadmap}</a>
            <a href="#about">{t.nav.about}</a>
          </nav>
          <div className="controls">
            <div className="seg" role="group" aria-label={t.ui.themeLabel}>
              {themeChoices.map(c => (
                <button key={c} type="button" aria-pressed={themeChoice === c} onClick={() => setThemeChoice(c)}>
                  {t.ui.themes[c]}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="lang"
              lang={lang === 'fr' ? 'en' : 'fr'}
              aria-label={t.ui.langSwitchLabel}
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="wrap hero__inner">
            <div className="hero__text">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>
                {p.lead}
                <ShinyText key={theme} {...shine[theme]} speed={3} delay={2.5} shineWidth={30}>
                  {p.shine}
                </ShinyText>
              </h1>
              <p className="lead">{t.hero.sub}</p>
              <div className="cta">
                <a className="btn btn--primary" href={links.officina}>{t.hero.ctaCode}</a>
                <a className="btn" href={links.validation}>{t.hero.ctaValidation}</a>
              </div>
              <p className="note">{t.hero.note}</p>
            </div>
          </div>
          <div className="wrap">
            <ul className="facts">
              {t.facts.map(f => (
                <li key={f.value}>
                  <strong>{f.value}</strong>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="tools" className="section">
          <div className="wrap">
            <h2>{t.tools.title}</h2>
            <p className="section__intro">{t.tools.intro}</p>
            <div className="cards">
              {t.tools.items.map(item => (
                <SpotlightCard
                  key={item.key}
                  theme={theme}
                  spotlightColor={theme === 'dark' ? '#83d383' : '#2c6e3a'}
                  className="card"
                  style={{ '--spotlight-card-surface': 'var(--surface)', '--spotlight-card-border': 'var(--line)' } as CSSProperties}
                >
                  <h3>
                    {item.key === 'caladrius' ? (
                      <span className="logo-mark card__logo" style={caladriusLogo} aria-hidden="true" />
                    ) : null}
                    {item.name} <span className="card__role">{item.role}</span>
                  </h3>
                  <p>{item.body}</p>
                  <p className="card__meta">{item.meta}</p>
                  <a className="card__link" href={links[item.key as 'caladrius' | 'apothicaire' | 'optchat']}>
                    github.com/abdou-rgd/{item.key}
                  </a>
                </SpotlightCard>
              ))}
            </div>
            <Diagram t={t.tools.diagram} />
          </div>
        </section>

        <section id="validation" className="section section--alt">
          <div className="wrap">
            <h2>{t.validation.title}</h2>
            <p className="section__intro">{t.validation.intro}</p>
            <div className="headline">
              <strong>{lang === 'fr' ? '48 955 / 48 955' : '48,955 / 48,955'}</strong>
              <span>{t.validation.headline}</span>
            </div>
            <p className="muted">{t.validation.headlineNote}</p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">{t.validation.cols.domain}</th>
                    <th scope="col">{t.validation.cols.oracle}</th>
                    <th scope="col" className="num">{t.validation.cols.values}</th>
                    <th scope="col" className="num">{t.validation.cols.cases}</th>
                    <th scope="col" className="num">{t.validation.cols.tol}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.validation.rows.map(r => (
                    <tr key={r.domain}>
                      <th scope="row">{r.domain}</th>
                      <td>{r.oracle}</td>
                      <td className="num">{r.values}</td>
                      <td className="num">{r.cases}</td>
                      <td className="num"><code>{r.tol}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>{t.validation.meaning}</p>
            <p className="muted">{t.validation.scope}</p>
            <p className="links">
              <a href={links.validation}>{t.validation.linkReport}</a>
              <a href={links.conformance}>{t.validation.linkConformance}</a>
            </p>
          </div>
        </section>

        <section id="method" className="section">
          <div className="wrap">
            <h2>{t.method.title}</h2>
            <ol className="steps">
              {t.method.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="steps__n">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="two">
              <div>
                <h3>{t.method.benchTitle}</h3>
                <p>{t.method.bench}</p>
                <p className="muted">{t.method.benchCaveat}</p>
                <p className="links"><a href={links.bench}>{t.method.benchLink}</a></p>
              </div>
              <div>
                <h3>{t.method.buildTitle}</h3>
                <p>{t.method.build}</p>
                <p className="links"><a href={links.method}>{t.method.buildLink}</a></p>
              </div>
            </div>
          </div>
        </section>

        <section id="roadmap" className="section section--alt">
          <div className="wrap">
            <h2>{t.roadmap.title}</h2>
            <ol className="roadmap">
              {t.roadmap.items.map(item => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="about" className="section">
          <div className="wrap about">
            <h2>{t.about.title}</h2>
            <p className="about__name">{t.about.name}</p>
            <p>{t.about.body}</p>
            <p className="links"><a href={links.profile}>{t.about.github}</a></p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer__grid">
          <div>
            <h2>{t.footer.repos}</h2>
            <ul>
              {(['officina', 'caladrius', 'apothicaire', 'optchat'] as const).map(r => (
                <li key={r}><a href={links[r]}>abdou-rgd/{r}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{t.footer.licenses}</h2>
            <p>{t.footer.licenseText}</p>
            <p>{t.footer.credit}</p>
            <p>{t.footer.privacy}</p>
          </div>
          <p className="footer__disclaimer">{t.footer.disclaimer}</p>
        </div>
      </footer>
    </>
  );
}
