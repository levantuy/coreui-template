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
      birthday: new Date(),
      is_approved: false,
      is_locked: false
      // end user information
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
  }

  componentDidMount() {
    this.fetchData(1, page_size_default);
  }

  fetchData(page = 1, sizePerPage = 10, fullname = '', user_name = '', tel = '', email = '') {
    var token = 'Bearer '.concat(this.props.token);
    axios.get(`${api_url}/users/filter?pageIndex=${page}&pageSize=${sizePerPage}&fullname=${fullname}&user_name=${user_name}&tel=${tel}&email=${email}`,
      { headers: { Authorization: token } }).then(response => {
        // If request is good...
        if (response.data.users)
          this.setState(() => ({
            data: response.data.users,
            page: page,
            totalSize: response.data.totalSize,
            sizePerPage: sizePerPage
          }));
      })
      .catch((error) => {
        console.log('Message error: ' + error);
      });
  }

  handleTableChange = (type, { page, sizePerPage, filters }) => {
    var fullname = '', user_name = '', tel = '', email = '';
    for (const dataField in filters) {
      const { filterVal, filterType, comparator } = filters[dataField];

      if (filterType === 'TEXT') {
        if (comparator === Comparator.LIKE) {
          switch (dataField) {
            case 'Fullname':
              fullname = filterVal;
              break;
            case 'User_name':
              user_name = filterVal;
              break;
            case 'Tel':
              tel = filterVal;
              break;
            case 'Email':
              email = filterVal;
              break;
          }
        }
      }
    }
    this.fetchData(page, sizePerPage, fullname, user_name, tel, email);
  }

  handleAdd() {
    this.setState({ large: true });
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
             birthday: new Date(response.data.user.Birthday.concat('Z')),
             is_approved: response.data.user.Is_approved,
             is_locked: response.data.user.Is_locked,
             // end user information
          }));
      })
      .catch((error) => {
        console.log('Message error: ' + error);
      });
  }

  handleDelete(rowIndex, row) {
    alert(row.Id);
  }

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
      Is_locked: this.state.is_locked
    };

    if (this.state.id > 0)
      axios.put(`${api_url}/users/${this.state.id}`, data,
        { headers: { Authorization: token } }).then(response => {
          // If request is good...
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
              is_locked: response.data.user.Is_locked,
              // end user information
              large: !this.state.large
            }));
        })
        .catch((error) => {
          console.log('Message error: ' + error);
        });
    else
      axios.post(`${api_url}/users`, data,
        { headers: { Authorization: token } }).then(response => {
          // If request is good...
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
              is_locked: response.data.user.Is_locked,
              // end user information
              large: !this.state.large
            }));
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

    if (!this.state.data) {
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
      filter: textFilter()
    }, {
      dataField: 'User_name',
      text: 'User Name',
      filter: textFilter()
    }, {
      dataField: 'Tel',
      text: 'Tel',
      filter: textFilter()
    }, {
      dataField: 'Email',
      text: 'Email',
      filter: textFilter()
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
        {toolbar}
        <BootstrapTable
          remote={{ pagination: true, filter: true }}
          keyField="Id"
          data={this.state.data}
          columns={columns}
          filter={filterFactory()}
          pagination={paginationFactory(optionsGridview.options(this.state.page, this.state.sizePerPage, this.state.totalSize))}
          onTableChange={this.handleTableChange}
          striped
          hover
          condensed
        />
        <Modal isOpen={this.state.large} toggle={this.toggleLarge}
          className={'modal-lg ' + this.props.className}>
          <ModalHeader toggle={this.toggleLarge}>Update user</ModalHeader>
          <ModalBody>
            <Input type="hidden" id="id" value={this.state.id} required />
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
                  <Input type="date" id="birthday" name="birthday" placeholder="Enter birthday" defaultValue={this.state.birthday} value={this.state.birthday} onChange={this.handleInputChange} required />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup check className="checkbox">
                  <Input className="form-check-input" type="checkbox" id="is_approved" name="is_approved" value="is_approved" value={this.state.is_approved} onChange={this.handleInputChange} required />
                  <Label check className="form-check-label" htmlFor="is_approved">Is approved</Label>
                </FormGroup>
                <FormGroup check className="checkbox">
                  <Input className="form-check-input" type="checkbox" id="is_locked" name="is_locked" value="is_locked" value={this.state.is_locked} onChange={this.handleInputChange} required />
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

export default reduxForm({ form: 'Users' })(Users)