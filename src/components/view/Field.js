import { Form } from 'react-bootstrap';

export default function Field({ label, input }) {
    return (
        <Form.Group>
            <Form.Label {...label.props}>
                {label.children}
            </Form.Label>

            <Form.Control {...input} />
        </Form.Group>
    );
}