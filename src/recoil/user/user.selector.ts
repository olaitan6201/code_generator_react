import { selector } from "recoil";
import { userDataState } from "./user.reducer";

export const userDefaultState = {
    loggedIn: localStorage.getItem('API_TOKEN') !== null,
    user: {
        name: '',
        email: '',
        username: '',
        membership: '',
        passwordless: false,
        twoFactor: false,
        profile_photo_url: ''
    },
    token: localStorage.getItem('API_TOKEN') || '',
    roles: [],
    email_verified: localStorage.getItem('API_TOKEN') !== null,
    teams: [],
    user_current_plans: []
}

export const getUserState = selector({
    key: 'getUserState',
    get: ({ get }) => {
        const userData = get(userDataState);

        return userData.user
    },
});

export const getUserTokenState = selector({
    key: 'getUserTokenState',
    get: ({ get }) => {
        const userData = get(userDataState);

        return userData.token
    },
});

export const getUserEmailVerifiedState = selector({
    key: 'getUserEmailVerifiedState',
    get: ({ get }) => {
        const userData = get(userDataState);

        return userData.email_verified
    },
});

export const getUserRolesState = selector({
    key: 'getUserRolesState',
    get: ({ get }) => {
        const userData = get(userDataState);

        return userData.roles
    },
});

export const userLoggedInState = selector({
    key: 'userLoggedInState',
    get: ({ get }) => {
        const userData = get(userDataState);

        return userData.loggedIn
    },
});

export const userCurrentPlansState = selector({
    key: 'userCurrentPlansState',
    get: ({ get }) => {
        const userData = get(userDataState);

        return userData.user_current_plans
    },
});