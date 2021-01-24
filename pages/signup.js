import { useReducer } from "react";
import Field from "../src/components/view/Field";
import MyForm from "../src/components/view/MyForm";
import { styles } from "../styles/globals";
import styled from "styled-components";
import MyNavbar from "../src/components/view/MyNavbar";
import { Button } from "react-bootstrap";
import { newsServices } from "../src/services/news/News";
import { apiLink } from "../src/constants";
import signUpReducer, { initialSignUpState } from "../src/redux/reducers/signUpReducer";
import loadReducer, { initialLoadState } from "../src/redux/reducers/loadReducer";
import loadActions from "../src/redux/actions/loadAction";
import signUpActions from "../src/redux/actions/signUpAction";

const Center = styled.div`${styles.center}`;
const FormPosition = styled.div`${styles.form}`;

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
    ];

    const buttons = [
        {
            props: {
                variant: "primary",
                onClick: () => signUp()
            },
            children: "Sign Up"
        }
    ];

    const { successMsgs, errorMsgs, pending } = loadState;

    function signUp() {
        dispatchLoadState(loadActions.pending());
        newsServices.signUp(apiLink.signup, fieldValues)
            .then(success => {
                dispatchLoadState(loadActions.success(success.data));
            })
            .catch(error => {
                dispatchLoadState(loadActions.fail(error.response.data));
            });
    }

    return (
        <Center>
            <MyNavbar />
            <FormPosition>
                <MyForm
                    header={{
                        children: "Sign Up"
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
                            message: "Creating your account. Please wait." 
                        }
                    }}
                />
            </FormPosition>
        </Center>
    ); 
}