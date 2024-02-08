import { forwardRef, HTMLAttributes, memo } from 'react';

type Props = HTMLAttributes<HTMLButtonElement>;

export const Button = memo(forwardRef<HTMLButtonElement>(({ className = '', children, ...props }: Props, ref) => {
	return <button {...props} ref={ref} className={`text-3xl rounded-xl bg-amber-700 text-white p-2 ${className}`}>{children}</button>;
}));