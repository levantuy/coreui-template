import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { api_url, page_size_default, optionsGridview } from '../../utils/api-config';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Label, Row, Col, FormGroup } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Message from '../Base/Controls/ConfirmMessage';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: {},
      totalSize: 10,
      page: 1,
      sizePerPage: 10,
      large: false,
      // user information
      id: 0,
      fullname: '',
      username: '',
      password_question: '',
      password_answer: '',
      tel: '',
      email: '',
      birthday: moment(),
      is_approved: false,
      is_locked: false,
      // end user information

      // filter
      filter_Fullname: '',
      filter_User_name: '',
      filter_Tel: '',
      filter_Email: ''
      // end filter
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.handleDeleteAccept = this.handleDeleteAccept.bind(this);
  }

  componentDidMount() {
    this.fetchData(1, page_size_default);
  }

  fetchData(page = 1, sizePerPage = 10) {
    this.props.fetchUsers(page, sizePerPage, this.state.filter_Fullname, this.state.filter_User_name, this.state.filter_Tel, this.state.filter_Email);
  }

  handleTableChange = (type, { page, sizePerPage, filters }) => {
    // filter    
    var isExcute = false;
    var fields = ['filter_Fullname', 'filter_User_name', 'filter_Tel', 'filter_Email'];
    fields.forEach(field => {
      const a = filters[field];
      if (filters[field.replace('filter_', '')]) {
        const { filterVal, filterType, comparator } = filters[field.replace('filter_', '')];
        if (filterType === 'TEXT') {
          if (comparator === Comparator.LIKE) {
            if (this.state[field] != filterVal) {
              isExcute = true;
              this.setState({ [field]: filterVal });
            }
          }
        }
      } else if (this.state[field]) {
        this.setState({ [field]: '' });
        isExcute = true;
      }
    });

    // set page
    if (this.state.page != page || this.state.sizePerPage != sizePerPage) isExcute = true;
    this.setState({ page: page, sizePerPage: sizePerPage });

    // excute
    if (isExcute)
      this.fetchData(page, sizePerPage);
  }

  handleAdd() {
    this.setState({
      large: true,
      // user information
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
      // end user information
    });
  }

  handleExport() {

  }

  handleEdit(rowIndex, row) {
    this.setState({ large: true });
    var token = 'Bearer '.concat(this.props.token);
    axios.get(`${api_url}/users/${row.Id}`,
      { headers: { Authorization: token } }).then(response => {
        if (response.data.user)
          this.setState(() => ({
            // user information
            id: response.data.user.Id,
            fullname: response.data.user.Fullname,
            username: response.data.user.User_name,
            password_question: response.data.user.Password_question,
            password_answer: response.data.user.Password_answer,
            tel: response.data.user.Tel,
            email: response.data.user.Email,
            birthday: response.data.user.Birthday,
            is_approved: response.data.user.Is_approved,
            is_locked: response.data.user.Is_lock,
            // end user information
          }));
      })
      .catch((error) => {
        console.log('Message error: ' + error);
      });
  }

  handleDelete(rowIndex, row) {
    this.setState({ id: row.Id });
    this.refs.confirmMessage.open('Xác nhận xóa dữ liệu!', 'Bạn có chắc chắn muốn xóa');
  }

  handleDeleteAccept() {
    var token = 'Bearer '.concat(this.props.token);
    axios.delete(`${api_url}/users/${this.state.id}`,
      { headers: { Authorization: token } }).then(response => {
        // If request is good...
        if (response.data.success) {
          this.refs.confirmMessage.setState({
            showModal: false
          });
          this.fetchData(1, page_size_default);
        } else {
          this.refs.confirmMessage.setState({
            showModal: false
          });
          alert(response.data.message_error);
        }
      })
      .catch((error) => {
        console.log('Message error: ' + error);
      });
  };

  toggleLarge() {
    this.setState({ large: !this.state.large });
  }

  saveUser() {
    var token = 'Bearer '.concat(this.props.token);
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

    if (this.state.id > 0)
      axios.put(`${api_url}/users/${this.state.id}`, data,
        { headers: { Authorization: token } }).then(response => {
          // If request is good...
          if (response.data.user) {
            this.setState(() => ({
              large: !this.state.large
            }));
            this.fetchData(1, page_size_default);
          }
        })
        .catch((error) => {
          console.log('Message error: ' + error);
        });
    else //this.props.usersAdd(data);
      axios.post(`${api_url}/users`, data,
        { headers: { Authorization: token } }).then(response => {
          // If request is good...
          if (response.data.user) {
            this.setState(() => ({
              large: !this.state.large
            }));
            this.fetchData(1, page_size_default);
          }
        })
        .catch((error) => {
          console.log('Message error: ' + error);
        });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {

    if (!this.props.userState.users) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
    }

    const actionFormatter = (cell, row, rowIndex, formatExtraData) => {
      return (
        <div>
          <Button color="info" className="table-column-button" onClick={() => this.handleEdit(rowIndex, row)}>Edit</Button>
          <Button color="danger" className="table-column-button" onClick={() => this.handleDelete(rowIndex, row)}>Remove</Button>
        </div>
      );
    }

    const toolbar =
      (
        <div>
          <Button className="table-toolbar-button" color="primary" onClick={this.handleAdd}>Add</Button>
          <Button className="table-toolbar-button" color="warning" onClick={this.handleExport}>Export</Button>
        </div>
      );

    const columns = [{
      dataField: 'Id',
      text: 'User Id'
    }, {
      dataField: 'Fullname',
      text: 'Full Name',
      filter: textFilter({
        defaultValue: this.state.filter_Fullname
      })
    }, {
      dataField: 'User_name',
      text: 'User Name',
      filter: textFilter({
        defaultValue: this.state.filter_User_name
      })
    }, {
      dataField: 'Tel',
      text: 'Tel',
      filter: textFilter({
        defaultValue: this.state.filter_Tel
      })
    }, {
      dataField: 'Email',
      text: 'Email',
      filter: textFilter({
        defaultValue: this.state.filter_Email
      })
    }, {
      dataField: 'Is_lock',
      text: 'Is_lock',
      formatter: optionsGridview.checkboxFormatter
    }, {
      dataField: 'noexist',
      text: 'Actions',
      formatter: actionFormatter
    }];

    return (
      <div>
        <Message onAccept={this.handleDeleteAccept} ref="confirmMessage"></Message>
        {toolbar}
        <BootstrapTable
          remote={{ pagination: true, filter: true }}
          keyField="Id"
          data={this.props.userState.users}
          columns={columns}
          filter={filterFactory()}
          pagination={paginationFactory(optionsGridview.options(this.state.page, this.state.sizePerPage, this.props.userState.totalSize))}
          onTableChange={this.handleTableChange}
          striped
          hover
          condensed
        />
        <Modal isOpen={this.state.large} toggle={this.toggleLarge}
          className={'modal-lg ' + this.props.className}>
          <ModalHeader toggle={this.toggleLarge}>Update user</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="fullname">Full name</Label>
                  <Input type="text" id="full_name" name="fullname" placeholder="Enter your full name" value={this.state.fullname} onChange={this.handleInputChange} required />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="username">User name</Label>
                  <Input type="text" id="username" name="username" placeholder="Enter user name" value={this.state.username} onChange={this.handleInputChange} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="password_question">Password question</Label>
                  <Input type="text" id="password_question" name="password_question" placeholder="Enter your password question" value={this.state.password_question} onChange={this.handleInputChange} required />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="password_answer">Password answer</Label>
                  <Input type="text" id="password_answer" name="password_answer" placeholder="Enter password answer" value={this.state.password_answer} onChange={this.handleInputChange} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="tel">Tel</Label>
                  <Input type="text" id="tel" name="tel" placeholder="Enter tel" value={this.state.tel} onChange={this.handleInputChange} required />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input type="text" id="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputChange} required />
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
                  <Input className="form-check-input" type="checkbox" id="is_approved" name="is_approved" checked={this.state.is_approved} onChange={() => { this.setState({ is_approved: !this.state.is_approved }) }} required />
                  <Label check className="form-check-label" htmlFor="is_approved">Is approved</Label>
                </FormGroup>
                <FormGroup check className="checkbox">
                  <Input className="form-check-input" type="checkbox" id="is_locked" name="is_locked" checked={this.state.is_locked} onChange={() => { this.setState({ is_locked: !this.state.is_locked }) }} required />
                  <Label check className="form-check-label" htmlFor="is_locked">Is locked</Label>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.saveUser}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggleLarge}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default reduxForm({ form: 'Users', Message })(Users)