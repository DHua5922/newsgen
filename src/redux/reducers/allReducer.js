import { combineReducers } from "redux";
import loadReducer from "./loadReducer";
import loginReducer from "./loginReducer";
import signUpReducer from "./signUpReducer";

const allReducer = combineReducers({
    loadReducer: loadReducer,
    loginReducer: loginReducer,
    signUpReducer: signUpReducer
});

export default allReducer;