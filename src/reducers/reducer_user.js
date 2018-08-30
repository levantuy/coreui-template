import * as user from '../actions/action_user'

const initialState = {
    userState: {
        users: undefined,
        user: undefined,
        errors: {},
        loading: true,
        totalSize: 0,
        page: 1,
        sizePerPage: 10,
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case user.FETCH_USERS:
            return {
                ...state, userState: {
                    users: undefined,
                    user: undefined,
                    errors: {},
                    loading: true,
                    totalSize: 0,
                    page: 1,
                    sizePerPage: 10
                }
            };
        case user.FETCH_USERS_SUCCESS:
            return {
                ...state, userState: {
                    users: action.payload.users,
                    user: undefined,
                    errors: {},
                    loading: false,
                    totalSize: action.payload.totalSize,
                    page: action.payload.page,
                    sizePerPage: action.payload.sizePerPage
                }
            };
        case user.FETCH_USERS_FAILURE:
            return {
                ...state, userState: {
                    users: undefined,
                    user: undefined,
                    errors: {},
                    loading: false,
                    totalSize: 0,
                    page: 1,
                    sizePerPage: 10
                }
            };
        case user.USERS_ADD_REQUEST:
            return {
                ...state, userState: {
                    user: undefined,
                    loading: false
                }
            };
        case user.USERS_ADD_SUCCESS:
            return {
                ...state, userState: {
                    user: action.payload.user,
                    errors: {},
                    loading: false
                }
            };
        case user.USERS_ADD_FAILURE:
            return {
                ...state, userState: {
                    user: undefined,
                    errors: action.payload.message,
                    loading: false
                }
            };            
        default:
            return state
    }
}