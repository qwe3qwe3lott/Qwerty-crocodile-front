import { create } from 'zustand';
import {
	Answer,
	AnswerAdapter,
	DrawEvent,
	Player,
	RoomState,
	StateTransaction,
	TimerState,
	User,
} from '@crocodile/crocodile.entity';
import { devtools } from 'zustand/middleware';
import { ShikimoriAnswerAdapter } from '@crocodile/adapters/ShikimoriAnswerAdapter';

type RoomStoreState = {
	users: User[];
	players: Player[];
	selfUserId: string;
	ownerId: string;
	artistId: string;
	drawEvents: DrawEvent[];
	state: RoomState;
	timerState: TimerState | null;
	answer: Answer | null;
	answerAdapter: AnswerAdapter;
};

const generateRoomStoreInitialState = (): RoomStoreState => ({
	users: [],
	players: [],
	selfUserId: '',
	ownerId: '',
	artistId: '',
	drawEvents: [ { type: 'fill', color: 'white' } ],
	state: 'idle',
	timerState: null,
	answer: null,
	answerAdapter: new ShikimoriAnswerAdapter(),
});

type RoomStoreActions = {
	setUsers: (users: User[]) => void;
	setPlayers: (players: Player[]) => void;
	setSelfUserId: (selfUserId: string) => void;
	setOwnerId: (ownerId: string) => void;
	setArtistId: (artistId: string) => void;
	pushDrawEvents: (drawEvents: DrawEvent[]) => void;
	clearDrawEvents: () => void;
	setState: (state: RoomState) => void;
	setTimerState: (timerState: TimerState | null) => void;
	setAnswer: (answer: Answer | null) => void;
	applyStateTransaction: (transaction: StateTransaction) => void;
	reset: () => void;
};

type RoomStore = RoomStoreState & RoomStoreActions;

export const useRoomStore = create<RoomStore>()(devtools((set, get) => ({
	...generateRoomStoreInitialState(),
	setUsers: (users) => set({ users }),
	setPlayers: (players) => set({ players }),
	setSelfUserId: (selfUserId) => set({ selfUserId }),
	setOwnerId: (ownerId) => set({ ownerId }),
	setArtistId: (artistId) => set({ artistId }),
	pushDrawEvents: (drawEvents) => set({ drawEvents: [ ...get().drawEvents, ...drawEvents ] }),
	clearDrawEvents: () => set({ drawEvents: [] }),
	setState: (state) => set({ state }),
	setTimerState: (timerState) => set({ timerState }),
	setAnswer: (answer) => set({ answer }),
	applyStateTransaction: (transaction) => {
		switch (transaction.state) {
			case 'idle': {
				set({ state: transaction.state, players: [], artistId: '', timerState: null, answer: null });
				break;
			}
			case 'round': {
				set({
					state: transaction.state,
					players: transaction.players,
					artistId: transaction.artistId,
					timerState: transaction.timerState,
					answer: transaction.answer,
				});
				break;
			}
			case 'timeout': {
				set({ state: transaction.state, timerState: transaction.timerState, answer: transaction.answer });
				break;
			}
		}
	},
	reset: () => set(generateRoomStoreInitialState()),
})));

export const roomStoreUsersSelector = (state: RoomStore) => state.users;
export const roomStorePlayersSelector = (state: RoomStore) => state.players;
export const roomStoreSelfUserIdSelector = (state: RoomStore) => state.selfUserId;
export const roomStoreOwnerIdSelector = (state: RoomStore) => state.ownerId;
export const roomStoreArtistIdSelector = (state: RoomStore) => state.artistId;
export const roomStoreDrawEventsSelector = (state: RoomStore) => state.drawEvents;
export const roomStoreStateSelector = (state: RoomStore) => state.state;
export const roomStoreClearDrawEventsSelector = (state: RoomStore) => state.clearDrawEvents;
export const roomStoreTimerStateSelector = (state: RoomStore) => state.timerState;
export const roomStoreAnswerSelector = (state: RoomStore) => state.answer;
export const roomStoreAnswerAdapterSelector = (state: RoomStore) => state.answerAdapter;

type DrawAreaStoreState = {
	color: string;
};

const generateDrawAreaStoreInitialState = (): DrawAreaStoreState => ({
	color: 'black',
});

type DrawAreaStoreActions = {
	setColor: (color: string) => void
	reset: () => void
};

type DrawAreaStore = DrawAreaStoreState & DrawAreaStoreActions;

export const useDrawAreaStore = create<DrawAreaStore>()((set) => ({
	...generateDrawAreaStoreInitialState(),
	setColor: (color) => set({ color }),
	reset: () => set(generateDrawAreaStoreInitialState()),
}));
