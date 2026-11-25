import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { Arrow, Candles, Glyph, IsoCube, Tri } from '../components/Shapes';
import { useScrollProgress, useTitle } from '../hooks/useScrollProgress';
import { useCountUp, useInView } from '../hooks/useInView';

/* ───────── content (placeholders — edit freely) ───────── */
const PILLARS = [
  {
    title: 'Experiential Learning',
    text: 'Industry project teams, case competition teams, hands-on fintech workshops',
  },
  {
    title: 'Industry Exposure',
    text: 'Connect with Purdue’s Fintech Center, speaker sessions, company office tours',
  },
  {
    title: 'Community',
    text: 'Social events, mentorship, weekly discussions, fundraisers',
  },
];

const MVV = [
  { glyph: 'triangle', title: 'Mission', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.' },
  { glyph: 'hex', title: 'Vision', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.' },
  { glyph: 'bars', title: 'Goals', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.' },
  { glyph: 'diamond', title: 'Values', text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.' },
];

const DO = [
  {
    glyph: 'bars',
    title: 'Workshops',
    text: 'Connect with industry speakers, explore fintech topics, and participate in hands-on simulations',
    tags: ['Speakers', 'Fintech topics', 'Learning'],
    to: '/membership',
    cta: 'Membership',
  },
  {
    glyph: 'nodes',
    title: 'Industry-Partnered Project Teams',
    text: 'Guided by dedicated project leads, multidisciplinary temas of developers, business students, and designers collaborate with industry partners to develop real-world fintech solutions.',
    tags: ['Real-world Projects', 'Industry Experience', 'Cross-disciplinary'],
    to: '/partners',
    cta: 'Partners',
  },
  {
    glyph: 'triangle',
    title: 'Case Competition Teams',
    text: 'Represent FINCEPT Purdue at intercollegiate case competitions, by researching, pitching, and competing against other universities.',
    tags: ['Intercollegiate', 'Pitching', 'Strategy'],
    to: '/membership',
    cta: 'Membership',
  },
];

const STATS = [
  { value: 150, suffix: '+', label: 'Members', note: 'Students across majors and class years'},
  { value: 12, suffix: '', label: 'Industry partners', note: 'Companies that have worked with us'},
  { value: 18, suffix: '', label: 'Projects delivered', note: 'Industry-partnered fintech builds'},
  { value: 9, suffix: '', label: 'Case competitions', note: 'Intercollegiate events entered'},
];

const HIGHLIGHTS = [
  { title: 'Achievement placeholder', text: 'Description' },
  { title: 'Achievement placeholder', text: 'Description' },
  { title: 'Achievement placeholder', text: 'Description' },
];

/* ───────── small pieces ───────── */
function Stat({ value, suffix, label, note, i }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const n = useCountUp(value, inView);
  return (
    <div
      ref={ref}
      className={`stat ${inView ? 'is-in' : ''}`}
      style={{ '--i': i }}
    >
      <div className="stat__num" aria-label={`${value}${suffix}`}>
        {n}
        {suffix}
      </div>
      <h3>{label}</h3>
      <p>{note}</p>
    </div>
  );
}

function CtaPanel() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <section className="wrap section" style={{ paddingTop: 0 }}>
      <div ref={ref} className={`cta ${inView ? 'is-in' : ''}`}>
        <div className="cta__copy">
          <p className="kicker">Get involved</p>
          <h2>Ready to rethink finance?</h2>
          <p>Apply to join, bring us a project, or just say hello. Lorem ipsum dolor sit amet consectetur.</p>
          <div className="cta__btns">
            <Link to="/membership#apply" className="btn btn--dark">
              Apply <Arrow />
            </Link>
            <Link to="/partners" className="btn btn--light">
              Partner with us <Arrow />
            </Link>
            <Link to="/contact" className="btn btn--line" style={{ borderColor: 'var(--ink)', color: 'var(--ink)' }}>
              Contact <Arrow />
            </Link>
          </div>
        </div>
        <svg className="cta__art" viewBox="0 0 300 300" aria-hidden="true">
          <polygon pathLength="1" points="150,20 280,95 280,205 150,280 20,205 20,95" />
          <polygon pathLength="1" points="150,70 235,120 235,200 150,250 65,200 65,120" />
          <polygon className="solid" points="150,115 195,142 195,188 150,215 105,188 105,142" />
        </svg>
      </div>
    </section>
  );
}

export default function Home() {
  useTitle('');
  const heroRef = useRef(null);
  const stairsRef = useRef(null);
  // hero: p = how far the page has scrolled past the hero (drives parallax on candles)
  useScrollProgress(heroRef, { start: 0, end: -1 });
  // stairs: build up step by step as the section scrolls into the middle of the screen
  useScrollProgress(stairsRef, { start: 0.9, end: 0.2 });

  return (
    <>
      {/* ═════ HERO ═════ */}
      <section className="hero" ref={heroRef}>
        <Candles />
        <h1 className="wordmark" aria-label="FINCEPT">
          {'FINCEPT'.split('').map((c, i) => (
            <span key={i} style={{ '--i': i }} aria-hidden="true">
              {c}
            </span>
          ))}
        </h1>

        <div className="wrap hero__body">
          <Reveal as="p" variant="wipe" delay={700} className="hero__tag">
            rethinking finance.
          </Reveal>
          <Reveal className="hero__sub" delay={1000}>
            <p>
              Purdue’s first <b>industry-partnered, multi-domain</b> fintech organization
            </p>
            <p className="hero__name">FINCEPT Purdue</p>
          </Reveal>
        </div>

        <a href="#join" className="future" onClick={(e) => { e.preventDefault(); document.getElementById('join')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}>
          The future of finance starts here <Tri dir="down" />
        </a>
        
        <div className="wrap">
          <div className="split" id="join">
            <Reveal variant="left" className="card card--grey">
              <h3>Industry Partners</h3>
              <p>
                Gain access to <b>fresh perspectives</b>, <b>innovative ideas</b>, and{" "}
                <b>emerging talent</b>
              </p>

              <div className="card__foot">
                {/* stacked triangles */}
                <span className="card__deco card__deco--triangles" aria-hidden="true">
                  <i />
                  <i />
                </span>

                <Link to="/partners" className="btn btn--green">
                  Work with us <Arrow />
                </Link>
              </div>
            </Reveal>

            <Reveal variant="right" delay={120} className="card card--green">
              <h3>Purdue Students</h3>
              <p>
                Gain experience through{" "}
                <b>real-world, industry-partnered fintech projects</b>
              </p>

              <div className="card__foot">
                {/* Two vertical rectangles */}
                <span className="card__deco card__deco--rectangles" aria-hidden="true">
                  <i />
                  <i />
                </span>

                <Link to="/membership" className="btn btn--light">
                  Join FINCEPT <Arrow />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════ ABOUT ═════ */}
      <section className="wrap section" id="about">
        <Reveal className="about__head">
          <h2 className="title">About us</h2>
          <p className="about__lines">
            Connecting talent.
            <br />
            Bridging industries.
            <br />
            Shaping the future.
          </p>
        </Reveal>

        <div className="about__grid">
          <div className="stairs" ref={stairsRef}>
            {PILLARS.map((p, i) => (
              <div className="stair" key={p.title} style={{ '--k': i, '--s': i * 0.28 }}>
                <IsoCube />
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>

          <Reveal variant="scale" threshold={0.3} className="quote">
            <svg viewBox="0 0 520 400" aria-hidden="true">
              <polygon className="quote__poly" pathLength="1" points="35,170 262,14 510,102 514,270 250,386 62,262" />
            </svg>
            <blockquote className="quote__text">
              <p>“Lorem ipsum something very very very insightful and life changing and makes you rethink your perspectives on the world”</p>
              <cite>— Anubhuti Mittal, Founder</cite>
            </blockquote>
          </Reveal>
        </div>

        <Reveal variant="wipe" className="mission">
          <Tri dir="right" size={26} />
          <p>we bring together students from diverse disciplines to explore emerging opportunities and gain industry experience in fintech</p>
          <Tri dir="left" size={26} />
        </Reveal>
{/* 
        <div className="mvv">
          {MVV.map((m, i) => (
            <Reveal key={m.title} delay={i * 110} className="mvv__item">
              <Glyph kind={m.glyph} />
              <span className="mvv__no">0{i + 1}</span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </Reveal>
          ))}
        </div> */}
      </section>

      {/* ═════ WHAT WE DO ═════ */}
      <section className="wrap section" style={{ paddingTop: 0 }}>
        <div className="do">
          <Reveal variant="left" className="do__head">
            <p className="kicker">Initiatives</p>
            <h2 className="title title--md">What we do</h2>
            <p className="lede">Three ways to to learn more and get hands-on with fintech.</p>
          </Reveal>
          <div className="do__list">
            {DO.map((d, i) => (
              <Reveal key={d.title} variant="right" delay={i * 80} className="do__item">
                <span className="do__no">0{i + 1}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
                <div className="chips">
                  {d.tags.map((t) => (
                    <span className="chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════ IMPACT ═════ */}
      <section className="wrap section" style={{ paddingTop: 0 }} id="impact">
        <Reveal className="shead shead--center">
          <h2 className="title">Our impact</h2>
          <p className="lede">Numbers are placeholders — swap in your real ones in src/pages/Home.jsx.</p>
        </Reveal>
        <div className="stats">
          {STATS.map((s, i) => (
            <Stat key={s.label} {...s} i={i} />
          ))}
        </div>
        <div className="highlights">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={i} delay={i * 110} className="highlight">
              <h4>{h.title}</h4>
              <p>{h.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaPanel />
    </>
  );
}
