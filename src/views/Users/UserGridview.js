import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import _ from 'lodash';

const dataTable = _.range(1, 600).map(x => ({id: x, name: `Name ${x}`, surname: `Surname ${x}`}));

// Simulates the call to the server to get the data
const fakeDataFetcher = {
  fetch(page, size) {
    return new Promise((resolve, reject) => {
      resolve({items: _.slice(dataTable, (page-1)*size, ((page-1)*size) + size), total: dataTable.length});
    });
  }
};

class UserGridview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      totalSize: 0,
      page: 1,
      sizePerPage: 10,
    };
    this.fetchData = this.fetchData.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(page = this.state.page, sizePerPage = this.state.sizePerPage) {
    fakeDataFetcher.fetch(page, sizePerPage)
      .then(data => {
        this.setState({items: data.items, totalSize: data.total, page, sizePerPage});
      });
  }

  handlePageChange(page, sizePerPage) {
    this.fetchData(page, sizePerPage);
  }

  handleSizePerPageChange(sizePerPage) {
    // When changing the size per page always navigating to the first page
    this.fetchData(1, sizePerPage);
  }

  render() {
    const options = {
      onPageChange: this.handlePageChange,
      onSizePerPageList: this.handleSizePerPageChange,
      page: this.state.page,
      sizePerPage: this.state.sizePerPage,
    };

    return (
       <BootstrapTable
        data={this.state.items}
        options={options}
        fetchInfo={{dataTotalSize: this.state.totalSize}}
        remote
        pagination
        striped
        hover
        condensed
      >
        <TableHeaderColumn dataField="id" isKey dataAlign="center">Id</TableHeaderColumn>
        <TableHeaderColumn dataField="name" dataAlign="center">Name</TableHeaderColumn>
        <TableHeaderColumn dataField="surname" dataAlign="center">Surname</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default UserGridview;