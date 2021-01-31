import { useReducer, useState } from "react";
import { userServices } from "../../src/services/user/UserService";
import loadReducer, { initialLoadState } from "../../src/redux/reducers/loadReducer";
import MyForm from "../../src/components/view/MyForm";
import Field from "../../src/components/view/Field";
import { Button } from "react-bootstrap";
import loadActions from "../../src/redux/actions/loadAction";

export default function Email() {
    const [loadState, dispatchLoadState] = useReducer(loadReducer, initialLoadState);
    const [email, setEmail] = useState("");

    const { pending, errorMsgs, successMsgs } = loadState;

    return (
        <MyForm
            header={{
                children: "Reset Password"
            }}
            fields={[
                {
                    label: {
                        children: "Email",
                    },
                    input: {
                        placeholder: "abc@domain.com",
                        value: email,
                        onChange: (evt) => setEmail(evt.target.value),
                    }
                }
            ].map(field => <Field {...field} />)}

            buttons={
                <Button 
                    variant="primary"
                    block
                    onClick={() => {
                        dispatchLoadState(loadActions.pending());
                        userServices
                            .sendEmail({email: email})
                            .then(success => dispatchLoadState(loadActions.success([success.data])))
                            .catch(error => {
                                const response = error.response;
                                if(response && response.status === 400) {
                                    dispatchLoadState(loadActions.fail([response.data]));
                                } else {
                                    dispatchLoadState(loadActions.fail([{
                                        message: "There was a problem sending the link. Please try again."
                                    }]));
                                }
                            })
                    }}
                >
                    Send Email
                </Button>
            }
            messages={{
                pending: {
                    isPending: pending,
                    message: "Sending link to reset password. Please wait."
                },
                success: successMsgs,
                error: errorMsgs,
            }}
        />
    );
}