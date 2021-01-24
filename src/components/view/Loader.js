import ReactLoading from 'react-loading';
import { IconMessage } from './IconMessage';

export function Loader({ type, color, height, width, message }) {
    return (
        <IconMessage 
            icon={<ReactLoading 
                type={type ? type : 'spin'} 
                color={color ? color : 'black'} 
                height={height ? height : '5%'} 
                width={width ? width : '5%'} 
            />}
            message={message ? message : ""}
        />
    );
}