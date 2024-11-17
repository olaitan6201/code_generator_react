import { UserPlan } from "./plans.interface"
import { Team } from "./team.interface"

export interface User {
    name: string
    email: string
    username: string
    membership: string
    passwordless: boolean
    twoFactor: boolean
    profile_photo_url: string
}

export interface UserDataInterface {
    loggedIn: boolean
    user: User
    token: string
    roles: Array<string>
    email_verified: boolean
    teams: Team[]
    user_current_plans: UserPlan[]
}

export interface AccountType {
    id: number
    name: string
}

export interface Account {
    id: number
    title: string
    url: string
    type: AccountType
    connected: boolean
}