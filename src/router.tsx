import {createBrowserRouter} from 'react-router-dom';

import {AppLayout} from '@layouts/AppLayout';
import {RoomCreatingScreen} from '@screens/RoomCreatingScreen';
import {RoomScreen} from '@screens/RoomScreen';

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
				path: ':roomId',
				Component: RoomScreen
			}
		]
	}
]);