import tw, { styled } from "twin.macro";

const Message = styled.div`
    margin-left: 10px;
    ${tw`text-base`}
`;

const Row = styled.div`
    display: flex;
    background-color: ${props => props.backgroundColor || "white"};
    color: ${props => props.textColor || "black"};
    align-items: center;
    padding: ${props => props.padding || "10px"};
`;

export function IconMessage({ message, icon, props }) {
    return (
        <Row {...props}>
            {icon}
            <Message>{message}</Message>
        </Row>
    );
}