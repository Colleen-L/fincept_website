import { useEffect } from 'react';

/**
 * Scroll-linked animation helper.
 * Writes a CSS variable (--p, 0 → 1) straight onto the element while the user
 * scrolls — no React re-renders, so it stays smooth. CSS then uses var(--p)
 * to drive transforms, fills, line-drawing, etc.
 *
 * start / end are viewport fractions for the element's TOP edge:
 *   p = 0 when the top is at `start` × viewport height
 *   p = 1 when the top is at `end`   × viewport height
 */
export function useScrollProgress(ref, { start = 0.95, end = 0.25, name = '--p', through = false } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      // through=true: p hits 1 when the element's BOTTOM reaches `end` (good for tall blocks)
      const span = through ? vh * (start - end) + rect.height : vh * (start - end);
      const p = Math.min(1, Math.max(0, (vh * start - rect.top) / span));
      el.style.setProperty(name, p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, start, end, name]);
}

/** Sets --sp (0 → 1) on <html> for the page-level progress bar. */
export function usePageProgress() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - window.innerHeight;
      h.style.setProperty('--sp', max > 0 ? (window.scrollY / max).toFixed(4) : '0');
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — FINCEPT Purdue` : 'FINCEPT Purdue — rethinking finance.';
  }, [title]);
}
