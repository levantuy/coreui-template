import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchToken } from '../actions/action_auth';
import LoginForm from '../views/Pages/Login/Login';
import { authErrors, isAuthenticated } from '../reducers/index';


const Login = (props) => {
  if (props.isAuthenticated) {
    return (
      <Redirect push to="/" />
    )
  }

  return (
    <LoginForm {...props} />
  )
}

const mapStateToProps = (state) => ({
  errors: authErrors(state),
  isAuthenticated: isAuthenticated(state)
})

const mapDispatchToProps = (dispatch) => {
  return {
    // fetch token
    fetchToken: (username, password) => {
      dispatch(fetchToken(username, password));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);