import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
import { API_ROOT } from '../api-config';
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
        endpoint: `${API_ROOT}/accounts`,
        method: 'POST',
        body: JSON.stringify({UserName: username, Password: password}),
        headers: { 'Content-Type': 'application/json' },
        types: [
            LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
        ]
    }
})

export const logout = () => ({
    [RSAA]: {
        endpoint: `${API_ROOT}/accounts/logout`,
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
        ]
    }
})

export const refreshAccessToken = (token) => ({
    [RSAA]: {
        endpoint: `${API_ROOT}/accounts`,
        method: 'POST',
        body: JSON.stringify({UserName: 'admin', Password: '123456'}),
        headers: { 'Content-Type': 'application/json' },
        types: [
          TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE
        ]
    }
})


