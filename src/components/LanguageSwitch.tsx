import type { ReactNode } from 'react';
import { useLang } from '../i18n/context';
import { langs, ui, type Lang } from '../i18n/strings';

const flags: Record<Lang, ReactNode> = {
  // Portugal: green and red, with a simplified armillary sphere and shield.
  pt: (
    <svg viewBox="0 0 30 20" width="30" height="20" aria-hidden="true">
      <rect width="30" height="20" fill="#da291c" />
      <rect width="12" height="20" fill="#046a38" />
      <circle cx="12" cy="10" r="4.6" fill="none" stroke="#ffe900" strokeWidth="1.3" />
      <path d="M9.9 7.4h4.2v3.6a2.1 2.1 0 0 1-4.2 0z" fill="#fff" stroke="#da291c" strokeWidth="0.8" />
    </svg>
  ),
  // United Kingdom.
  en: (
    <svg viewBox="0 0 60 30" width="30" height="20" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <clipPath id="flag-uk-diagonals">
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#c8102e" strokeWidth="4" clipPath="url(#flag-uk-diagonals)" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  ),
};

/** Flag buttons that switch the whole page between Portuguese and English. */
export function LanguageSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang-switch" role="group" aria-label={t.langSwitch}>
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          className={l === lang ? 'lang-flag active' : 'lang-flag'}
          aria-pressed={l === lang}
          aria-label={ui[l].langName}
          title={ui[l].langName}
          lang={l === 'pt' ? 'pt-PT' : 'en'}
          onClick={() => setLang(l)}
        >
          {flags[l]}
        </button>
      ))}
    </div>
  );
}
