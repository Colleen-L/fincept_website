import { useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import TreeDiagram from '../components/TreeDiagram';
import { Arrow, Glyph } from '../components/Shapes';
import { SITE } from '../config';
import { useInView } from '../hooks/useInView';
import { useScrollProgress, useTitle } from '../hooks/useScrollProgress';

/* ───────── membership tree (1000 × 420 canvas) ───────── */

const treeNodes = [
  {
    id: 'gm',
    label: 'General Members',
    title: 'General Members',
    group: 'Everyone starts here',
    tone: 'top',
    level: 0,
    depth: 0,
    x: 500, y: 48, w: 280, h: 58,
    desc: 'Open to all Purdue majors and class years. Everyone starts as a General Member by completing the general membership application.',
    membership: 'Open to everyone',
  },
  {
    id: 'gen',
    label: 'General',
    title: 'General Membership',
    group: 'Membership type',
    tone: 'exec',
    level: 1,
    depth: 1,
    x: 250, y: 190, w: 190, h: 58,
    desc: 'Focus: learning and community. Access to workshops, industry speakers, career spotlights, mock case competitions, socials, mentorship, and weekly discussions. Attendance is optional but may be considered for future leadership opportunities.',
    membership: 'Open to all General Members',
  },
  {
    id: 'spec',
    label: 'Specialized\nTeams',
    title: 'Specialized Teams',
    group: 'Membership type',
    tone: 'exec',
    level: 1,
    depth: 1,
    x: 750, y: 190, w: 190, h: 62,
    desc: 'Focus: hands-on experience and competition. General Members can apply through a separate, more selective recruitment process to join an Industry Project Team or Case Competition Team.',
    membership: 'Selective application required',
  },
  {
    id: 'ip',
    label: 'Industry\nProjects',
    title: 'Industry Project Teams',
    group: 'Specialized team',
    tone: 'exec',
    level: 2,
    depth: 2,
    x: 610, y: 340, w: 180, h: 62,
    desc: 'Work with industry partner companies on real-world fintech projects, gaining practical experience and collaborating across different areas of expertise.',
    membership: '9 members per team',
    makeup: [
      { role: 'Project Leads: ', count: 2 },
      { role: 'Technical Developers: ', count: 3 },
      { role: 'Business Developers: ', count: 2 },
      { role: 'Designers: ', count: 2 },
    ],
  },
  {
    id: 'cc',
    label: 'Case Comp\nTeams',
    title: 'Case Competition Teams',
    group: 'Specialized team',
    tone: 'exec',
    level: 2,
    depth: 2,
    x: 880, y: 340, w: 180, h: 62,
    desc: 'Research, develop solutions, and present recommendations in intercollegiate case competitions representing FINCEPT.',
    membership: '6 members per team',
    makeup: [
      { role: 'Team Lead: ', count: 1 },
      { role: 'Team Members: ', count: 5 },
    ],
  },
];

const treeEdges = [
  { from: 'gm', to: 'gen' },
  { from: 'gm', to: 'spec' },
  { from: 'spec', to: 'ip' },
  { from: 'spec', to: 'cc' },
];

const BENEFITS = [
  { glyph: 'bars', title: 'Skills', text: 'Technical, analytical and presentation skills you can’t get from a lecture. Lorem ipsum dolor sit amet.' },
  { glyph: 'hex', title: 'Exposure', text: 'Meet people working in fintech — through speakers, the Fintech Center and company visits.' },
  { glyph: 'triangle', title: 'Professional development', text: 'Career spotlights, mentorship and a portfolio of real project work to talk about in interviews.' },
];

const UNIQUE = [
  { title: 'Industry experience', text: 'Work on projects with real partner companies — not hypotheticals. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { title: 'Purdue Fintech Center', text: 'A direct line into Purdue’s Fintech Center: events, research and people. Sed do eiusmod tempor incididunt ut labore.' },
  { title: 'Intercollegiate competitions', text: 'Represent Purdue against other universities in case competitions. Ut enim ad minim veniam, quis nostrud.' },
];

const RESOURCES = [
  { glyph: 'bars', title: 'Fintech reading list', text: 'Articles, newsletters and books to get started.' },
  { glyph: 'triangle', title: 'Workshop recordings', text: 'Catch up on past speaker sessions.' },
  { glyph: 'hex', title: 'Case comp prep', text: 'Frameworks and past cases to practice with.' },
  { glyph: 'diamond', title: 'Career toolkit', text: 'Resume templates, recruiting timelines, contacts.' },
];

function Unique({ n, title, text }) {
  // Highlights while it sits in the middle band of the screen, dims when it leaves.
  const [ref, inView] = useInView({ threshold: 0, rootMargin: '-38% 0px -38% 0px', once: false });
  return (
    <div ref={ref} className={`uitem ${inView ? 'is-in' : ''}`}>
      <span className="uitem__no">0{n}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Mix({ title, text, rows }) {
  let j = 0;
  return (
    <Reveal className="mix__col">
      <h3>{title}</h3>
      <p>{text}</p>
      {rows.map(([role, count, what, lead]) => (
        <div className="mix__row" key={role}>
          <b>
            {count} · {role}
          </b>
          <span>{what}</span>
          <div className="mix__sq" aria-hidden="true">
            {Array.from({ length: count }, (_, k) => (
              <i key={k} className={lead ? 'lead' : ''} style={{ '--j': j++ }} />
            ))}
          </div>
        </div>
      ))}
    </Reveal>
  );
}

export default function Membership() {
  useTitle('Membership');
  const pathRef = useRef(null);
  // The "how it works" line fills as you scroll through the steps
  useScrollProgress(pathRef, { start: 0.85, end: 0.35, through: true });
  const c = SITE.cycle;

  return (
    <>
      <PageHero
        kicker="Membership"
        title="Join us"
        art="layers"
        lede="Open to all majors and class years. Join as a General Member, become part of our community, and take the next step by applying to an industry project or case competition team."
      />

            {/* ───── apply ───── */}
      <section className="wrap section apply" style={{ paddingTop: 0 }} id="apply">
        <Reveal className="shead">
          <p className="kicker">Applications open · {c.term}</p>
          <h2 className="title title--md">Apply Today!</h2>
        </Reveal>

        <div className="dates">
          {[
            ['Opens', c.opens],
            ['Due', c.due, true],
            ['Interviews', c.interviews],
            ['Decisions', c.decisions],
          ].map(([l, d, hot], i) => (
            <Reveal key={l} delay={i * 100} className={`date ${hot ? 'date--hot' : ''}`}>
              <span>{l}</span>
              <b>{d}</b>
            </Reveal>
          ))}
        </div>

        <div className="tracks">
          <Reveal variant="left" className="track">
            <h3>Membership application</h3>
            <p>
              Open to all Purdue students, regardless of major or experience. 
              We welcome curious, motivated students who are eager to learn, connect, 
              and grow in fintech.
            </p>
            <div>
              <a href={SITE.applyUrl} target="_blank" rel="noreferrer" className="btn btn--green">
                Apply as a member <Arrow />
              </a>
            </div>
          </Reveal>
          
          
          <Reveal variant="right" delay={120} className="track">
            <h3>Leadership application</h3>
            <p>
              Apply to be on the Board of Directors. Directors
              support a Vice President or the EVP in daily operations. {' '}
              <br></br>
              <Link to="/team#structure" style={{ color: 'var(--green)' }}>
                Explore the organizational structure →
              </Link>
            </p>
            <div>
              <a href={SITE.applyUrl} target="_blank" rel="noreferrer" className="btn btn--line">
                Apply for leadership <Arrow />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── why join ───── */}
      <section className="wrap section" style={{ paddingTop: 'clamp(30px,5vw,60px)' }} id="why">
        <Reveal className="shead">
          <h2 className="title title--md">What you’ll gain</h2>
        </Reveal>
        <div className="benefits">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 110} className="benefit">
              <Glyph kind={b.glyph} />
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───── what makes us unique ───── */}
      <section className="wrap section" style={{ paddingTop: 0 }} id="unique">
        <div className="unique">
          <Reveal variant="left" className="unique__head">
            <h2 className="title title--md">What makes us unique</h2>
            <p className="lede">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          </Reveal>
          <div className="unique__list">
            {UNIQUE.map((u, i) => (
              <Unique key={u.title} n={i + 1} {...u} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── types of membership ───── */}
      <section className="wrap section" style={{ paddingTop: 0 }} id="types">
        <Reveal className="shead">
          <h2 className="title title--md">Types of Membership</h2>
          <p className="lede">Every member starts as a General Member. Specialized teams are a second, more selective application.</p>
        </Reveal>

        <TreeDiagram nodes={treeNodes} edges={treeEdges} width={1000} height={400} defaultId="gm" />
      </section>

      {/* ───── resources ───── */}
      <section className="wrap section" style={{ paddingTop: 0 }} id="resources">
        <Reveal className="shead">
          <p className="kicker">Keep Learning</p>
          <h2 className="title title--md">Resources</h2>
          <p className="lede">Learning materials, fintech resources and member opportunities. Link these tiles to your real resources.</p>
        </Reveal>
        <div className="res">
          {RESOURCES.map((r, i) => (
            <Reveal key={r.title} delay={i * 90} className="res__item">
              <Glyph kind={r.glyph} />
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              <span className="chip chip--green" style={{ width: 'fit-content' }}>
                Coming soon
              </span>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
