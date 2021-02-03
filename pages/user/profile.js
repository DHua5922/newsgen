import { useReducer, useState } from "react";
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
import { apiLink, pageLink } from "../../src/constants";
import ConfirmationPrompt from "../../src/components/view/ConfirmationPrompt";
import { useRouter } from 'next/router';
import styled from "styled-components";
import { styles } from "../../styles/globals";
import profileReducer, { initialProfileState } from "../../src/redux/reducers/profileReducer";
import profileActions from "../../src/redux/actions/profileAction";

const fetcher = (url) => userServices.getProfile();
const Container = styled.div`
    ${styles.form}
    padding-top: 20vh;
    padding-left: 100px;
`;

export default function Profile() {
    const [loadState, dispatchLoadState] = useReducer(loadReducer, initialLoadState);
    const [fieldValues, dispatchFields] = useReducer(signUpReducer, initialSignUpState);
    const [profileState, dispatchProfileState] = useReducer(profileReducer, initialProfileState);

    const router = useRouter();

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
        const header = {
            children: "Profile"
        };

        const { successMsgs, errorMsgs, pending } = loadState;

        const fields = [
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
            ));

        const buttons = [
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
            });
            
        const messages = {
            success: [],
            error: errorMsgs,
            pending: {
                isPending: pending,
                message: "Updating your profile. Please wait." 
            }
        };

        componentToRender = (
            <MyForm
                header={header}
                fields={fields}
                buttons={buttons}
                messages={messages}
            />);
    }

    const { showAskPrompt, deleteError } = profileState;

    const modal = {
        show: showAskPrompt,
        onHide: () => dispatchProfileState(profileActions.showAskPrompt(false)),
    };

    const header = {
        children: "Delete Account?",
    };

    const body = {
        children: <>
            Are you sure you want to delete your account? You cannot undo this.
            {
                loadState.pending &&
                    <Loader message={"Deleting your account..."} />
            }
            {
                deleteError && 
                    <ErrorMessage
                        message={"There was a problem deleting your account. Please try again."}
                    />
            }
        </>
    };

    const footer = {
        children: [
                {
                    props: {
                        variant: "primary",
                        onClick: () => dispatchProfileState(profileActions.showAskPrompt(false)),
                    },
                    children: "Cancel"
                },
                {
                    props: {
                        variant: "danger",
                        onClick: () => {
                            dispatchLoadState(loadActions.pending());
                            userServices
                                .deleteAccount()
                                .then(() => router.push(pageLink.home))
                                .catch(error => dispatchProfileState(profileActions.deleteError(error.response)))
                        },
                    },
                    children: "Delete Account"
                },
            ].map(button => <Button {...button.props}>{button.children}</Button>)
    };

    return (
        <>
            <Sidenav />
            <Container>
                {componentToRender}
                <h2>Delete Account</h2>
                <hr />
                <p>You cannot undo this action. Please be sure about this.</p>
                <Button 
                    variant="danger" 
                    onClick={() => dispatchProfileState(profileActions.showAskPrompt(true))}
                >
                    Delete Account
                </Button>
                <ConfirmationPrompt
                    modal={modal}
                    header={header}
                    body={body}
                    footer={footer}
                />
            </Container>
        </>
    );
}