import type { Dict } from './i18n';

type Props = { t: Dict['tools']['diagram'] };

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

// Hand-drawn architecture diagram. Colours come from CSS custom properties, so it follows the theme.
export default function Diagram({ t }: Props) {
  const [user1, user2] = halves(t.userSub);
  const [answer1, answer2] = halves(t.answer);
  return (
    <figure className="diagram">
      <figcaption className="diagram__title">{t.title}</figcaption>
      <div className="diagram__scroll">
      <svg viewBox="0 0 880 400" role="img" aria-labelledby="diagram-desc">
        <desc id="diagram-desc">
          {`${t.user} → ${t.apothicaire} (${t.model}, ${t.memory}, ${t.gate}) → ${t.mcp} → ${t.caladrius} (${t.engine}) ← ${t.oracle}. ${t.caption}`}
        </desc>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="d-arrowhead" />
          </marker>
        </defs>

        {/* User */}
        <rect x="10" y="155" width="170" height="90" rx="45" className="d-node" />
        <text x="95" y="192" className="d-label" textAnchor="middle">{t.user}</text>
        <text x="95" y="212" className="d-sub" textAnchor="middle">{user1}</text>
        <text x="95" y="228" className="d-sub" textAnchor="middle">{user2}</text>

        {/* Apothicaire group */}
        <rect x="200" y="30" width="300" height="340" rx="18" className="d-group" />
        <text x="220" y="58" className="d-group-label">{t.apothicaire}</text>

        <rect x="230" y="80" width="240" height="70" rx="10" className="d-node" />
        <text x="350" y="110" className="d-label" textAnchor="middle">{t.model}</text>
        <text x="350" y="130" className="d-sub" textAnchor="middle">{t.modelSub}</text>

        <rect x="230" y="180" width="110" height="60" rx="10" className="d-node" />
        <text x="285" y="206" className="d-label" textAnchor="middle">{t.memory}</text>
        <text x="285" y="225" className="d-sub" textAnchor="middle">{t.memorySub}</text>

        <rect x="230" y="280" width="240" height="66" rx="10" className="d-node d-node--accent" />
        <text x="350" y="308" className="d-label" textAnchor="middle">{t.gate}</text>
        <text x="350" y="328" className="d-sub" textAnchor="middle">{t.gateSub}</text>

        <line x1="285" y1="150" x2="285" y2="180" className="d-line" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
        <line x1="410" y1="150" x2="410" y2="280" className="d-line" markerEnd="url(#arrow)" />

        {/* Caladrius group */}
        <rect x="580" y="30" width="280" height="200" rx="18" className="d-group" />
        <text x="600" y="58" className="d-group-label">{t.caladrius}</text>
        <rect x="610" y="80" width="220" height="70" rx="10" className="d-node d-node--accent" />
        <text x="720" y="110" className="d-label" textAnchor="middle">{t.engine}</text>
        <text x="720" y="130" className="d-sub" textAnchor="middle">{t.engineSub}</text>

        {/* Oracle */}
        <rect x="610" y="290" width="220" height="66" rx="10" className="d-node d-node--dashed" />
        <text x="720" y="318" className="d-label" textAnchor="middle">{t.oracle}</text>
        <text x="720" y="338" className="d-sub" textAnchor="middle">{t.oracleSub}</text>

        {/* Flows */}
        <line x1="168" y1="180" x2="230" y2="125" className="d-line" markerEnd="url(#arrow)" />
        <line x1="470" y1="100" x2="610" y2="100" className="d-line" markerEnd="url(#arrow)" />
        <text x="540" y="90" className="d-flow" textAnchor="middle">{t.mcp}</text>
        <line x1="610" y1="130" x2="470" y2="130" className="d-line" markerEnd="url(#arrow)" />
        <text x="540" y="150" className="d-flow" textAnchor="middle">{t.results}</text>
        <line x1="720" y1="290" x2="720" y2="150" className="d-line d-line--dashed" markerEnd="url(#arrow)" />
        <text x="730" y="232" className="d-flow">{t.checked}</text>
        <path d="M230 313 C 120 313, 95 290, 95 245" className="d-line" fill="none" markerEnd="url(#arrow)" />
        <text x="20" y="350" className="d-flow">{answer1}</text>
        <text x="20" y="366" className="d-flow">{answer2}</text>
      </svg>
      </div>
      <p className="diagram__caption">{t.caption}</p>
    </figure>
  );
}
