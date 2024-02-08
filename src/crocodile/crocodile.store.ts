import { create } from 'zustand';
import { User } from '@crocodile/crocodile.entity';

type RoomStoreState = {
	users: User[];
	setUsers: (users: User[]) => void;
};

export const useRoomStore = create<RoomStoreState>()((set) => ({
	users: [],
	setUsers: (users) => set({ users })
}));