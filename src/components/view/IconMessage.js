import styled from "styled-components";

const Message = styled.div`
    font-size: 1rem;
    margin-left: 10px;
`;

const Row = styled.div`
    display: flex;
    background-color: ${props => props.backgroundColor || "white"};
    color: ${props => props.textColor || "black"};
    align-items: center;
`;

export function IconMessage({ message, icon, props }) {
    return (
        <Row {...props}>
            {icon}
            <Message>{message}</Message>
        </Row>
    );
}