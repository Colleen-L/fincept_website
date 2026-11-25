import { useState } from 'react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { Arrow, Glyph } from '../components/Shapes';
import { SITE } from '../config';
import { useTitle } from '../hooks/useScrollProgress';

const LINKS = [
  { glyph: 'square', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { glyph: 'hex', label: 'LinkedIn', value: SITE.linkedinHandle, href: SITE.linkedin, ext: true },
  { glyph: 'triangle', label: 'Instagram', value: SITE.instagramHandle, href: SITE.instagram, ext: true },
];

export default function Contact() {
  useTitle('Contact');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | mailto

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.website) return; // honeypot — bots fill this in

    const subject = `[FINCEPT site] ${data.topic} — ${data.name}`;

    // No endpoint configured → open the visitor's email app with the message filled in.
    if (!SITE.formEndpoint) {
      const body = `${data.message}\n\n— ${data.name} (${data.email})`;
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, topic: data.topic, message: data.message, _subject: subject }),
      });
      if (!res.ok) throw new Error('bad response');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <PageHero
        kicker="Contact"
        title="Say hello"
        art="square"
        lede="Questions about joining, partnering, or anything else — send a message or find us online."
      />

      <section className="wrap section" style={{ paddingTop: 'clamp(30px,5vw,60px)' }}>
        <div className="contact">
          <Reveal variant="left">
            <div className="shead">
              <p className="kicker">Find us</p>
              <h2 className="title title--md">Reach out</h2>
            </div>
            <div className="clinks">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  className="clink"
                  href={l.href}
                  {...(l.ext ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <Glyph kind={l.glyph} />
                  <span>
                    <small>{l.label}</small>
                    <b>{l.value}</b>
                  </span>
                  <Arrow />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal variant="right" delay={100}>
            <form className="form" onSubmit={onSubmit} noValidate={false}>
              <h2>Send us a message</h2>

              <div className="form__row">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" placeholder="First Last" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@purdue.edu" required autoComplete="email" />
                </div>
              </div>

              <div className="field">
                <label htmlFor="topic">I’m a…</label>
                <select id="topic" name="topic" defaultValue="Student">
                  <option>Student</option>
                  <option>Industry partner</option>
                  <option>Speaker / guest</option>
                  <option>Something else</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Lorem ipsum dolor sit amet…" required />
              </div>

              {/* honeypot */}
              <div className="hp" aria-hidden="true">
                <label htmlFor="website">Leave empty</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="form__foot">
                <button className="btn btn--green" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'} <Arrow />
                </button>
                <p className={`form__status ${status === 'sent' ? 'form__status--ok' : ''} ${status === 'error' ? 'form__status--err' : ''}`} role="status">
                  {status === 'sent' && 'Message sent — we’ll be in touch soon.'}
                  {status === 'mailto' && 'Opening your email app to finish sending…'}
                  {status === 'error' && `Something went wrong. Please email ${SITE.email} directly.`}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
