import { useEffect, useState } from 'react';
import type { Lang } from './i18n';

export type ThemeChoice = 'system' | 'light' | 'dark';
export type Theme = 'light' | 'dark';

// Preferences stay in this browser only (localStorage); nothing is sent anywhere.
function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage blocked: the choice simply lasts for this visit.
  }
}

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>(() => (read('officina.lang') === 'en' ? 'en' : 'fr'));
  useEffect(() => {
    document.documentElement.lang = lang;
    write('officina.lang', lang);
  }, [lang]);
  return [lang, setLang];
}

const query = '(prefers-color-scheme: dark)';

export function useTheme(): [ThemeChoice, (c: ThemeChoice) => void, Theme] {
  const [choice, setChoice] = useState<ThemeChoice>(() => {
    const stored = read('officina.theme');
    return stored === 'light' || stored === 'dark' ? stored : 'system';
  });
  const [systemDark, setSystemDark] = useState(() => window.matchMedia?.(query).matches ?? false);

  useEffect(() => {
    const mq = window.matchMedia?.(query);
    if (!mq) return undefined;
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const resolved: Theme = choice === 'system' ? (systemDark ? 'dark' : 'light') : choice;

  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
    write('officina.theme', choice);
  }, [choice, resolved]);

  return [choice, setChoice, resolved];
}
