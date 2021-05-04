import { combineReducers } from "redux";
import loadReducer from "./loadReducer";
import loginReducer from "./loginReducer";
import signUpReducer from "./signUpReducer";
import profileReducer from "./profileReducer";
import dashboardReducer from "./dashboardReducer";

const allReducer = combineReducers({
    loadReducer,
    loginReducer,
    signUpReducer,
    profileReducer,
    dashboardReducer,
});

export default allReducer;