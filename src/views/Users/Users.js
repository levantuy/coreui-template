import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { api_url, page_size_default, optionsGridview } from '../../utils/api-config';
import axios from 'axios';

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
  text: 'Is Lock',
  editor: {
    type: Type.CHECKBOX,
    value: 'Y:N'
  }
}];

const RemoteFilter = props => (
  <div>
    <BootstrapTable
      remote={{ pagination: true, filter: true }}
      keyField="Id"
      data={props.data}
      columns={columns}
      cellEdit={cellEditFactory({ mode: 'click' })} 
      filter={filterFactory()}
      pagination={paginationFactory(optionsGridview.options(props.page, props.sizePerPage, props.totalSize))}
      onTableChange={props.onTableChange}
    />
  </div>
);

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: {},
      totalSize: 0,
      page: 1,
      sizePerPage: 10
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentDidMount() {
    this.fetchData(1, page_size_default);
  }

  fetchData(page = 1, sizePerPage = 10) {
    var token = 'Bearer '.concat(this.props.token);
    axios.get(`${api_url}/users/filter?pageIndex=${page}&pageSize=${sizePerPage}`, { headers: { Authorization: token } }).then(response => {
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
    this.fetchData(page, sizePerPage);
  }

  render() {

    if (!this.state.data) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
    }

    return (
      <RemoteFilter
        data={this.state.data}
        page={this.state.page}
        totalSize={this.state.totalSize}
        sizePerPage={this.state.sizePerPage}
        onTableChange={this.handleTableChange}
      />
    );
  }
}

export default reduxForm({ form: 'Users' })(Users)