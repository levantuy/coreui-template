import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import PropTypes from 'prop-types';

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
  text: 'Is Lock'
}];

const RemotePagination = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <BootstrapTable
      remote={ { pagination: true, filter: true } }
      keyField="Id"
      striped
      hover
      condensed
      data={data}
      columns={columns}
      pagination={paginationFactory({ page, sizePerPage, totalSize })}
      filter={ filterFactory() }
      onTableChange={onTableChange}
    />
  </div>
);

RemotePagination.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired
};

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true, 
      error: {}, 
      totalSize: 0, 
      page: 1, 
      sizePerPage: 10
    };
    this.handleTableChange = this.handleTableChange.bind(this);
  };

  componentDidMount() {
    this.props.fetchUsers(1, 10);
    // set state
    setTimeout(() => {
      if (this.props.userState.users) {
        const { users, user, loading, error, totalSize, page, sizePerPage } = this.props.userState;
        this.setState(() => ({
          data: users,
          loading: loading,
          error: error,
          totalSize: totalSize,
          page: page,
          sizePerPage: sizePerPage
        }));
      }
    }, 1000);    
  };

  handleTableChange = (type, { page, sizePerPage, filters }) => {    
    this.props.fetchUsers(page, sizePerPage);
    // set state
    setTimeout(() => {
      if (this.props.userState.users) {
        const { users, user, loading, error, totalSize, page, sizePerPage } = this.props.userState;
        this.setState(() => ({
          data: users,
          loading: loading,
          error: error,
          totalSize: totalSize,
          page: page,
          sizePerPage: sizePerPage
        }));
      }
    }, 500);    
  };

  render() {    
    if (this.state.data === 'undefined' || this.state.loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
    } else if (this.state.error) {
      return <div className="alert alert-danger">Error: {this.state.error.message}</div>
    }

    return (
      <RemotePagination
        data={this.state.data}
        page={this.state.page}
        sizePerPage={this.state.sizePerPage}
        totalSize={this.state.totalSize}
        onTableChange={this.handleTableChange}
      />
    );
  }
}

export default reduxForm({ form: 'Users' })(Users)