import { pageLink } from "../src/constants";
import loginActions from "../src/redux/actions/loginAction";
import { userServices } from "../src/services/user/UserService";
import loadActions from "../src/redux/actions/loadAction";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useMessages from "../src/custom-hooks/useMessages";
import GuestPage from "../src/components/view/GuestPage";
import AuthContainer from "../src/components/view/AuthContainer";

function useFields() {
    const { usernameOrEmail, password } = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();

    return [
        {
            label: {
                children: "Username or Email"
            },
            input: {
                value: usernameOrEmail,
                onChange: (evt) => dispatch(loginActions.updateUsernameOrEmail(evt.target.value))
            }
        },
        {
            label: {
                children: "Password"
            },
            input: {
                type: "password",
                value: password,
                onChange: (evt) => dispatch(loginActions.updatePassword(evt.target.value))
            }
        }
    ];
}

function useButtons() {
    const router = useRouter();
    const fieldValues = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();

    function login() {
        dispatch(loadActions.pending());
        userServices.login(fieldValues)
            .then(() => router.push(pageLink.dashboard))
            .catch(() => dispatch(loadActions.fail([{message: "Incorrect username, email, and/or password"}])));
    }

    return [
        {
            props: {
                variant: "primary",
                onClick: () => login()
            },
            children: "Login"
        }
    ];
}

function MainContent() {
    const header = {
        children: "Login"
    };
    
    const { errorMsgs, pending } = useSelector(state => state.loadReducer);
    const messages = useMessages([], errorMsgs, pending, "Signing you in. Please wait.");

    return (
        <AuthContainer
            header={header}
            fields={useFields()}
            buttons={useButtons()}
            messages={messages}
        >
            <a href={pageLink.email}>Forgot password?</a>
        </AuthContainer>
    );
}

function Login() {
    const LoginPage = GuestPage(MainContent);
    return <LoginPage title={"Login"} />;
}

export default Login;