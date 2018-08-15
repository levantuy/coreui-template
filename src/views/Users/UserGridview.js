import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import _ from 'lodash';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';

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
      onTableChange={props.onTableChange}
    />
  </div>
);

class UserGridview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products:[],
      data:[]
    };
  }  

  componentDidMount() {
    this.fetchData();
  }

  fetchData(page = 1, sizePerPage = 60) {
    fakeDataFetcher.fetch(page, sizePerPage)
      .then(data => {
        this.setState({products: data.items, data: data.items});
      });
  }

  handleTableChange = (type, { filters }) => {
    setTimeout(() => {
      const result = this.state.products.filter((row) => {
        let valid = true;
        for (const dataField in filters) {
          const { filterVal, filterType, comparator } = filters[dataField];

          if (filterType === 'TEXT') {
            if (comparator === Comparator.LIKE) {
              valid = row[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = row[dataField] === filterVal;
            }
          }
          if (!valid) break;
        }
        return valid;
      });
      this.setState(() => ({
        data: result
      }));
    }, 2000);    
  }

  render() {
    return (
      <RemoteFilter
        data={this.state.data}
        onTableChange={this.handleTableChange}
      />
    );
  }
}

export default UserGridview;