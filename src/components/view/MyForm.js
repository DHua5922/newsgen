import { Button, Form } from "react-bootstrap";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
import { SuccessMessage } from "./SuccessMessage";
import tw, { styled } from "twin.macro";
import Field from "./Field";

const Header = styled.h1`
    font-size: ${props => props.fontSize || "2rem"};
    ${tw`text-center font-bold`}
`;

const Container = styled.div`
    margin-top: 10px;
`;

export default function MyForm({ form={}, header={}, fields=[], buttons=[], messages={} }) {
    return (
        <Form {...form}>
            <Header {...header.props}>
                {header.children}
            </Header>
            
            { 
                fields.map((field, index) => (
                    <div key={index} tw="mt-3">
                        <Field {...field} />
                    </div>
                )) 
            }

            <div tw="py-2" />

            { 
                buttons.map((button, index) => {
                    const { props, children } = button;
                    return (
                        <Button {...props} key={index} tw="w-full">
                            {children}
                        </Button>
                    );
                }) 
            }

            <Container>
                { 
                    messages.pending.isPending && 
                        <Loader message={messages.pending.message} /> 
                }
                { 
                    messages.success.map((message, index) => 
                        <div key={index}>
                            <SuccessMessage {...message} />
                        </div>) 
                }
                { 
                    messages.error.map((message, index) => 
                        <div key={index}>
                            <ErrorMessage {...message} />
                        </div>) 
                }
            </Container>
        </Form>
    );
}