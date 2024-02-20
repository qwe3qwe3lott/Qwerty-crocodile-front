import { memo, useMemo } from 'react';
import {
	roomStoreArtistIdSelector,
	roomStoreOwnerIdSelector,
	roomStorePlayersSelector,
	roomStoreStateSelector,
	roomStoreUsersSelector,
	useRoomStore,
} from '@crocodile/crocodile.store';
import { ProfileIcon } from '@common/ui/ProfileIcon';

type UserView = {
	id: string;
	login: string;
	isDisconnected?: true;
	isOwner?: true;
	isArtist?: true;
};

export const RoomSidebarUsersList = memo(() => {
	const users = useRoomStore(roomStoreUsersSelector);
	const players = useRoomStore(roomStorePlayersSelector);
	const ownerId = useRoomStore(roomStoreOwnerIdSelector);
	const artistId = useRoomStore(roomStoreArtistIdSelector);
	const state = useRoomStore(roomStoreStateSelector);

	const userViews = useMemo<UserView[]>(() => {
		const userViews: UserView[] = [];

		switch (state) {
			case 'idle': {
				for (const user of users) {
					const userView: UserView = { id: user.id, login: user.login };
					if (user.id === ownerId) userView.isOwner = true;
					userViews.push(userView);
				}
				break;
			}
			case 'round':
			case 'timeout': {
				for (const player of players) {
					const user = users.find((user) => user.id === player.id);
					const userView: UserView = { id: player.id, login: player.login };
					if (player.id === ownerId) userView.isOwner = true;
					if (player.id === artistId) userView.isArtist = true;
					if (!user) userView.isDisconnected = true;
					userViews.push(userView);
				}
				for (const user of users) {
					if (userViews.some((userView) => userView.id === user.id)) continue;

					const userView: UserView = { id: user.id, login: user.login };
					if (user.id === ownerId) userView.isOwner = true;
					userViews.push(userView);
				}
				break;
			}
		}

		return userViews;
	}, [ users, players, ownerId, artistId, state ]);

	return (
		<ul className={'flex flex-col gap-2 w-full'}>
			{userViews.map((userView) => {
				return (
					<li
						key={userView.id}
						className={`bg-white flex rounded-full py-2 px-4 w-full h-12 gap-2 items-center ${userView.isDisconnected ? 'opacity-50' : ''}`}
					>
						<ProfileIcon
							className={'min-h-12 min-w-12 max-h-12 max-w-12 -mt-2 -mb-2 -ml-4 p-1 rounded-full border-amber-700 border-2 border-solid'}
						/>
						<span className={'text-2xl truncate'}>{userView.login}</span>
						{userView.isOwner && <span className={'place-self-center'}>{'👑'}</span>}
						{userView.isArtist && state === 'round' && <span className={'place-self-center'}>{'✎'}</span>}
					</li>
				);
			})}
		</ul>
	);
});
