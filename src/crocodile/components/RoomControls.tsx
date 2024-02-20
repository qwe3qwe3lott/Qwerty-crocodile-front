import { memo } from 'react';
import { RoomControlsPreview } from '@crocodile/components/RoomControlsPreview';
import {
	roomStoreArtistIdSelector,
	roomStoreSelfUserIdSelector,
	roomStoreStateSelector,
	useRoomStore,
} from '@crocodile/crocodile.store';
import { RoomControlsAnswerPicker } from '@crocodile/components/RoomControlsAnswerPicker';

export const RoomControls = memo(() => {
	const artistId = useRoomStore(roomStoreArtistIdSelector);
	const selfUserId = useRoomStore(roomStoreSelfUserIdSelector);
	const state = useRoomStore(roomStoreStateSelector);

	const isArtist = artistId === selfUserId;
	const isRound = state === 'round';
	const isTimeout = state === 'timeout';

	const isPreviewShowed = isTimeout || (isRound && isArtist);
	const isAnswerPickerShowed = isRound && !isArtist;

	return (
		<div className={'max-w-128 min-w-96 w-full h-full p-4 rounded-xl bg-amber-200'}>
			{isPreviewShowed && <RoomControlsPreview/>}
			{isAnswerPickerShowed && <RoomControlsAnswerPicker/>}
		</div>
	);
});
