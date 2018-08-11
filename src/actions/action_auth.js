import { RSAA } from 'redux-api-middleware';
// login
export const LOGIN_REQUEST = '@@jwt/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@jwt/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@jwt/LOGIN_FAILURE';
// token
export const TOKEN_REQUEST = '@@jwt/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@jwt/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@jwt/TOKEN_FAILURE';

const ROOT_URL = 'https://obscure-atoll-39265.herokuapp.com';
export const fetchToken = (username, password) => ({
    [RSAA]: {
        endpoint: `${ROOT_URL}/users/register`,
        method: 'POST',
        body: JSON.stringify({username: username, password: password}),
        headers: { 'Content-Type': 'application/json' },
        types: [
            LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
        ]
    }
})

export const refreshAccessToken = (token) => ({
    [RSAA]: {
        endpoint: `${ROOT_URL}/users/register`,
        method: 'POST',
        body: JSON.stringify({username: 'admin', password: '123456'}),
        headers: { 'Content-Type': 'application/json' },
        types: [
          TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE
        ]
    }
})


