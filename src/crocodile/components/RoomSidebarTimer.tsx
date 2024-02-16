import { memo, useEffect, useRef } from 'react';
import { TimerState } from '@crocodile/crocodile.entity';

type Props = {
	timerState: TimerState
};

export const RoomSidebarTimer = memo<Props>(({ timerState }) => {
	const progressRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!progressRef.current) return;

		const timeDifference = new Date().getTime() - (timerState.startTime);

		let startPercent = timeDifference / timerState.duration * 100;

		startPercent = Math.min(100, Math.floor(startPercent));

		progressRef.current.style.width = `${startPercent}%`;

		const leftDuration = (100 - startPercent) / 100 * timerState.duration;

		progressRef.current.style.transition = `all ${leftDuration}ms linear`;

		setTimeout(() => {
			if (!progressRef.current) return;

			progressRef.current.style.width = '100%';
		}, 100);
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