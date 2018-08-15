// import jwtDecode from 'jwt-decode'
import * as auth from '../actions/action_auth'

const initialState = {
  access: undefined,
  refresh: undefined,
  errors: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case auth.LOGIN_SUCCESS:
      return {
        access: {
          token: action.payload.token.Token,
          expiration: action.payload.token.Expiration
        },
        refresh: {
          token: action.payload.token.Token,
          expiration: action.payload.token.Expiration
        },
        errors: {}
      }
    case auth.TOKEN_RECEIVED:
      return {
        ...state,
        access: {
          token: action.payload.token.Token,
          expiration: action.payload.token.Expiration
        }
      }
    case auth.LOGOUT_SUCCESS:
    case auth.LOGIN_FAILURE:
    case auth.TOKEN_FAILURE:
      return {
        access: undefined,
        refresh: undefined,
        errors: {},
      }
    default:
      return state
  }
}

export function accessToken(state) {
  if (state.access) {
    return state.access.token
  }
}

export function isAccessTokenExpired(state) {
  if (state.access && state.access.expiration) {
    return 1000 * state.access.expiration - (new Date()).getTime() < 5000
  }
  return true
}

export function refreshToken(state) {
  if (state.refresh) {
    return state.refresh.token
  }
}

export function isRefreshTokenExpired(state) {
  if (state.refresh && state.refresh.expiration) {
    return 1000 * state.refresh.expiration - (new Date()).getTime() < 5000
  }
  return true
}

export function isAuthenticated(state) {
  return !isRefreshTokenExpired(state)
}

export function errors(state) {
  return state.errors
}
