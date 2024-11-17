export interface Plan {
    id: number
    name: string
    slug: string
    plan_type: string
    discount_percentage: number
}

export interface PaymentPlan {
    id: number
    name: string
    tag: string
    amount: number
    has_free_trial: boolean
    free_trial_days: number
    display_amount: string
    description: string
    number_of_automate_posts: string
    number_of_words: string
    number_of_ai_images: string
    number_of_media_to_texts: string
    number_of_text_to_speeches: string
    plan?: Plan
}

export interface UserPlan {
    payment_plan_id: string | number
    payment_type: string
    automate_posts_count: number
    words_count: number
    ai_images_count: number
    media_to_texts_count: number
    text_to_speeches_count: number
    expiry_date: string
}

export interface Payment {
    amount: string | number
    description: string
    payment_mode: string
    transaction_uid: string
    transaction_reference: string
    status: string
}