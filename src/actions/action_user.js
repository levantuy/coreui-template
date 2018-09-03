import { CALL_API } from 'redux-api-middleware';
import { withAuth } from '../reducers';
import { api_url } from '../utils/api-config';

// get users
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
// users add
export const USERS_CREATE = 'USERS_CREATE';
export const USERS_ADD_REQUEST = 'USERS_ADD_REQUEST';
export const USERS_ADD_SUCCESS = 'USERS_ADD_SUCCESS';
export const USERS_ADD_FAILURE = 'USERS_ADD_FAILURE';
// users edit
export const USERS_EDIT_REQUEST = 'USERS_EDIT_REQUEST';
export const USERS_EDIT_SUCCESS = 'USERS_EDIT_SUCCESS';
export const USERS_EDIT_FAILURE = 'USERS_EDIT_FAILURE';
// users delete
export const USERS_DELETE_REQUEST = 'USERS_DELETE_REQUEST';
export const USERS_DELETE_SUCCESS = 'USERS_DELETE_SUCCESS';
export const USERS_DELETE_FAILURE = 'USERS_DELETE_FAILURE';
// user get
export const USERS_GET_REQUEST = 'USERS_GET_REQUEST';
export const USERS_GET_SUCCESS = 'USERS_GET_SUCCESS';
export const USERS_GET_FAILURE = 'USERS_GET_FAILURE';

export function fetchUsers(pageIndex, pageSize, fullname = '', user_name = '', tel = '', email = '') {
  return {
    [CALL_API]: {
      method: 'GET',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      endpoint: `${api_url}/users/filter?pageIndex=${pageIndex}&pageSize=${pageSize}&fullname=${fullname}&user_name=${user_name}&tel=${tel}&email=${email}`,
      types: [
        FETCH_USERS_REQUEST,
        FETCH_USERS_SUCCESS,
        FETCH_USERS_FAILURE
      ],
      // body: params
    }
  }
}

export function usersAdd(user) {
  return async (dispatch, getState) => {
    const actionResponse = await dispatch({
      [CALL_API]: {
        endpoint: `${api_url}/users`,
        method: "POST",
        body: JSON.stringify(user),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [USERS_ADD_REQUEST, USERS_ADD_SUCCESS, USERS_ADD_FAILURE]
      }
    });

    if (actionResponse.error) {
      // the last dispatched action has errored, break out of the promise chain.
      throw new Error("Promise flow received action error", actionResponse);
    }

    // you can EITHER return the above resolved promise (actionResponse) here...
    //return actionResponse;

    // OR resolve another asyncAction here directly and pass the previous received payload value as argument...
    return await dispatch(fetchUsers(1, 10));
  };
}

export function usersEdit(user) {
  return async (dispatch, getState) => {
    const actionResponse = await dispatch({
      [CALL_API]: {
        endpoint: `${api_url}/users/${user.Id}`,
        method: 'PUT',
        body: JSON.stringify(user),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [USERS_EDIT_REQUEST, USERS_EDIT_SUCCESS, USERS_EDIT_FAILURE]
      }
    });

    if (actionResponse.error) {
      // the last dispatched action has errored, break out of the promise chain.
      throw new Error("Promise flow received action error", actionResponse);
    }

    // you can EITHER return the above resolved promise (actionResponse) here...
    //return actionResponse;

    // OR resolve another asyncAction here directly and pass the previous received payload value as argument...
    return await dispatch(fetchUsers(1, 10));
  };
}

export function usersDelete(id) {
  return async (dispatch, getState) => {
    const actionResponse = await dispatch({
      [CALL_API]: {
        endpoint: `${api_url}/users/${id}`,
        method: 'DELETE',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [USERS_DELETE_REQUEST, USERS_DELETE_SUCCESS, USERS_DELETE_FAILURE]
      }
    });

    if (actionResponse.error) {
      // the last dispatched action has errored, break out of the promise chain.
      throw new Error("Promise flow received action error", actionResponse);
    }

    // you can EITHER return the above resolved promise (actionResponse) here...
    //return actionResponse;

    // OR resolve another asyncAction here directly and pass the previous received payload value as argument...
    return await dispatch(fetchUsers(1, 10));
  };
}

export function usersGet(id) {
  return async (dispatch, getState) => {
    const actionResponse = await dispatch({
      [CALL_API]: {
        endpoint: `${api_url}/users/${id}`,
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [USERS_GET_REQUEST, USERS_GET_SUCCESS, USERS_GET_FAILURE]
      }
    });

    if (actionResponse.error) {
      // the last dispatched action has errored, break out of the promise chain.
      throw new Error("Promise flow received action error", actionResponse);
    }

    // you can EITHER return the above resolved promise (actionResponse) here...
    return actionResponse;

    // OR resolve another asyncAction here directly and pass the previous received payload value as argument...
    // return await dispatch(fetchUsers(1,10));
  };
}

export function usersOpenModal() {
  return {
    type: USERS_CREATE
  }
}

