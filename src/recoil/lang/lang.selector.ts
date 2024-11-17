import { selector } from "recoil";
import { languageState } from "./lang.reducer";

export const getLanguagesState = selector({
    key: 'getLanguagesState',
    get: ({ get }) => {
        const data = get(languageState);

        return data.languages
    },
});

export const getCurrentLanguageState = selector({
    key: 'getCurrentLanguageState',
    get: ({ get }) => {
        const data = get(languageState);

        return data.currentLanguageCode
    },
});

export const getLanguageDataState = selector({
    key: 'getLanguageDataState',
    get: ({ get }) => {
        const data = get(languageState);

        return data.languagesData[data.currentLanguageCode]
    },
});

export const getDefaultLanguageDataState = selector({
    key: 'getDefaultLanguageDataState',
    get: ({ get }) => {
        const data = get(languageState);

        return data.languagesData['en']
    },
});