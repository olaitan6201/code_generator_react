import { atom } from 'recoil'
import English from '@/lang/en.json';

const langCode = localStorage.getItem('APP_LOCALE') || 'en'
const defaultLanguages = JSON.parse(localStorage.getItem('DEFAULT_LANGUAGES') || JSON.stringify([{ name: 'English', code: 'en' }]))

export const languageState = atom({
    key: 'LanguageData',
    default: {
        languagesData: Object.create({
            ...JSON.parse(localStorage.getItem('LANGUAGES_DATA') || JSON.stringify({'en': English}))
        }),
        currentLanguageCode: langCode,
        languages: defaultLanguages,
    },
});