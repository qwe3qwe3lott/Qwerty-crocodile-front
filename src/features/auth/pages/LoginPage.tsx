import {memo} from 'react';
import {Content} from '@ui/Content';

type Props = {
    login: string;
}

export const LoginPage = memo<Props>(() => {
	return <Content>LoginPage</Content>;
});