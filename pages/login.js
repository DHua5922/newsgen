import { Button } from "react-bootstrap";
import { useReducer } from "react";
import Field from "../src/components/view/Field";
import MyForm from "../src/components/view/MyForm";
import { apiLink, pageLink } from "../src/constants";
import loginActions from "../src/redux/actions/loginAction";
import loadReducer, { initialLoadState } from "../src/redux/reducers/loadReducer";
import loginReducer, { initialLoginState } from "../src/redux/reducers/loginReducer";
import { userServices } from "../src/services/user/UserService";
import { styles } from "../styles/globals";
import styled from "styled-components";
import MyNavbar from "../src/components/view/MyNavbar";
import loadActions from "../src/redux/actions/loadAction";
import { useRouter } from "next/router";

const Center = styled.div`${styles.center}`;
const FormPosition = styled.div`${styles.form}`;

export default function Login() {
    const [fieldValues, dispatchFields] = useReducer(loginReducer, initialLoginState);
    const [loadState, dispatchLoadState] = useReducer(loadReducer, initialLoadState);

    const router = useRouter()

    const fields = [
        {
            label: {
                children: "Username or Email"
            },
            input: {
                value: fieldValues.usernameOrEmail,
                onChange: (evt) => dispatchFields(loginActions.updateUsernameOrEmail(evt.target.value))
            }
        },
        {
            label: {
                children: "Password"
            },
            input: {
                type: "password",
                value: fieldValues.password,
                onChange: (evt) => dispatchFields(loginActions.updatePassword(evt.target.value))
            }
        }
    ];

    const { successMsgs, errorMsgs, pending } = loadState;

    const buttons = [
        {
            props: {
                variant: "primary",
                onClick: () => login()
            },
            children: "Login"
        }
    ];

    function login() {
        dispatchLoadState(loadActions.pending());
        userServices.signUp(apiLink.login, fieldValues)
            .then(success => {
                dispatchLoadState(loadActions.success([success.data]));
                router.push(pageLink.dashboard);
            })
            .catch(error => {
                dispatchLoadState(loadActions.fail([error.response.data]));
            });
    }

    return (
        <Center>
            <MyNavbar />
            <FormPosition>
                <MyForm
                    header={{
                        children: "Login"
                    }}
                    fields={fields.map((field, index) => 
                        <div key={index}>
                            <Field {...field} />
                        </div>
                    )}
                    buttons={buttons.map((button, index) => {
                        const { props, children } = button;
                        return (
                            <Button {...props} block key={index}>
                                {children}
                            </Button>
                        );
                    })}
                    messages={{
                        success: successMsgs,
                        error: errorMsgs,
                        pending: {
                            isPending: pending,
                            message: "Signing you in. Please wait." 
                        }
                    }}
                />
                <a href={pageLink.email}>Forgot password?</a>
            </FormPosition>
        </Center>
    );
}