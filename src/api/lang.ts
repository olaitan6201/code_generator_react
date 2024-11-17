import English from '@/lang/en.json';
// import { customRequest } from './api';

// const token = localStorage.getItem('API_TOKEN') || ''

// export const getLanguages = async () => {
//     return await customRequest({ path: 'languages', method: 'get' })
// }

// export const getLanguageData = async () => {
//     return await customRequest({ path: 'language/data', method: 'get' })
// }

export const langTrans = (txtKey: string = '') => {
    const langCode = localStorage.getItem('APP_LOCALE') || 'en'
    const languagesData = JSON.parse(localStorage.getItem('LANGUAGES_DATA') || JSON.stringify({ en: English }))
    if (!languagesData) return txtKey
    const currentLanguageData = languagesData[langCode] || {}
    const defaultLanguageData = languagesData['en'] || {}

    return langCode === 'en' ? defaultLanguageData[txtKey] || txtKey : currentLanguageData[defaultLanguageData[txtKey]] || defaultLanguageData[txtKey] || txtKey
}