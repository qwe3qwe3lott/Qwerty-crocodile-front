import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type AuthStoreState = {
	login: string
	roomUserIdsMap: Record<string, string | undefined>
};

type AuthStoreActions = {
	setLogin: (login: string) => void
	setRoomUserId: (roomId: string, userId: string) => void
};

type AuthStore = AuthStoreState & AuthStoreActions;

export const useAuthStore = create<AuthStore>()(devtools(persist((set, get) => ({
	login: '',
	setLogin: (login) => set({ login }),
	roomUserIdsMap: {},
	setRoomUserId: (roomId, userId) => set({ roomUserIdsMap: { ...get().roomUserIdsMap, [roomId]: userId } })
}), { name: 'authStore' })));

export const authStoreLoginSelector = (state: AuthStore) => state.login;