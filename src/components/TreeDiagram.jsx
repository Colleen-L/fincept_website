
import { useId, useState } from 'react';
import { useInView } from '../hooks/useInView';

export default function TreeDiagram({
  nodes,
  edges,
  width = 1000,
  height = 540,
  defaultId,
  legend,
  note,
}) {
  const [ref, inView] = useInView({ threshold: 0.25 });
  const [sel, setSel] = useState(defaultId || nodes[0].id);

  const maskId = 'm' + useId().replace(/:/g, '');
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const current = byId[sel] || nodes[0];

  const totalMembers = current.makeup?.reduce(
    (sum, role) => sum + role.count,
    0
  );

  const paths = edges.map((e) => {
    const a = byId[e.from];
    const b = byId[e.to];

    if (e.kind === 'h') {
      return `M${a.x + a.w / 2} ${a.y} H${b.x - b.w / 2}`;
    }

    const y1 = a.y + a.h / 2;
    const y2 = b.y - b.h / 2;
    const ym = (y1 + y2) / 2;

    return `M${a.x} ${y1} V${ym} H${b.x} V${y2}`;
  });

  return (
    <div ref={ref} className={`tree ${inView ? 'is-in' : ''}`}>
      <svg
        className="tree__svg"
        viewBox={`0 0 ${width} ${height}`}
        role="group"
        aria-label="Interactive organizational chart"
      >
        <defs>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={width}
            height={height}
          >
            {paths.map((d, i) => (
              <path
                key={i}
                d={d}
                className="tree__reveal"
                pathLength="1"
                style={{ transitionDelay: `${300 + i * 110}ms` }}
              />
            ))}
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>
          {paths.map((d, i) => (
            <path key={i} d={d} className="tree__edge" />
          ))}
        </g>

        {nodes.map((n) => (
          <g
            key={n.id}
            className={`node node--${n.tone} ${sel === n.id ? 'is-sel' : ''}`}
            style={{ '--d': `${n.level * 260}ms` }}
            transform={`translate(${n.x - n.w / 2} ${n.y - n.h / 2})`}
            tabIndex={0}
            role="button"
            aria-pressed={sel === n.id}
            aria-label={n.title}
            onClick={() => setSel(n.id)}
            onMouseEnter={() => setSel(n.id)}
            onFocus={() => setSel(n.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSel(n.id);
              }
            }}
          >
            <g className="node__inner">
              <rect width={n.w} height={n.h} />
              <text x={n.w / 2} y={n.h / 2} textAnchor="middle">
                {n.label.split('\n').map((line, i, arr) => (
                  <tspan
                    key={i}
                    x={n.w / 2}
                    dy={
                      i === 0
                        ? arr.length > 1 ? '-0.35em' : '0.35em'
                        : '1.25em'
                    }
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          </g>
        ))}
      </svg>

      {/* Information panel */}
      <div className="tree__panel" aria-live="polite">
        <span className="tree__panel-tag">{current.group}</span>

        <h3>{current.title}</h3>

        {current.desc && <p>{current.desc}</p>}

        {current.reports && (
          <div className="tree__membership">
            <span>Reports to</span>
            <b>{current.reports}</b>
          </div>
        )}

        {current.membership && (
          <div className="tree__membership">
            <span>Membership</span>
            <b>{current.membership}</b>
          </div>
        )}

        {current.makeup && (
          <div className="tree__makeup">
            <div className="tree__makeup-head">
              <h4>Team makeup</h4>
              <span>{totalMembers} members</span>
            </div>

            <div className="tree__roles">
              {current.makeup.map((role) => (
                <div className="tree__role" key={role.role}>
                  <div className="tree__role-info">
                    <span>{role.role}</span>
                    <b>{role.count}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {legend && <p className="tree__legend">{legend}</p>}
      {note && <p className="tree__note">{note}</p>}

      {/* Mobile fallback */}
      <ul className="tree__list">
        {nodes.map((n) => (
          <li
            key={n.id}
            className={`tl tl--${n.tone}`}
            style={{ '--depth': n.depth }}
          >
            <h4>{n.title}</h4>
            {n.desc && <p>{n.desc}</p>}

            {n.reports && (
              <p><b>Reports to:</b> {n.reports}</p>
            )}

            {n.membership && (
              <p><b>Membership:</b> {n.membership}</p>
            )}

            {n.makeup && (
              <ul>
                {n.makeup.map((role) => (
                  <li key={role.role}>
                    {role.count} · {role.role}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
