export interface ParamTypes {
    id: string
}

export interface UserPostsItemsInterfaces {
    userId: number,
    id: number,
    title: string
    body: string
}

export interface CommentsInterface {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

export interface UsersListItemsInterfaces {
    id: number,
    name: string,
    username: string,
    email: string,
}

export interface ModalWindowProps {
    id: string,
    title: string,
    body: string,
    handleModalClose: () => void,
    submitForm: ( titleText: string, titleBody: string) => void
}

export interface UserPostsState {
    postsList: UserPostsItemsInterfaces[]
}

export interface PostsStateProps {
    posts: UserPostsItemsInterfaces[]
}

export interface PostsDispatchProps {
    setPostsList: ( posts: UserPostsItemsInterfaces[]) => void,
    addNewPost: ( post: UserPostsItemsInterfaces) => void
}

export type UserPostsProps = PostsStateProps & PostsDispatchProps

export interface PostsState {
    postsReducer: UserPostsState
}

export interface UserPostsAction {
    type: string,
    posts: UserPostsItemsInterfaces[],
    post: UserPostsItemsInterfaces,
    id: number
}

export interface UsersListState {
    usersList: UsersListItemsInterfaces[]
}

export interface UsersStateProps {
    users: UsersListItemsInterfaces[]
}

export interface UsersDispatchProps {
    setUsersList: ( users: UsersListItemsInterfaces[] ) => void
}

export type UsersListProps = UsersStateProps & UsersDispatchProps

export interface UsersState {
    usersReducer: UsersListState
}

export interface UsersListActions {
    type: string,
    users: UsersListItemsInterfaces[]
}

export interface CommentsStateProps {
    posts: UserPostsItemsInterfaces[]
    comments: CommentsInterface[]
}

export interface CommentsDispatchProps {
    setCommentsList: ( comments:CommentsInterface[] ) => void,
    editPostById: ( id: number, post: UserPostsItemsInterfaces) => void,
    deletePostById: ( id: number ) => void
}

export type PostCommentsProps = CommentsStateProps & CommentsDispatchProps

export interface CommentsState {
    commentsList: CommentsInterface[]
}

export interface PostCommentsState {
    postsReducer: UserPostsState,
    commentsReducer:  CommentsState
}

export interface CommentsActionInterface {
    type: string,
    comments: CommentsInterface[]
}

