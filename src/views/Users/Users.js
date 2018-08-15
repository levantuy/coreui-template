import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import PropTypes from 'prop-types';

const columns = [{
  dataField: 'Id',
  text: 'Product ID'
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
  text: 'Is_lock'
}];

const RemotePagination = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <BootstrapTable
      remote={ { pagination: true } }
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
    this.handleTableChange = this.handleTableChange.bind(this);
  };

  componentDidMount() {
    this.props.fetchUsers(1, 10);
  };

  handleTableChange = (type, { page, sizePerPage, filters }) => {    
    // const filter_values = [];
    // for (const dataField in filters) {
    //   const { filterVal, filterType, comparator } = filters[dataField];
    //   filter_values.push({dataField: dataField, filterVal: filterVal, filterType: filterType, comparator: comparator})
    // }
    this.props.fetchUsers(page, sizePerPage);
  };

  render() {
    const { users, user, loading, error, totalSize, page, sizePerPage } = this.props.userState;
    if (users === 'undefined' || loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <RemotePagination
        data={users}
        page={page}
        sizePerPage={sizePerPage}
        totalSize={totalSize}
        onTableChange={this.handleTableChange}
      />
    );
  }
}

export default reduxForm({ form: 'Users' })(Users)