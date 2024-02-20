import { memo } from 'react';
import SelectSearch from 'react-select-search';
import { roomStoreAnswerAdapterSelector, useRoomStore } from '@crocodile/crocodile.store';

type Props = {
	disabled?: boolean
};

export const RoomControlsAnswerPicker = memo<Props>(({ disabled }) => {
	const answerAdapter = useRoomStore(roomStoreAnswerAdapterSelector);

	return (
		<div className="flex justify-center">
			<SelectSearch
				disabled={disabled}
				search
				debounce={500}
				options={[]}
				getOptions={answerAdapter.fetchOptions}
			/>
		</div>
	);
});