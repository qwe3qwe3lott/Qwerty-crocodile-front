import { memo } from 'react';

type Props = {
	posterUrl: string;
	title: string;
};

export const RoomControlsPreview = memo<Props>(({ title, posterUrl }) => {
	return (
		<div className="flex flex-col gap-4 items-stretch">
			<p className="text-2xl text-center">{title}</p>
			<img
				alt={title}
				src={posterUrl}
				className="rounded-xl"
			/>
		</div>
	);
});