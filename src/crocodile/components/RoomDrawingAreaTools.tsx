import { memo } from 'react';
import { IconButton } from '@common/ui/IconButton';
import { useDrawAreaStore } from '@crocodile/crocodile.store';

export const RoomDrawingAreaTools = memo(() => {
	const { color,setColor } = useDrawAreaStore();

	const handleToggleColor = () => {
		setColor(color === 'black' ? 'white' : 'black');
	};

	return (
		<div className="p-2 rounded-xl bg-amber-200 grid gap-2 place-items-center h-min">
			<IconButton
				onClick={handleToggleColor}
				className={color === 'black' ? 'bg-black' : 'bg-white'}
			/>
		</div>
	);
});