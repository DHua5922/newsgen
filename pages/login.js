import { Button } from "react-bootstrap";
import { useReducer } from "react";
import Field from "../src/components/view/Field";
import MyForm from "../src/components/view/MyForm";
import { pageLink } from "../src/constants";
import loginActions from "../src/redux/actions/loginAction";
import loadReducer, { initialLoadState } from "../src/redux/reducers/loadReducer";
import loginReducer, { initialLoginState } from "../src/redux/reducers/loginReducer";
import { userServices } from "../src/services/user/UserService";
import { styles } from "../styles/globals";
import styled from "styled-components";
import MyNavbar from "../src/components/view/MyNavbar";
import loadActions from "../src/redux/actions/loadAction";
import { useRouter } from "next/router";

const Container = styled.div`
    ${styles.form}
    padding-top: 30vh;
`;

const header = {
    children: "Login"
};

export default function Login() {
    const [fieldValues, dispatchFields] = useReducer(loginReducer, initialLoginState);
    const [loadState, dispatchLoadState] = useReducer(loadReducer, initialLoadState);

    const { usernameOrEmail, password } = fieldValues;
    const fields = [
            {
                label: {
                    children: "Username or Email"
                },
                input: {
                    value: usernameOrEmail,
                    onChange: (evt) => dispatchFields(loginActions.updateUsernameOrEmail(evt.target.value))
                }
            },
            {
                label: {
                    children: "Password"
                },
                input: {
                    type: "password",
                    value: password,
                    onChange: (evt) => dispatchFields(loginActions.updatePassword(evt.target.value))
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
                    onClick: () => login()
                },
                children: "Login"
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
    function login() {
        dispatchLoadState(loadActions.pending());
        userServices.login(fieldValues)
            .then(() => router.push(pageLink.dashboard))
            .catch(error => {
                if(error.response && error.response.status === 400)
                    dispatchLoadState(loadActions.fail([error.response.data]));
                else
                    dispatchLoadState(loadActions.fail([
                        {
                            message: "There was a problem logging you in. Please try again."
                        }
                    ]));
            });
    }

    const { errorMsgs, pending } = loadState;
    const messages = {
        success: [],
        error: errorMsgs,
        pending: {
            isPending: pending,
            message: "Signing you in. Please wait." 
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
                <a href={pageLink.email}>Forgot password?</a>
            </Container>
        </>
    );
}