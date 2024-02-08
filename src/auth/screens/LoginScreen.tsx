import { memo, useCallback } from 'react';
import { LoginPage } from '@auth/pages/LoginPage';
import { useAuthStore } from '@auth/auth.store';

export const LoginScreen = memo(() => {
	const { login, setLogin } = useAuthStore();

	const handleSubmit = useCallback((login: string) => {
		setLogin(login);
	}, []);

	return <LoginPage initialLogin={login} onSubmit={handleSubmit}/>;
});