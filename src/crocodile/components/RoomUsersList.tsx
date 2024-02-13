import { memo } from 'react';
import { roomStoreOwnerIdSelector, roomStoreUsersSelector, useRoomStore } from '@crocodile/crocodile.store';
import { ProfileIcon } from '@common/ui/ProfileIcon';

export const RoomUsersList = memo(() => {
	const users = useRoomStore(roomStoreUsersSelector);
	const ownerId = useRoomStore(roomStoreOwnerIdSelector);

	return <div className="p-4 rounded-xl bg-amber-200 min-w-48 max-w-96 w-full h-full">
		<ul className="grid gap-2 w-full">
			{users.map((user) => {
				return <li key={user.id}
					className="bg-white grid rounded-full py-2 px-4 w-full h-12 grid-cols-[min-content_1fr_min-content] gap-2 items-center">
					<ProfileIcon className="h-12 w-12 -mt-2 -mb-2 -ml-4 p-1 rounded-full border-amber-700 border-2 border-solid"/>
					<span className="text-2xl truncate">{user.login}</span>
					{user.id === ownerId && <span className="place-self-center">👑</span>}
				</li>;
			})}
		</ul>
	</div>;
});