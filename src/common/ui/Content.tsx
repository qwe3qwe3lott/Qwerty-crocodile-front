import { memo, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	className?: string;
}>;

export const Content = memo<Props>(({ children, className = '' }) => {
	return (
		<section className={`bg-indigo-500 shadow-[0_0_8px_2px_#c4c8cc] rounded-3xl w-full h-full max-h-256 max-w-512 p-8 ${className}`}>
			{children}
		</section>
	);
});
