import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers';
import { API_ROOT } from '../api-config';

//users
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsers = () => ({
  [RSAA]: {
    endpoint: `${API_ROOT}/users`,    
    method: 'GET',
    headers: withAuth({ 'Content-Type': 'application/json' }),
    types: [
      FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE
    ]
  }
});

