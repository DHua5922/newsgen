import { redux } from "../../constants";

export const initialSignUpState = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
};

/**
 * Updates the given state based on the given action.
 * 
 * @param {any} state Given state.
 * @param {any} action Given action.
 * @return {any} Updated state.
 */
export default function signUpReducer(state = initialSignUpState, action) {
    const { type, payload } = action;

    let updatedState = state;
    if(type === redux.UPDATE_USERNAME) {
        const { username, ...props } = state;
        updatedState = {
            username: payload,
            ...props
        };
    } else if(type === redux.UPDATE_EMAIL) {
        const { email, ...props } = state;
        updatedState = {
            email: payload,
            ...props
        };
    } else if(type === redux.UPDATE_PASSWORD) {
        const { password, ...props } = state;
        updatedState = {
            password: payload,
            ...props
        };
    } else if(type === redux.UPDATE_CPASSWORD) {
        const { cpassword, ...props } = state;
        updatedState = {
            cpassword: payload,
            ...props
        };
    } 

    return updatedState;
}