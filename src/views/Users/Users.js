import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { page_size_default, optionsGridview } from '../../utils/api-config';
import { Button } from 'reactstrap';

import Message from '../Base/Controls/ConfirmMessage';
import User from './User';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: {},
      totalSize: 10,
      page: 1,
      sizePerPage: 10,      
      id: 0,
      // filter
      filter_Fullname: '',
      filter_User_name: '',
      filter_Tel: '',
      filter_Email: ''
      // end filter
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleExport = this.handleExport.bind(this);
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
    this.props.usersOpenModal();
  }

  handleExport() {}

  handleEdit(rowIndex, row) {
    this.props.usersGet(row.Id);
  }

  handleDelete(rowIndex, row) {
    this.setState({ id: row.Id });
    this.refs.confirmMessage.open('Xác nhận xóa dữ liệu!', 'Bạn có chắc chắn muốn xóa');
  }

  handleDeleteAccept() {
    this.props.usersDelete(this.state.id);  
  };  

  render() {    
    if(this.props.userState.isModal) return <div><User></User></div>

    if (this.props.userState.errors) return <div className="container"><p>{this.props.userState.errors}</p></div>

    if (this.props.userState.loading || !this.props.userState.users) return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
    
    const actionFormatter = (cell, row, rowIndex, formatExtraData) => {
      return (
        <div>
          <Button color="info" className="table-column-button" onClick={() => this.handleEdit(rowIndex, row)}>Edit</Button>
          <Button color="danger" className="table-column-button" onClick={() => this.handleDelete(rowIndex, row)}>Remove</Button>
        </div>
      );
    }

    const toolbar = (
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
      </div>
    );
  }
}

export default reduxForm({ form: 'Users', Message })(Users)