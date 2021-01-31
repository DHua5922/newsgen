import { useRouter } from 'next/router';
import { useReducer } from 'react';
import { pageLink } from '../../src/constants';
import signUpReducer, { initialSignUpState } from "../../src/redux/reducers/signUpReducer";
import signUpActions from "../../src/redux/actions/signUpAction";
import loadReducer, { initialLoadState } from "../../src/redux/reducers/loadReducer";
import loadActions from "../../src/redux/actions/loadAction";
import MyForm from "../../src/components/view/MyForm";
import { Button } from 'react-bootstrap';
import Field from '../../src/components/view/Field';
import { userServices } from "../../src/services/user/UserService";

export default function Reset() {
    const router = useRouter();
    const { asPath } = router;

    const [fieldValues, dispatchFields] = useReducer(signUpReducer, initialSignUpState);
    const [loadState, dispatchLoadState] = useReducer(loadReducer, initialLoadState);

    const { successMsgs, errorMsgs, pending } = loadState;
    const { password, cpassword } = fieldValues;

    return (
        <MyForm 
            header={{
                children: "Reset Password",
            }}
            fields={[
                {
                    label: {
                        children: "New Password",
                    },
                    input: {
                        type: "password",
                        value: password,
                        onChange: (evt) => dispatchFields(signUpActions.updatePassword(evt.target.value)),
                    }
                },
                {
                    label: {
                        children: "Confirm New Password"
                    },
                    input: {
                        type: "password",
                        value: cpassword,
                        onChange: (evt) => dispatchFields(signUpActions.updateCPassword(evt.target.value)),
                    },
                },
            ].map(field => <Field {...field} />)}

            buttons={
                <Button 
                    variant={"primary"}
                    block
                    onClick={() => {
                        dispatchLoadState(loadActions.pending());
                        const queryStartString = "?token=";
                        userServices.resetPassword({
                            ...fieldValues, 
                            token: asPath.substring(asPath.indexOf(queryStartString) + queryStartString.length)
                        })
                            .then(() => router.push(pageLink.login))
                            .catch(error => {
                                const response = error.response;
                                if(response && response.status === 400)
                                    dispatchLoadState(loadActions.fail(response.data));
                                else
                                    dispatchLoadState(loadActions.fail([{message: "There was a problem resetting your password. Please try again."}]));
                            })
                    }}
                >
                    Reset Password
                </Button>
            }
            messages={{
                pending: {
                    isPending: pending,
                    message: "Resetting password. Please wait."
                },
                success: successMsgs,
                error: errorMsgs, 
            }}
        />
    )
}