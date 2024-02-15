import { memo, useCallback, useEffect, useRef } from 'react';
import { RoomDrawingAreaCanvas } from '@crocodile/components/RoomDrawingAreaCanvas';
import { Emitter } from '@common/common.emitter';
import { DrawEvent, DrawingEvent, DrawingEventPayloadMap } from '@crocodile/crocodile.entity';
import {
	roomStoreArtistIdSelector,
	roomStoreClearDrawEventsSelector,
	roomStoreDrawEventsSelector,
	roomStoreSelfUserIdSelector,
	roomStoreStateSelector,
	useRoomStore
} from '@crocodile/crocodile.store';
import { throttle } from '@common/common.util';
import { socket } from '@crocodile/crocodile.api';
import { RoomDrawingAreaTools } from '@crocodile/components/RoomDrawingAreaTools';

const WIDTH = 100;
const HEIGHT = 141;

export const RoomDrawingArea = memo(() => {
	const drawingEmitterRef = useRef(new Emitter<DrawingEvent, DrawingEventPayloadMap>());
	const drawEventsToSend = useRef<DrawEvent[]>([]);

	const drawEvents = useRoomStore(roomStoreDrawEventsSelector);
	const clearDrawEvents = useRoomStore(roomStoreClearDrawEventsSelector);
	const selfUserId = useRoomStore(roomStoreSelfUserIdSelector);
	const state = useRoomStore(roomStoreStateSelector);
	const artistId = useRoomStore(roomStoreArtistIdSelector);

	const isArtist = selfUserId === artistId;
	const isRound = state === 'round';
	const isIdle = state === 'idle';

	const isAbleToDraw = (isArtist && isRound) || isIdle;

	const sendDrawEvents = useCallback(throttle(async () => {
		if (!drawEventsToSend.current) return;

		const drawEvents = drawEventsToSend.current;

		drawEventsToSend.current = [];

		await socket.emitWithAck('draw', drawEvents);
	}, 100), []);

	const handleDrawEvent = useCallback((event: DrawEvent) => {
		drawingEmitterRef.current?.emit('draw', event);
		if (isIdle) return;
		drawEventsToSend.current?.push(event);
		sendDrawEvents();
	}, [ sendDrawEvents, isIdle ]);

	useEffect(() => {
		if (drawEvents.length) clearDrawEvents();

		for (const drawEvent of drawEvents) {
			drawingEmitterRef.current?.emit('draw', drawEvent);
		}
	}, [ drawEvents, clearDrawEvents ]);

	return (
		<div className="grid justify-items-center">
			<div className="flex gap-4">
				<RoomDrawingAreaCanvas
					width={WIDTH}
					height={HEIGHT}
					className="h-full"
					drawingEmitterRef={drawingEmitterRef}
					onDrawEvent={handleDrawEvent}
					isAbleToDraw={isAbleToDraw}
				/>
				{isAbleToDraw && <RoomDrawingAreaTools/>}
			</div>
		</div>
	);
});