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
    id: 'gm', label: 'General Members', title: 'General Members', group: 'Everyone starts here', tone: 'top', level: 0, depth: 0,
    x: 500, y: 48, w: 280, h: 58,
    desc: 'Members who applied through the General Application.',
  },
  {
    id: 'gen', label: 'General', title: 'General Membership', group: 'Membership type', tone: 'exec', level: 1, depth: 1,
    x: 250, y: 190, w: 190, h: 58,
    desc: 'Members without a specialized role. Access to mock case competitions, workshops, speaker sessions and career spotlights. Meeting attendance is optional, but is considered if you later apply for leadership roles.',
  },
  {
    id: 'spec', label: 'Specialized\nTeams', title: 'Specialized Teams', group: 'Membership type', tone: 'exec', level: 1, depth: 1,
    x: 750, y: 190, w: 190, h: 62,
    desc: 'General Members who applied through a more selective team recruitment process.',
  },
  {
    id: 'ip', label: 'Industry\nProjects', title: 'Industry Project Teams', group: 'Specialized team', tone: 'exec', level: 2, depth: 2,
    x: 610, y: 340, w: 180, h: 62,
    desc: 'Teams that work on fintech projects partnered with a company.',
  },
  {
    id: 'cc', label: 'Case Comp\nTeams', title: 'Case Competition Teams', group: 'Specialized team', tone: 'exec', level: 2, depth: 2,
    x: 880, y: 340, w: 180, h: 62,
    desc: 'Teams that participate in intercollegiate case competitions and represent FINCEPT.',
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

const MIX = [
  {
    title: 'Industry project team',
    text: 'About 9 members per team, each bringing a different skill.',
    rows: [
      ['Project Leads', 2, 'Leads the project team', true],
      ['Technical Developers', 3, 'Tech-side knowledge and implementation'],
      ['Business Developers', 2, 'Business knowledge / acumen'],
      ['Designers', 2, 'UI / UX design'],
    ],
  },
  {
    title: 'Case competition team',
    text: 'A small squad that researches, builds and pitches a case.',
    rows: [
      ['Team Lead', 1, 'Leads the case competition team', true],
      ['Members', 5, 'Provide ideas and help pitch'],
    ],
  },
];

const STEPS = [
  ['Join', 'Apply through the General Application and become a General Member.'],
  ['Apply', 'Apply to an industry project or case competition team.'],
  ['Interview', 'Selective team recruitment — lorem ipsum dolor sit amet.'],
  ['Build', 'Work with a partner company or compete against other schools.'],
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
        lede="Open to every major and class year. Start as a General Member, then go deeper with an industry project or case competition team."
      />

      {/* ───── why join ───── */}
      <section className="wrap section" style={{ paddingTop: 'clamp(30px,5vw,60px)' }} id="why">
        <Reveal className="shead">
          <p className="kicker">Why join us?</p>
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
            <p className="kicker">Differentiators</p>
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
          <p className="kicker">Types of membership</p>
          <h2 className="title title--md">Two ways in</h2>
          <p className="lede">Every member starts as a General Member. Specialized teams are a second, more selective application.</p>
        </Reveal>

        <TreeDiagram nodes={treeNodes} edges={treeEdges} width={1000} height={400} defaultId="gm" />

        <div className="types">
          <Reveal variant="left" className="type">
            <h4>Focus: learning &amp; community</h4>
            <h3>General membership</h3>
            <p>Workshops, socials and a community of students curious about fintech. Lorem ipsum dolor sit amet.</p>
            <ul className="bullets">
              <li>Workshops — industry speakers and educational sessions</li>
              <li>Mock case competitions</li>
              <li>Career spotlights</li>
              <li>Socials, mentorship, weekly discussions</li>
              <li>Attendance optional (considered for leadership roles)</li>
            </ul>
          </Reveal>
          <Reveal variant="right" delay={120} className="type type--green">
            <h4>Focus: projects &amp; competitions</h4>
            <h3>Specialized membership</h3>
            <p>Join an industry-partnered project team or a case competition team. Lorem ipsum — describe the format and time commitment here.</p>
            <ul className="bullets">
              <li>Industry projects — build real fintech work for a partner company</li>
              <li>Case comp teams — represent FINCEPT intercollegiately</li>
              <li>Weekly team meetings and a final presentation</li>
              <li>Selective team recruitment after joining</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ───── team makeup ───── */}
      <section className="wrap section" style={{ paddingTop: 0 }} id="makeup">
        <Reveal className="shead">
          <p className="kicker">Inside a specialized team</p>
          <h2 className="title title--md">Who’s on a team</h2>
        </Reveal>
        <div className="mix">
          {MIX.map((m) => (
            <Mix key={m.title} {...m} />
          ))}
        </div>

        <Reveal className="shead" style={{ marginTop: 'clamp(60px,8vw,110px)' }}>
          <p className="kicker">How it works</p>
          <h2 className="title title--md">From general to specialized</h2>
        </Reveal>
        <div className="path" ref={pathRef}>
          {STEPS.map(([h, t], i) => (
            <div className="path__step" key={h} style={{ '--k': i }}>
              <i>{i + 1}</i>
              <h4>{h}</h4>
              <p>{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── apply ───── */}
      <section className="wrap section apply" style={{ paddingTop: 0 }} id="apply">
        <Reveal className="shead">
          <p className="kicker">Applications open · {c.term}</p>
          <h2 className="title title--md">Apply to join</h2>
          <p className="lede">Placeholder dates below — update them in src/config.js and they change here and in the pop-up banner.</p>
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
            <p>Open to all Purdue students. Short form, no experience needed. Lorem ipsum dolor sit amet.</p>
            <div>
              <a href={SITE.applyUrl} target="_blank" rel="noreferrer" className="btn btn--green">
                Apply as a member <Arrow />
              </a>
            </div>
          </Reveal>
          <Reveal variant="right" delay={120} className="track">
            <h3>Leadership application</h3>
            <p>Apply for a Director position on the Board of Directors. Lorem ipsum dolor sit amet, consectetur.</p>
            <div>
              <a href={SITE.applyUrl} target="_blank" rel="noreferrer" className="btn btn--line">
                Apply for leadership <Arrow />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="director">
          <svg viewBox="0 0 80 90" aria-hidden="true">
            <polygon points="40,3 76,23 76,67 40,87 4,67 4,23" />
            <polygon points="40,28 58,38 58,56 40,66 22,56 22,38" fill="var(--green)" stroke="none" />
          </svg>
          <div>
            <h3>What is a Director?</h3>
            <p>
              Directors sit on the Board of Directors and support a Vice President in one area — Industry Relations, Campus
              Relations, Outreach or Professional Development — or the EVP in Executive Affairs. Lorem ipsum: describe time
              commitment and expectations here.{' '}
              <Link to="/team" style={{ color: 'var(--green)' }}>
                See the structure →
              </Link>
            </p>
          </div>
        </Reveal>
      </section>

      {/* ───── resources ───── */}
      <section className="wrap section" style={{ paddingTop: 0 }} id="resources">
        <Reveal className="shead">
          <p className="kicker">Resources</p>
          <h2 className="title title--md">Keep learning</h2>
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
