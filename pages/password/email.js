import { useReducer, useState } from "react";
import { userServices } from "../../src/services/user/UserService";
import loadReducer, { initialLoadState } from "../../src/redux/reducers/loadReducer";
import MyForm from "../../src/components/view/MyForm";
import Field from "../../src/components/view/Field";
import { Button } from "react-bootstrap";
import loadActions from "../../src/redux/actions/loadAction";
import { styles } from "../../styles/globals";
import styled from "styled-components";

const header = {
    children: "Reset Password"
};

const Container = styled.div`
    ${styles.form}
    padding-top: 30vh;
`;

export default function Email() {
    const [loadState, dispatchLoadState] = useReducer(loadReducer, initialLoadState);
    const [email, setEmail] = useState("");

    const fields = [
            {
                label: {
                    children: "Email",
                },
                input: {
                    placeholder: "abc@domain.com",
                    value: email,
                    onChange: (evt) => setEmail(evt.target.value),
                }
            }
        ].map(field => <Field {...field} />);

    const buttons = (
        <Button 
            variant="primary"
            block
            onClick={() => {
                dispatchLoadState(loadActions.pending());
                userServices
                    .sendEmail({email: email})
                    .then(success => dispatchLoadState(loadActions.success([success.data])))
                    .catch(error => {
                        const response = error.response;
                        if(response && response.status === 400) {
                            dispatchLoadState(loadActions.fail([response.data]));
                        } else {
                            dispatchLoadState(loadActions.fail([{
                                message: "There was a problem sending the link. Please try again."
                            }]));
                        }
                    })
            }}
        >
            Send Email
        </Button>
    );

    const { pending, errorMsgs, successMsgs } = loadState;
    const messages = {
        pending: {
            isPending: pending,
            message: "Sending link to reset password. Please wait."
        },
        success: successMsgs,
        error: errorMsgs,
    };
    return (
        <Container>
            <MyForm
                header={header}
                fields={fields}
                buttons={buttons}
                messages={messages}
            />
        </Container>
    );
}