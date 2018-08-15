import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Users extends Component {
  constructor(props) {
    super(props);    
    this.fetchData = this.fetchData.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);
  };

  componentDidMount() {
    this.props.fetchUsers();
  };

  fetchData(page = this.state.page, sizePerPage = this.state.sizePerPage) {
    this.props.fetchUsers(page, sizePerPage);
  };

  handlePageChange(page, sizePerPage) {
    this.fetchData(page, sizePerPage);
  };

  handleSizePerPageChange(sizePerPage) {
    // When changing the size per page always navigating to the first page
    this.fetchData(1, sizePerPage);
  };

  render() {
    const { users, user, loading, error, totalSize, page, sizePerPage } = this.props.userState;
    if (users === 'undefined' || loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    const options = {
      onPageChange: this.handlePageChange,
      onSizePerPageList: this.handleSizePerPageChange,
      page: page,
      sizePerPage: sizePerPage,
    };

    return (
       <BootstrapTable version='4'
        data={users}
        options={options}
        fetchInfo={{dataTotalSize: totalSize}}
        remote
        pagination
        striped
        hover
        condensed
      >
        <TableHeaderColumn dataField="Id" isKey dataAlign="center">Id</TableHeaderColumn>
        <TableHeaderColumn dataField="Fullname" dataAlign="center">Fullname</TableHeaderColumn>
        <TableHeaderColumn dataField="User_name" dataAlign="center">User_name</TableHeaderColumn>
        <TableHeaderColumn dataField="Tel" dataAlign="center">Tel</TableHeaderColumn>
        <TableHeaderColumn dataField="Email" dataAlign="center">Email</TableHeaderColumn>
        <TableHeaderColumn dataField="Is_lock" dataAlign="center">Is lock</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default reduxForm({ form: 'Users' })(Users)