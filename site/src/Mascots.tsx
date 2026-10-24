import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './motion';

// The two pixel mascots: Caladrius perches on the hero's Caladrius figure, Apothicaire waddles
// along the rule under the introduction of Chapter III. Both sit where no text lies above them. They run on Piixpal 0.4.0 (MIT), whose files are copied from the npm
// package into public/piixpal/ and served by the site itself, like the fonts. Nothing is loaded
// when the system asks for reduced motion.
const scripts = ['core.min.js', 'pip.min.js', 'bitbug.min.js', 'officina-pals.js'];

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'piix-pal': { pal: string; on: string; edge?: 'text' | 'box'; scale?: string };
    }
  }
}

// One load per page, whatever React does with the effect (StrictMode runs it twice).
let loading: Promise<void> | null = null;

function loadPiixpal(): Promise<void> {
  loading ??= scripts.reduce(
    (prev, file) =>
      prev.then(
        () =>
          new Promise<void>((resolve, reject) => {
            const s = document.createElement('script');
            s.src = `${import.meta.env.BASE_URL}piixpal/${file}`;
            s.onload = () => resolve();
            s.onerror = () => reject(new Error(file));
            document.head.append(s);
          })
      ),
    Promise.resolve()
  );
  return loading;
}

export default function Mascots() {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let live = true;
    loadPiixpal().then(
      () => live && setReady(true),
      () => undefined
    );
    return () => {
      live = false;
    };
  }, [reduced]);

  if (reduced || !ready) return null;
  return (
    <>
      <piix-pal pal="caladrius" on=".hero .specimen" scale="3" />
      <piix-pal pal="apothicaire" on="#apothicaire .apo-parts" edge="box" scale="3" />
    </>
  );
}
