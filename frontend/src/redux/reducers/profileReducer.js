import { redux } from "../../constants";

export const initialProfileState = {
    showAskPrompt: false,
    deleteError: null,
};

export default function profileReducer(state = initialProfileState, action) {
    const { type, payload } = action;

    let updatedState = state;
    if(type === redux.SHOW_PROMPT) {
        const { showAskPrompt, ...props} = state;
        updatedState = {
            showAskPrompt: payload,
            ...props,
        };
    }
    else if(type === redux.DELETE_PROFILE) {
        const { deleteError, ...props} = state;
        updatedState = {
            deleteError: payload,
            ...props,
        };
    }

    return updatedState;
}