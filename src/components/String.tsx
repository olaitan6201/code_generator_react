import { TitleCase } from '@/api/custom_functions'
import { getCurrentLanguageState, getDefaultLanguageDataState, getLanguageDataState } from '../recoil/lang/lang.selector'
import { useRecoilValue } from 'recoil'

export default function String({ txtKey = '' }: { txtKey: string }) {
    const langCode = useRecoilValue(getCurrentLanguageState)
    const currentLanguageData = useRecoilValue(getLanguageDataState)
    const defaultLanguageData = useRecoilValue(getDefaultLanguageDataState)

    const data = langCode === 'en' ? defaultLanguageData[txtKey] || '' : currentLanguageData[defaultLanguageData[txtKey]] || defaultLanguageData[txtKey] || '';

    return data || TitleCase(txtKey)
}
