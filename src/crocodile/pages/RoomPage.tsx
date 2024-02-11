import { memo } from 'react';
import { Content } from '@ui/Content';
import { RoomUsersList } from '@crocodile/components/RoomUsersList';

export const RoomPage = memo(() => {
	return <Content className="flex">
		<RoomUsersList/>
	</Content>;
});