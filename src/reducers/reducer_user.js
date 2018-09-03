import * as user from '../actions/action_user'
import moment from 'moment';

const initialState = {
    userState: {
        users: undefined,
        user: undefined,
        errors: undefined,
        loading: true,
        totalSize: 0,
        page: 1,
        sizePerPage: 10,
        isModal: false
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case user.FETCH_USERS:
            return {
                ...state, userState: {                    
                    loading: true,
                    isModal: false
                }
            };
        case user.FETCH_USERS_SUCCESS:
            return {
                ...state, userState: {
                    users: action.payload.users,                    
                    totalSize: action.payload.totalSize,
                    page: action.payload.page,
                    sizePerPage: action.payload.sizePerPage,                    
                    loading: false,
                    isModal: false
                }
            };
        case user.FETCH_USERS_FAILURE:
            return {
                ...state, userState: {
                    errors: action.payload.message,
                    loading: false,
                    isModal: false
                }
            };
        case user.USERS_CREATE:
            return {
                ...state, userState: {
                    user: {
                        id: 0,
                        fullname: '',
                        username: '',
                        password_question: '',
                        password_answer: '',
                        tel: '',
                        email: '',
                        birthday: moment(),
                        is_approved: false,
                        is_locked: false
                    },
                    loading: false,
                    isModal: true
                }
            };        
        case user.USERS_ADD_REQUEST:
            return {
                ...state, userState: {
                    errors: undefined,
                    loading: true,
                    isModal: false
                }
            };            
        case user.USERS_ADD_SUCCESS:
            return {
                ...state, userState: {
                    user: action.payload.user,
                    errors: undefined,
                    loading: false,
                    isModal: false
                }
            };
        case user.USERS_ADD_FAILURE:
            return {
                ...state, userState: {
                    errors: action.payload.message,
                    loading: false,
                    isModal: false
                }
            };
        case user.USERS_EDIT_REQUEST:
            return {
                ...state, userState: {
                    loading: true,
                    isModal: false
                }
            };
        case user.USERS_EDIT_SUCCESS:
            return {
                ...state, userState: {
                    user: action.payload.user,
                    errors: undefined,
                    loading: false,
                    isModal: false
                }
            };
        case user.USERS_EDIT_FAILURE:
            return {
                ...state, userState: {
                    errors: action.payload.message,
                    loading: false,
                    isModal: false
                }
            };
        case user.USERS_DELETE_REQUEST:
            return {
                ...state, userState: {
                    loading: true,
                    isModal: false
                }
            };            
        case user.USERS_DELETE_SUCCESS:
            return {
                ...state, userState: {
                    errors: undefined,
                    loading: false,
                    isModal: false
                }
            };
        case user.USERS_DELETE_FAILURE:
            return {
                ...state, userState: {
                    errors: action.payload.message,
                    loading: false,
                    isModal: false
                }
            };
        case user.USERS_GET_REQUEST:
            return {
                ...state, userState: {
                    loading: true,
                    isModal: false
                }
            };
        case user.USERS_GET_SUCCESS:
            return {
                ...state, userState: {
                    user: action.payload.user,
                    errors: undefined,
                    loading: false,
                    users: state.users,
                    isModal: true
                }
            };
        case user.USERS_GET_FAILURE:
            return {
                ...state, userState: {
                    errors: action.payload.message,
                    loading: false,
                    isModal: false
                }
            };

        default:
            return state
    }
}