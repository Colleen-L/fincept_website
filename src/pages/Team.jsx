import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import TreeDiagram from '../components/TreeDiagram';
import LogoWall from '../components/LogoWall';
import { Arrow, HexAvatar } from '../components/Shapes';
import { useTitle } from '../hooks/useScrollProgress';

import presidentImg from '../assets/headshots/anu.png';
import evpImg from '../assets/headshots/colleen.png';
import treasurerImg from '../assets/headshots/vincent.png';
import vpirImg from '../assets/headshots/nysa.png';
import vpcrImg from '../assets/headshots/rishi.png';
import vppdImg from '../assets/headshots/tats.png';
import vpoImg from '../assets/headshots/anaiysaa.png';

import adapts from '../assets/companies/adapts.jpeg';
import axis_bank from '../assets/companies/axis_bank.png';
import galaxy from '../assets/companies/galaxy.png';
import jpmc from '../assets/companies/jpmc.png';
import microsoft from '../assets/companies/microsoft.png';
import nextech from '../assets/companies/nextech.png';
import oracle from '../assets/companies/oracle.png';
import psycray from '../assets/companies/psycray.png';
import quadranttech from '../assets/companies/quadranttech.png';
import wabtec from '../assets/companies/wabtec.png';

const EXEC = 'Executive Board';
const DIR = 'Board of Directors';

// x / y = centre of the box inside a 1000 × 540 canvas. level = reveal order.
const nodes = [
  {
    id: 'pres', label: 'President', title: 'President', group: EXEC, tone: 'top', level: 0, depth: 0,
    x: 500, y: 48, w: 210, h: 56,
    desc: 'Leads the Executive Board and is responsible for overall organizational leadership, strategic direction, and development',
  },
  {
    id: 'evp', label: 'Executive\nVice President', title: 'Executive Vice President', group: EXEC, tone: 'exec', level: 1, depth: 1,
    x: 500, y: 170, w: 210, h: 62, reports: 'President',
    desc: 'Oversees internal organizational operations and supports the President in ensuring that all departments function effectively.',
  },
  {
    id: 'dea', label: 'Dir., Executive\nAffairs', title: 'Director, Executive Affairs', group: DIR, tone: 'dir', level: 1, depth: 2,
    x: 170, y: 170, w: 180, h: 62, reports: 'Executive Vice President',
    desc: 'Assists the EVP in operations and communications.',
  },
  {
    id: 'tre', label: 'Treasurer', title: 'Treasurer', group: EXEC, tone: 'exec', level: 2, depth: 2,
    x: 100, y: 330, w: 170, h: 62, reports: 'EVP + President',
    desc: 'Handles financial operations, ensuring responsible budgeting, accurate financial records, and effective allocation of organizational resources.',
  },
  {
    id: 'vpir', label: 'VP of Industry\nRelations', title: 'VP of Industry Relations', group: EXEC, tone: 'exec', level: 2, depth: 2,
    x: 300, y: 330, w: 170, h: 62, reports: 'EVP + President',
    desc: 'Establishes relationships with corporations, industry professionals, and external organizations.',
  },
  {
    id: 'vpcr', label: 'VP of Campus\nRelations', title: 'VP of Campus Relations', group: EXEC, tone: 'exec', level: 2, depth: 2,
    x: 500, y: 330, w: 170, h: 62, reports: 'EVP + President',
    desc: 'Establishes relationships with university departments, faculty, student organizations, and campus resources.',
  },
  {
    id: 'vpo', label: 'VP of\nOutreach', title: 'VP of Outreach', group: EXEC, tone: 'exec', level: 2, depth: 2,
    x: 700, y: 330, w: 170, h: 62, reports: 'EVP + President',
    desc: 'Oversees branding, marketing, communications, and outreach efforts.',
  },
  {
    id: 'vppd', label: 'VP of Professional\nDevelopment', title: 'VP of Professional Development', group: EXEC, tone: 'exec', level: 2, depth: 2,
    x: 900, y: 330, w: 170, h: 62, reports: 'EVP + President',
    desc: 'Develops professional development initiatives, providing members with opportunities to strengthen their technical, analytical, and professional skills.',
  },
  {
    id: 'dir', label: 'Dir., Industry\nRelations', title: 'Director, Industry Relations', group: DIR, tone: 'dir', level: 3, depth: 3,
    x: 300, y: 472, w: 170, h: 58, reports: 'VP of Industry Relations',
    desc: 'Supports the VP of Industry Relations.',
  },
  {
    id: 'dcr', label: 'Dir., Campus\nRelations', title: 'Director, Campus Relations', group: DIR, tone: 'dir', level: 3, depth: 3,
    x: 500, y: 472, w: 170, h: 58, reports: 'VP of Campus Relations',
    desc: 'Supports the VP of Campus Relations.',
  },
  {
    id: 'dou', label: 'Dir.,\nOutreach', title: 'Director, Outreach', group: DIR, tone: 'dir', level: 3, depth: 3,
    x: 700, y: 472, w: 170, h: 58, reports: 'VP of Outreach',
    desc: 'Supports the VP of Outreach.',
  },
  {
    id: 'dpd', label: 'Dir., Professional\nDevelopment', title: 'Director, Professional Development', group: DIR, tone: 'dir', level: 3, depth: 3,
    x: 900, y: 472, w: 170, h: 58, reports: 'VP of Professional Development',
    desc: 'Supports the VP of Professional Development.',
  },
];

