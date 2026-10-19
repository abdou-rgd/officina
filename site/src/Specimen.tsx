import { useState, type CSSProperties } from 'react';
import specimen from './specimen.json';
import type { Dict, Lang } from './i18n';
import { links } from './i18n';

type Props = { t: Dict['specimen']; lang: Lang };
type Scale = 'linear' | 'log';
type Point = { t: number; c: number };

// Plot geometry, in viewBox units.
const W = 560;
const H = 320;
const M = { l: 50, r: 16, t: 14, b: 42 };
const T_END = 30;
const LIN_MAX = 5.5;
const LOG_MIN = 0.1;
const LOG_MAX = 10;

const profile: Point[] = specimen.profile;
const lz = specimen.lambdaZ;
const params = specimen.params;
const tlast = profile[profile.length - 1].t;
const cmax = params.cmax.value;
const tmax = params.tmax.value;

export function formatNumber(lang: Lang, v: number, digits = 3) {
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { maximumSignificantDigits: digits }).format(v);
}

const x = (t: number) => M.l + (t / T_END) * (W - M.l - M.r);
function y(c: number, scale: Scale) {
  const h = H - M.t - M.b;
  if (scale === 'linear') return H - M.b - (c / LIN_MAX) * h;
  const span = Math.log10(LOG_MAX) - Math.log10(LOG_MIN);
  return H - M.b - ((Math.log10(c) - Math.log10(LOG_MIN)) / span) * h;
}

// The profile as the default area rule reads it (lin-up/log-down): straight while rising,
// exponential while falling. Drawing only; every printed number comes from specimen.json.
function sampled(): Point[] {
  const out: Point[] = [profile[0]];
  for (let i = 1; i < profile.length; i++) {
    const a = profile[i - 1];
    const b = profile[i];
    const logDown = b.c < a.c && a.c > 0 && b.c > 0;
    for (let k = 1; k <= 12; k++) {
      const f = k / 12;
      const t = a.t + f * (b.t - a.t);
      const c = logDown ? a.c * Math.exp(Math.log(b.c / a.c) * f) : a.c + f * (b.c - a.c);
      out.push({ t, c });
    }
  }
  return out;
}
const curve = sampled();

const terminal = (t: number) => Math.exp(lz.intercept - lz.lambda_z * t);
function terminalPoints(from: number, to: number): Point[] {
  return Array.from({ length: 25 }, (_, k) => {
    const t = from + (k / 24) * (to - from);
    return { t, c: terminal(t) };
  });
}

function path(points: Point[], scale: Scale) {
  return points
    .filter(p => scale === 'linear' || p.c > 0)
    .map((p, i) => `${i ? 'L' : 'M'}${x(p.t).toFixed(1)} ${y(p.c, scale).toFixed(1)}`)
    .join(' ');
}

const linTicks = [0, 1, 2, 3, 4, 5];
const logTicks = [0.1, 1, 10];
const logMinor = [0.2, 0.3, 0.5, 0.7, 2, 3, 5, 7];
const tTicks = [0, 6, 12, 18, 24, 30];

