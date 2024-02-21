import { memo, useEffect } from 'react';
import { RoomPage } from '@crocodile/pages/RoomPage';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '@auth/auth.store';
import { socket } from '@crocodile/crocodile.api';
import { roomStoreSelfUserIdSelector, useRoomStore } from '@crocodile/crocodile.store';
import { DrawEvent, Player, StateTransaction, User } from '@crocodile/crocodile.entity';

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

		const listenOwnerId = (ownerId: string) => {
			roomState.setOwnerId(ownerId);
		};

		const listenDrawEvents = (drawEvents: DrawEvent[]) => {
			roomState.pushDrawEvents(drawEvents);
		};

		const listenStateTransaction = (stateTransaction: StateTransaction) => {
			roomState.applyStateTransaction(stateTransaction);
		};

		const listenPlayers = (players: Player[]) => {
			roomState.setPlayers(players);
		};

		(async () => {
			const authState = useAuthStore.getState();
			const login = authState.login;
			const userId = authState.roomUserIdsMap[roomId];

			const response = await socket.emitWithAck('joinRoom', { login, roomId, userId });

			if (response._status === 'ERROR') throw new Error();

			authState.setRoomUserId(roomId, response.userId);

			roomState.setUsers(response.users);
			roomState.setPlayers(response.players);
			roomState.setSelfUserId(response.userId);
			roomState.setOwnerId(response.ownerId);
			roomState.setArtistId(response.artistId);
			roomState.pushDrawEvents(response.drawEvents);
			roomState.setState(response.state);
			roomState.setTimerState(response.timerState);
			roomState.setAnswer(response.answer);

			socket.on('users', listenUsers);
			socket.on('ownerId', listenOwnerId);
			socket.on('drawEvents', listenDrawEvents);
			socket.on('stateTransaction', listenStateTransaction);
			socket.on('players', listenPlayers);
		})();

		return () => {
			socket.removeListener('users', listenUsers);
			socket.removeListener('ownerId', listenOwnerId);
			socket.removeListener('drawEvents', listenDrawEvents);
			socket.removeListener('stateTransaction', listenStateTransaction);
			socket.removeListener('players', listenPlayers);

			roomState.reset();

			socket.emitWithAck('leaveRoom', null);
		};
	}, []);

	if (!selfUserId) return null;

	return <RoomPage/>;
});
