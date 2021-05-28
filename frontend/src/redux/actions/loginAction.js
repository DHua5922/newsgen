import { redux } from "../../constants";

const loginActions = {
    updateUsernameOrEmail: (usernameOrEmail) => {
        return {
            type: redux.UPDATE_USERNAME_OR_EMAIL,
            payload: usernameOrEmail
        };
    },
    updatePassword: (password) => {
        return {
            type: redux.UPDATE_PASSWORD,
            payload: password
        };
    }
};

export default loginActions;