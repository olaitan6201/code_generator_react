export interface Team {
    id: number
    name: string
    isAuthor: boolean
    members?: TeamMember[]
    pending_invites?: Invite[]
    user?: TeamUser
}

export interface TeamUser {
    name: string
    email: string
    profile_photo_url: string
}

export interface TeamMember {
    id: number
    email: string
    team_role: string
    profile_photo_url: string
}

export interface Invite {
    id: number
    email: string
}