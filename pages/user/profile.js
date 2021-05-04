import { Button } from "react-bootstrap";
import loadActions from "../../src/redux/actions/loadAction";
import signUpActions from "../../src/redux/actions/signUpAction";
import profileActions from "../../src/redux/actions/profileAction";
import { userServices } from "../../src/services/user/UserService";
import MyForm from "../../src/components/view/MyForm";
import Field from "../../src/components/view/Field";
import { ErrorMessage } from "../../src/components/view/ErrorMessage";
import { Loader } from "../../src/components/view/Loader";
import useSWR from "swr";
import { apiLink, pageLink } from "../../src/constants";
import ConfirmationPrompt from "../../src/components/view/ConfirmationPrompt";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import UserPage from "../../src/components/view/UserPage";
import tw, { styled } from "twin.macro";
import WithLoading from "../../src/components/view/WithLoading";

const fetcher = (url) => userServices.getProfile();
const Container = styled.div`
    max-width: 400px;
    ${tw`m-auto`}
    margin-top: 20vh;
`;

function useProfileForm() {
    const dispatch = useDispatch();
    
    const { username, email } = useSelector(state => state.signUpReducer);
    const { data, error } = useSWR(apiLink.getProfile, fetcher);
    const { successMsgs, errorMsgs, pending } = useSelector(state => state.loadReducer);
    
    const { 
        username_success, 
        username_error, 
        email_success, 
        email_error 
    } = successMsgs;

    if(username === "" && email === "" && data) {
        const { username, email } = data.data;
        dispatch(signUpActions.updateUsername(username));
        dispatch(signUpActions.updateEmail(email));
        dispatch(loadActions.success([]));
    }
  
    const header = {
        children: "Profile"
    };

    const fields = [
            {
                label: {
                    children: "Username"
                },
                input: {
                    value: username,
                    onChange: (evt) => dispatch(signUpActions.updateUsername(evt.target.value))
                },
                successMsgs: username_success,
                errorMsgs: username_error,
            },
            {
                label: {
                    children: "Email"
                },
                input: {
                    type: "email",
                    value: email,
                    onChange: (evt) => dispatch(signUpActions.updateEmail(evt.target.value))
                },
                successMsgs: email_success,
                errorMsgs: email_error,
            }
        ].map((field, index) => (
            <div key={index} tw="mt-3">
                <Field {...field} />
            </div>
        ));

    const buttons = [
            {
                props: {
                    variant: "primary",
                    onClick: () => {
                        dispatch(loadActions.pending());
                        userServices.updateProfile({ username, email })
                            .then(success => dispatch(loadActions.success(success.data)))
                            .catch(() => dispatch(loadActions.fail(["There was a problem updating your profile. Please try again."])))
                    }
                },
                children: "Update profile"
            }
        ].map((button, index) => {
            const { props, children } = button;
            return (
                <Button {...props} key={index} tw="w-full">
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

    const ProfileForm = () => (
        <MyForm
            header={header}
            fields={fields}
            buttons={buttons}
            messages={messages}
        />
    );
    const ProfileContent = WithLoading(ProfileForm);
    return (
        <ProfileContent 
            error={error ? { message: "Cannot load profile" } : null}
            loading={!data ? { message: "" } : null} 
        />
    );
}

const Header = styled.h2`
    font-size: 2rem;
`;
const Description = styled.p`
    ${tw`py-2 mb-3`}
`;
function useDeleteForm() {
    const dispatch = useDispatch();
    return (
        <>
            <Header>Delete Account</Header>
            <hr />
            <Description>You cannot undo this action. Please be sure about this.</Description>
            <Button 
                variant="danger" 
                onClick={() => dispatch(profileActions.showAskPrompt(true))}
                tw="w-full"
            >
                Delete Account
            </Button>
            {useDeletePrompt()}
        </>
    );
}

function useDeletePrompt() {
    const dispatch = useDispatch();
    const router = useRouter();

    const { pending } = useSelector(state => state.loadReducer);
    const { showAskPrompt, deleteError } = useSelector(state => state.profileReducer);

    const modal = {
        show: showAskPrompt,
        onHide: () => dispatch(profileActions.showAskPrompt(false)),
    };

    const header = {
        children: "Delete Account?",
    };

    const body = {
        children: <>
            Are you sure you want to delete your account? You cannot undo this.
            {
                pending &&
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
                        onClick: () => dispatch(profileActions.showAskPrompt(false)),
                    },
                    children: "Cancel"
                },
                {
                    props: {
                        variant: "danger",
                        onClick: () => {
                            dispatch(loadActions.pending());
                            userServices
                                .deleteAccount()
                                .then(() => router.push(pageLink.home))
                                .catch(error => dispatch(profileActions.deleteError(error.response)))
                        },
                    },
                    children: "Delete Account"
                },
            ].map(button => <Button {...button.props}>{button.children}</Button>)
    };

    return (
        <ConfirmationPrompt
            modal={modal}
            header={header}
            body={body}
            footer={footer}
        />
    );
}

export default function Profile() {
    const MainContent = () => (
        <Container>
            {useProfileForm()}
            <div tw="my-20" />
            {useDeleteForm()}
        </Container>
    );
    const Page = UserPage(MainContent);
    return <Page title="Profile" />;
}