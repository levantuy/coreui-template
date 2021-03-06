import { connect } from 'react-redux';
import { fetchUsers, usersAdd, usersEdit, usersDelete, usersGet, usersOpenModal } from '../actions/action_user';
import UsersForm from '../views/Users/Users';

const mapStateToProps = (state) => ({
  userState: state.userReducer.userState
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (page, sizePerPage, fullname, user_name, tel, email) => {
      dispatch(fetchUsers(page, sizePerPage, fullname, user_name, tel, email));
    }, usersAdd: (user) =>{
      dispatch(usersAdd(user));
    }, usersEdit: (user) =>{
      dispatch(usersEdit(user));
    }, usersDelete: (id) =>{
      dispatch(usersDelete(id));
    }, usersGet: (id) =>{
      dispatch(usersGet(id));
    }, usersOpenModal: () =>{
      dispatch(usersOpenModal());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersForm);