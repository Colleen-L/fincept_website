import React, { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";

const pillars = [
  {
    title: "Industry & professional exposure",
    text: "Explore the people, careers, and ideas shaping modern finance.",
    details: ["Career panels across finance and fintech", "Alumni and industry mentorship", "Networking with finance and technology organizations", "Workshops on specialized careers and emerging trends"],
  },
  {
    title: "Experiential learning",
    text: "Work on practical, collaborative projects or take part in case competitions.",
    details: ["Industry-judged finance and fintech case challenges", "Quantitative finance and financial modeling workshops", "Algorithmic trading, investment, and fintech simulations", "Projects inspired by real-world financial problems"],
  },
  {
    title: "Community & social development",
    text: "Grow with an interdisciplinary community that learns together.",
    details: ["Member socials and collaborative activities", "Leadership development and interdisciplinary connections"],
  },
];

const teamMembers = [
  {
    name: "Anu",
    role: "President",
  },
  {
    name: "Colleen",
    role: "Executive Vice President",
  },
  {
    name: "Vincent",
    role: "Treasurer",
  },
  {
    name: "Nysa",
    role: "VP of Industry Relations",
  },
  {
    name: "Rishi",
    role: "VP of Campus Relations",
  },
  {
    name: "Tatsuya",
    role: "VP of Professional Development",
  },
  {
    name: "Anaiysaa",
    role: "VP of Outreach",
  },
];

const pageTitles = {
  "/": "Fincept | Purdue Finance & Fintech Community",
  "/about": "About — Fincept at Purdue",
  "/team": "Team — Fincept at Purdue",
  "/events": "Events — Fincept at Purdue",
  "/contact": "Contact — Fincept at Purdue",
};

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow-icon arrow-diagonal" : "arrow-icon"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Wordmark({ footer = false }) {
  return (
    <span className={footer ? "wordmark footer-wordmark" : "wordmark"}>
      <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
      <span>fincept<span className="wordmark-period">.</span></span>
    </span>
  );
}

function Kicker({ children }) {
  return <div className="section-kicker">{children}</div>;
}

