import * as user from '../actions/action_user'

const initialState = {
    userState: {
        users: undefined,
        user: undefined,
        errors: {},
        loading: true
    }    
}

export default (state = initialState, action) => {
    switch (action.type) {
        case user.FETCH_USERS:
            return { ...state, userState: {  users: undefined, user: undefined, errors: {}, loading: true }};
        case user.FETCH_USERS_SUCCESS:
            return { ...state, userState: {
                users: action.payload.users,
                user: undefined,
                errors: {},
                loading: false
            }};
        case user.FETCH_USERS_FAILURE:
            return { ...state, userState: {
                users: undefined,
                user: undefined,
                errors: {},
                loading: false
            }};
        default:
            return state
    }
}