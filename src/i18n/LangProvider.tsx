import { useEffect, useState, type ReactNode } from 'react';
import { LangContext } from './context';
import { ui, type Lang } from './strings';

const STORAGE_KEY = 'mauscaminhos.lang';

/** A saved choice wins; otherwise the site opens in Portuguese. */
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'pt' || saved === 'en') return saved;
  } catch {
    // storage blocked: use the default
  }
  return 'pt';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en';
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage blocked: the choice lasts until the page is closed
    }
  };

  return <LangContext.Provider value={{ lang, setLang, t: ui[lang] }}>{children}</LangContext.Provider>;
}
