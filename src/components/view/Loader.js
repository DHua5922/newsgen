import Spinner from 'react-bootstrap/Spinner';
import { IconMessage } from './IconMessage';

const LoadIcon = (
    <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
    </Spinner>
);

export function Loader({ icon=LoadIcon, message="" }) {
    return (
        <IconMessage 
            icon={icon}
            message={message}
        />
    );
}