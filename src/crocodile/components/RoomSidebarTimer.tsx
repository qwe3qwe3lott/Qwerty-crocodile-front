import { memo, useLayoutEffect, useRef, useState } from 'react';
import { TimerState } from '@crocodile/crocodile.entity';

type Props = {
	timerState: TimerState
};

const Timer = memo<Props>(({ timerState }) => {
	const progressRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!progressRef.current) return;

		const timeDifference = new Date().getTime() - (timerState.startTime);

		let startPercent = timeDifference / timerState.duration * 100;

		startPercent = Math.min(100, Math.floor(startPercent));

		progressRef.current.style.width = `${startPercent}%`;

		const leftDuration = (100 - startPercent) / 100 * timerState.duration;

		progressRef.current.style.transition = `all ${leftDuration}ms linear`;

		const timeout = setTimeout(() => {
			if (!progressRef.current) return;

			progressRef.current.style.width = '100%';
		}, 100);

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	return (
		<div className="bg-white h-6 w-full rounded-full overflow-hidden">
			<div
				ref={progressRef}
				className="bg-green-600 h-full"
			/>
		</div>
	);
});

export const RoomSidebarTimer = memo<Props>(({ timerState }) => {
	const [ key, setKey ] = useState(new Date().getTime());

	useLayoutEffect(() => {
		const listener = () => {
			setKey(new Date().getTime());
		};

		window.addEventListener('focus', listener);

		return () => {
			window.removeEventListener('focus', listener);
		};
	}, []);

	return (
		<Timer
			key={key}
			timerState={timerState}
		/>
	);
});