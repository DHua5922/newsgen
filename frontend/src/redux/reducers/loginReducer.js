import { redux } from "../../constants";

export const initialLoginState = {
    usernameOrEmail: "",
    password: ""
};

export default function loginReducer(state = initialLoginState, action) {
    const { type, payload } = action;

    let updatedState = state;
    if(type === redux.UPDATE_USERNAME_OR_EMAIL) {
        const { usernameOrEmail, ...props } = state;
        updatedState = {
            usernameOrEmail: payload,
            ...props
        };
    } else if (type === redux.UPDATE_PASSWORD) {
        const { password, ...props } = state;
        updatedState = {
            password: payload,
            ...props
        };
    }

    return updatedState;
}