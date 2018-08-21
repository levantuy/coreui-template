import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import _ from 'lodash';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/action_user';

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
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Full Name',
  filter: textFilter()
}, {
  dataField: 'surname',
  text: 'User Name',
  filter: textFilter()
}];

const RemoteFilter = props => (
  <div>
    <BootstrapTable
      remote={{ filter: true }}
      keyField="id"
      data={props.data}
      columns={columns}
      filter={filterFactory()}
      pagination={paginationFactory(props.page, props.sizePerPage, props.totalSize)}
      onTableChange={props.onTableChange}
    />
  </div>
);

class UserGridview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      data: [],
      totalSize: 0,
      page: 1,
      sizePerPage: 10
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(page = 1, sizePerPage = 60) {
    fakeDataFetcher.fetch(page, sizePerPage)
      .then(data => {
        this.setState({ products: data.items, data: data.items });
      });
  }

  handleTableChange = (type, { filters }) => {
    this.props.fetchUsers(1, 100);

    setTimeout(() => {
      if (this.props.userState.users) {
        this.setState(() => ({
          data: this.props.userState.users
        }));
      }
    }, 2000);
  }

  render() {
    if (this.state.data === 'undefined') {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
    }

    return (
      <RemoteFilter
        data={this.state.data}
        page={this.page}
        totalSize={this.totalSize}
        sizePerPage={this.sizePerPage}
        onTableChange={this.handleTableChange}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.userReducer.userState
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