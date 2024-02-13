import { forwardRef, HTMLAttributes, memo } from 'react';

type Props = HTMLAttributes<HTMLButtonElement>;

export const Button = memo<Props>(forwardRef<HTMLButtonElement, Props>(({ className = '', children, ...props }, ref) => {
	return <button {...props} ref={ref}
		className={`text-3xl rounded-xl bg-amber-700 text-white p-2 ${className}`}>{children}</button>;
}));