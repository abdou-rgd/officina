import { useEffect, useRef, useState } from 'react';
import specimen from './specimen.json';
import type { Dict, Lang } from './i18n';
import { formatNumber } from './Specimen';
import { usePrefersReducedMotion } from './motion';

type Props = { t: Dict['apothicaire']['flow']; lang: Lang };
type Scenario = 'ok' | 'bad';
type Verdict = 'ok' | 'bad' | 'exempt';
type Token = { text: string; verdict: Verdict; source?: string };

const STEPS = 4;
const params = specimen.params;

// Up to 6 significant digits, then an ellipsis: how a tool result looks before rounding.
function raw(v: number) {
  const s = v.toPrecision(6);
  return Number(s) === v ? String(v) : `${s}…`;
}

export default function GateFlow({ t, lang }: Props) {
  const reduced = usePrefersReducedMotion();
  const [scenario, setScenario] = useState<Scenario>('ok');
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const n = (v: number) => formatNumber(lang, v);

  // Starts once the figure is on screen, then advances one stage at a time; never loops.
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return undefined;
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  useEffect(() => {
    if (reduced) {
      setStep(STEPS);
      return undefined;
    }
    if (!seen) return undefined;
    setStep(0);
    const timers = Array.from({ length: STEPS }, (_, i) => window.setTimeout(() => setStep(i + 1), 450 + i * 850));
    return () => timers.forEach(window.clearTimeout);
  }, [scenario, run, seen, reduced]);

  const s = t[scenario];
  const tokens: Record<string, Token> =
    scenario === 'ok'
      ? {
          hl: { text: `${n(params['half.life'].value)} h`, verdict: 'ok', source: 'half.life' },
          t1: { text: '8', verdict: 'exempt' },
          t2: { text: `${n(specimen.lambdaZ.time_last)} h`, verdict: 'ok', source: 'lambda.z.time.last' }
        }
      : {
          cl: { text: `${n(params['cl.obs'].value)} ${params['cl.obs'].unit}`, verdict: 'ok', source: 'cl.obs' },
          conv: { text: t.bad.conv, verdict: 'bad' }
        };
  const parts = s.draft.split(/\[\[(\w+)\]\]/);
  const tool =
    scenario === 'ok'
      ? { name: 'nca_run', args: '{ "route": "extravascular" }' }
      : { name: 'analysis_get', args: '{ "analysis": 2 }' };
  const result =
    scenario === 'ok'
      ? [
          ['half.life', `${raw(params['half.life'].value)} h`],
          ['lambda.z.time.last', `${specimen.lambdaZ.time_last} h`],
          ['lambda.z.n.points', String(specimen.lambdaZ.n_points)]
        ]
      : [
          ['cl.obs', `${raw(params['cl.obs'].value)} ${params['cl.obs'].unit}`],
          ['vz.obs', `${raw(params['vz.obs'].value)} ${params['vz.obs'].unit}`]
        ];
  const stage = (i: number) => (step > i ? 'is-on' : '');

  return (
    <figure className="flow" ref={ref}>
      <div className="flow__head">
        <figcaption className="flow__title">{t.title}</figcaption>
        <div className="flow__controls">
          <div className="seg seg--small" role="group" aria-label={t.scenarioLabel}>
            {(['ok', 'bad'] as const).map(k => (
              <button key={k} type="button" aria-pressed={scenario === k} onClick={() => setScenario(k)}>
                {t.scenarios[k]}
              </button>
            ))}
          </div>
          {!reduced && (
            <button type="button" className="link-btn" onClick={() => setRun(r => r + 1)}>
              {t.replay}
            </button>
          )}
        </div>
      </div>

      <ol className={`flow__steps flow__steps--${scenario}`}>
        <li className={`flow__step ${stage(0)}`}>
          <span className="flow__n">1 · {t.steps[0]}</span>
          <p className="bubble">{s.question}</p>
        </li>
        <li className={`flow__step ${stage(1)}`}>
          <span className="flow__n">2 · {t.steps[1]}</span>
          <p className="code-line">
            <span className="accent">{tool.name}</span>
            <span className="muted">{tool.args}</span>
          </p>
          <p className="flow__note">{s.tool}</p>
        </li>
        <li className={`flow__step flow__step--det ${stage(2)}`}>
          <span className="flow__n">3 · {t.steps[2]}</span>
          <dl className="result">
            {result.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </li>
        <li className={`flow__step flow__step--det ${stage(3)}`}>
          <span className="flow__n">4 · {t.steps[3]}</span>
          <p className="draft">
            {parts.map((part, i) => {
              if (i % 2 === 0) return part;
              const tok = tokens[part];
              return (
                <mark key={i} className={`tok tok--${tok.verdict}`}>
                  {tok.text}
                </mark>
              );
            })}
          </p>
          <ul className="checks">
            {Object.values(tokens).map(tok => (
              <li key={tok.text} className={`check check--${tok.verdict}`}>
                <span className="check__mark" aria-hidden="true">{tok.verdict === 'ok' ? '✓' : tok.verdict === 'bad' ? '✕' : '–'}</span>
                <span className="mono">{tok.text}</span>{' '}
                {tok.verdict === 'ok' && (
                  <span>
                    {t.found} <code>{tok.source}</code>
                  </span>
                )}
                {tok.verdict === 'exempt' && <span>{t.ok.exempt}</span>}
                {tok.verdict === 'bad' && <span>{t.bad.rejected}</span>}
              </li>
            ))}
          </ul>
        </li>
      </ol>
      <p className={`flow__verdict flow__verdict--${scenario} ${step >= STEPS ? 'is-on' : ''}`} aria-live="polite">
        {step >= STEPS ? s.verdict : ' '}
      </p>
      <p className="flow__caption">
        {t.caption}
      </p>
    </figure>
  );
}
