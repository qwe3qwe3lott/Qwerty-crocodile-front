import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LoginFormState } from '@auth/auth.entity';
import { Input } from '@common/ui/Input';
import { Button } from '@common/ui/Button';

type Props = {
	className?: string;
	onSubmit: (state: LoginFormState) => void;
	initialValues?: LoginFormState;
};

export const LoginForm = memo<Props>(({ className, onSubmit, initialValues }) => {
	const { control, handleSubmit } = useForm<LoginFormState>({
		defaultValues: initialValues
	});

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={`p-32 rounded-xl bg-amber-200 max-w-256 grid w-full gap-8 place-items-center ${className}`}
		>
			<Controller
				control={control}
				name={'login'}
				render={({ field }) => {
					return (
						<Input
							{...field}
							placeholder={'Логин'}
						/>
					);
				}}
			/>
			<Button>Вперёд!</Button>
		</form>
	);
});