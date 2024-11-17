export interface ContentCategory {
    id: number
    name: string
    activated: number
}

export interface ContentTemplate {
    id: number
    name: string
    slug: string
    category?: ContentCategory
    isFavorite: boolean
    description: string
    instruction: string
    parameters: { type: string, label: string, placeholder: string }[]
    other_parameters: string[]
    icon: string
    activated: number
}

export interface ContentGenerator {
    id: number
    document_title: string
    document_title_truncated: string
    result?: string
    description?: string
    created_at: string
    template?: ContentTemplate
    tone?: string
    variation?: number
    quality?: string
    max_words?: number
    language?: string
}