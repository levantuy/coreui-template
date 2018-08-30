import { connect } from 'react-redux';
import { fetchUsers, usersAdd } from '../actions/action_user';
import UsersForm from '../views/Users/Users';

const mapStateToProps = (state) => ({
  userState: state.userReducer.userState,
  token: state.authReducer.access.token
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (page, sizePerPage, fullname, user_name, tel, email) => {
      dispatch(fetchUsers(page, sizePerPage, fullname, user_name, tel, email));
    }, usersAdd: (user) =>{
      dispatch(usersAdd(user));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersForm);