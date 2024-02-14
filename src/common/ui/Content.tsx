import { memo, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	className?: string;
}>;

export const Content = memo<Props>(({ children, className = '' }) => {
	return (
		<section className={`bg-indigo-500 shadow-md shadow-gray-400 rounded-3xl w-full h-full max-h-256 max-w-512 p-8 ${className}`}>
			{children}
		</section>
	);
});
