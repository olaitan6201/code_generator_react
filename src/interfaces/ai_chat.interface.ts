export interface AiChat {
    uid: string
    title: string
    messages?: AiChatMessage[]
    created_at: string
}

export interface AiChatMessage {
    text: string
    response: string
    created_at: string
    updated_at: string
}

