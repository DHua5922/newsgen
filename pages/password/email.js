import { userServices } from "../../src/services/user/UserService";
import loadActions from "../../src/redux/actions/loadAction";
import { useDispatch, useSelector } from "react-redux";
import GuestPage from "../../src/components/view/GuestPage";
import AuthContainer from "../../src/components/view/AuthContainer";
import useMessages from "../../src/custom-hooks/useMessages";
import signUpActions from "../../src/redux/actions/signUpAction";

const header = {
    children: "Reset Password"
};

function useFields() {
    const { email } = useSelector(state => state.signUpReducer);
    const dispatch = useDispatch();

    return [
        {
            label: {
                children: "Email",
            },
            input: {
                placeholder: "abc@domain.com",
                value: email,
                onChange: (evt) => dispatch(signUpActions.updateEmail(evt.target.value)),
            }
        }
    ];
}

function useButtons() {
    const { email } = useSelector(state => state.signUpReducer);
    const dispatch = useDispatch();

    function sendEmail() {
        dispatch(loadActions.pending());
        userServices
            .sendEmail({ email: email })
            .then(success => dispatch(loadActions.success([success.data])))
            .catch(error => {
                const response = error.response;
                if(response && response.status === 400) {
                    dispatch(loadActions.fail([response.data]));
                } else {
                    dispatch(loadActions.fail([{
                        message: "There was a problem sending the link. Please try again."
                    }]));
                }
            })
    }

    return [
        {
            props: {
                variant: "primary",
                onClick: () => sendEmail()
            },
            children: "Send Reset Link"
        }
    ];
}

function MainContent() {
    const { pending, errorMsgs, successMsgs } = useSelector(state => state.loadReducer);
    const messages = useMessages(successMsgs, errorMsgs, pending, "Sending link to reset password. Please wait.");

    return (
        <AuthContainer
            header={header}
            fields={useFields()}
            buttons={useButtons()}
            messages={messages}
        />
    );
}

export default function Email() {
    const EmailPage = GuestPage(MainContent);
    return <EmailPage title={"Reset Password"} />;
}