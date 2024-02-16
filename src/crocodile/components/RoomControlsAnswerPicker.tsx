import { memo } from 'react';
import SelectSearch from 'react-select-search';

type Props = {
	disabled?: boolean
};

export const RoomControlsAnswerPicker = memo<Props>(({ disabled }) => {
	return (
		<div className="flex justify-center">
			<SelectSearch
				disabled={disabled}
				search
				debounce={300}
				options={[]}
			/>
		</div>
	);
});