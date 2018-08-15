import { connect } from 'react-redux';
import { fetchUsers } from '../actions/action_user';
import UsersForm from '../views/Users/Users';

const mapStateToProps = (state) => ({
  userState: state.userReducer.userState
})

const mapDispatchToProps = (dispatch) => {
  return {
    // fetch token
    fetchUsers: (page, sizePerPage) => {
      dispatch(fetchUsers(page, sizePerPage));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersForm);