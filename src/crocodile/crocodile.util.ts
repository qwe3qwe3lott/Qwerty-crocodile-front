import { DrawEvent } from '@crocodile/crocodile.entity';

export const optimizeDrawEvents = (events: DrawEvent[]): DrawEvent[] => {
	if (events.length === 0) return [];

	const nodes: Array<{ x: number, y: number }> = [ { x: events[0].x1, y: events[0].y1 } ];

	for (const event of events) {
		nodes.push({ x: event.x2, y: event.y2 });
	}

	return [ {
		type: 'path',
		color: events[0].color,
		width: events[0].width,
		nodes,
	} ];
};