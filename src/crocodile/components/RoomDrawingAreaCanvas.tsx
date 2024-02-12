import { memo, RefObject, useEffect, useRef } from 'react';
import { Emitter } from '@common/common.emitter';
import { DrawEvent, DrawingEvent, DrawingEventPayloadMap } from '@crocodile/crocodile.entity';

type Props = {
	width: number;
	height: number;
	className?: string;
	drawingEmitterRef: RefObject<Emitter<DrawingEvent, DrawingEventPayloadMap>>
	onDrawEvent: (event: DrawEvent) => void;
};

export const RoomDrawingAreaCanvas = memo<Props>(({ height, width, className, drawingEmitterRef, onDrawEvent }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		const resizeListener = () => {
			if (!canvasRef.current) return;

			const computedStyle = window.getComputedStyle(canvasRef.current);

			const height = Math.ceil(+computedStyle.height.substring(0, computedStyle.height.length - 2));

			canvasRef.current.style.width = `${height / Math.sqrt(2)}px`;
		};

		resizeListener();

		window.addEventListener('resize', resizeListener);

		return () => {
			window.removeEventListener('resize', resizeListener);
		};
	}, []);

	useEffect(() => {
		if (!drawingEmitterRef.current || !canvasRef.current) return;

		const ctx = canvasRef.current.getContext('2d');

		if (!ctx) return;

		const drawListener = (payload: DrawEvent) => {
			switch (payload.type) {
				case 'line':
					ctx.strokeStyle = payload.color;
					ctx.lineWidth = payload.width;
					ctx.lineCap = 'round';
					ctx.beginPath();
					ctx.moveTo(payload.x1, payload.y1);
					ctx.lineTo(payload.x2, payload.y2);
					ctx.stroke();
					break;
				case 'path':
					ctx.strokeStyle = payload.color;
					ctx.lineWidth = payload.width;
					ctx.lineCap = 'round';
					ctx.beginPath();
					payload.nodes[0] && ctx.moveTo(payload.nodes[0].x, payload.nodes[0].y);
					for (let i = 1; i < payload.nodes.length; i++) {
						ctx.lineTo(payload.nodes[i].x, payload.nodes[i].y);
					}
					ctx.stroke();
					break;
				case 'fill':
					ctx.fillStyle = payload.color;
					ctx.fillRect(0, 0, width, height);
					break;
			}
		};

		drawingEmitterRef.current.subscribe('draw', drawListener);

		return () => {
			if (!drawingEmitterRef.current || !canvasRef.current) return;

			drawingEmitterRef.current.unsubscribe('draw', drawListener);
		};
	}, [ width, height ]);

	useEffect(() => {
		if (!canvasRef.current) return;

		let lastCoordinates: { x: number, y: number } | null = null;

		const getCoordinates = (event: MouseEvent): { x: number, y: number } | null => {
			if (!canvasRef.current) return null;

			const rect = canvasRef.current.getBoundingClientRect();

			const resolutionMultiplier = rect.width / width;

			const x = Math.round(((event.clientX - rect.left) / resolutionMultiplier) * 1e2) / 1e2;
			const y = Math.round(((event.clientY - rect.top) / resolutionMultiplier) * 1e2) / 1e2;

			return { x, y };
		};

		const startDrawingListener = (event: MouseEvent) => {
			lastCoordinates = getCoordinates(event);
		};

		const finishDrawingListener = () => {
			if (!lastCoordinates) return;

			onDrawEvent({
				type: 'line',
				color: 'black',
				width: 2,
				x1: lastCoordinates.x,
				y1: lastCoordinates.y,
				x2: lastCoordinates.x,
				y2: lastCoordinates.y
			});

			lastCoordinates = null;
		};

		const drawingListener = (event: MouseEvent) => {
			if (!lastCoordinates) return;

			const coordinates = getCoordinates(event);

			if (!coordinates) return;

			onDrawEvent({
				type: 'line',
				color: 'black',
				width: 2,
				x1: lastCoordinates.x,
				y1: lastCoordinates.y,
				x2: coordinates.x,
				y2: coordinates.y
			});

			lastCoordinates = coordinates;
		};

		canvasRef.current.addEventListener('mousedown', startDrawingListener);
		canvasRef.current.addEventListener('mouseup', finishDrawingListener);
		canvasRef.current.addEventListener('mouseleave', finishDrawingListener);
		canvasRef.current.addEventListener('mousemove', drawingListener);

		return () => {
			if (!canvasRef.current) return;

			canvasRef.current.removeEventListener('mousedown', startDrawingListener);
			canvasRef.current.removeEventListener('mouseup', finishDrawingListener);
			canvasRef.current.removeEventListener('mouseleave', finishDrawingListener);
			canvasRef.current.removeEventListener('mousemove', drawingListener);
		};
	}, [ width, onDrawEvent ]);

	return <canvas style={{ imageRendering: 'pixelated' }} height={height} width={width} ref={canvasRef}
		className={`cursor-crosshair ${className ?? ''}`}/>;
});