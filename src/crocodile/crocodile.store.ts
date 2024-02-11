import { create } from 'zustand';
import { User } from '@crocodile/crocodile.entity';

type RoomStoreState = {
	users: User[];
	selfUserId: string;
};

const initialState: RoomStoreState = {
	selfUserId: '',
	users: [],
};

type RoomStoreActions = {
	setUsers: (users: User[]) => void;
	setSelfUserId: (selfUserId: string) => void;
	reset: () => void;
};

type RoomStore = RoomStoreState & RoomStoreActions;

export const useRoomStore = create<RoomStore>()((set) => ({
	...initialState,
	setSelfUserId: (selfUserId) => set({ selfUserId }),
	setUsers: (users) => set({ users }),
	reset: () => set(initialState)
}));

export const roomStoreUsersSelector = (state: RoomStoreState) => state.users;
export const roomStoreSelfUserIdSelector = (state: RoomStoreState) => state.selfUserId;