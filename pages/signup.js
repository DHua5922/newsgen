import Field from "../src/components/view/Field";
import MyForm from "../src/components/view/MyForm";
import { styles } from "../styles/globals";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import loadActions from "../src/redux/actions/loadAction";
import signUpActions from "../src/redux/actions/signUpAction";
import { userServices } from "../src/services/user/UserService";
import { useRouter } from "next/router";
import { pageLink } from "../src/constants";
import { useDispatch, useSelector } from "react-redux";
import useMessages from "../src/custom-hooks/useMessages";
import AuthForm from "../src/components/view/AuthForm";
import WithNavbar from "../src/components/view/WithNavbar";
import WithTitle from "../src/components/view/WithTitle";

const header = {
    children: "Sign Up"
};

function useFields() {
    const { username, email, password, cpassword } = useSelector(state => state.signUpReducer);
    const dispatch = useDispatch();

    return [
        {
            label: {
                children: "Username"
            },
            input: {
                value: username,
                placeholder: "abc123",
                onChange: (evt) => dispatch(signUpActions.updateUsername(evt.target.value))
            }
        },
        {
            label: {
                children: "Email"
            },
            input: {
                type: "email",
                value: email,
                placeholder: "abc123@domain.com",
                onChange: (evt) => dispatch(signUpActions.updateEmail(evt.target.value))
            }
        },
        {
            label: {
                children: "Password"
            },
            input: {
                type: "password",
                value: password,
                placeholder: "abc123!",
                onChange: (evt) => dispatch(signUpActions.updatePassword(evt.target.value))
            }
        },
        {
            label: {
                children: "Confirm Password"
            },
            input: {
                type: "password",
                value: cpassword,
                placeholder: "abc123!",
                onChange: (evt) => dispatch(signUpActions.updateCPassword(evt.target.value))
            }
        }
    ];
}

function useButtons() {
    const router = useRouter();
    const fieldValues = useSelector(state => state.signUpReducer);
    const dispatch = useDispatch();

    function signUp() {
        dispatch(loadActions.pending());
        userServices.signUp(fieldValues)
            .then(() => {
                dispatch(loadActions.success([]));
                router.push(pageLink.login);
            })
            .catch(error => {
                if(error.response && error.response.status === 400)
                    dispatch(loadActions.fail(error.response.data));
                else
                    dispatch(loadActions.fail([
                        {
                            message: "There was a problem creating your account. Please try again."
                        }
                    ]));
            });
    }

    return [
        {
            props: {
                variant: "primary",
                onClick: () => signUp()
            },
            children: "Sign Up"
        }
    ];
}

function MainContent() {
    const fields = useFields().map((field, index) => (
        <div key={index}>
            <Field {...field} />
        </div>
    ));

    const buttons = useButtons().map((button, index) => {
            const { props, children } = button;
            return (
                <Button {...props} block key={index}>
                    {children}
                </Button>
            );
        });

    const { successMsgs, errorMsgs, pending } = useSelector(state => state.loadReducer);
    const messages = useMessages(successMsgs, errorMsgs, pending, "Creating your account. Please wait.");

    return (
        <MyForm
            header={header}
            fields={fields}
            buttons={buttons}
            messages={messages}
        />
    );
}

function SignUp() {
    const SignUpPage = WithTitle(WithNavbar(AuthForm(MainContent)));
    return <SignUpPage title={"Sign Up"} />;
}

export default SignUp;