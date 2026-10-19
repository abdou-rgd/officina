import { useEffect, useState } from 'react';

const query = '(prefers-reduced-motion: reduce)';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => window.matchMedia?.(query).matches ?? false);
  useEffect(() => {
    const mq = window.matchMedia?.(query);
    if (!mq) return undefined;
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

// Elements marked data-reveal fade in once, the first time they enter the viewport.
// A data attribute rather than a class, so that React re-renders never remove it.
// With reduced motion, or without IntersectionObserver, everything is shown at once (see styles.css).
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-in])'));
    if (!('IntersectionObserver' in window) || window.matchMedia?.(query).matches) {
      els.forEach(el => el.setAttribute('data-in', ''));
      return undefined;
    }
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute('data-in', '');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

// The id of the section currently under the top bar, for the navigation's aria-current.
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState('');
  const key = ids.join(',');
  useEffect(() => {
    const els = key
      .split(',')
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      entries => {
        const hit = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [key]);
  return active;
}
