import { redux } from "../../constants";

const signUpActions = {
    updateUsername: (username) => {
        return {
            type: redux.UPDATE_USERNAME,
            payload: username
        };
    },
    updateEmail: (email) => {
        return {
            type: redux.UPDATE_EMAIL,
            payload: email
        };
    },
    updatePassword: (password) => {
        return {
            type: redux.UPDATE_PASSWORD,
            payload: password
        };
    },
    updateCPassword: (cpassword) => {
        return {
            type: redux.UPDATE_CPASSWORD,
            payload: cpassword
        };
    }
};

export default signUpActions;