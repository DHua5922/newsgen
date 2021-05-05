import tw from "twin.macro";

const Container = tw.div`
    grid
    h-full
    w-full
`;

export default function Center({ children }) {
    return (
        <Container>
            {children}
        </Container>
    );
}