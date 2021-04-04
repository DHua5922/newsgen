import { useRouter } from 'next/router';
import { pageLink } from '../../src/constants';
import signUpActions from "../../src/redux/actions/signUpAction";
import loadActions from "../../src/redux/actions/loadAction";
import MyForm from "../../src/components/view/MyForm";
import { Button } from 'react-bootstrap';
import Field from '../../src/components/view/Field';
import { userServices } from "../../src/services/user/UserService";
import WithTitle from '../../src/components/view/WithTitle';
import WithNavbar from '../../src/components/view/WithNavbar';
import AuthForm from '../../src/components/view/AuthForm';
import { useDispatch, useSelector } from "react-redux";
import useMessages from '../../src/custom-hooks/useMessages';

const header = {
    children: "Reset Password",
};

function useFields() {
    const { password, cpassword } = useSelector(state => state.signUpReducer);
    const dispatch = useDispatch();

    return [
        {
            label: {
                children: "New Password",
            },
            input: {
                type: "password",
                value: password,
                onChange: (evt) => dispatch(signUpActions.updatePassword(evt.target.value)),
            }
        },
        {
            label: {
                children: "Confirm New Password"
            },
            input: {
                type: "password",
                value: cpassword,
                onChange: (evt) => dispatch(signUpActions.updateCPassword(evt.target.value)),
            },
        },
    ];
}

function useButtons() {
    const fieldValues = useSelector(state => state.signUpReducer);
    const dispatch = useDispatch();
    const router = useRouter();
    const { asPath } = router;

    function resetPassword() {
        dispatch(loadActions.pending());
        const queryStartString = "?token=";
        userServices.resetPassword({
            ...fieldValues, 
            token: asPath.substring(asPath.indexOf(queryStartString) + queryStartString.length)
        })
            .then(() => {
                dispatch(loadActions.success([]));
                router.push(pageLink.login);
            })
            .catch(error => {
                const response = error.response;
                if(response && response.status === 400)
                    dispatch(loadActions.fail(response.data));
                else
                    dispatch(loadActions.fail([{message: "There was a problem resetting your password. Please try again."}]));
            })
    }

    return [
        {
            props: {
                variant: "primary",
                onClick: () => resetPassword()
            },
            children: "Reset Password"
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
    const messages = useMessages(successMsgs, errorMsgs, pending, "Resetting password. Please wait.");

    return (
        <MyForm
            header={header}
            fields={fields}
            buttons={buttons}
            messages={messages}
        />
    );
}

function Reset() {
    const EmailPage = WithTitle(WithNavbar(AuthForm(MainContent)));
    return <EmailPage title={"Reset Password"} />;
}

export default Reset;