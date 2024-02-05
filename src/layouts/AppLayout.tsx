import {Outlet} from 'react-router-dom';
import {memo} from 'react';
import {authStoreLoginSelector, useAuthStore} from '@features/auth/auth.store';
import {LoginScreen} from '@screens/LoginScreen';

export const AppLayout = memo(() => {
	const login = useAuthStore(authStoreLoginSelector);

	return <main className="p-4 bg-amber-50 h-full grid place-items-center">
		{login ? <Outlet/> : <LoginScreen/>}
	</main>;
});