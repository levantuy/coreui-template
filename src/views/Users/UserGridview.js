import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import _ from 'lodash';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/action_user_group';
import { api_url, page_size_default } from '../../utils/api-config';
import axios from 'axios';

const dataTable = _.range(1, 60).map(x => ({ id: x, name: `Name ${x}`, surname: `Surname ${x}` }));

// Simulates the call to the server to get the data
const fakeDataFetcher = {
  fetch(page, size) {
    return new Promise((resolve, reject) => {
      resolve({ items: _.slice(dataTable, (page - 1) * size, ((page - 1) * size) + size), total: dataTable.length });
    });
  }
};

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

const RemoteFilter = props => (
  <div>
    <BootstrapTable
      remote={{ filter: true }}
      keyField="Id"
      data={props.data}
      columns={columns}
      filter={filterFactory()}
      onTableChange={props.onTableChange}
    />
  </div>
);

class UserGridview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: {},
      totalSize: 0,
      page: 1,
      sizePerPage: 10,
      token: 'Bearer '.concat(this.props.token)
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentDidMount() {
    this.fetchData(1, page_size_default);
  }

  fetchData(page = 1, sizePerPage = 10) {
    axios.get(`${api_url}/users/filter?pageIndex=${1}&pageSize=${page_size_default}`, { headers: { Authorization: this.state.token } }).then(response => {
      // If request is good...
      this.setState(() => ({
        data: response.data.users,
        page: response.data.page,
        totalSize: response.data.totalSize,        
        sizePerPage: response.data.sizePerPage   
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
        onTableChange={this.handleTableChange}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.authReducer.access.token
})

const mapDispatchToProps = (dispatch) => {
  return {
    // fetch token
    fetchUsers: (page, sizePerPage) => {
      dispatch(fetchUsers(page, sizePerPage));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGridview);