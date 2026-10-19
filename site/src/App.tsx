import { useRef, type CSSProperties, type ReactNode } from 'react';
import ShinyText from './vendor/react-bits/ShinyText/ShinyText';
import SpotlightCard from './vendor/react-bits/SpotlightCard/SpotlightCard';
import Architecture from './Architecture';
import Doors from './Doors';
import GateFlow from './GateFlow';
import Specimen from './Specimen';
import { dict, links, positioning, type Lang } from './i18n';
import { useActiveSection, useReveal } from './motion';
import { useLang, useTheme, type ThemeChoice } from './prefs';

// The bird is Caladrius's logo (drawn by Amina), so it marks Caladrius only;
// Officina and Apothicaire get their own logos later.
const caladriusLogo = { '--logo-url': `url(${import.meta.env.BASE_URL}caladrius-logo-small-mono.svg)` } as CSSProperties;

// ShinyText parses its colours on a canvas, so it needs literal colours rather than CSS variables.
const shine = {
  light: { color: '#2c6e3a', shineColor: '#9be29b' },
  dark: { color: '#83d383', shineColor: '#f2fff2' }
};

const themeChoices: ThemeChoice[] = ['system', 'light', 'dark'];
const sections = ['ensemble', 'caladrius', 'pourquoi', 'validation', 'apothicaire', 'local', 'feuille-de-route'] as const;
const navKeys = ['overview', 'caladrius', 'why', 'validation', 'apothicaire', 'local', 'roadmap'] as const;

const icons: Record<ThemeChoice, ReactNode> = {
  system: (
    <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="3.5" width="15" height="10" rx="1.5" /><path d="M7 17h6M10 13.5V17" /></svg>
  ),
  light: (
    <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.5" /><path d="M10 1.5v2.2M10 16.3v2.2M1.5 10h2.2M16.3 10h2.2M4 4l1.5 1.5M14.5 14.5 16 16M4 16l1.5-1.5M14.5 5.5 16 4" /></svg>
  ),
  dark: (
    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M15.5 12.5A6.5 6.5 0 0 1 7.5 4.5a6.5 6.5 0 1 0 8 8z" /></svg>
  )
};

function Kicker({ n, children }: { n: number; children: ReactNode }) {
  return (
    <p className="kicker">
      <span className="kicker__n">§ {String(n).padStart(2, '0')}</span>
      <span className="kicker__t">{children}</span>
    </p>
  );
}

function fmtCount(lang: Lang, v: number) {
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB').format(v);
}

