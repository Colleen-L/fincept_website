import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { NAV, SITE } from '../config';
import { LogoMark, Tri } from './Shapes';
import { useScrollProgress } from '../hooks/useScrollProgress';

export default function Footer() {
  const markRef = useRef(null);
  // The giant wordmark "fills" with green as the footer scrolls into view.
  useScrollProgress(markRef, { start: 1.0, end: 0.55 });

  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__about">
          <div className="footer__logo">
            <LogoMark size={34} />
            <span>FINCEPT Purdue</span>
          </div>
          <p>
            Purdue’s first industry-partnered, multi-domain fintech organization.
          </p>
          <Link to="/membership#apply" className="footer__apply">
            Applications open <Tri dir="right" size={14} />
          </Link>
        </div>

        <nav className="footer__col" aria-label="Explore">
          <h4>Explore</h4>
          {NAV.map((n) => (
            <Link key={n.to} to={n.to}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="footer__col">
          <h4>Get involved</h4>
          <Link to="/membership#apply">Apply to join</Link>
          <Link to="/membership#resources">Resources</Link>
          <Link to="/partners">Partner with us</Link>
          <Link to="/team">Meet the board</Link>
        </div>

        <div className="footer__col">
          <h4>Connect</h4>
          <a href={`mailto:${SITE.email}`}>Email</a>
          <a href={SITE.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={SITE.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
{/* 
      <div className="footer__mark" ref={markRef} aria-hidden="true">
        FINCEPT
      </div> */}

      <div className="wrap footer__base">
        <span>© {new Date().getFullYear()} FINCEPT Purdue. All rights reserved.</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="footer__top">
          Back to top <Tri dir="up" size={12} />
        </button>
      </div>
    </footer>
  );
}
