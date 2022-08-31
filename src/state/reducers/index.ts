import { combineReducers } from "redux";
import threadReducer from "./thread.reducer";
import unreadReducer from "./unread.reducer";
import openedWindowsReducer from "./openedWindows.reducer";
import userReducer from "./user.reducer";

const reducers = combineReducers({
    thread: threadReducer,
    unread: unreadReducer,
    openedWindows: openedWindowsReducer,
    user: userReducer
});

export default reducers;
