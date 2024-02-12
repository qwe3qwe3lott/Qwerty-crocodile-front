import { create } from 'zustand';
import { DrawEvent, User } from '@crocodile/crocodile.entity';

type RoomStoreState = {
	users: User[];
	selfUserId: string;
	ownerId: string;
	drawEvents: DrawEvent[]
};

const initialState: RoomStoreState = {
	selfUserId: '',
	users: [],
	ownerId: '',
	drawEvents: [ { type: 'fill', color: 'white' } ]
};

type RoomStoreActions = {
	setUsers: (users: User[]) => void;
	setSelfUserId: (selfUserId: string) => void;
	setOwnerId: (ownerId: string) => void;
	pushDrawEvents: (drawEvents: DrawEvent[]) => void;
	clearDrawEvents: () => void;
	reset: () => void;
};

type RoomStore = RoomStoreState & RoomStoreActions;

export const useRoomStore = create<RoomStore>()((set, get) => ({
	...initialState,
	setSelfUserId: (selfUserId) => set({ selfUserId }),
	setUsers: (users) => set({ users }),
	setOwnerId: (ownerId) => set({ ownerId }),
	pushDrawEvents: (drawEvents) => set({ drawEvents: [ ...get().drawEvents, ...drawEvents ] }),
	clearDrawEvents: () => set({ drawEvents: [] }),
	reset: () => set(initialState)
}));

export const roomStoreUsersSelector = (state: RoomStore) => state.users;
export const roomStoreSelfUserIdSelector = (state: RoomStore) => state.selfUserId;
export const roomStoreOwnerIdSelector = (state: RoomStore) => state.ownerId;
export const roomStoreDrawEventsSelector = (state: RoomStore) => state.drawEvents;
export const roomStoreClearDrawEventsSelector = (state: RoomStore) => state.clearDrawEvents;
