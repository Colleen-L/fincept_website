import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../config';
import { Arrow } from './Shapes';

const KEY = 'fincept-banner-dismissed';

/** Pop-up announcement for the application cycle. Slides in after a beat, dismissible. */
export default function Banner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(KEY) === '1';
    } catch {
      /* storage can be blocked — banner simply shows */
    }
    if (dismissed) return;
    const t = setTimeout(() => setShow(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setShow(false);
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
  };

  return (
    <aside className={`banner ${show ? 'is-in' : ''}`} role="dialog" aria-label="Applications" aria-hidden={!show}>
      <button className="banner__x" onClick={close} aria-label="Dismiss announcement" tabIndex={show ? 0 : -1}>
        ×
      </button>
      <p className="banner__kicker">Applications open · {SITE.cycle.term}</p>
      <p className="banner__text">
        Membership &amp; leadership applications close <b>{SITE.cycle.due}</b>.
      </p>
      <Link to="/membership#apply" className="btn btn--green" onClick={close} tabIndex={show ? 0 : -1}>
        Apply today <Arrow />
      </Link>
    </aside>
  );
}
