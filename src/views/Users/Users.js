import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { api_url, page_size_default, optionsGridview } from '../../utils/api-config';
import axios from 'axios';
import { Button } from 'reactstrap';


class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: {},
      totalSize: 10,
      page: 1,
      sizePerPage: 10
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleEdit(){
    alert('you are here!');
  }  

  handleDelete(){
    alert('you are here!');
  }

  render() {

    if (!this.state.data) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
    }

    function buttonActions(cell, row) {      
      return (
        <div>
          <input className="table-column-button" onClick={this.handleEdit} type="button" value="Edit"/>
          <input className="table-column-button" onClick={this.handleDelete} type="button" value="Delete"/>
        </div>
      );
    }

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
      formatter: buttonActions
    }];

    return (
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
    );
  }
}

export default reduxForm({ form: 'Users' })(Users)