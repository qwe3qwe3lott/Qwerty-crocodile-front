import {Outlet} from 'react-router-dom';
import {memo} from 'react';

export const AppLayout = memo(() => {
	return <main className="p-4 bg-amber-50 h-full grid place-items-center">
		<Outlet/>
	</main>;
});