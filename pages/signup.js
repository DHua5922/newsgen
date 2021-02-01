import { useReducer } from "react";
import Field from "../src/components/view/Field";
import MyForm from "../src/components/view/MyForm";
import { styles } from "../styles/globals";
import styled from "styled-components";
import MyNavbar from "../src/components/view/MyNavbar";
import { Button } from "react-bootstrap";
import signUpReducer, { initialSignUpState } from "../src/redux/reducers/signUpReducer";
import loadReducer, { initialLoadState } from "../src/redux/reducers/loadReducer";
import loadActions from "../src/redux/actions/loadAction";
import signUpActions from "../src/redux/actions/signUpAction";
import { userServices } from "../src/services/user/UserService";
import { useRouter } from "next/router";
import { pageLink } from "../src/constants";

const Container = styled.div`
    ${styles.form}
    padding-top: 30vh;
`;

const header = {
    children: "Sign Up"
};

export default function SignUp() {
    const [fieldValues, dispatchFields] = useReducer(signUpReducer, initialSignUpState);
    const [loadState, dispatchLoadState] = useReducer(loadReducer, initialLoadState);

    const fields = [
            {
                label: {
                    children: "Username"
                },
                input: {
                    value: fieldValues.username,
                    placeholder: "abc123",
                    onChange: (evt) => dispatchFields(signUpActions.updateUsername(evt.target.value))
                }
            },
            {
                label: {
                    children: "Email"
                },
                input: {
                    type: "email",
                    value: fieldValues.email,
                    placeholder: "abc123@domain.com",
                    onChange: (evt) => dispatchFields(signUpActions.updateEmail(evt.target.value))
                }
            },
            {
                label: {
                    children: "Password"
                },
                input: {
                    type: "password",
                    value: fieldValues.password,
                    placeholder: "abc123!",
                    onChange: (evt) => dispatchFields(signUpActions.updatePassword(evt.target.value))
                }
            },
            {
                label: {
                    children: "Confirm Password"
                },
                input: {
                    type: "password",
                    value: fieldValues.cpassword,
                    placeholder: "abc123!",
                    onChange: (evt) => dispatchFields(signUpActions.updateCPassword(evt.target.value))
                }
            }
        ].map((field, index) => (
            <div key={index}>
                <Field {...field} />
            </div>
        ));

    const buttons = [
            {
                props: {
                    variant: "primary",
                    onClick: () => signUp()
                },
                children: "Sign Up"
            }
        ].map((button, index) => {
            const { props, children } = button;
            return (
                <Button {...props} block key={index}>
                    {children}
                </Button>
            );
        });

    const router = useRouter();
    function signUp() {
        dispatchLoadState(loadActions.pending());
        userServices.signUp(fieldValues)
            .then(() => router.push(pageLink.login))
            .catch(error => {
                if(error.response && error.response.status === 400)
                    dispatchLoadState(loadActions.fail(error.response.data));
                else
                    dispatchLoadState(loadActions.fail([
                        {
                            message: "There was a problem creating your account. Please try again."
                        }
                    ]));
            });
    }

    const { successMsgs, errorMsgs, pending } = loadState;
    const messages = {
        success: successMsgs,
        error: errorMsgs,
        pending: {
            isPending: pending,
            message: "Creating your account. Please wait." 
        }
    };
    return (
        <>
            <MyNavbar />
            <Container>
                <MyForm
                    header={header}
                    fields={fields}
                    buttons={buttons}
                    messages={messages}
                />
            </Container>
        </>
    ); 
}