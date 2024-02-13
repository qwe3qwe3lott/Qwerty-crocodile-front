import { forwardRef, FunctionComponent, HTMLAttributes, memo, SVGProps } from 'react';

type Props = HTMLAttributes<HTMLButtonElement> & {
	Icon?: FunctionComponent<
		SVGProps<SVGSVGElement>
	>;
	width?: number;
	height?: number;
	disabled?: boolean;
};

export const IconButton = memo<Props>(forwardRef<HTMLButtonElement, Props>(({
	className = '',
	Icon = null,
	width = 32,
	height = 32,
	disabled = false,
	...props
}, ref) => {
	return <button {...props} ref={ref} disabled={disabled}
		className={`rounded-xl bg-amber-700 fill-white stroke-white p-2 ${disabled ? 'opacity-50' : ''} ${className}`}
		style={{ width, height }}
	>
		{Icon && <Icon className="w-full h-full"/>}
	</button>;
}));