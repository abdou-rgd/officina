import type { Dict } from './i18n';

type Props = { t: Dict['overview']['diagram'] };

// Splits a label into two lines at the space nearest its middle.
function halves(text: string): [string, string] {
  const words = text.split(' ');
  let best = 1;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' ').length;
    const b = words.slice(0, best).join(' ').length;
    if (Math.abs(a - text.length / 2) < Math.abs(b - text.length / 2)) best = i;
  }
  return [words.slice(0, best).join(' '), words.slice(best).join(' ')];
}

type BoxProps = { x: number; y: number; w: number; h: number; label: string; sub: string; kind?: 'ai' | 'det' | 'strong' | 'ref' };

function Box({ x, y, w, h, label, sub, kind }: BoxProps) {
  const cx = x + w / 2;
  return (
    <g className={`a-node${kind ? ` a-node--${kind}` : ''}`}>
      <rect x={x} y={y} width={w} height={h} rx={10} />
      <text x={cx} y={y + h / 2 - 3} className="a-label" textAnchor="middle">{label}</text>
      <text x={cx} y={y + h / 2 + 16} className="a-sub" textAnchor="middle">{sub}</text>
    </g>
  );
}

function Tag({ x, y, text, kind }: { x: number; y: number; text: string; kind: 'ai' | 'det' }) {
  return (
    <g className={`a-tag a-tag--${kind}`}>
      <rect x={x - 52} y={y - 15} width={104} height={22} rx={11} />
      <text x={x} y={y} textAnchor="middle">{text.toUpperCase()}</text>
    </g>
  );
}

