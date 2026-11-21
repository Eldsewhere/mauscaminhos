import { createContext, useContext } from 'react';
import { ui, type Lang, type Strings } from './strings';

export type LangState = { lang: Lang; setLang: (lang: Lang) => void; t: Strings };

export const LangContext = createContext<LangState>({ lang: 'pt', setLang: () => {}, t: ui.pt });

/** The current language, a way to change it, and the interface text in that language. */
export const useLang = () => useContext(LangContext);
