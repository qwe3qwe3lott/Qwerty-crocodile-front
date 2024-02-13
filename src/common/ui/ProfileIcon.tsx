import { ReactComponent } from '@assets/profile.svg';
import { ComponentProps, memo } from 'react';

type Props = ComponentProps<typeof ReactComponent>;

export const ProfileIcon = memo<Props>((props) => <ReactComponent {...props}/>);
