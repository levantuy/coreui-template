import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
import { api_url } from '../utils/api-config';
// login
export const LOGIN_REQUEST = '@@jwt/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@jwt/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@jwt/LOGIN_FAILURE';
// token
export const TOKEN_REQUEST = '@@jwt/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@jwt/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@jwt/TOKEN_FAILURE';
// login
export const LOGOUT_REQUEST = '@@jwt/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = '@@jwt/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = '@@jwt/LOGOUT_FAILURE';

export const fetchToken = (username, password) => ({
    [RSAA]: {
        endpoint: `${api_url}/accounts`,
        method: 'POST',
        body: JSON.stringify({ UserName: username, Password: password }),
        headers: { 'Content-Type': 'application/json' },
        types: [
            {
                type: LOGIN_REQUEST,
                meta: { source: 'userList' }
            }, {
                type: LOGIN_SUCCESS,
                payload: (action, state, res) => {
                    const contentType = res.headers.get('Content-Type');
                    if (contentType && ~contentType.indexOf('json')) {
                        // Just making sure res.json() does not raise an error
                        return res.json();
                    }
                }
            }, {
                type: LOGIN_FAILURE,
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
})

export const logout = () => ({
    [RSAA]: {
        endpoint: `${api_url}/accounts/logout`,
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
        ]
    }
})

export const refreshAccessToken = (token) => ({
    [RSAA]: {
        endpoint: `${api_url}/accounts`,
        method: 'POST',
        body: JSON.stringify({ UserName: 'admin', Password: '123456' }),
        headers: { 'Content-Type': 'application/json' },
        types: [
            TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE
        ]
    }
})


