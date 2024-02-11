import { create } from 'zustand';
import { User } from '@crocodile/crocodile.entity';

type RoomStoreState = {
	users: User[];
	selfUserId: string;
	ownerId: string;
};

const initialState: RoomStoreState = {
	selfUserId: '',
	users: [],
	ownerId: '',
};

type RoomStoreActions = {
	setUsers: (users: User[]) => void;
	setSelfUserId: (selfUserId: string) => void;
	setOwnerId: (ownerId: string) => void;
	reset: () => void;
};

type RoomStore = RoomStoreState & RoomStoreActions;

export const useRoomStore = create<RoomStore>()((set) => ({
	...initialState,
	setSelfUserId: (selfUserId) => set({ selfUserId }),
	setUsers: (users) => set({ users }),
	setOwnerId: (ownerId) => set({ ownerId }),
	reset: () => set(initialState)
}));

export const roomStoreUsersSelector = (state: RoomStoreState) => state.users;
export const roomStoreSelfUserIdSelector = (state: RoomStoreState) => state.selfUserId;
export const roomStoreOwnerIdSelector = (state: RoomStoreState) => state.ownerId;