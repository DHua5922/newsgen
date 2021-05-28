import { Form } from 'react-bootstrap';
import { ErrorMessage } from './ErrorMessage';
import { SuccessMessage } from './SuccessMessage';

export default function Field({ label={}, input={}, successMsgs = [], errorMsgs = [] }) {
    return (
        <Form.Group>
            <Form.Label {...label.props}>
                {label.children}
            </Form.Label>

            <Form.Control {...input} />

            {successMsgs.map(message => 
                <SuccessMessage message={message.message} />)}

            {errorMsgs.map(message => 
                <ErrorMessage message={message.message} />)}
        </Form.Group>
    );
}