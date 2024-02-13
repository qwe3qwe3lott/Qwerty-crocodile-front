import { memo } from 'react';
import { IconButton } from '@common/ui/IconButton';

export const RoomDrawingAriaTools = memo(() => {
	return <div className="p-2 rounded-xl bg-amber-200 grid gap-2 place-items-center h-min">
		<IconButton/>
	</div>;
});