import { memo } from 'react';
import { Content } from '@common/ui/Content';
import { RoomDrawingArea } from '@crocodile/components/RoomDrawingArea';
import { RoomControls } from '@crocodile/components/RoomControls';
import { roomStoreOwnerIdSelector, roomStoreSelfUserIdSelector, useRoomStore } from '@crocodile/crocodile.store';
import { RoomOwnerPanel } from '@crocodile/components/RoomOwnerPanel';
import { RoomSidebar } from '@crocodile/components/RoomSidebar';

export const RoomPage = memo(() => {
	const selfUserId = useRoomStore(roomStoreSelfUserIdSelector);
	const ownerId = useRoomStore(roomStoreOwnerIdSelector);

	const isOwner = selfUserId === ownerId;

	return (
		<Content className="flex gap-8 justify-between">
			<div
				className="min-w-48 max-w-72 w-full h-full flex gap-4 flex-col"
			>
				<RoomSidebar/>
				{isOwner && <RoomOwnerPanel/>}
			</div>
			<RoomDrawingArea/>
			<RoomControls/>
		</Content>
	);
});