export type RoomCreatingFormState = Record<string, never>;

export type User = {
	id: string;
	login: string;
};

export type DrawEvent =
    { type: 'line', color: string, width: number, x1: number, y1: number, x2: number, y2: number }
    | { type: 'fill', color: string };

export type DrawingEventPayloadMap = {
	draw: DrawEvent
};

export type DrawingEvent = keyof DrawingEventPayloadMap;