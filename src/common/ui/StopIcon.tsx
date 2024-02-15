import { ReactComponent } from '@assets/stop.svg';
import { ComponentProps, memo } from 'react';

type Props = ComponentProps<typeof ReactComponent>;

export const StopIcon = memo<Props>((props) => <ReactComponent {...props}/>);
