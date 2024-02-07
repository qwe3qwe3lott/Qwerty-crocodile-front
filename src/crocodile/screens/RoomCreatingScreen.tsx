import {memo, useCallback} from 'react';
import {RoomCreatingPage} from '@crocodile/pages/RoomCreatingPage';
import {socket} from '@crocodile/crocodile.api';
import {useNavigate} from 'react-router-dom';

export const RoomCreatingScreen = memo(() => {
	const navigate = useNavigate();

	const handleSubmit = useCallback(async () => {
		const response = await socket.emitWithAck('createRoom');

		navigate(`/${response.roomId}`);
	}, []);

	return <RoomCreatingPage onSubmit={handleSubmit}/>;
});