import { memo, useCallback } from 'react';
import { IconButton } from '@common/ui/IconButton';
import { roomStoreStateSelector, roomStoreUsersSelector, useRoomStore } from '@crocodile/crocodile.store';
import { socket } from '@crocodile/crocodile.api';
import { PlayButton } from '@common/ui/PlayButton';
import { StopIcon } from '@common/ui/StopIcon';

export const RoomOwnerPanel = memo(() => {
	const state = useRoomStore(roomStoreStateSelector);
	const users = useRoomStore(roomStoreUsersSelector);

	const handleStartClick = useCallback(async () => {
		await socket.emitWithAck('start', null);
	}, []);

	const isAbleToStart = state === 'idle' && users.length >= 2;

	const handleStopClick = useCallback(async () => {
		await socket.emitWithAck('stop', null);
	}, []);

	const isAbleToStop = state !== 'idle';

	return (
		<div className="p-2 rounded-xl bg-amber-200 flex justify-center gap-2">
			<IconButton
				Icon={PlayButton}
				disabled={!isAbleToStart}
				onClick={handleStartClick}
			/>
			<IconButton
				Icon={StopIcon}
				disabled={!isAbleToStop}
				onClick={handleStopClick}
			/>
		</div>
	);
});