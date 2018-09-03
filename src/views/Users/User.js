import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Label, Row, Col, FormGroup } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { usersAdd, usersEdit, fetchUsers } from '../../actions/action_user';
import { connect } from 'react-redux';
import moment from 'moment';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      fullname: '',
      username: '',
      password_question: '',
      password_answer: '',
      tel: '',
      email: '',
      birthday: moment(),
      is_approved: false,
      is_locked: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
  }

  componentDidMount() {
    if (this.props.userState.user)
      this.setState({
        id: this.props.userState.user.Id,
        fullname: this.props.userState.user.Fullname,
        username: this.props.userState.user.User_name,
        password_question: this.props.userState.user.Password_question,
        password_answer: this.props.userState.user.Password_answer,
        tel: this.props.userState.user.Tel,
        email: this.props.userState.user.Email,
        birthday: this.props.userState.user.Birthday,
        is_approved: this.props.userState.user.Is_approved,
        is_locked: this.props.userState.user.Is_lock
      });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  toggleLarge() {
    this.props.fetchUsers(1, 10, '', '', '', '');
  }

  saveUser() {
    let data = {
      Id: this.state.id,
      Fullname: this.state.fullname,
      User_name: this.state.username,
      Password_question: this.state.password_question,
      Password_answer: this.state.password_answer,
      Tel: this.state.tel,
      Email: this.state.email,
      Birthday: this.state.birthday,
      Is_approved: this.state.is_approved,
      Is_lock: this.state.is_locked
    };

    if (this.state.id > 0) this.props.usersEdit(data);
    else this.props.usersAdd(data);
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.userState.isModal} toggle={this.toggleLarge}
          className={'modal-lg ' + this.props.className}>
          <ModalHeader toggle={this.toggleLarge}>Update user</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="fullname">Full name</Label>
                  <Input type="text" id="full_name" name="fullname" placeholder="Enter your full name" defaultValue={this.props.userState.user.Fullname} onChange={this.handleInputChange} required />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="username">User name</Label>
                  <Input type="text" id="username" name="username" placeholder="Enter user name" defaultValue={this.props.userState.user.User_name} onChange={this.handleInputChange} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="password_question">Password question</Label>
                  <Input type="text" id="password_question" name="password_question" placeholder="Enter your password question" defaultValue={this.props.userState.user.Password_question} onChange={this.handleInputChange} required />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="password_answer">Password answer</Label>
                  <Input type="text" id="password_answer" name="password_answer" placeholder="Enter password answer" defaultValue={this.props.userState.user.Password_answer} onChange={this.handleInputChange} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="tel">Tel</Label>
                  <Input type="text" id="tel" name="tel" placeholder="Enter tel" defaultValue={this.props.userState.user.Tel} onChange={this.handleInputChange} required />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input type="text" id="email" name="email" placeholder="Enter email" defaultValue={this.props.userState.user.Email} onChange={this.handleInputChange} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="birthday">Birthday</Label>
                  <DatePicker id="birthday" name="birthday" className="form-control"
                    dateFormat="DD/MM/YYYY"
                    todayButton={"hôm nay"}
                    selected={moment(this.state.birthday)}
                    onChange={(date) => { this.setState({ birthday: date }) }}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select" />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup check className="checkbox">
                  <Input className="form-check-input" type="checkbox" id="is_approved" name="is_approved" defaultChecked={this.props.userState.user.Is_approved} onChange={() => { this.setState({ is_approved: !this.state.is_approved }) }} required />
                  <Label check className="form-check-label" htmlFor="is_approved">Is approved</Label>
                </FormGroup>
                <FormGroup check className="checkbox">
                  <Input className="form-check-input" type="checkbox" id="is_locked" name="is_locked" defaultChecked={this.props.userState.user.Is_locked} onChange={() => { this.setState({ is_locked: !this.state.is_locked }) }} required />
                  <Label check className="form-check-label" htmlFor="is_locked">Is locked</Label>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.saveUser.bind(this)}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggleLarge}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userState: state.userReducer.userState
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (page, sizePerPage, fullname, user_name, tel, email) => {
      dispatch(fetchUsers(page, sizePerPage, fullname, user_name, tel, email));
    },usersAdd: (user) => {
      dispatch(usersAdd(user));
    }, usersEdit: (user) => {
      dispatch(usersEdit(user));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
