import { useReducer } from "react";
import { Button } from "react-bootstrap";
import loadActions from "../../src/redux/actions/loadAction";
import signUpActions from "../../src/redux/actions/signUpAction";
import signUpReducer, { initialSignUpState } from "../../src/redux/reducers/signUpReducer";
import loadReducer, { initialLoadState } from "../../src/redux/reducers/loadReducer";
import { userServices } from "../../src/services/user/UserService";
import MyForm from "../../src/components/view/MyForm";
import Field from "../../src/components/view/Field";
import Sidenav from "../../src/components/view/Sidenav";
import { ErrorMessage } from "../../src/components/view/ErrorMessage";
import { Loader } from "../../src/components/view/Loader";
import useSWR from "swr";
import { apiLink } from "../../src/constants";

const fetcher = (url) => userServices.getProfile();

export default function Profile() {
    const [loadState, dispatchLoadState] = useReducer(loadReducer, initialLoadState);
    const [fieldValues, dispatchFields] = useReducer(signUpReducer, initialSignUpState);

    const { successMsgs, errorMsgs, pending } = loadState;

    const { username, email } = fieldValues;
    const { data, error } = useSWR(apiLink.getProfile, fetcher);

    if(username === "" && email === "" && data) {
        const { username, email } = data.data;
        dispatchFields(signUpActions.updateUsername(username));
        dispatchFields(signUpActions.updateEmail(email));
    }

    let componentToRender;
    if(error) {
        componentToRender = <ErrorMessage message={"Cannot load your profile. Please try again."} />;
    } else if (!data) {
        componentToRender = <Loader />;
    } else {        
        componentToRender = (
            <MyForm
                header={{
                    children: "Profile"
                }}
                fields={[
                    {
                        label: {
                            children: "Username"
                        },
                        input: {
                            value: username,
                            onChange: (evt) => dispatchFields(signUpActions.updateUsername(evt.target.value))
                        },
                        successMsgs: successMsgs.username_success,
                        errorMsgs: successMsgs.username_error,
                    },
                    {
                        label: {
                            children: "Email"
                        },
                        input: {
                            type: "email",
                            value: email,
                            onChange: (evt) => dispatchFields(signUpActions.updateEmail(evt.target.value))
                        },
                        successMsgs: successMsgs.email_success,
                        errorMsgs: successMsgs.email_error,
                    }
                ].map((field, index) => (
                    <div key={index}>
                        <Field {...field} />
                    </div>
                ))}

                buttons={[
                    {
                        props: {
                            variant: "primary",
                            onClick: () => {
                                dispatchLoadState(loadActions.pending());
                                userServices.updateProfile(fieldValues)
                                    .then(success => dispatchLoadState(loadActions.success(success.data)))
                                    .catch(() => dispatchLoadState(loadActions.fail(["There was a problem updating your profile. Please try again."])))
                            }
                        },
                        children: "Update profile"
                    }
                ].map((button, index) => {
                    const { props, children } = button;
                    return (
                        <Button {...props} block key={index}>
                            {children}
                        </Button>
                    );
                })}
                messages={{
                    success: [],
                    error: errorMsgs,
                    pending: {
                        isPending: pending,
                        message: "Updating your profile. Please wait." 
                    }
                }}
            />);
    }

    return (
        <>
            <Sidenav />
            <div style={{padding: "0 5vw"}}>{componentToRender}</div>
        </>
    );
}