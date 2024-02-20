import { memo } from 'react';
import { Content } from '@common/ui/Content';
import { RoomCreatingForm } from '@crocodile/components/RoomCreatingForm';
import { RoomCreatingFormState } from '@crocodile/crocodile.entity';

type Props = {
	onSubmit: (state: RoomCreatingFormState) => void;
};

export const RoomCreatingPage = memo<Props>(({ onSubmit }) => {
	return (
		<Content className={'grid place-items-center'}>
			<RoomCreatingForm onSubmit={onSubmit}/>
		</Content>
	);
});
