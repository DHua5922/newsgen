import tw from "tailwind-styled-components";

const Container = tw.div`
    bg-white
    shadow-md
    p-8
    w-full
    max-w-md
    m-auto
`;

function IsAuthForm(Component) {
    return function AuthFormComponent({...props}) {
        return (
            <Container>
                <Component {...props} />
            </Container>
        );
    }
}

export default IsAuthForm;