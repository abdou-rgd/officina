import { useRef, useState, type KeyboardEvent } from 'react';
import type { Dict } from './i18n';
import { links } from './i18n';

type Props = { t: Dict['caladrius'] };
type Door = 'desktop' | 'cli' | 'mcp';
const doors: Door[] = ['desktop', 'cli', 'mcp'];
const base = import.meta.env.BASE_URL;

// Real output of caladrius-cli on site/specimen/profile.csv (a few of the 61 rows).
const cli = `$ caladrius-cli nca.run --csv profile.csv --param route=extravascular --format csv
subject,parameter,value,not_calculated_reason
1,cmax,4.84,
1,tmax,3,
1,half.life,6.143154824118754,
1,aucinf.obs,53.34860311636741,
1,cl.obs,3.748926650689375,
…`;

// Real request to caladrius-mcp and an excerpt of its structuredContent, same profile.
const mcp = (excerpt: string) => `→ tools/call  nca_run
  { "worksheet": 1, "route": "extravascular",
    "options": { "units": { "time": "h", "concentration": "mg/L", "dose": "mg" } } }

← structuredContent, ${excerpt}
  { "name": "half.life", "unit": "h",   "value": { "value": 6.143154824118754 } }
  { "name": "cl.obs",    "unit": "L/h", "value": { "value": 3.748926650689375 } }`;

// Tabs following the WAI-ARIA pattern: arrow keys move between tabs, Tab enters the panel.
export default function Doors({ t }: Props) {
  const [door, setDoor] = useState<Door>('desktop');
  const tabs = useRef<Record<Door, HTMLButtonElement | null>>({ desktop: null, cli: null, mcp: null });

  function onKey(e: KeyboardEvent) {
    const i = doors.indexOf(door);
    const next = e.key === 'ArrowRight' ? doors[(i + 1) % 3] : e.key === 'ArrowLeft' ? doors[(i + 2) % 3] : null;
    if (!next) return;
    e.preventDefault();
    setDoor(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="doors">
      <div className="doors__tabs" role="tablist" aria-label={t.doorsTitle} onKeyDown={onKey}>
        {doors.map((d, i) => (
          <button
            key={d}
            ref={el => {
              tabs.current[d] = el;
            }}
            type="button"
            role="tab"
            id={`door-tab-${d}`}
            aria-selected={door === d}
            aria-controls={`door-panel-${d}`}
            tabIndex={door === d ? 0 : -1}
            onClick={() => setDoor(d)}
          >
            <span className="mono">0{i + 1}</span> <span className="doors__long">{t.doors[d]}</span>
            <span className="doors__short">{t.doorsShort[d]}</span>
          </button>
        ))}
      </div>

      <div className="doors__panel" role="tabpanel" id={`door-panel-${door}`} aria-labelledby={`door-tab-${door}`} tabIndex={0}>
        {door === 'desktop' && (
          <figure className="shots">
            <img className="shots__main" src={`${base}screens/nca-linear.webp`} alt={t.screensAlt.nca} width={1200} height={1024} loading="lazy" />
            <div className="shots__row">
              <img src={`${base}screens/import-french-csv.webp`} alt={t.screensAlt.import} width={1200} height={1024} loading="lazy" />
              <img src={`${base}screens/fit-results.webp`} alt={t.screensAlt.fit} width={1200} height={1024} loading="lazy" />
            </div>
            <figcaption>
              {t.desktopCaption} <a href={`${links.caladrius}/tree/main/docs/screens`}>{t.screensMore}</a>
            </figcaption>
          </figure>
        )}
        {door === 'cli' && (
          <figure className="term">
            <pre><code>{cli}</code></pre>
            <figcaption>{t.cliCaption}</figcaption>
          </figure>
        )}
        {door === 'mcp' && (
          <figure className="term">
            <pre><code>{mcp(t.excerpt)}</code></pre>
            <figcaption>{t.mcpCaption}</figcaption>
          </figure>
        )}
      </div>
    </div>
  );
}
