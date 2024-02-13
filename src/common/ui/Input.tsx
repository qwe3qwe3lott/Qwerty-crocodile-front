import { forwardRef, HTMLAttributes, memo } from 'react';

type Props = HTMLAttributes<HTMLInputElement>;

export const Input = memo<Props>(forwardRef<HTMLInputElement, Props>(({ className = '', ...props }, ref) => {
	return <input {...props} ref={ref} className={`text-3xl w-96 rounded-xl bg-white p-2 ${className}`}/>;
}));