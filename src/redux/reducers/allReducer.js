import { combineReducers } from "redux";
import loadReducer from "./loadReducer";
import loginReducer from "./loginReducer";
import signUpReducer from "./signUpReducer";
import profileReducer from "./profileReducer";

const allReducer = combineReducers({
    loadReducer: loadReducer,
    loginReducer: loginReducer,
    signUpReducer: signUpReducer,
    profileReducer: profileReducer,
});

export default allReducer;