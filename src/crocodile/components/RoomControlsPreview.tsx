import { memo } from 'react';
import { roomStoreAnswerSelector, useRoomStore } from '@crocodile/crocodile.store';

export const RoomControlsPreview = memo(() => {
	const answer = useRoomStore(roomStoreAnswerSelector);

	if (!answer) return null;

	return (
		<div className={'flex flex-col gap-4 items-stretch'}>
			<p className={'text-2xl text-center'}>{answer.label}</p>
			<img
				alt={answer.label}
				src={answer.posterUrl}
				className={'rounded-xl'}
			/>
		</div>
	);
});
