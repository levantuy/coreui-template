import Axios from 'axios';
import { withAuth } from '../reducers';
import { api_url } from '../utils/api-config';

//users
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Sync Action
export const fetchUsersSuccess = (users) => {
    return {
        type: 'FETCH_USERS_SUCCESS',
        users
    }
};

//Async Action
export const fetchUsers = (pageIndex, pageSize) => {
    // Returns a dispatcher function
    // that dispatches an action at a later time
    return (dispatch) => {
        // Returns a promise    
        var config = {
            headers: withAuth({ 'Content-Type': 'application/json' })
        };

        return Axios.get(
            `${api_url}/users/filter?pageIndex=${pageIndex}&pageSize=${pageSize}`,
            // bodyParameters,
            config
        ).then((response) => {
            // Dispatch another action
            // to consume data
            dispatch(fetchUsersSuccess(response.data));
        }).catch((error) => {
            throw (error);
        });
    };
};