import { useRef, type CSSProperties, type ReactNode } from 'react';
import Doors from './Doors';
import GateFlow from './GateFlow';
import Specimen from './Specimen';
import { dict, links, positioning, type Lang } from './i18n';
import { useActiveSection, useReveal } from './motion';
import { useLang, useTheme, type ThemeChoice } from './prefs';

// Each tool's own mark (both drawn by Amina): the bird for Caladrius, the mortar for Apothicaire.
// Use the simplified small version below ~64 px, and the full detailed engraving above.
const logoUrl = (file: string) => ({ '--logo-url': `url(${import.meta.env.BASE_URL}${file})` }) as CSSProperties;

const logosSmall: Record<'caladrius' | 'apothicaire', CSSProperties> = {
  caladrius: logoUrl('caladrius-logo-small-mono.svg'),
  apothicaire: logoUrl('apothicaire-logo-small-mono.svg')
};

const logosFull: Record<'caladrius' | 'apothicaire', CSSProperties> = {
  caladrius: logoUrl('caladrius-logo-mono.svg'),
  apothicaire: logoUrl('apothicaire-logo-mono.svg')
};

function LogoMark({
  tool,
  size = 'sm',
  className = ''
}: {
  tool: 'caladrius' | 'apothicaire';
  size?: 'sm' | 'lg';
  className?: string;
}) {
  const style = size === 'lg' ? logosFull[tool] : logosSmall[tool];
  return (
    <span
      className={`logo-mark logo-mark--${tool} logo-mark--${size} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    />
  );
}

const themeChoices: ThemeChoice[] = ['system', 'light', 'dark'];
const sections = ['caladrius', 'validation', 'apothicaire', 'atelier'] as const;

const icons: Record<ThemeChoice, ReactNode> = {
  system: (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="2.5" y="3.5" width="15" height="10" rx="1.5" />
      <path d="M7 17h6M10 13.5V17" />
    </svg>
  ),
  light: (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="3.5" />
      <path d="M10 1.5v2.2M10 16.3v2.2M1.5 10h2.2M16.3 10h2.2M4 4l1.5 1.5M14.5 14.5 16 16M4 16l1.5-1.5M14.5 5.5 16 4" />
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M15.5 12.5A6.5 6.5 0 0 1 7.5 4.5a6.5 6.5 0 1 0 8 8z" />
    </svg>
  )
};

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="kicker">
      <span className="kicker__t">{children}</span>
    </p>
  );
}

function fmtCount(lang: Lang, v: number) {
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB').format(v);
}

export default function App() {
  const [lang, setLang] = useLang();
  const [themeChoice, setThemeChoice] = useTheme();
  const t = dict[lang];
  const p = positioning[lang];
  const active = useActiveSection([...sections]);
  const menu = useRef<HTMLDetailsElement>(null);
  useReveal();

  const total = t.validation.rows.reduce((sum, r) => sum + r.values, 0);
  const navLinks = sections.map(id => (
    <a
      key={id}
      href={`#${id}`}
      aria-current={active === id ? 'true' : undefined}
      onClick={() => menu.current?.removeAttribute('open')}
    >
      {t.nav[id]}
    </a>
  ));

  return (
    <>
      <a className="skip" href="#main">
        {t.ui.skip}
      </a>
      <header className="topbar">
        <div className="wrap topbar__inner">
          <a className="brand" href="#top">
            Officina
            <span className="brand__marks" aria-hidden="true">
              <span className="brand__dot brand__dot--caladrius" />
              <span className="brand__dot brand__dot--apothicaire" />
            </span>
          </a>
          <nav className="nav" aria-label={t.nav.menu}>
            {navLinks}
          </nav>
          <div className="controls">
            <details className="menu" ref={menu}>
              <summary>{t.nav.menu}</summary>
              <nav className="menu__list" aria-label={t.nav.menu}>
                {navLinks}
              </nav>
            </details>
            <div className="seg seg--icons" role="group" aria-label={t.ui.themeLabel}>
              {themeChoices.map(c => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={themeChoice === c}
                  aria-label={t.ui.themes[c]}
                  title={t.ui.themes[c]}
                  onClick={() => setThemeChoice(c)}
                >
                  {icons[c]}
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
        {/* ---------- Opening / Hero ---------- */}
        <section className="hero" id="top">
          <div className="wrap hero__grid">
            <div className="hero__text">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>
                {p.lead}
                <em className="hero__highlight">{p.shine}</em>
              </h1>
              <p className="hero__intro">{t.hero.intro}</p>

              <div className="cta">
                <a className="btn btn--primary" href={`${import.meta.env.BASE_URL}app/`}>
                  {t.hero.ctaTry}
                </a>
                <a className="btn" href={links.download}>
                  {t.hero.ctaDownload}
                </a>
                <a className="btn btn--quiet" href={links.officina}>
                  {t.hero.ctaCode}
                </a>
              </div>
              <p className="cta__note">{t.hero.tryNote}</p>
              <p className="cta__soon">
                <LogoMark tool="apothicaire" size="sm" />
                <span>{t.hero.soon}</span>
              </p>

              <div className="pair">
                {t.hero.pair.map(item => {
                  const key = item.key as 'caladrius' | 'apothicaire';
                  return (
                    <div key={key} className={`pair__item pair__item--${key}`}>
                      <div className="pair__head">
                        <LogoMark tool={key} size="sm" />
                        <div>
                          <span className={`chip ${key === 'caladrius' ? 'chip--det' : 'chip--ai'}`}>
                            {item.tag}
                          </span>
                          <p className="pair__name">
                            <a href={`#${key}`}>{item.name}</a>, <em>{item.role}</em>
                          </p>
                        </div>
                      </div>
                      <p className="pair__body">{item.body}</p>
                      <a className="pair__repo" href={links[key]}>
                        {item.repoLabel}
                      </a>
                    </div>
                  );
                })}
              </div>

              <p className="note">{t.hero.note}</p>
            </div>

            <Specimen t={t.specimen} lang={lang} />
          </div>
        </section>

        {/* ---------- Chapter I: Caladrius (Sage Green) ---------- */}
        <section id="caladrius" className="section section--caladrius">
          <div className="wrap">
            <header className="section__head section__head--emblem" data-reveal>
              <LogoMark tool="caladrius" size="lg" className="chapter-emblem" />
              <div>
                <Kicker>{t.caladrius.kicker}</Kicker>
                <h2>{t.caladrius.title}</h2>
                <p className="section__intro">{t.caladrius.intro}</p>
              </div>
            </header>

            <div className="split">
              <div data-reveal>
                <h3 className="sub-title">{t.caladrius.specTitle}</h3>
                <dl className="spec">
                  {t.caladrius.spec.map((row, idx) => (
                    <div
                      key={row.k}
                      className={idx === t.caladrius.spec.length - 1 ? 'spec__out' : undefined}
                    >
                      <dt>{row.k}</dt>
                      <dd>{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div data-reveal>
                <h3 className="sub-title">{t.caladrius.doorsTitle}</h3>
                <p className="muted">{t.caladrius.doorsIntro}</p>
                <Doors t={t.caladrius} />
              </div>
            </div>

            <div className="sub-block" data-reveal>
              <div className="sub-block__head">
                <h3>{t.caladrius.whyTitle}</h3>
                <p className="stance">{t.caladrius.whyIntro}</p>
              </div>
              <ol className="pillars">
                {t.caladrius.pillars.map(item => (
                  <li key={item.n} className="pillar">
                    <span className="pillar__n">{item.n}</span>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                    <a className="pillar__proof" href={links[item.href as keyof typeof links]}>
                      {item.proof}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ---------- Chapter II: Validation ---------- */}
        <section id="validation" className="section section--alt">
          <div className="wrap">
            <header className="section__head" data-reveal>
              <Kicker>{t.validation.kicker}</Kicker>
              <h2>{t.validation.title}</h2>
              <p className="section__intro">{t.validation.intro}</p>
            </header>

            <div className="validation-banner" data-reveal>
              <div className="headline">
                <strong>{`${fmtCount(lang, total)} / ${fmtCount(lang, total)}`}</strong>
                <span>{t.validation.headline}</span>
              </div>
              <p className="muted validation-banner__note">{t.validation.headlineNote}</p>
            </div>

            <div className="table-wrap" data-reveal>
              <table>
                <thead>
                  <tr>
                    <th scope="col">{t.validation.cols.domain}</th>
                    <th scope="col">{t.validation.cols.oracle}</th>
                    <th scope="col" className="num">
                      {t.validation.cols.values}
                    </th>
                    <th scope="col" className="num">
                      {t.validation.cols.cases}
                    </th>
                    <th scope="col" className="num">
                      {t.validation.cols.tol}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {t.validation.rows.map(r => (
                    <tr key={r.key}>
                      <th scope="row">{r.domain}</th>
                      <td data-label={t.validation.cols.oracle}>{r.oracle}</td>
                      <td className="num" data-label={t.validation.cols.values}>
                        {fmtCount(lang, r.values)}
                      </td>
                      <td className="num" data-label={t.validation.cols.cases}>
                        {r.cases}
                      </td>
                      <td className="num" data-label={t.validation.cols.tol}>
                        <code>{r.tol}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="two validation-notes" data-reveal>
              <div>
                <h3>{t.validation.meaningTitle}</h3>
                <p>{t.validation.meaning}</p>
              </div>
              <div>
                <h3>{t.validation.honestTitle}</h3>
                <p>{t.validation.honest}</p>
              </div>
            </div>

            <p className="links" data-reveal>
              <a href={links.validation}>{t.validation.linkReport}</a>
              <a href={links.conformance}>{t.validation.linkConformance}</a>
            </p>
          </div>
        </section>

        {/* ---------- Chapter III: Apothicaire & OptChat (Golden Ochre) ---------- */}
        <section id="apothicaire" className="section section--apothicaire">
          <div className="wrap">
            <header className="section__head section__head--emblem" data-reveal>
              <LogoMark tool="apothicaire" size="lg" className="chapter-emblem" />
              <div>
                <Kicker>{t.apothicaire.kicker}</Kicker>
                <h2>{t.apothicaire.title}</h2>
                <p className="section__intro">{t.apothicaire.intro}</p>
              </div>
            </header>

            <ol className="apo-parts" data-reveal>
              {t.apothicaire.parts.map(part => (
                <li key={part.tag} className="apo-part">
                  <span className="apo-part__tag">{part.tag}</span>
                  <h3>{part.title}</h3>
                  <p>{part.body}</p>
                  <a className="pillar__proof" href={links[part.href as keyof typeof links]}>
                    {part.linkLabel}
                  </a>
                </li>
              ))}
            </ol>

            <div data-reveal>
              <GateFlow t={t.apothicaire.flow} lang={lang} />
            </div>

            <div className="bench" data-reveal>
              <div className="sub-block__head">
                <h3>{t.apothicaire.benchTitle}</h3>
                <p className="stance">{t.apothicaire.benchStory}</p>
              </div>
              <ul className="bench__nums">
                {t.apothicaire.bench.map(b => (
                  <li key={b.value}>
                    <strong>{b.value}</strong>
                    <span>{b.label}</span>
                  </li>
                ))}
              </ul>
              <p className="limits">{t.apothicaire.benchCaveat}</p>
              <p className="links">
                <a href={links.bench}>{t.apothicaire.benchLink}</a>
                <a href={links.gate}>{t.apothicaire.gateLink}</a>
              </p>
            </div>

            <div className="sub-block" data-reveal>
              <div className="sub-block__head">
                <h3>{t.apothicaire.localTitle}</h3>
                <p className="stance">{t.apothicaire.localIntro}</p>
              </div>
              <ol className="pillars pillars--ochre">
                {t.apothicaire.localPillars.map(item => (
                  <li key={item.word} className="pillar">
                    <p className="pillar__word">{item.word}</p>
                    <h4>{item.claim}</h4>
                    <p>{item.body}</p>
                  </li>
                ))}
              </ol>
              <blockquote className="epigraph">{t.apothicaire.localQuote}</blockquote>
            </div>
          </div>
        </section>

        {/* ---------- Chapter IV: L'Atelier, la Méthode & l'Auteur ---------- */}
        <section id="atelier" className="section section--alt">
          <div className="wrap">
            <header className="section__head" data-reveal>
              <Kicker>{t.atelier.kicker}</Kicker>
              <h2>{t.atelier.title}</h2>
            </header>

            <div className="atelier" data-reveal>
              <div className="atelier__author">
                <h3 className="sub-title">{t.atelier.authorSubtitle}</h3>
                <div className="author-id">
                  <p className="author-id__name">{t.atelier.authorName}</p>
                  <p className="author-id__role">{t.atelier.authorRole}</p>
                </div>
                {t.atelier.authorParagraphs.map((para, i) => (
                  <p key={i} className="atelier__prose">
                    {para}
                  </p>
                ))}
                <p className="links">
                  <a href={links.method}>{t.atelier.methodLink}</a>
                  <a href={links.profile}>{t.atelier.githubLink}</a>
                </p>
              </div>

              <div className="atelier__roadmap">
                <h3 className="sub-title">{t.atelier.roadmapSubtitle}</h3>
                <p className="muted">{t.atelier.roadmapIntro}</p>
                <ol className="roadmap">
                  {t.atelier.roadmap.map(item => (
                    <li key={item.title}>
                      <h4>{item.title}</h4>
                      <p>{item.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer__grid">
          <div>
            <p className="footer__brand">
              Officina
              <span className="brand__marks" aria-hidden="true">
                <span className="brand__dot brand__dot--caladrius" />
                <span className="brand__dot brand__dot--apothicaire" />
              </span>
            </p>
            <p>
              {p.lead}
              {p.shine}
            </p>
          </div>
          <div>
            <h2>{t.footer.repos}</h2>
            <ul>
              {(['officina', 'caladrius', 'apothicaire', 'optchat'] as const).map(r => (
                <li key={r}>
                  <a href={links[r]}>abdou-rgd/{r}</a>
                </li>
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
