export interface TextToSpeech {
    id: number
    document_title_truncated: string
    document_title: string
    description: string
    language_code: string
    media_urls?: string[]
    split: null | number
    created_at_date: string
    created_at_time: string
    date_created: string
}

export interface CodeGen {
    id: number
    date_created: string
    created_at_date: string
    created_at_time: string
    document_title: string
    document_title_truncated: string
    description: string
    result: string
    programming_language: string
}

export interface ImageGen {
    id: number
    document_title: string
    description: string
    created_at: string
    image_uid: string
    images: { url: string }[]
    image_resolution: string
    art_style?: string
    mood?: string
    variation?: number
}

export interface AutoPost {
    id: number,
    title: string,
    createdDate: string
}

export interface MediaToText {
    id: number
    document_title: string
    description: string
    media_url?: string
    language_code: string
    date_created: string
    created_at_date: string
    created_at_time: string
    document_title_truncated: string
    generated_texts?: string
}