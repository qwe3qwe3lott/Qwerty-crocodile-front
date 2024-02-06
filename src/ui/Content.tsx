import {memo, PropsWithChildren} from 'react';

type Props = PropsWithChildren<{
	className?: string;
}>

export const Content = memo(({children, className = ''}: Props) => {
	return <section className={`bg-indigo-500 rounded-3xl w-full h-full max-h-256 max-w-512 p-8 ${className}`}>
		{children}
	</section>;
});
