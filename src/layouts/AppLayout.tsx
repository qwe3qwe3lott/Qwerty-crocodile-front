import {Outlet} from 'react-router-dom';
import {memo, useEffect, useState} from 'react';
import {authStoreLoginSelector, useAuthStore} from '@auth/auth.store';
import {LoginScreen} from '@auth/screens/LoginScreen';
import {socket} from '@crocodile/crocodile.api';

export const AppLayout = memo(() => {
	const login = useAuthStore(authStoreLoginSelector);

	const [isConnected, setConnected] = useState(socket.connected);

	useEffect(() => {
		socket.on('connect', () => {
			setConnected(true);
		});

		socket.on('disconnect', () => {
			setConnected(false);
		});
	}, []);

	return <main className="p-4 bg-amber-50 h-full grid place-items-center">
		{login ? isConnected ? <Outlet/> : <div>TODO</div> : <LoginScreen/>}
	</main>;
});