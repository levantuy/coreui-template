import { connect } from 'react-redux';
import { logout } from '../actions/action_auth';
import LogoutForm from '../views/Pages/Logout/Logout';
import { authErrors, isAuthenticated } from '../reducers/index';

const mapStateToProps = (state) => ({
  errors: authErrors(state),
  isAuthenticated: isAuthenticated(state)
})

const mapDispatchToProps = (dispatch) => {
  return {
    // fetch token
    logout: () => {
      dispatch(logout());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutForm);