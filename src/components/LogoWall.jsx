
import Reveal from './Reveal';

export default function LogoWall({ items = [] }) {
  return (
    <div className="wall">
      {items
        .filter((company) => company?.image && company?.url)
        .map((company, i) => (
        <Reveal
          key={company.name + i}
          variant="scale"
          delay={(i % 4) * 90}
          className="wall__tile"
        >
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="wall__link"
            aria-label={`Visit ${company.name}`}
          >
            <img
              src={company.image}
              alt={`${company.name} logo`}
              className="wall__image"
            />
          </a>
        </Reveal>
      ))}
    </div>
  );
}
