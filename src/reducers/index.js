import { combineReducers } from 'redux';
import auth, * as fromAuth from './reducer_auth';
import user from './reducer_user';

const rootReducer = combineReducers({  
  authReducer: auth,
  userReducer: user
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
    'Authorization': `Bearer ${accessToken(state)}`
  })
}
