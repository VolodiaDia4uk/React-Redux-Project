import {combineReducers} from "redux";
import postsReducer from "./postsReducer";
import usersReducer from "./usersReducer";
import commentsReducer from "./commentsPostReducer";


export const rootReducer = combineReducers({
    postsReducer,
    usersReducer,
    commentsReducer
})