import AuthForm from "./AuthForm";
import Center from "./Center";
import tw from "twin.macro";

const Container = tw.div`
    bg-gray-50 
    h-full 
    w-full
`;

export default function AuthContainer({ children, ...formProps }) {
    return (
        <Container>
            <Center>
                <AuthForm {...formProps}>
                    {children}
                </AuthForm>
            </Center>
        </Container>
    );
}