import { useRouter } from 'next/router';
import { pageLink } from '../../src/constants';
import signUpActions from "../../src/redux/actions/signUpAction";
import loadActions from "../../src/redux/actions/loadAction";
import { userServices } from "../../src/services/user/UserService";
import GuestPage from '../../src/components/view/GuestPage';
import AuthContainer from '../../src/components/view/AuthContainer';
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
    const { pending, errorMsgs, successMsgs } = useSelector(state => state.loadReducer);
    const messages = useMessages(successMsgs, errorMsgs, pending, "Resetting password. Please wait.");

    return (
        <AuthContainer
            header={header}
            fields={useFields()}
            buttons={useButtons()}
            messages={messages}
        />
    );
}

function Reset() {
    const EmailPage = GuestPage(MainContent);
    return <EmailPage title={"Reset Password"} />;
}

export default Reset;