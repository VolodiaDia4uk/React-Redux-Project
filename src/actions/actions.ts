import { ActionTypes } from "../types/actionTypes";
import { UsersListItemsInterfaces, UserPostsItemsInterfaces, CommentsInterface } from "../types/interfaces";

export const setUsersList = ( users: UsersListItemsInterfaces[] ) =>{
    return {
        type: ActionTypes.SetUsersList,
        users
    }
}

export const setPostsList = ( posts: UserPostsItemsInterfaces[] ) =>{
    return {
        type: ActionTypes.SetPostsList,
        posts
    }
}

export const addNewPost = ( post: UserPostsItemsInterfaces ) =>{
    return {
        type: ActionTypes.AddNewPost,
        post
    }
}

export const setCommentsList = ( comments: CommentsInterface[] ) =>{
    return {
      type: ActionTypes.SetCommentsList,
      comments
    }
}

export const editPostById = ( id: number, post: UserPostsItemsInterfaces ) =>{
    return {
        type: ActionTypes.EditCommentById,
        post,
        id
    }
}

export const deletePostById = ( id: number ) =>{
    return{
        type: ActionTypes.DeletePostById,
        id
    }
}

