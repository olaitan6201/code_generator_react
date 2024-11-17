import { atom } from 'recoil'
import { userDefaultState } from './user.selector';

export const userDataState = atom({
    key: 'UserData',
    default: userDefaultState,
});