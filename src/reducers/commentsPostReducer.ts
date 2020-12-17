import {ActionTypes} from "../types/actionTypes";
import {CommentsActionInterface, CommentsState} from "../types/interfaces";

const initialState: CommentsState = {
    commentsList: []
}

const commentsReducer = ( state = initialState ,action: CommentsActionInterface ): CommentsState => {
    switch (action.type) {
        case(ActionTypes.SetCommentsList):
            return {
                ...state,
                commentsList: action.comments
            }
        default:
            return state
    }
}

export  default commentsReducer;