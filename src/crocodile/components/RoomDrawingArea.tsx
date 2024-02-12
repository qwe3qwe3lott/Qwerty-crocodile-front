import { memo, useCallback, useEffect, useRef } from 'react';
import { RoomDrawingAreaCanvas } from '@crocodile/components/RoomDrawingAreaCanvas';
import { Emitter } from '@common/common.emitter';
import { DrawEvent, DrawingEvent, DrawingEventPayloadMap } from '@crocodile/crocodile.entity';
import { roomStoreClearDrawEventsSelector, roomStoreDrawEventsSelector, useRoomStore } from '@crocodile/crocodile.store';
import { throttle } from '@common/common.util';
import { socket } from '@crocodile/crocodile.api';
import { optimizeDrawEvents } from '@crocodile/crocodile.util';

const WIDTH = 100;
const HEIGHT = 141;

export const RoomDrawingArea = memo(() => {
	const drawingEmitterRef = useRef(new Emitter<DrawingEvent, DrawingEventPayloadMap>());
	const drawEventsToSend = useRef<DrawEvent[]>([]);

	const drawEvents = useRoomStore(roomStoreDrawEventsSelector);
	const clearDrawEvents = useRoomStore(roomStoreClearDrawEventsSelector);

	const sendDrawEvents = useCallback(throttle(async () => {
		if (!drawEventsToSend.current) return;

		const drawEvents = drawEventsToSend.current;

		drawEventsToSend.current = [];

		await socket.emitWithAck('draw', optimizeDrawEvents(drawEvents));
	}, 300), []);

	const handleDrawEvent = useCallback((event: DrawEvent) => {
		drawingEmitterRef.current?.emit('draw', event);
		drawEventsToSend.current?.push(event);
		sendDrawEvents();
	}, [ sendDrawEvents ]);

	useEffect(() => {
		if (drawEvents.length) clearDrawEvents();

		for (const drawEvent of drawEvents) {
			drawingEmitterRef.current?.emit('draw', drawEvent);
		}
	}, [ drawEvents, clearDrawEvents ]);

	return <div className="grid justify-items-center">
		<div className="grid grid-cols-[1fr_min-content] gap-4">
			<RoomDrawingAreaCanvas width={WIDTH} height={HEIGHT} className="h-full"
				drawingEmitterRef={drawingEmitterRef} onDrawEvent={handleDrawEvent}/>
			{/*<div>*/}
			{/*	<button className="h-8 w-8 bg-amber-200">✐</button>*/}
			{/*</div>*/}
		</div>
	</div>;
});