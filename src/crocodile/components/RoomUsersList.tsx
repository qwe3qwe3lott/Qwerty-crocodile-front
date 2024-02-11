import { memo } from 'react';
import { roomStoreUsersSelector, useRoomStore } from '@crocodile/crocodile.store';

export const RoomUsersList = memo(() => {
	const users = useRoomStore(roomStoreUsersSelector);

	return <div className="p-4 rounded-xl bg-amber-200 max-w-96 w-full h-full">
		<ul className="grid gap-2 w-full">
			{users.map((user) => {
				return <li className="bg-white grid rounded-full py-2 px-4 w-full">
					<span className="text-2xl truncate">{user.login}</span>
				</li>;
			})}
		</ul>
	</div>;
});