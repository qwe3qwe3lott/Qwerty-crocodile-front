import { memo } from 'react';
import { roomStoreOwnerIdSelector, roomStoreUsersSelector, useRoomStore } from '@crocodile/crocodile.store';

export const RoomUsersList = memo(() => {
	const users = useRoomStore(roomStoreUsersSelector);
	const ownerId = useRoomStore(roomStoreOwnerIdSelector);

	return <div className="p-4 rounded-xl bg-amber-200 max-w-96 w-full h-full">
		<ul className="grid gap-2 w-full">
			{users.map((user) => {
				return <li className="bg-white grid rounded-full py-2 px-4 w-full grid-cols-[1fr_min-content]">
					<span className="text-2xl truncate">{user.login}</span>
					{user.id === ownerId && <span className="place-self-center">👑</span>}
				</li>;
			})}
		</ul>
	</div>;
});