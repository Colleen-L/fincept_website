import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import LogoWall from '../components/LogoWall';
import { Arrow, Glyph } from '../components/Shapes';
import { useScrollProgress, useTitle } from '../hooks/useScrollProgress';

const VALUES = [
  { glyph: 'nodes', title: 'Access to talent', text: 'Motivated, interdisciplinary students — developers, business majors and designers — ready to work on your problems. Lorem ipsum dolor sit amet.' },
  { glyph: 'bars', title: 'Fresh perspectives', text: 'New ideas, innovative thinking and student-driven solutions to real-world challenges.' },
  { glyph: 'hex', title: 'Our credibility', text: 'Track record, member experiences and industry connections — our members have worked at leading firms. Lorem ipsum.' },
  { glyph: 'triangle', title: 'Low-lift partnership', text: 'We handle scoping, staffing and structure. You bring a real problem and a point of contact. Lorem ipsum dolor sit amet, consectetur.' },
];

const OPPS = [
  {
    key: 'Industry-sponsored projects',
    text: 'A team of students builds a real fintech deliverable for your company over a semester.',
    examples: ['Prototype a payments dashboard (example)', 'Market-sizing study for a new product (example)', 'Customer-onboarding UX redesign (example)'],
  },
  {
    key: 'Workshops',
    text: 'Co-host a hands-on session on a tool, topic or skill your team cares about.',
    examples: ['Intro to open banking APIs (example)', 'Reading a 10-K in 45 minutes (example)', 'Prompting for finance analysts (example)'],
  },
  {
    key: 'Speakers',
    text: 'Share your path and your industry with an engaged room of students.',
    examples: ['Fireside chat with a VP (example)', 'Panel: breaking into fintech (example)', 'Office tour + Q&A (example)'],
  },
  {
    key: 'Case competitions',
    text: 'Sponsor or supply a case and meet the students who solve it.',
    examples: ['Provide a live business case (example)', 'Judge final pitches (example)', 'Award a prize (example)'],
  },
];

const COMPANIES = [
  'Partner One', 'Partner Two', 'Partner Three', 'Partner Four',
  'Partner Five', 'Partner Six', 'Partner Seven', 'Partner Eight',
];

const PROJECTS = [
  { co: 'Company Name', term: 'Fall 2025', title: 'Project title placeholder', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.', tags: ['Tech', 'Business', 'Design'] },
  { co: 'Company Name', term: 'Spring 2025', title: 'Project title placeholder', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.', tags: ['Data', 'Strategy'] },
  { co: 'Company Name', term: 'Fall 2024', title: 'Project title placeholder', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.', tags: ['Product', 'UX'] },
];

const CASES = [
  { meta: 'Spring 2026 · Placement', title: 'Case competition name', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Describe the case, the team and the result.' },
  { meta: 'Fall 2025 · Placement', title: 'Case competition name', text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { meta: 'Spring 2025 · Placement', title: 'Case competition name', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
  { meta: 'Fall 2024 · Placement', title: 'Case competition name', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.' },
];

export default function Partners() {
  useTitle('Partners');
  const [tab, setTab] = useState(0);
  const timelineRef = useRef(null);
  // The timeline line fills as you scroll down through the competitions
  useScrollProgress(timelineRef, { start: 0.8, end: 0.4, through: true });
  const cur = OPPS[tab];

  return (
    <>
      <PageHero
        kicker="For industry"
        title="Partner with us"
        art="tri"
        lede="Bring a real problem. We bring a motivated, interdisciplinary student team — and fresh thinking."
      />

      {/* ───── why ───── */}
      <section className="wrap section" style={{ paddingTop: 'clamp(30px,5vw,60px)' }} id="why">
        <Reveal className="shead">
          <p className="kicker">Why partner with us?</p>
          <h2 className="title title--md">The value</h2>
        </Reveal>
        <div className="vals">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} variant={i % 2 ? 'right' : 'left'} delay={(i % 2) * 100} className="val">
              <Glyph kind={v.glyph} />
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───── opportunities ───── */}
      <section className="wrap section" style={{ paddingTop: 0 }} id="opportunities">
        <Reveal className="shead">
          <p className="kicker">Partnership opportunities</p>
          <h2 className="title title--md">Ways to work together</h2>
        </Reveal>
        <Reveal className="tabs">
          <div className="tabs__list" role="tablist" aria-label="Partnership opportunities">
            {OPPS.map((o, i) => (
              <button
                key={o.key}
                role="tab"
                aria-selected={tab === i}
                className={`tab ${tab === i ? 'is-on' : ''}`}
                onClick={() => setTab(i)}
              >
                <span>0{i + 1}</span>
                {o.key}
              </button>
            ))}
          </div>
          <div className="tabs__panel" key={tab} role="tabpanel">
            <h3>{cur.key}</h3>
            <p>{cur.text}</p>
            <h4>Examples</h4>
            <ul className="bullets">
              {cur.examples.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ───── credibility: companies ───── */}
      <section className="wrap section" style={{ paddingTop: 0 }} id="companies">
        <Reveal className="shead">
          <p className="kicker">Our credibility</p>
          <h2 className="title title--md">Companies we’ve partnered with</h2>
          <p className="lede">Placeholder names — replace with logos of past partners.</p>
        </Reveal>
        <LogoWall items={COMPANIES} />
      </section>

      {/* ───── past projects ───── */}
      <section className="wrap section" style={{ paddingTop: 0 }} id="projects">
        <Reveal className="shead">
          <p className="kicker">Track record</p>
          <h2 className="title title--md">Past projects</h2>
        </Reveal>
        <div className="projects">
          {PROJECTS.map((p, i) => (
            <Reveal key={i} delay={i * 110} className="project">
              <div className="project__co">
                <span>{p.co}</span>
                <span className="muted">{p.term}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <div className="chips">
                {p.tags.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───── case competitions ───── */}
      <section className="wrap section" style={{ paddingTop: 0 }} id="cases">
        <Reveal className="shead">
          <p className="kicker">Intercollegiate</p>
          <h2 className="title title--md">Case competitions</h2>
        </Reveal>
        <div className="timeline" ref={timelineRef}>
          {CASES.map((c, i) => (
            <Reveal key={i} variant="right" className="tl-item" style={{ '--k': i }}>
              <span className="tl-item__meta">{c.meta}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="wrap section" style={{ paddingTop: 0 }}>
        <Reveal variant="scale" className="cta">
          <div className="cta__copy">
            <p className="kicker">Let’s talk</p>
            <h2>Explore a partnership</h2>
            <p>Tell us about a problem worth solving. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="cta__btns">
              <Link to="/contact" className="btn btn--dark">
                Get in touch <Arrow />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
