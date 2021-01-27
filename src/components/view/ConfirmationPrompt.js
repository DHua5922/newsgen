import { Modal } from "react-bootstrap";
import styled from "styled-components";

const Footer = styled(Modal.Footer)`
    border-top: 0;
`;

export default function ConfirmationPrompt({ modal, header, body, footer }) {
    
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