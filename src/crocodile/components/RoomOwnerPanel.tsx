import { memo, useCallback } from 'react';
import { IconButton } from '@common/ui/IconButton';
import { roomStoreStateSelector, roomStoreUsersSelector, useRoomStore } from '@crocodile/crocodile.store';
import { socket } from '@crocodile/crocodile.api';
import { PlayButton } from '@common/ui/PlayButton';

export const RoomOwnerPanel = memo(() => {
	const state = useRoomStore(roomStoreStateSelector);
	const users = useRoomStore(roomStoreUsersSelector);

	const handleStartClick = useCallback(async () => {
		await socket.emitWithAck('start', null);
	}, []);

	const isAbleToStart = state === 'idle' && users.length >= 2;

	return (
		<div className="p-2 rounded-xl bg-amber-200 grid gap-2 place-items-center">
			<IconButton
				Icon={PlayButton}
				disabled={!isAbleToStart}
				onClick={handleStartClick}
			/>
		</div>
	);
});