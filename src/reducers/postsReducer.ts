import {ActionTypes} from "../types/actionTypes";
import {UserPostsAction, UserPostsState} from "../types/interfaces";

const initialState: UserPostsState = {
    postsList: []
}

const postsReducer = ( state = initialState ,action: UserPostsAction ): UserPostsState => {
    switch (action.type) {
        case (ActionTypes.SetPostsList):
            return {
                ...state,
                postsList: action.posts
            }
        case (ActionTypes.AddNewPost):
            return {
                ...state,
                postsList: [ ...state.postsList, action.post ]
            }
        case (ActionTypes.EditCommentById):
            const updatedPostList = state.postsList.map((item)=>{
                return item.id === action.id ? action.post : item
            })
            return {
                ...state, postsList: updatedPostList
            }
        case (ActionTypes.DeletePostById):
            const filteredPostList = state.postsList.filter((item)=>{
                return item.id !== action.id
            })
            return {
                ...state,
                postsList: filteredPostList
            }
        default:
            return state
    }
}

export  default postsReducer;