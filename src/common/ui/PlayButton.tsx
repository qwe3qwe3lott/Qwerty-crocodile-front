import { ReactComponent } from '@assets/play.svg';
import { ComponentProps, memo } from 'react';

type Props = ComponentProps<typeof ReactComponent>;

export const PlayButton = memo<Props>((props) => <ReactComponent {...props}/>);