const edges = [
  { from: 'pres', to: 'evp' },
  { from: 'dea', to: 'evp', kind: 'h' },
  { from: 'evp', to: 'tre' },
  { from: 'evp', to: 'vpir' },
  { from: 'evp', to: 'vpcr' },
  { from: 'evp', to: 'vpo' },
  { from: 'evp', to: 'vppd' },
  { from: 'vpir', to: 'dir' },
  { from: 'vpcr', to: 'dcr' },
  { from: 'vpo', to: 'dou' },
  { from: 'vppd', to: 'dpd' },
];

const EXEC_PEOPLE = [
  {
    initials: 'P',
    name: 'Anubhuti Mittal',
    role: 'President',
    image: presidentImg,
    linkedin: 'https://www.linkedin.com/in/anubhutimittal/',
  },
  {
    initials: 'EVP',
    name: 'Colleen Li',
    role: 'Executive Vice President',
    image: evpImg,
    linkedin: 'https://www.linkedin.com/in/colleen-l/',
  },
  {
    initials: 'T',
    name: 'Vincent Li',
    role: 'Treasurer',
    image: treasurerImg,
    linkedin: 'linkedin.com/in/vincent-li-07771b30b/',
  },
  {
    initials: 'VPIR',
    name: 'Nysa Kumar',
    role: 'VP Industry Relations',
    image: vpirImg,
    linkedin: 'https://www.linkedin.com/in/nysa-kumar-021211255/',
  },
  {
    initials: 'VPCR',
    name: 'Rishi Rao',
    role: 'VP Campus Relations',
    image: vpcrImg,
    linkedin: 'https://www.linkedin.com/in/rishi-rao-253b0a22b/',
  },
  {
    initials: 'VPO',
    name: 'Anaiysaa Deswal',
    role: 'VP Outreach',
    image: vpoImg,
    linkedin: 'https://www.linkedin.com/in/anaiysaadeswal/',
  },
  {
    initials: 'VPPD',
    name: 'Tatsuya Greiner',
    role: 'VP Professional Development',
    image: vppdImg,
    linkedin: 'linkedin.com/in/tatsuyagreiner/',
  },
];

const DIR_PEOPLE = [
  {
    initials: 'Dir',
    name: 'First Last',
    role: 'Dir. Position',
    image: '',
    linkedin: '',
  },
  {
    initials: 'Dir',
    name: 'First Last',
    role: 'Dir. Position',
    image: '',
    linkedin: '',
  },
  {
    initials: 'Dir',
    name: 'First Last',
    role: 'Dir. Position',
    image: '',
    linkedin: '',
  },
  {
    initials: 'Dir',
    name: 'First Last',
    role: 'Dir. Position',
    image: '',
    linkedin: '',
  },
];

