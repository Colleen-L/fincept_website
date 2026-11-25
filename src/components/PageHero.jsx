import Reveal from './Reveal';
import { PageArt } from './Shapes';

export default function PageHero({ kicker, title, lede, art = 'hex' }) {
  return (
    <header className="phero">
      <div className="wrap phero__in">
        <div className="phero__copy">
          <p className="kicker phero__kicker">{kicker}</p>
          <Reveal as="h1" variant="wipe" className="title phero__title">
            {title}
          </Reveal>
          <Reveal as="p" variant="up" delay={250} className="phero__lede">
            {lede}
          </Reveal>
        </div>
        <PageArt name={art} />
      </div>
    </header>
  );
}