// Architecture, hand-drawn: a wide SVG on large screens, the same content as a stacked list on phones.
// Colours come from CSS custom properties, so both follow the theme. Green means deterministic.
export default function Architecture({ t }: Props) {
  const [user1, user2] = halves(t.userSub);
  return (
    <figure className="arch">
      <figcaption className="arch__title">{t.title}</figcaption>

      <svg viewBox="0 0 976 470" className="arch__svg" role="img" aria-labelledby="arch-desc">
        <desc id="arch-desc">
          {`${t.user} → ${t.apothicaire} (${t.model}, ${t.memory}, ${t.gate}) → ${t.mcp} → ${t.caladrius} (${t.commands}, ${t.engine}) ← ${t.oracle}. ${t.direct}. ${t.caption}`}
        </desc>
        <defs>
          <marker id="a-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="a-head" />
          </marker>
          <marker id="a-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="a-head a-head--accent" />
          </marker>
        </defs>

        {/* Direct use of Caladrius, without the assistant */}
        <path d="M78 190 V52 H792 V140" className="a-line a-line--accent" fill="none" markerEnd="url(#a-arrow-accent)" />
        <text x={435} y={42} className="a-flow a-flow--accent" textAnchor="middle">{t.direct}</text>

        {/* User */}
        <g className="a-node a-node--user">
          <rect x={12} y={190} width={132} height={84} rx={42} />
          <text x={78} y={222} className="a-label" textAnchor="middle">{t.user}</text>
          <text x={78} y={242} className="a-sub" textAnchor="middle">{user1}</text>
          <text x={78} y={257} className="a-sub" textAnchor="middle">{user2}</text>
        </g>

        {/* Apothicaire */}
        <rect x={176} y={88} width={330} height={360} rx={16} className="a-group" />
        <text x={196} y={119} className="a-group-label">{t.apothicaire}</text>
        <Tag x={430} y={119} text={t.apoTag} kind="ai" />
        <Box x={200} y={140} w={282} h={70} label={t.model} sub={t.modelSub} kind="ai" />
        <Box x={200} y={246} w={128} h={60} label={t.memory} sub={t.memorySub} />
        <Box x={200} y={356} w={282} h={66} label={t.gate} sub={t.gateSub} kind="det" />
        <line x1={264} y1={210} x2={264} y2={246} className="a-line" markerStart="url(#a-arrow)" markerEnd="url(#a-arrow)" />
        <line x1={430} y1={210} x2={430} y2={356} className="a-line" markerEnd="url(#a-arrow)" />

        {/* Caladrius */}
        <rect x={632} y={88} width={320} height={262} rx={16} className="a-group a-group--det" />
        <text x={652} y={119} className="a-group-label">{t.caladrius}</text>
        <Tag x={876} y={119} text={t.calTag} kind="det" />
        <Box x={656} y={140} w={272} h={70} label={t.commands} sub={t.commandsSub} kind="det" />
        <Box x={656} y={246} w={272} h={78} label={t.engine} sub={t.engineSub} kind="strong" />
        <line x1={792} y1={210} x2={792} y2={246} className="a-line a-line--accent" markerEnd="url(#a-arrow-accent)" />

        {/* Oracle */}
        <Box x={656} y={384} w={272} h={64} label={t.oracle} sub={t.oracleSub} kind="ref" />
        <line x1={792} y1={384} x2={792} y2={326} className="a-line a-line--dashed" markerEnd="url(#a-arrow)" />
        <text x={802} y={370} className="a-flow">{t.checked}</text>

        {/* Flows */}
        <path d="M144 222 C170 222 176 175 200 175" className="a-line" fill="none" markerEnd="url(#a-arrow)" />
        <line x1={482} y1={163} x2={656} y2={163} className="a-line" markerEnd="url(#a-arrow)" />
        <text x={569} y={153} className="a-flow" textAnchor="middle">{t.mcp}</text>
        <line x1={656} y1={190} x2={482} y2={190} className="a-line a-line--accent" markerEnd="url(#a-arrow-accent)" />
        <text x={569} y={208} className="a-flow a-flow--accent" textAnchor="middle">{t.results}</text>
        <path d="M200 389 C120 389 78 340 78 278" className="a-line a-line--accent" fill="none" markerEnd="url(#a-arrow-accent)" />
        <text x={24} y={420} className="a-flow a-flow--accent">{t.answer}</text>
      </svg>

      <div className="stack">
        <div className="stack__node stack__node--user">
          <strong>{t.user}</strong>
          <span>{t.userSub}</span>
        </div>
        <div className="stack__arrow" aria-hidden="true" />
        <div className="stack__group">
          <p className="stack__head">
            <strong>{t.apothicaire}</strong> <span className="chip chip--ai">{t.apoTag}</span>
          </p>
          <div className="stack__node stack__node--ai">
            <strong>{t.model}</strong>
            <span>{t.modelSub}</span>
          </div>
          <div className="stack__row">
            <div className="stack__node">
              <strong>{t.memory}</strong>
              <span>{t.memorySub}</span>
            </div>
            <div className="stack__node stack__node--det">
              <strong>{t.gate}</strong>
              <span>{t.gateSub}</span>
            </div>
          </div>
        </div>
        <p className="stack__link">
          <span>↓ {t.mcp}</span>
          <span className="accent">↑ {t.results}</span>
        </p>
        <div className="stack__group stack__group--det">
          <p className="stack__head">
            <strong>{t.caladrius}</strong> <span className="chip chip--det">{t.calTag}</span>
          </p>
          <div className="stack__node stack__node--det">
            <strong>{t.commands}</strong>
            <span>{t.commandsSub}</span>
          </div>
          <div className="stack__node stack__node--strong">
            <strong>{t.engine}</strong>
            <span>{t.engineSub}</span>
          </div>
          <p className="stack__direct">{t.direct}</p>
        </div>
        <p className="stack__link">
          <span>↑ {t.checked}</span>
        </p>
        <div className="stack__node stack__node--ref">
          <strong>{t.oracle}</strong>
          <span>{t.oracleSub}</span>
        </div>
      </div>

      <ul className="arch__legend">
        <li><span className="key key--det" aria-hidden="true" />{t.legendDet}</li>
        <li><span className="key key--ai" aria-hidden="true" />{t.legendAi}</li>
      </ul>
      <p className="arch__caption">{t.caption}</p>
    </figure>
  );
}
