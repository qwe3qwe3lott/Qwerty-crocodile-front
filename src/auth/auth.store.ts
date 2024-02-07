import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export type AuthStore = {
    login: string
    setLogin: (login: string) => void
}

export const useAuthStore = create<AuthStore>()(persist((set) => ({
	login: '',
	setLogin: (login) => set({login})
}), {name: 'authStore'}));

export const authStoreLoginSelector = (state: AuthStore) => state.login;