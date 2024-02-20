import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@common/ui/Button';
import { RoomCreatingFormState } from '@crocodile/crocodile.entity';

type Props = {
	className?: string;
	onSubmit: (state: RoomCreatingFormState) => void;
	initialValues?: RoomCreatingFormState;
};

export const RoomCreatingForm = memo<Props>(({ className, onSubmit, initialValues }) => {
	const { handleSubmit } = useForm<RoomCreatingFormState>({ defaultValues: initialValues });

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={`p-32 rounded-xl bg-amber-200 max-w-256 grid w-full gap-8 place-items-center ${className}`}
		>
			<Button>{'Создать комнату'}</Button>
		</form>
	);
});