export default function Specimen({ t, lang }: Props) {
  const [scale, setScale] = useState<Scale>('linear');
  const n = (v: number, d = 3) => formatNumber(lang, v, d);
  const inLz = (p: Point) => p.t >= lz.time_first && p.t <= lz.time_last;
  const base = y(0, 'linear');
  const area = `${path(curve, 'linear')} L${x(tlast)} ${base} L${x(0)} ${base} Z`;
  const tail = terminalPoints(tlast, T_END);
  const extra = `${path(tail, 'linear')} L${x(T_END)} ${base} L${x(tlast)} ${base} Z`;
  const yTicks = scale === 'linear' ? linTicks : logTicks;
  const keys = ['cmax', 'half.life', 'aucinf.obs', 'cl.obs'] as const;
  const cmaxY = y(cmax, scale);

  return (
    <figure className="specimen" aria-labelledby="specimen-title">
      <div className="specimen__head">
        <p className="specimen__title" id="specimen-title">
          <span className="mono">caladrius · nca.run</span>
          {t.title}
        </p>
        <div className="seg seg--small" role="group" aria-label={t.scaleLabel}>
          <button type="button" aria-pressed={scale === 'linear'} onClick={() => setScale('linear')}>
            {t.linear}
          </button>
          <button type="button" aria-pressed={scale === 'log'} onClick={() => setScale('log')}>
            {t.semilog}
          </button>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="plot" role="img" aria-labelledby="specimen-desc">
        <desc id="specimen-desc">
          {`${t.plotLabel}. ${t.keys.cmax} ${n(cmax)} ${params.cmax.unit}, ${t.keys['half.life']} ${n(params['half.life'].value)} h, ${t.keys['aucinf.obs']} ${n(params['aucinf.obs'].value)} ${params['aucinf.obs'].unit}.`}
        </desc>
        <defs>
          <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" className="plot__hatch" />
          </pattern>
          <clipPath id="plot-clip">
            <rect x={M.l} y={M.t} width={W - M.l - M.r} height={H - M.t - M.b} />
          </clipPath>
        </defs>

        {/* Grid and axes */}
        {scale === 'log' &&
          logMinor.map(v => <line key={v} x1={M.l} x2={W - M.r} y1={y(v, 'log')} y2={y(v, 'log')} className="plot__grid plot__grid--minor" />)}
        {yTicks.map(v => (
          <g key={`${scale}-${v}`}>
            <line x1={M.l} x2={W - M.r} y1={y(v, scale)} y2={y(v, scale)} className="plot__grid" />
            <text x={M.l - 8} y={y(v, scale) + 4} className="plot__tick" textAnchor="end">
              {n(v, 2)}
            </text>
          </g>
        ))}
        {tTicks.map(v => (
          <g key={v}>
            <line x1={x(v)} x2={x(v)} y1={H - M.b} y2={H - M.b + 5} className="plot__axis" />
            <text x={x(v)} y={H - M.b + 18} className="plot__tick" textAnchor="middle">
              {v}
            </text>
          </g>
        ))}
        <line x1={M.l} x2={W - M.r} y1={H - M.b} y2={H - M.b} className="plot__axis" />
        <text x={(M.l + W - M.r) / 2} y={H - 6} className="plot__label" textAnchor="middle">
          {`${t.time} (h)`}
        </text>
        <text x={14} y={(M.t + H - M.b) / 2} className="plot__label" textAnchor="middle" transform={`rotate(-90 14 ${(M.t + H - M.b) / 2})`}>
          {`${t.conc} (mg/L)`}
        </text>

        <g clipPath="url(#plot-clip)" key={scale}>
          {scale === 'linear' && (
            <>
              <path d={area} className="plot__area" />
              <path d={extra} className="plot__extra" />
            </>
          )}
          <path d={path(terminalPoints(lz.time_first, T_END), scale)} className="plot__lz" pathLength={1} />
          <path d={path(curve, scale)} className="plot__line" pathLength={1} />
        </g>

        {profile
          .filter(p => scale === 'linear' || p.c > 0)
          .map((p, i) => (
            <circle
              key={p.t}
              cx={x(p.t)}
              cy={y(p.c, scale)}
              r={inLz(p) ? 4.6 : 3.4}
              className={inLz(p) ? 'plot__pt plot__pt--lz' : 'plot__pt'}
              style={{ '--i': i } as CSSProperties}
            />
          ))}

        {/* Cmax annotation */}
        <g className="plot__note">
          <line x1={x(tmax)} x2={x(tmax) + 22} y1={cmaxY} y2={cmaxY - 14} className="plot__leader" />
          <text x={x(tmax) + 26} y={cmaxY - 14} className="plot__annot">
            {`Cmax ${n(cmax)} ${params.cmax.unit} · tmax ${n(tmax)} h`}
          </text>
        </g>
        {scale === 'log' && (
          <text x={W - M.r - 4} y={M.t + 14} className="plot__tick" textAnchor="end">
            {t.zeroHidden}
          </text>
        )}
      </svg>

      <ul className="specimen__legend">
        <li><span className="key key--pt" aria-hidden="true" />{t.observed}</li>
        <li><span className="key key--lz" aria-hidden="true" />{t.lzPoints}</li>
        <li><span className="key key--line" aria-hidden="true" />{t.lzLine}</li>
        <li><span className="key key--extra" aria-hidden="true" />{t.extrapolated} ({n(params['aucpext.obs'].value)}{lang === 'fr' ? '\u202f%' : '%'})</li>
      </ul>

      <dl className="specimen__values">
        {keys.map(k => (
          <div key={k}>
            <dt>
              <span>{t.keys[k]}</span> <span className="mono">{k}</span>
            </dt>
            <dd>
              {n(params[k].value)} <span className="unit">{params[k].unit}</span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="specimen__lz mono">
        {t.lzNote(String(lz.n_points), n(lz.time_first), n(lz.time_last), n(params['adj.r.squared'].value, 5))}
      </p>
      <figcaption>
        {t.caption} <a href={links.specimen}>{t.script}</a>
      </figcaption>
    </figure>
  );
}
