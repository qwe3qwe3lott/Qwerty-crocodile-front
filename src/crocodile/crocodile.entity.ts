export type RoomCreatingFormState = Record<string, never>;

export type User = {
	id: string;
	login: string;
};

export type Player = {
	id: string;
	login: string;
};

export type RoomState = 'idle' | 'round' | 'timeout';

export type StateTransaction =
	{ state: 'idle' } |
	{ state: 'round', timerState: TimerState | null, players: Player[], artistId: string } |
	{ state: 'timeout', timerState: TimerState | null };

export type DrawEvent =
	{ type: 'line', color: string, width: number, x1: number, y1: number, x2: number, y2: number }
	| { type: 'fill', color: string }
	| { type: 'path', color: string, width: number, nodes: Array<{ x: number, y: number }> }
	| { type: 'image', data: ArrayBuffer, x: number, y: number, width: number, height: number };

export type DrawingEventPayloadMap = {
	draw: DrawEvent
};

export type DrawingEvent = keyof DrawingEventPayloadMap;

export type TimerState = {
	startTime: number;
	duration: number;
};

export type AnswerAdapterOption = {
	name: string;
	value: string;
};

export interface AnswerAdapter {
	fetchOptions(text: string): Promise<AnswerAdapterOption[]>;
}