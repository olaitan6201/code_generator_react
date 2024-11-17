import { createContext } from "react";

export const LanguageContext = createContext({
    langCode: localStorage.getItem('APP_LOCALE') || 'en',
    changeLangCode: (langCode: string) => { if (!langCode) return; },
});