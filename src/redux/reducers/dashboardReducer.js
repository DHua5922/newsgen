import { redux } from "../../constants";

export const initialDashboardState = {
    newsToDelete: null,
    favNews: null,
};

export default function dashboardReducer(state = initialDashboardState, action) {
    const { type, payload } = action;

    if(type === redux.UPDATE_FAV_NEWS) {
        return {
            ...state,
            favNews: payload
        };
    } else if(type === redux.SET_NEWS_TO_DELETE) {
        return {
            ...state,
            newsToDelete: payload
        };
    } else if(type === redux.RESET_DASHBOARD) {
        return {
            newsToDelete: null,
            favNews: null,
        };
    } else if(type === redux.SET_ALL) {
        return {...payload};
    }

    return state;
}