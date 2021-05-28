import { redux } from "../../constants";

const profileActions = {
    showAskPrompt: (showPrompt) => {
        return {
            type: redux.SHOW_PROMPT,
            payload: showPrompt,
        };
    },
    deleteError: (error) => {
        return {
            type: redux.DELETE_PROFILE,
            payload: error,
        };
    },
};

export default profileActions;