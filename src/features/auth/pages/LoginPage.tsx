import {memo, useCallback, useMemo} from 'react';
import {Content} from '@ui/Content';
import {LoginForm} from '@features/auth/components/LoginForm';
import {LoginFormState} from '@features/auth/auth.entity';

type Props = {
    initialLogin: string;
	onSubmit: (login: string) => void;
}

export const LoginPage = memo<Props>(({initialLogin, onSubmit}) => {

	const initialFormValues = useMemo<LoginFormState>(() => ({login: initialLogin}), [initialLogin]);

	const handleSubmit = useCallback((state: LoginFormState) => {
		onSubmit(state.login);
	}, [onSubmit]);

	return <Content className={'grid place-items-center'}>
		<LoginForm initialValues={initialFormValues} onSubmit={handleSubmit} className={'mb-32'}/>
	</Content>;
});