export default function App() {
  const [lang, setLang] = useLang();
  const [themeChoice, setThemeChoice, theme] = useTheme();
  const t = dict[lang];
  const p = positioning[lang];
  const active = useActiveSection([...sections]);
  const menu = useRef<HTMLDetailsElement>(null);
  useReveal();

  const total = t.validation.rows.reduce((sum, r) => sum + r.values, 0);
  const navLinks = sections.map((id, i) => (
    <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined} onClick={() => menu.current?.removeAttribute('open')}>
      {t.nav[navKeys[i]]}
    </a>
  ));

  return (
    <>
      <a className="skip" href="#main">{t.ui.skip}</a>
      <header className="topbar">
        <div className="wrap topbar__inner">
          <a className="brand" href="#top">Officina</a>
          <nav className="nav" aria-label={t.nav.menu}>{navLinks}</nav>
          <div className="controls">
            <details className="menu" ref={menu}>
              <summary>{t.nav.menu}</summary>
              <nav className="menu__list" aria-label={t.nav.menu}>{navLinks}</nav>
            </details>
            <div className="seg seg--icons" role="group" aria-label={t.ui.themeLabel}>
              {themeChoices.map(c => (
                <button key={c} type="button" aria-pressed={themeChoice === c} aria-label={t.ui.themes[c]} title={t.ui.themes[c]} onClick={() => setThemeChoice(c)}>
                  {icons[c]}
                </button>
              ))}
            </div>
            <button type="button" className="lang" lang={lang === 'fr' ? 'en' : 'fr'} aria-label={t.ui.langSwitchLabel} onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}>
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="wrap hero__grid">
            <div className="hero__text">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>
                {p.lead}
                <ShinyText key={theme} {...shine[theme]} speed={3} delay={2.5} shineWidth={30}>
                  {p.shine}
                </ShinyText>
              </h1>
              <div className="pair">
                {t.hero.pair.map(item => (
                  <div key={item.key} className={`pair__item pair__item--${item.key}`}>
                    <span className={`chip ${item.key === 'caladrius' ? 'chip--det' : 'chip--ai'}`}>{item.tag}</span>
                    <p className="pair__name">
                      {item.key === 'caladrius' && <span className="logo-mark" style={caladriusLogo} aria-hidden="true" />}
                      {item.name}, <em>{item.role}</em>
                    </p>
                    <p className="pair__body">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="cta">
                <a className="btn btn--primary" href={links.officina}>{t.hero.ctaCode}</a>
                <a className="btn" href="#pourquoi">{t.hero.ctaWhy}</a>
              </div>
              <p className="note">{t.hero.note}</p>
            </div>
            <Specimen t={t.specimen} lang={lang} />
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

        <section id="ensemble" className="section">
          <div className="wrap">
            <header className="section__head" data-reveal>
              <Kicker n={1}>{t.overview.kicker}</Kicker>
              <h2>{t.overview.title}</h2>
              <p className="section__intro">{t.overview.intro}</p>
            </header>
            <div data-reveal>
              <Architecture t={t.overview.diagram} />
            </div>
            <div className="cards">
              {t.overview.items.map((item, i) => (
                <div key={item.key} data-reveal style={{ '--d': `${i * 90}ms` } as CSSProperties}>
                  <SpotlightCard
                    theme={theme}
                    spotlightColor={theme === 'dark' ? '#83d383' : '#2c6e3a'}
                    className={`card card--${item.key}`}
                    style={{ '--spotlight-card-surface': 'var(--surface)', '--spotlight-card-border': 'var(--line)' } as CSSProperties}
                  >
                    <h3>
                      {item.key === 'caladrius' && <span className="logo-mark card__logo" style={caladriusLogo} aria-hidden="true" />}
                      {item.name}
                    </h3>
                    <p className="card__role">{item.role}</p>
                    <p>{item.body}</p>
                    <p className="card__meta">{item.meta}</p>
                    <a className="card__link" href={links[item.key as 'caladrius' | 'apothicaire' | 'optchat']}>
                      github.com/abdou-rgd/{item.key}
                    </a>
                  </SpotlightCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="caladrius" className="section section--alt">
          <div className="wrap">
            <header className="section__head" data-reveal>
              <Kicker n={2}>{t.caladrius.kicker}</Kicker>
              <h2>{t.caladrius.title}</h2>
              <p className="section__intro">{t.caladrius.intro}</p>
            </header>
            <div className="split">
              <dl className="spec" data-reveal>
                {t.caladrius.spec.map(row => (
                  <div key={row.k} className={row.k === t.caladrius.spec[t.caladrius.spec.length - 1].k ? 'spec__out' : undefined}>
                    <dt>{row.k}</dt>
                    <dd>{row.v}</dd>
                  </div>
                ))}
              </dl>
              <div data-reveal>
                <h3 className="sub-title">{t.caladrius.doorsTitle}</h3>
                <p className="muted">{t.caladrius.doorsIntro}</p>
                <Doors t={t.caladrius} />
              </div>
            </div>
          </div>
        </section>

        <section id="pourquoi" className="section">
          <div className="wrap">
            <header className="section__head" data-reveal>
              <Kicker n={3}>{t.why.kicker}</Kicker>
              <h2>{t.why.title}</h2>
              <p className="section__intro">{t.why.question}</p>
            </header>
            <div className="callout" data-reveal>
              <p className="callout__big">{t.why.callout}</p>
              <p>{t.why.calloutBody}</p>
            </div>
            <p className="stance" data-reveal>{t.why.stance}</p>
            <ol className="reasons">
              {t.why.items.map((item, i) => (
                <li key={item.title} className={item.stat ? 'reason reason--stat' : 'reason'} data-reveal style={{ '--d': `${(i % 2) * 80}ms` } as CSSProperties}>
                  <span className="reason__n">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  {item.stat && (
                    <p className="reason__stat">
                      <strong>{item.stat}</strong>
                      <span>{item.statLabel}</span>
                    </p>
                  )}
                  <a className="reason__proof" href={links[item.href as keyof typeof links]}>{item.proof}</a>
                </li>
              ))}
            </ol>
            <p className="limits" data-reveal>{t.why.limits}</p>
          </div>
        </section>

        <section id="validation" className="section section--alt">
          <div className="wrap">
            <header className="section__head" data-reveal>
              <Kicker n={4}>{t.validation.kicker}</Kicker>
              <h2>{t.validation.title}</h2>
              <p className="section__intro">{t.validation.intro}</p>
            </header>
            <div className="headline" data-reveal>
              <strong>{`${fmtCount(lang, total)} / ${fmtCount(lang, total)}`}</strong>
              <span>{t.validation.headline}</span>
            </div>
            <div className="bar" role="img" aria-label={`${t.validation.barLabel}${lang === 'fr' ? '\u202f:' : ':'} ${t.validation.rows.map(r => `${r.short} ${fmtCount(lang, r.values)}`).join(', ')}`} data-reveal>
              {t.validation.rows.map(r => (
                <span key={r.key} className={`bar__seg bar__seg--${r.key}`} style={{ flexGrow: r.values } as CSSProperties}>
                  <span className="bar__label">{r.short} <span className="mono">{fmtCount(lang, r.values)}</span></span>
                </span>
              ))}
            </div>
            <p className="muted">{t.validation.headlineNote}</p>
            <div className="table-wrap" data-reveal>
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
                    <tr key={r.key}>
                      <th scope="row">{r.domain}</th>
                      <td data-label={t.validation.cols.oracle}>{r.oracle}</td>
                      <td className="num" data-label={t.validation.cols.values}>{fmtCount(lang, r.values)}</td>
                      <td className="num" data-label={t.validation.cols.cases}>{r.cases}</td>
                      <td className="num" data-label={t.validation.cols.tol}><code>{r.tol}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="two" data-reveal>
              <p>{t.validation.meaning}</p>
              <p>{t.validation.honest}</p>
            </div>
            <p className="links">
              <a href={links.validation}>{t.validation.linkReport}</a>
              <a href={links.conformance}>{t.validation.linkConformance}</a>
            </p>
          </div>
        </section>

        <section id="apothicaire" className="section">
          <div className="wrap">
            <header className="section__head" data-reveal>
              <Kicker n={5}>{t.apothicaire.kicker}</Kicker>
              <h2>{t.apothicaire.title}</h2>
              <p className="section__intro">{t.apothicaire.intro}</p>
            </header>
            <div data-reveal>
              <GateFlow t={t.apothicaire.flow} lang={lang} />
            </div>
            <div className="bench" data-reveal>
              <h3>{t.apothicaire.benchTitle}</h3>
              <ul className="bench__nums">
                {t.apothicaire.bench.map(b => (
                  <li key={b.value}>
                    <strong>{b.value}</strong>
                    <span>{b.label}</span>
                  </li>
                ))}
              </ul>
              <p className="muted">{t.apothicaire.benchSetup}</p>
              <p className="muted">{t.apothicaire.benchCaveat}</p>
              <p className="links">
                <a href={links.bench}>{t.apothicaire.benchLink}</a>
                <a href={links.gate}>{t.apothicaire.gateLink}</a>
              </p>
            </div>
          </div>
        </section>

        <section id="local" className="section section--ink">
          <div className="wrap">
            <header className="section__head" data-reveal>
              <Kicker n={6}>{t.local.kicker}</Kicker>
              <h2>{t.local.title}</h2>
              <p className="section__intro">{t.local.intro}</p>
            </header>
            <ol className="words">
              {t.local.items.map((item, i) => (
                <li key={item.word} data-reveal style={{ '--d': `${(i % 3) * 80}ms` } as CSSProperties}>
                  <p className="words__word">{item.word}</p>
                  <p className="words__claim">{item.claim}</p>
                  <p>{item.body}</p>
                </li>
              ))}
            </ol>
            <div className="table-wrap table-wrap--compare" data-reveal>
              <table className="compare">
                <caption>{t.local.tableTitle}</caption>
                <thead>
                  <tr>
                    <td />
                    <th scope="col">{t.local.cols.cloud}</th>
                    <th scope="col" className="compare__us">{t.local.cols.local}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.local.rows.map(r => (
                    <tr key={r.aspect}>
                      <th scope="row">{r.aspect}</th>
                      <td data-label={t.local.cols.cloud}>{r.cloud}</td>
                      <td className="compare__us" data-label={t.local.cols.local}>{r.local}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="aside" data-reveal>{t.local.note}</p>
          </div>
        </section>

        <section id="methode" className="section section--alt">
          <div className="wrap two two--wide">
            <div data-reveal>
              <Kicker n={7}>{t.method.kicker}</Kicker>
              <h2>{t.method.title}</h2>
              <p>{t.method.body}</p>
              <p className="links"><a href={links.method}>{t.method.link}</a></p>
            </div>
            <div id="feuille-de-route" data-reveal>
              <Kicker n={8}>{t.roadmap.kicker}</Kicker>
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
          </div>
        </section>

        <section id="auteur" className="section">
          <div className="wrap about" data-reveal>
            <Kicker n={9}>{t.about.kicker}</Kicker>
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
            <p className="footer__brand">Officina</p>
            <p>{p.lead}{p.shine}</p>
          </div>
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
