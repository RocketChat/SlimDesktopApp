import { combineReducers } from "redux";
import threadReducer from "./thread.reducer";

const reducers = combineReducers({
    thread: threadReducer
});

export default reducers;
