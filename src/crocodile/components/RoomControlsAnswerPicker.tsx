import { memo, useCallback, useRef, useState } from 'react';
import { roomStoreAnswerAdapterSelector, useRoomStore } from '@crocodile/crocodile.store';
import Select from 'react-select/base';
import { throttle } from '@common/common.util';
import { OptionsOrGroups } from 'react-select';
import { socket } from '@crocodile/crocodile.api';

type Props = {
	disabled?: boolean
};

type Option = { label: string, value: string };

export const RoomControlsAnswerPicker = memo<Props>(({ disabled }) => {
	const answerAdapter = useRoomStore(roomStoreAnswerAdapterSelector);

	const inputValueRef = useRef('');
	const [ inputValue, setInputValue ] = useState('');
	const [ option, setOption ] = useState<Option | null>(null);
	const [ isMenuOpen, setMenuOpenFlag ] = useState(false);
	const [ options, setOptions ] = useState<OptionsOrGroups<Option, never>>([]);

	const fetchOptions = useCallback(throttle(async () => {
		const options = await answerAdapter.fetchOptions(inputValueRef.current);

		setOptions(options);
	}, 500), []);

	const handleInputValueChange = useCallback((value: string) => {
		setInputValue(value);
		inputValueRef.current = value;
		fetchOptions();
	}, [ fetchOptions ]);

	const handleOptionChange = useCallback((option: Option | null) => {
		setOption(option);
		!!option?.value && socket.emitWithAck('answer', option.value);
	}, []);

	return (
		<div className={'flex justify-center'}>
			<Select
				placeholder={'Введите название по постеру'}
				className={'w-full'}
				isDisabled={disabled}
				onChange={handleOptionChange}
				onInputChange={handleInputValueChange}
				options={options}
				inputValue={inputValue}
				onMenuClose={() => setMenuOpenFlag(false)}
				onMenuOpen={() => setMenuOpenFlag(true)}
				menuIsOpen={isMenuOpen}
				value={option}
			/>
		</div>
	);
});
