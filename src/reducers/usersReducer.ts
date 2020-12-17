import {ActionTypes} from "../types/actionTypes";
import {UsersListActions, UsersListState} from "../types/interfaces";

const initialState: UsersListState = {
    usersList: []
}

const usersReducer = ( state = initialState ,action: UsersListActions ) : UsersListState => {
    switch (action.type) {
        case(ActionTypes.SetUsersList):
            return {
                ...state,
                usersList: action.users
            }
        default:
            return state
    }
}

export  default usersReducer;