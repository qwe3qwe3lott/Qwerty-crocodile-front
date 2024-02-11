import { memo, useEffect } from 'react';
import { RoomPage } from '@crocodile/pages/RoomPage';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '@auth/auth.store';
import { socket } from '@crocodile/crocodile.api';
import { roomStoreSelfUserIdSelector, useRoomStore } from '@crocodile/crocodile.store';
import { User } from '@crocodile/crocodile.entity';

export const RoomScreen = memo(() => {
	const { roomId } = useParams<{ roomId: string }>();

	if (!roomId) throw new Error();

	const selfUserId = useRoomStore(roomStoreSelfUserIdSelector);

	useEffect(() => {
		const roomState = useRoomStore.getState();

		roomState.reset();

		const listenUsers = (users: User[]) => {
			roomState.setUsers(users);
		};

		(async () => {
			const authState = useAuthStore.getState();
			const login = authState.login;
			const userId = authState.roomUserIdsMap[roomId];

			const response = await socket.emitWithAck('joinRoom', { login, roomId, userId });

			if (response._status === 'ERROR') throw new Error();

			authState.setRoomUserId(roomId, response.userId);

			roomState.setSelfUserId(response.userId);
			roomState.setUsers(response.users);

			socket.on('users', listenUsers);
		})();

		return () => {
			socket.removeListener('users', listenUsers);

			roomState.reset();
		};
	}, []);

	if (!selfUserId) return null;

	return <RoomPage/>;
});