const COMPANIES = [
  {
    name: 'Adapts.ai',
    image: adapts,
    url: 'https://www.linkedin.com/company/adaptsai/',
  },
  {
    name: 'Axis Bank',
    image: axis_bank,
    url: 'https://www.axis.bank.in/',
  },
  {
    name: 'Galaxy',
    image: galaxy,
    url: 'https://www.galaxy.com/',
  },
  {
    name: 'JPMorgan',
    image: jpmc,
    url: 'https://www.jpmorganchase.com/',
  },
  {
    name: 'Microsoft',
    image: microsoft,
    url: 'https://www.microsoft.com/en-us',
  },
  {
    name: 'Nextech',
    image: nextech,
    url: 'https://nextech.org/',
  },
  {
    name: 'Oracle',
    image: oracle,
    url: 'https://www.oracle.com/',
  },
  {
    name: 'Psycray',
    image: psycray,
    url: 'https://psycray.com/',
  },
  {
    name: 'Quadrant Technologies',
    image: quadranttech,
    url: 'https://www.quadranttechnologies.com/',
  },
  {
    name: 'Wabtec Corporation',
    image: wabtec,
    url: 'https://www.wabteccorp.com/',
  },
];

export default function Team() {
  useTitle('Our Team');
  return (
    <>
      <PageHero
        kicker="Leadership"
        title="Our team"
        art="hex"
        lede="Meet the Executive Board leading FINCEPT — a team of Purdue students driving our initiatives, building industry relationships, and growing our community, supported by our Board of Directors."
      />

      <section className="wrap" style={{ paddingBottom: 'clamp(40px,6vw,80px)' }}>
        <Reveal className="cta__btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/membership#apply" className="btn btn--green">
            Join the leadership team <Arrow />
          </Link>
        </Reveal>
      </section>

      {/* ───── people ───── */}
      <section className="wrap section" style={{ paddingTop: 0 }} id="board">
        <Reveal className="shead">
          <h2 className="title title--md">Executive Board</h2>
        </Reveal>

        <div className="people-group">
          <div className="people">
            {EXEC_PEOPLE.map((person) => (
              <div key={person.role} className="person">
                <HexAvatar
                  initials={person.initials}
                  image={person.image}
                  name={person.name}
                  linkedin={person.linkedin}
                  accent={person.role === 'President'}
                />
                <h4>{person.name}</h4>
                <p>{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="people-group">
          <Reveal className="shead board-directors__head">
            <h1>BOARD OF DIRECTORS</h1>
          </Reveal>

          <div className="people">
            {DIR_PEOPLE.map((person) => (
              <div key={person.role} className="person">
                <HexAvatar
                  initials={person.initials}
                  image={person.image}
                  name={person.name}
                  linkedin={person.linkedin}
                  accent={person.role === 'President'}
                />
                <h4>{person.name}</h4>
                <p>{person.role}</p>
              </div>
            ))}
          </div>
        </div> */}
      </section>

      {/* ───── structure ───── */}
      <section className="wrap section" style={{ paddingTop: 'clamp(30px,5vw,60px)' }} id="structure">
        <Reveal className="shead">
          <h2 className="title title--md">Organizational Structure</h2>
        </Reveal>

        <div className="board-key" aria-hidden="true">
          <span><i className="top" /> President</span>
          <span><i /> {EXEC}</span>
          <span><i className="dir" /> {DIR}</span>
        </div>

        <TreeDiagram
          nodes={nodes}
          edges={edges}
          width={1000}
          height={520}
          defaultId="pres"
        />
      </section>

      <section className="wrap section" style={{ paddingTop: 0 }} id="worked">
        <Reveal className="shead">
          <h2 className="title title--md">Our Board in Industry</h2>
          <p className="lede">A look at the professional experiences, career opportunities, and industry connections of our board members.</p>
        </Reveal>
        <LogoWall items={COMPANIES} />
      </section>
    </>
  );
}
