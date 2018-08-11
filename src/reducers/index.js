import { combineReducers } from 'redux';
import auth, * as fromAuth from './reducer_auth';

const rootReducer = combineReducers({  
  authReducer: auth
});
export default rootReducer

export const accessToken = state => fromAuth.accessToken(state.authReducer)
export const isAuthenticated = state => fromAuth.isAuthenticated(state.authReducer)
export const isAccessTokenExpired = state => fromAuth.isAccessTokenExpired(state.authReducer)
export const refreshToken = state => fromAuth.refreshToken(state.authReducer)
export const isRefreshTokenExpired = state => fromAuth.isRefreshTokenExpired(state.authReducer)
export const authErrors = state => fromAuth.errors(state.authReducer)

export function withAuth(headers={}) {
  return (state) => ({
    ...headers,
    'x-access-token': `${accessToken(state)}`
  })
}
