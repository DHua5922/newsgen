import { Form } from "react-bootstrap";
import styled from "styled-components";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
import { SuccessMessage } from "./SuccessMessage";

const Header = styled.h1`
    text-align: ${props => props.textAlign || "center"};
    font-weight: ${props => props.fontWeight || "bold"};
    font-size: ${props => props.fontSize || "2rem"};
`;

const Container = styled.div`
    margin-top: 20px;
`;

export default function MyForm({ form={}, header={}, fields={}, buttons={}, messages={} }) {
    return (
        <Form {...form}>
            <Header {...header.props}>
                {header.children}
            </Header>
            
            { fields }
            { buttons }

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