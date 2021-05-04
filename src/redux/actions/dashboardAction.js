import { redux } from "../../constants";

const dashboardActions = {
    updateFavNews: (list) => {
        return {
            type: redux.UPDATE_FAV_NEWS,
            payload: list,
        }
    },
    setNewsToDelete: (news) => {
        return {
            type: redux.SET_NEWS_TO_DELETE,
            payload: news,
        }
    },
    setAll: (all) => {
        return {
            type: redux.SET_ALL,
            payload: all,
        }
    },
    reset: () => {
        return {
            type: redux.RESET_DASHBOARD
        }
    }
};

export default dashboardActions;