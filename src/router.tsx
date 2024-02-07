import {createBrowserRouter} from 'react-router-dom';

import {AppLayout} from '@layouts/AppLayout';
import {RoomCreatingScreen} from '@crocodile/screens/RoomCreatingScreen';
import {RoomScreen} from '@crocodile/screens/RoomScreen';
import {LoginScreen} from '@auth/screens/LoginScreen';

export const router = createBrowserRouter([
	{
		path: '/',
		Component: AppLayout,
		children: [
			{
				path: '',
				Component: RoomCreatingScreen
			},
			{
				path: 'login',
				Component: LoginScreen
			},
			{
				path: ':roomId',
				Component: RoomScreen
			}
		]
	}
]);