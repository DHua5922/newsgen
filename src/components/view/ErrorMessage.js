import styled from "styled-components";

const Message = styled.div`
    font-weight: bold;
    font-size: 2rem;
`;

export function ErrorMessage({ message }) {
    return (
        <Message>{message}</Message>
    );
}