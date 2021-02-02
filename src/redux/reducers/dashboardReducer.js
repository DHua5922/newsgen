import { redux } from "../../constants";

export const initialDashboardState = {
    newsToDelete: null,
    favNews: null,
};

export default function dashboardReducer(state = initialDashboardState, action) {
    const { type, payload } = action;

    let updatedState = state;
    if(type === redux.UPDATE_FAV_NEWS) {
        const { favNews, ...props } = state;
        updatedState = {
            favNews: payload,
            ...props
        };
    } else if(type === redux.SET_NEWS_TO_DELETE) {
        const { newsToDelete, ...props } = state;
        updatedState = {
            newsToDelete: payload,
            ...props
        };
    } else if(type === redux.SET_ALL) {
        updatedState = {...payload}
    }

    return updatedState;
}