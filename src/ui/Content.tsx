import {memo, PropsWithChildren} from 'react';

export const Content = memo<PropsWithChildren>(({children}) => {
	return <section className="bg-amber-100 rounded-3xl w-full h-full max-h-256 max-w-512 p-4">
		{children}
	</section>;
});