import React, { createContext, useContext, useState, ReactNode } from 'react';
import en from '../locales/en';
import id from '../locales/id';

export type Lang = 'en' | 'id';

const locales = { en, id };

interface I18nContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof en;
}

const I18nContext = createContext<I18nContextProps>({
  lang: 'en',
  setLang: () => {},
  t: en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const t = locales[lang];
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
