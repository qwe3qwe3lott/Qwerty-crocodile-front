import { memo, useCallback, useRef, useState } from 'react';
import { roomStoreAnswerAdapterSelector, useRoomStore } from '@crocodile/crocodile.store';
import Select from 'react-select/base';
import { throttle } from '@common/common.util';
import { OptionsOrGroups } from 'react-select';

type Props = {
	disabled?: boolean
};

type Option = { label: string, value: string };

export const RoomControlsAnswerPicker = memo<Props>(({ disabled }) => {
	const answerAdapter = useRoomStore(roomStoreAnswerAdapterSelector);

	const inputValueRef = useRef('');
	const [ inputValue, setInputValue ] = useState('');
	const [ value, setValue ] = useState<Option | null>(null);
	const [ isMenuOpen, setMenuOpenFlag ] = useState(false);
	const [ options, setOptions ] = useState<OptionsOrGroups<Option, never>>([]);

	const fetchOptions = useCallback(throttle(async () => {
		const options = await answerAdapter.fetchOptions(inputValueRef.current);

		setOptions(options.map((option) => ({ label: option.name, value: option.value })));
	}, 500), []);

	const handleInputValueChange = useCallback((value: string) => {
		setInputValue(value);
		inputValueRef.current = value;
		fetchOptions();
	}, [ fetchOptions ]);

	const handleValueChange = useCallback((value: Option | null) => {
		setValue(value);
	}, []);

	return (
		<div className={'flex justify-center'}>
			<Select
				placeholder={'Введите название по постеру'}
				className={'w-full'}
				isDisabled={disabled}
				onChange={handleValueChange}
				onInputChange={handleInputValueChange}
				options={options}
				inputValue={inputValue}
				onMenuClose={() => setMenuOpenFlag(false)}
				onMenuOpen={() => setMenuOpenFlag(true)}
				menuIsOpen={isMenuOpen}
				value={value}
			/>
		</div>
	);
});
