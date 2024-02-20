import { memo } from 'react';
import { RoomSidebarUsersList } from '@crocodile/components/RoomSidebarUsersList';
import { RoomSidebarTimer } from '@crocodile/components/RoomSidebarTimer';
import { roomStoreStateSelector, roomStoreTimerStateSelector, useRoomStore } from '@crocodile/crocodile.store';

export const RoomSidebar = memo(() => {
	const timerState = useRoomStore(roomStoreTimerStateSelector);
	const state = useRoomStore(roomStoreStateSelector);

	return (
		<div className={'p-4 rounded-xl bg-amber-200 h-full flex flex-col gap-4 w-full'}>
			{!!timerState && (
				<RoomSidebarTimer
					key={state}
					timerState={timerState}
				/>
			)}
			<RoomSidebarUsersList/>
		</div>
	);
});
