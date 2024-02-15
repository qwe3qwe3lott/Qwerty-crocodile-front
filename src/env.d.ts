declare module '*.svg' {
	import { FunctionComponent, SVGProps } from 'react';
	export const ReactComponent: FunctionComponent<
		SVGProps<SVGSVGElement>
	>;
	const content: string;
	export default content;
}

declare global {
	const process: {
		env: {
			PUBLIC_BACKEND_API_URL: string
		}
	};
}