import { Modal } from "react-bootstrap";
import tw from "twin.macro";

const Footer = tw(Modal.Footer)`
    border-t-0
`;

export default function ConfirmationPrompt({ modal={}, header={}, body={}, footer={} }) {
    
    return (
        <Modal {...modal} centered>
            <Modal.Header {...header.props} closeButton>
                <Modal.Title>{header.children}</Modal.Title>
            </Modal.Header>

            <Modal.Body {...body.props}>
                {body.children}
            </Modal.Body>

            <Footer {...footer.props}>
                {footer.children}
            </Footer>
        </Modal>
    );
}