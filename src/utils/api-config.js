import React from 'react';

let backendHost;
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if(hostname === 'realsite.com') {
  backendHost = 'https://api.realsite.com';
} else if(hostname === 'staging.realsite.com') {
  backendHost = 'https://staging.api.realsite.com';
} else if(/^qa/.test(hostname)) {
  backendHost = `https://api.${hostname}`;
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:63260';
}

export const api_url = `${backendHost}/api/${apiVersion}`;

export const page_size_default = 10;

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing { from } to { to } of { size } Results
  </span>
);

export const optionsGridview = {
  options(page, sizePerPage, totalSize){
    return {
      page: page,
      sizePerPage: sizePerPage,
      totalSize: totalSize,
      showTotal: true,
      paginationTotalRenderer: customTotal,
      sizePerPageList: [{
        text: '10', value: 10
      }, {
        text: '20', value: 20
      }, {
        text: '50', value: 50
      }, {
        text: '100', value: 100
      }, {
        text: 'All', value: totalSize
      }] // A numeric array is also available. the purpose of above example is custom the text
    }
  },
  // show column type checkbox
  checkboxFormatter(cell, row) {  
    return (
      <input type="checkbox" defaultChecked={cell}></input>
    );
  }
}