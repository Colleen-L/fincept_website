import logo_small from "../assets/logo_small.png";

// Small library of hand-drawn geometric SVGs used across the site.
// Anything with className "draw" has its outline traced on load / on reveal.

export function LogoMark({ size = 30 }) {
  return (
    <img
      src={logo_small}
      width={size}
      height={size}
      alt="FINCEPT logo"
      style={{ objectFit: "contain" }}
    />
  );
}

export function Tri({ dir = 'down', size = 22, className = '' }) {
  const rot = { down: 0, right: -90, left: 90, up: 180 }[dir];
  return (
    <svg
      className={`tri ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ transform: `rotate(${rot}deg)` }}
      aria-hidden="true"
    >
      <path d="M2 5h20L12 21z" fill="currentColor" />
    </svg>
  );
}

export function Arrow() {
  return (
    <span className="arr" aria-hidden="true">
      &gt;
    </span>
  );
}

/** Isometric cube used for the three pillars "staircase". */
export function IsoCube({ className = '' }) {
  return (
    <svg className={`iso ${className}`} viewBox="0 0 120 112" aria-hidden="true">
      <polygon className="iso__top" points="0,28 60,0 120,28 60,56" />
      <polygon className="iso__left" points="0,28 60,56 60,112 0,84" />
      <polygon className="iso__right" points="60,56 120,28 120,84 60,112" />
    </svg>
  );
}

/** Decorative background candlesticks (the "finance" half of the brand). */
const CANDLES = Array.from({ length: 22 }, (_, i) => {
  const trend = 430 - i * 15 + Math.sin(i * 1.7) * 34;
  const h = 46 + ((i * 37) % 70);
  return { x: 20 + i * 54, y: trend - h / 2, h, wick: 22 + ((i * 13) % 30), hot: i % 7 === 3 };
});

export function Candles({ className = '' }) {
  return (
    <svg
      className={`candles ${className}`}
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {CANDLES.map((c, i) => (
        <g key={i} className="candle" style={{ '--i': i }}>
          <line x1={c.x + 15} x2={c.x + 15} y1={c.y - c.wick} y2={c.y + c.h + c.wick} className="candle__wick" />
          <rect x={c.x} y={c.y} width="30" height={c.h} className={c.hot ? 'candle__body candle__body--hot' : 'candle__body'} />
        </g>
      ))}
    </svg>
  );
}

/** Per-page header art. Each is built from the same primitives: hex, triangle, square. */
export function PageArt({ name }) {
  const common = { viewBox: '0 0 400 400', 'aria-hidden': true, className: 'art' };
  if (name === 'hex')
    return (
      <svg {...common}>
        <polygon className="draw" pathLength="1" points="200,30 330,105 330,255 200,330 70,255 70,105" />
        <polygon className="draw d2" pathLength="1" points="250,90 380,165 380,315 250,390 120,315 120,165" />
        <polygon className="fill" points="150,70 235,120 235,220 150,270 65,220 65,120" />
        <polygon className="draw d3" pathLength="1" points="30,230 90,195 150,230 150,300 90,335 30,300" />
      </svg>
    );
  if (name === 'layers')
    return (
      <svg {...common}>
        <polygon className="draw" pathLength="1" points="200,40 360,120 200,200 40,120" />
        <polygon className="draw d2" pathLength="1" points="200,110 360,190 200,270 40,190" />
        <polygon className="fill" points="200,180 360,260 200,340 40,260" />
        <line className="draw d3" pathLength="1" x1="40" y1="120" x2="40" y2="260" />
        <line className="draw d3" pathLength="1" x1="360" y1="120" x2="360" y2="260" />
      </svg>
    );
  if (name === 'tri')
    return (
      <svg {...common}>
        <polygon className="draw" pathLength="1" points="200,40 360,320 40,320" />
        <polygon className="fill" points="200,130 290,290 110,290" />
        <polygon className="draw d2" pathLength="1" points="200,110 330,340 70,340" transform="translate(0 20)" />
        <polygon className="fill soft" points="60,90 110,175 10,175" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect className="draw" pathLength="1" x="70" y="70" width="260" height="260" />
      <rect className="draw d2" pathLength="1" x="70" y="70" width="260" height="260" transform="rotate(45 200 200)" />
      <rect className="fill" x="150" y="150" width="100" height="100" transform="rotate(45 200 200)" />
      <rect className="draw d3" pathLength="1" x="120" y="120" width="160" height="160" />
    </svg>
  );
}

export function HexAvatar({ initials = 'FP', image, name, linkedin, accent = false }) {
  return (
    <a
      href={linkedin || undefined}
      target={linkedin ? '_blank' : undefined}
      rel="noopener noreferrer"
      className={`hexav ${accent ? 'hexav--accent' : ''}`}
      aria-label={linkedin ? `${name} on LinkedIn` : name}
      onClick={!linkedin ? e => e.preventDefault() : undefined}
    >
      {image ? (
        <img src={image} alt="" className="hexav__image" />
      ) : (
        <div className="hexav__fallback">
          {initials}
        </div>
      )}

      {linkedin && image && (
        <span className="hexav__overlay">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
            />
          </svg>
        </span>
      )}

      <svg className="hexav__border" viewBox="0 0 120 136" aria-hidden="true">
        <polygon points="60,2 116,34 116,102 60,134 4,102 4,34" />
      </svg>
    </a>
  );
}

/** Four tiny icons (square, triangle, hexagon, diamond) for tiles. */
export function Glyph({ kind = 'square' }) {
  const p = { viewBox: '0 0 48 48', width: 44, height: 44, 'aria-hidden': true, className: 'glyph' };
  if (kind === 'triangle')
    return (
      <svg {...p}>
        <polygon points="24,5 44,41 4,41" />
      </svg>
    );
  if (kind === 'hex')
    return (
      <svg {...p}>
        <polygon points="24,3 43,14 43,34 24,45 5,34 5,14" />
      </svg>
    );
  if (kind === 'diamond')
    return (
      <svg {...p}>
        <polygon points="24,3 45,24 24,45 3,24" />
      </svg>
    );
  if (kind === 'bars')
    return (
      <svg {...p}>
        <rect x="5" y="26" width="9" height="17" />
        <rect x="19" y="14" width="9" height="29" />
        <rect x="33" y="4" width="9" height="39" />
      </svg>
    );
  if (kind === 'nodes')
    return (
      <svg {...p}>
        <polygon points="24,3 33,18 15,18" />
        <rect x="4" y="28" width="16" height="16" />
        <rect x="28" y="28" width="16" height="16" />
      </svg>
    );
  return (
    <svg {...p}>
      <rect x="6" y="6" width="36" height="36" />
    </svg>
  );
}
