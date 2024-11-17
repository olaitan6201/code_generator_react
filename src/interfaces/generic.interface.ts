export interface History {
    id: number,
    document: string,
    templateName: string,
    createdTime: string
}

export interface ListItem {
    title: string,
    value: string | number | boolean
}

export interface UserHistory {
    id: number
    email: string
    user_type: string
    plan_type: string
    plan_expiry: string
    last_signed_in: string
    registration_date: string
    active: boolean
}

export interface AdminHistory {
    id: number
    email: string
    authority: string
    last_signed_in: string
    registration_date: string,
    active: boolean
}