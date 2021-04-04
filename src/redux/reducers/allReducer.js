import { combineReducers } from "redux";
import loadReducer from "./loadReducer";
import loginReducer from "./loginReducer";

const allReducer = combineReducers({
    loadReducer: loadReducer,
    loginReducer: loginReducer,
});

export default allReducer;