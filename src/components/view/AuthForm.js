import MyForm from "./MyForm";
import tw from "twin.macro";

const Container = tw.div`
    bg-white
    shadow-md
    p-8
    w-full
    max-w-md
    m-auto
`;

export default function AuthForm({ children, ...formChildren }) {
    return (
        <Container>
            <MyForm {...formChildren} />
            {children}
        </Container>
    );
}