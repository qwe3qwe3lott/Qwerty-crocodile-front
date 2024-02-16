import { memo } from 'react';

const posterUrl = 'https://desu.shikimori.one/uploads/poster/animes/5081/main-74bf1454e7d9569c3c6a3dc4e19f54a9.webp';
const title = 'Bakemonogatari / Истории монстров';

export const RoomControlsPreview = memo(() => {
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