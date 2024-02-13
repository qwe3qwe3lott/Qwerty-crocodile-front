import { memo } from 'react';
import { Content } from '@common/ui/Content';
import { RoomUsersList } from '@crocodile/components/RoomUsersList';
import { RoomDrawingArea } from '@crocodile/components/RoomDrawingArea';
import { RoomControlsArea } from '@crocodile/components/RoomControlsArea';
import { roomStoreOwnerIdSelector, roomStoreSelfUserIdSelector, useRoomStore } from '@crocodile/crocodile.store';
import { RoomOwnerPanel } from '@crocodile/components/RoomOwnerPanel';

export const RoomPage = memo(() => {
	const selfUserId = useRoomStore(roomStoreSelfUserIdSelector);
	const ownerId = useRoomStore(roomStoreOwnerIdSelector);

	const isOwner = selfUserId === ownerId;

	return (
		<Content className="grid grid-cols-[auto_1fr_auto] gap-8">
			<div
				className="min-w-48 max-w-96 w-full h-full flex gap-4 flex-col"
			>
				<RoomUsersList/>
				{isOwner && <RoomOwnerPanel/>}
			</div>
			<RoomDrawingArea/>
			<RoomControlsArea/>
		</Content>
	);
});