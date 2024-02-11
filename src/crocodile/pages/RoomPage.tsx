import { memo } from 'react';
import { Content } from '@ui/Content';
import { RoomUsersList } from '@crocodile/components/RoomUsersList';
import { RoomDrawingArea } from '@crocodile/components/RoomDrawingArea';
import { RoomControlsArea } from '@crocodile/components/RoomControlsArea';

export const RoomPage = memo(() => {
	return <Content className="grid grid-cols-[auto_1fr_auto] gap-8">
		<RoomUsersList/>
		<RoomDrawingArea/>
		<RoomControlsArea/>
	</Content>;
});