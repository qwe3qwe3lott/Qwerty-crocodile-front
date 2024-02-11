import { memo, useEffect, useRef } from 'react';

const WIDTH = 100;
const HEIGHT = 141;

export const RoomDrawingArea = memo(() => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!canvasRef.current || !buttonRef.current) return;

		const ctx = canvasRef.current.getContext('2d');

		if (!ctx) return;

		const resizeListener = () => {
			if (!canvasRef.current) return;

			const computedStyle = window.getComputedStyle(canvasRef.current);

			console.log(computedStyle.height);

			const height = Math.ceil(+computedStyle.height.substring(0, computedStyle.height.length - 2));

			canvasRef.current.style.width = `${height / Math.sqrt(2)}px`;
		};

		resizeListener();

		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.fillStyle = 'black';

		ctx.lineWidth = 2;
		ctx.lineCap = 'round';

		window.addEventListener('resize', resizeListener);

		let isDrawing = false;

		const startDrawingListener = () => {
			isDrawing = true;
		};

		canvasRef.current.addEventListener('mousedown', startDrawingListener);

		const finishDrawingListener = () => {
			isDrawing = false;
			ctx.beginPath();
		};

		canvasRef.current.addEventListener('mouseup', finishDrawingListener);
		canvasRef.current.addEventListener('mouseleave', finishDrawingListener);

		const drawingListener = (event: MouseEvent) => {
			if (!canvasRef.current || !isDrawing) return;

			const rect = canvasRef.current.getBoundingClientRect();

			const resolutionMultiplier = rect.width / WIDTH;

			const x = (event.clientX - rect.left) / resolutionMultiplier;
			const y = (event.clientY - rect.top) / resolutionMultiplier;

			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(x, y);
		};

		canvasRef.current.addEventListener('mousemove', drawingListener);

		const buttonListener = () => {
			ctx.strokeStyle = ctx.strokeStyle === '#000000' ? 'white' : 'black';
		};

		buttonRef.current.addEventListener('click', buttonListener);

		return () => {
			if (!canvasRef.current || !buttonRef.current) return;

			window.removeEventListener('resize', resizeListener);

			canvasRef.current.removeEventListener('mousedown', startDrawingListener);
			canvasRef.current.removeEventListener('mouseup', finishDrawingListener);
			canvasRef.current.removeEventListener('mouseleave', finishDrawingListener);
			canvasRef.current.removeEventListener('mousemove', drawingListener);

			buttonRef.current.removeEventListener('click', buttonListener);
		};
	}, []);

	return <div className="grid justify-items-center">
		<div className="grid grid-cols-[1fr_min-content] gap-4">
			<canvas style={{ imageRendering: 'pixelated' }} width={WIDTH} height={HEIGHT}
				onContextMenu={(event) => event.preventDefault()} ref={canvasRef}
				className="h-full cursor-crosshair"/>
			<div>
				<button ref={buttonRef} className="h-8 w-8 bg-amber-200">✐</button>
			</div>
		</div>
	</div>;
});