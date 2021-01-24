import { redux } from "../../constants";

const loadActions = {
    pending: () => {
        return {
            type: redux.PENDING
        };
    },
    success: (successMsgs) => {
        return {
            type: redux.SUCCESS,
            payload: successMsgs
        };
    },
    fail: (errorMsgs) => {
        return {
            type: redux.FAIL,
            payload: errorMsgs
        };
    }
};

export default loadActions;