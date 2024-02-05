import {memo} from 'react';
import {LoginPage} from '@features/auth/pages/LoginPage';
import {useAuthStore} from '@features/auth/auth.store';

export const LoginScreen = memo(() => {
	const {login} = useAuthStore();

	return <LoginPage login={login}/>;
});