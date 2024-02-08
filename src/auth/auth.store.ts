import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthStore = {
	login: string
	setLogin: (login: string) => void
	roomUserIdsMap: Record<string, string>
	setRoomUserId: (roomId: string, userId: string) => void
};

export const useAuthStore = create<AuthStore>()(persist((set, get) => ({
	login: '',
	setLogin: (login) => set({ login }),
	roomUserIdsMap: {},
	setRoomUserId: (roomId, userId) => set({ roomUserIdsMap: { ...get().roomUserIdsMap }, [roomId]: userId })
}), { name: 'authStore' }));

export const authStoreLoginSelector = (state: AuthStore) => state.login;