import Reveal from './Reveal';

/** Placeholder company tiles — swap the names (or drop in <img> logos) later. */
export default function LogoWall({ items }) {
  return (
    <div className="wall">
      {items.map((name, i) => (
        <Reveal key={name + i} variant="scale" delay={(i % 4) * 90} className="wall__tile">
          <span className="wall__mark" aria-hidden="true">
            {name.slice(0, 1)}
          </span>
          <span className="wall__name">{name}</span>
        </Reveal>
      ))}
    </div>
  );
}
