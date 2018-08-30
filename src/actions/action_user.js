import { CALL_API } from 'redux-api-middleware';
import { withAuth } from '../reducers';
import { api_url } from '../utils/api-config';

// get users
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
// users add
//users
export const USERS_ADD_REQUEST = 'USERS_ADD_REQUEST';
export const USERS_ADD_SUCCESS = 'USERS_ADD_SUCCESS';
export const USERS_ADD_FAILURE = 'USERS_ADD_FAILURE';

export function fetchUsers(pageIndex, pageSize, fullname = '', user_name = '', tel = '', email = '') {
  return {
    [CALL_API]: {
      method: 'GET',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      endpoint: `${api_url}/users/filter?pageIndex=${pageIndex}&pageSize=${pageSize}&fullname=${fullname}&user_name=${user_name}&tel=${tel}&email=${email}`,
      types: [
        FETCH_USERS,
        FETCH_USERS_SUCCESS,
        FETCH_USERS_FAILURE
      ],
      // body: params
    }
  }
}

export function usersAdd(user) {
  return async(dispatch, getState) => {
    const actionResponse = await dispatch({
      [CALL_API]: {
        endpoint: `${api_url}/users`,
        method: 'POST',
        body: user,
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
          {
            type: USERS_ADD_REQUEST,
            meta: { source: 'users add' }
          }, {
            type: USERS_ADD_SUCCESS,
            payload: (action, state, res) => {
              const contentType = res.headers.get('Content-Type');
              if (contentType && ~contentType.indexOf('json')) {
                // reload users list
                dispatch(fetchUsers(1, 10,)); // <== call second action here
                // Just making sure res.json() does not raise an error
                return res.json();
              }
            }
          }, {
            type: USERS_ADD_FAILURE,
            meta: (action, state, res) => {
              if (res) {
                return {
                  status: res.status,
                  statusText: res.statusText
                };
              } else {
                return {
                  status: 'Network request failed'
                }
              }
            }
          }
        ]
      }
    });

    if (actionResponse.error) {
      // the last dispatched action has errored, break out of the promise chain.
      throw new Error("Promise flow received action error", actionResponse);
    }

    // you can EITHER return the above resolved promise (actionResponse) here...
    //return actionResponse;

    // OR resolve another asyncAction here directly and pass the previous received payload value as argument...
    return await fetchUsers(1,10);
  };
}
