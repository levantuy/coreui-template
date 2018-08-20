import { CALL_API  } from 'redux-api-middleware';
import { withAuth } from '../reducers';
import { api_url } from '../utils/api-config';

//users
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

//Action to call update with extended description 
export function fetchUsers(pageIndex, pageSize) {
  return {
    [CALL_API]: {
      method: 'GET',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      endpoint: `${api_url}/users/filter?pageIndex=${pageIndex}&pageSize=${pageSize}`,    
      types: [
        FETCH_USERS,
        FETCH_USERS_SUCCESS,
        FETCH_USERS_FAILURE
      ],
      // body: params
    }
  }
}

