import { userServices } from "../../src/services/user/UserService";
import MyForm from "../../src/components/view/MyForm";
import Field from "../../src/components/view/Field";
import { Button } from "react-bootstrap";
import loadActions from "../../src/redux/actions/loadAction";
import { useDispatch, useSelector } from "react-redux";
import WithTitle from "../../src/components/view/WithTitle";
import WithNavbar from "../../src/components/view/WithNavbar";
import AuthForm from "../../src/components/view/AuthForm";
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

    const { pending, errorMsgs, successMsgs } = useSelector(state => state.loadReducer);
    const messages = useMessages(successMsgs, errorMsgs, pending, "Sending link to reset password. Please wait.");

    return (
        <MyForm
            header={header}
            fields={fields}
            buttons={buttons}
            messages={messages}
        />
    );
}

function Email() {
    const EmailPage = WithTitle(WithNavbar(AuthForm(MainContent)));
    return <EmailPage title={"Reset Password"} />;
}

export default Email;