import { memo, useCallback } from 'react';
import { LoginPage } from '@auth/pages/LoginPage';
import { useAuthStore } from '@auth/auth.store';
import { useNavigate } from 'react-router-dom';

export const LoginScreen = memo(() => {
	const { login, setLogin } = useAuthStore();
	const navigate = useNavigate();

	const handleSubmit = useCallback((login: string) => {
		setLogin(login);

		navigate('/');
	}, []);

	return <LoginPage initialLogin={login} onSubmit={handleSubmit}/>;
});