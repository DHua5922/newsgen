import tw from "tailwind-styled-components";

const Container = tw.div`
    grid
    h-full
    w-full
    ${props => props.backgroundColor || "bg-white"}
`;

function WithCenter(Component) {
    return function WithCenterComponent({ backgroundColor, ...props }) {
        return (
            <Container backgroundColor={backgroundColor}>
                <Component {...props} />
            </Container>
        );
    }
}

export default WithCenter;