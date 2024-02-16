import { memo } from 'react';
import { RoomControlsPreview } from '@crocodile/components/RoomControlsPreview';

export const RoomControls = memo(() => {
	return (
		<div className="max-w-128 min-w-96 w-full h-full p-4 rounded-xl bg-amber-200">
			<RoomControlsPreview
				posterUrl="https://desu.shikimori.one/uploads/poster/animes/5081/main-74bf1454e7d9569c3c6a3dc4e19f54a9.webp"
				title="Bakemonogatari / Истории монстров"
			/>
		</div>
	);
});