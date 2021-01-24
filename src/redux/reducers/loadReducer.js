import { redux } from "../../constants";

export const initialLoadState = {
    pending: false,
    errorMsgs: [],
    successMsgs: []
};

/**
 * Updates the state based on the given action.
 * 
 * @param {any} state Given state.
 * @param {any} action Given action.
 * @return {any} Updated state.
 */
export default function loadReducer(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case redux.PENDING:   
            return {
                pending: true,
                errorMsgs: [],
                successMsgs: []
            };
        case redux.SUCCESS:
            return {
                pending: false,
                errorMsgs: [],
                successMsgs: payload
            };
        case redux.FAIL:
            return {
                pending: false,
                errorMsgs: payload,
                successMsgs: []
            };
        default: 
            return state;
    }
}