function PillarCards({ compact = false }) {
  return (
    <div className={compact ? "pillar-grid pillar-grid-compact" : "pillar-grid"}>
      {pillars.map((pillar) => (
        <article className="pillar-card" key={pillar.title}>
          <h3>{pillar.title}</h3>
          <p>{pillar.text}</p>
          {!compact && (
            <ul>
              {pillar.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-copy">
          <h1 className="hero-title">Fincept</h1>
          <p className="hero-affiliation">at Purdue University</p>
          <p className="hero-description">
            We are a student community exploring the intersection of modern finance,
            technology, and business, open to every major and experience level.
          </p>
          <div className="hero-actions">
            <Link className="text-link" to="/about">Explore Fincept <span>↓</span></Link>
            <Link className="button button-dark" to="/contact">Join the community <ArrowIcon /></Link>
          </div>
        </div>

        <div className="hero-art hero-art-purdue" aria-label="Fincept's three focus areas: finance, technology, and innovation">
          <div className="art-topline"><span>THE FUTURE OF FINANCE</span><span>FINCEPT · PURDUE</span></div>
          <svg className="hero-botanical" viewBox="0 0 440 380" aria-hidden="true">
            <path d="M438 264C383 230 370 184 350 139c-21-46-47-79-92-107M365 166c-35-3-60-20-72-49 32-1 57 16 72 49ZM338 122c-8-32 1-59 25-79 12 30 3 57-25 79ZM400 222c-34-12-52-34-57-66 32 8 51 30 57 66ZM300 92c-33 9-61 1-82-23 31-12 59-4 82 23Z" fill="none" stroke="#031B04" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M260 31c-5-13 2-23 12-27 10 5 13 16 7 28 13-7 24-2 27 9-8 9-20 10-30 1 4 14-4 24-16 24-8-10-6-21 5-30-14 3-23-5-22-17 10-7 21-4 29 8Z" fill="#67A26A" stroke="#031B04" strokeWidth="1.2" strokeLinejoin="round" />
            <circle cx="267" cy="36" r="5" fill="#AD7AA4" />
          </svg>
          <div className="focus-orbit orbit-finance"><strong>FINANCE</strong><small>Markets · Quant · Risk</small></div>
          <div className="focus-orbit orbit-technology"><strong>TECHNOLOGY</strong><small>Fintech · Data · AI</small></div>
          <div className="focus-orbit orbit-innovation"><strong>INNOVATION</strong><small>Ideas · Products · Future</small></div>
        </div>
      </section>

      <div className="club-summary" aria-label="Fincept's focus areas">
        <div className="club-summary-inner">
          <span className="summary-label">WHAT WE BRING TOGETHER</span>
          <span>Markets <i>×</i> Data <i>×</i> New ideas</span>
          <span className="summary-location">PURDUE UNIVERSITY</span>
        </div>
      </div>

      <section className="intro-section section-wrap">
        <div className="intro-content">
          <h2>The future<br /><span>of finance.</span></h2>
          <div className="intro-body">
            <p>Fincept brings Purdue students together to understand how financial services are changing and where new opportunities are emerging.</p>
            <p>We explore paths from quantitative strategy and financial engineering to digital payments and fintech.</p>
            <Link className="inline-link" to="/about">Learn more about Fincept <ArrowIcon /></Link>
          </div>
        </div>
      </section>

      <section className="programs-section">
        <div className="section-wrap">
          <div className="programs-heading">
            <div><Kicker>OUR THREE PILLARS</Kicker><h2>Explore. Learn. Connect.</h2></div>
          </div>
          <PillarCards compact />
        </div>
      </section>

    </>
  );
}

function PageIntro({ label, title, emphasis, description, plainEmphasis = false }) {
  return (
    <section className="page-intro section-wrap">
      {label && <Kicker>{label}</Kicker>}
      <h1>{title} {emphasis && <em className={plainEmphasis ? "plain-emphasis" : undefined}>{emphasis}</em>}</h1>
      {description && <p>{description}</p>}
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <PageIntro title="Explore" emphasis="modern finance." description="Fincept brings Purdue students together to explore the people, ideas, and careers changing the financial industry." plainEmphasis />
      <section className="about-story section-wrap">
        <div className="about-story-mark">F<span>.</span></div>
        <div>
          <Kicker>OUR MISSION</Kicker>
          <h2>A wider view<br />of the industry.</h2>
          <p>Fincept is a student-led professional and social community focused on the changing financial industry and the ideas shaping its future.</p>
          <p>There are many paths beyond investment banking and consulting, including quantitative strategy, financial engineering, algorithmic trading, risk analytics, and digital payments.</p>
        </div>
      </section>
      <section className="values-section">
        <div className="section-wrap">
          <Kicker>OUR THREE PILLARS</Kicker>
          <PillarCards />
        </div>
      </section>
      <section className="about-audience section-wrap">
        <div><h2>Who can join?</h2></div>
        <div>
          <p>We welcome students from any major. Our community is an accessible place to begin and grow.</p>
          <div className="discipline-list"><span>BUSINESS</span><span>DATA & COMPUTING</span><span>ENGINEERING</span><span>QUANTITATIVE FIELDS</span><span>AND MORE</span></div>
        </div>
      </section>
      <section className="founding-goals">
        <div className="section-wrap">
          <h2>Build skills.<br />Create connections.</h2>
          <div className="goal-grid">
            <p>Bring together an interdisciplinary community.</p>
            <p>Connect students with professionals and alumni.</p>
            <p>Build practical skills for a changing financial industry.</p>
            <p>Explore emerging trends across financial services.</p>
            <p>Create meaningful opportunities to learn and collaborate.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function TeamPage() {
  return (
    <>
      <PageIntro title="Meet the" emphasis="team." description="" plainEmphasis />
      <section className="team-section section-wrap">
        <div className="team-grid team-placeholder-grid">
          {teamMembers.map((member) => (
            <article className="team-card team-placeholder" key={member.role}>
              <div className="team-portrait" role="img" aria-label={`Photo placeholder for ${member.name || member.role}`}>
                {member.name && <span className="team-initials" aria-hidden="true">{member.name.slice(0, 1)}</span>}
                <span className="team-photo-note">PHOTO</span>
              </div>
              <h3 className="team-member-name">{member.name}</h3>
              <p className="team-position">{member.role}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function YearCalendar() {
  const [monthDate, setMonthDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedCallout, setSelectedCallout] = useState(null);
  const year = monthDate.getFullYear();
  const monthIndex = monthDate.getMonth();
  const month = monthDate.toLocaleString("en-US", { month: "long" });
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const eventDates = new Map([
    ["2026-11-2", { number: 1, time: "6–7 PM" }],
  ]);
  const monthKey = `${year}-${monthIndex}-`;

  return (
    <section className="year-calendar" aria-labelledby="year-calendar-title">
      <div className="year-calendar-heading">
        <Kicker>EVENT CALENDAR</Kicker>
        <div className="calendar-navigation">
          <h2 id="year-calendar-title" aria-live="polite">{month} {year}</h2>
          <div className="calendar-navigation-buttons">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => {
                setSelectedCallout(null);
                setMonthDate(new Date(year, monthIndex - 1, 1));
              }}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => {
                setSelectedCallout(null);
                setMonthDate(new Date(year, monthIndex + 1, 1));
              }}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
      <div className="calendar-month">
        <div className="calendar-days" aria-label={`${month} ${year}`}>
          {["S", "M", "T", "W", "T", "F", "S"].map((weekday, index) => (
            <span className="calendar-weekday" key={`${weekday}-${index}`}>{weekday}</span>
          ))}
          {Array.from({ length: firstWeekday }, (_, index) => (
            <span className="calendar-empty" key={`empty-${index}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const callout = eventDates.get(`${monthKey}${day}`);
            return (
              callout ? (
                <button
                  type="button"
                  className="calendar-date has-event"
                  aria-label={`Callout #${callout.number}, ${month} ${day}, ${year}, ${callout.time}`}
                  aria-pressed={selectedCallout?.number === callout.number}
                  onClick={() => setSelectedCallout({ ...callout, month, day, year })}
                  key={day}
                >
                  {day}
                </button>
              ) : (
                <span className="calendar-date" key={day}>{day}</span>
              )
            );
          })}
        </div>
      </div>
      {selectedCallout && (
        <p className="calendar-selected-callout" role="status">
          Callout #{selectedCallout.number} · {selectedCallout.month} {selectedCallout.day}, {selectedCallout.year} · {selectedCallout.time}
        </p>
      )}
      <p className="calendar-note"><span aria-hidden="true" /> Fincept event</p>
    </section>
  );
}

function EventsPage() {
  return (
    <>
      <PageIntro title="Upcoming" emphasis="events." description="" plainEmphasis />
      <section className="events-section events-page section-wrap">
        <div className="events-callouts">
          <div className="upcoming-events upcoming-events-single" aria-label="Upcoming Fincept event callouts">
            <article className="upcoming-event">
              <div className="upcoming-event-date">
                <span className="upcoming-event-month">DEC</span>
                <strong>2</strong>
              </div>
              <div className="upcoming-event-details">
                <span className="upcoming-event-label">Callout #1</span>
                <span className="upcoming-event-time">6–7 PM</span>
              </div>
            </article>
          </div>
        </div>
        <YearCalendar />
      </section>
    </>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <>
      <PageIntro title="Contact" emphasis="Fincept." description="Curious about joining, collaborating, or coming to an event? We’d love to hear from you." plainEmphasis />
      <section className="contact-section section-wrap">
        <div className="contact-details">
          <Kicker>CONTACT INFORMATION</Kicker>
          <h2>Contact details</h2>
          <p>For membership, event, or partnership questions, use the contact links below or send the club a message.</p>
          <div className="contact-socials">
            <a href="mailto:fincept@purdue.edu"><span>EMAIL</span><strong>fincept@purdue.edu</strong><small>placeholder</small></a>
            <a href="https://www.linkedin.com/company/fincept-purdue/" target="_blank" rel="noreferrer"><span>LINKEDIN</span><strong>Fincept at Purdue</strong><small>placeholder profile</small></a>
            <a href="https://www.instagram.com/fincept.purdue/" target="_blank" rel="noreferrer"><span>INSTAGRAM</span><strong>@fincept.purdue</strong><small>placeholder profile</small></a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <Kicker>SEND A NOTE</Kicker>
          {sent ? (
            <div className="contact-success" role="status">
              <span className="contact-success-icon">✳</span>
              <h3>Thanks for reaching out.</h3>
              <p>This demo form does not send or store your message yet.</p>
              <button type="button" className="inline-link" onClick={() => setSent(false)}>Write another message <ArrowIcon /></button>
            </div>
          ) : (
            <>
              <label htmlFor="contact-name">Your name</label>
              <input id="contact-name" name="name" autoComplete="name" placeholder="How should we address you?" required />
              <label htmlFor="contact-email">Email address</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              <label htmlFor="contact-topic">What’s on your mind?</label>
              <select id="contact-topic" name="topic" defaultValue="Joining the club">
                <option>Joining the club</option>
                <option>Upcoming events</option>
                <option>Partnership or collaboration</option>
                <option>Something else</option>
              </select>
              <label htmlFor="contact-message">Your message</label>
              <textarea id="contact-message" name="message" rows="4" placeholder="Tell us a little more..." required />
              <button className="button button-dark contact-submit" type="submit">Send your message <ArrowIcon /></button>
            </>
          )}
        </form>
      </section>
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="not-found section-wrap">
      <Kicker>WRONG TURN?</Kicker>
      <h1>That page isn’t<br /><em>on the map.</em></h1>
      <Link className="button button-dark" to="/">Back to home <ArrowIcon /></Link>
    </section>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    document.title = pageTitles[location.pathname] || "Page not found — Fincept at Purdue";
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <header className="site-header">
        <Link to="/" aria-label="Fincept home"><Wordmark /></Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span />
        </button>
        <nav className={menuOpen ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/team">Team</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <Link className="nav-cta" to="/contact">Join us <ArrowIcon diagonal /></Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="site-footer site-footer-purple">
        <Link to="/" aria-label="Fincept home"><Wordmark footer /></Link>
        <span className="footer-note">Explore what’s next in finance.</span>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/team">Team</Link>
          <Link to="/events">Events</Link>
          <Link to="/contact">Contact <ArrowIcon diagonal /></Link>
        </div>
        <span className="copyright">© 2026 FINCEPT FINANCE CLUB</span>
      </footer>
    </>
  );
}

function App() {
  return <SiteLayout />;
}

export default App;
