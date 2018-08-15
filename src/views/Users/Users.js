import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import { reduxForm } from 'redux-form';

const getBadge = (Is_lock) => {
  return Is_lock === true ? 'success' : 'Inactive' 
}

class UserRow extends Component {
  constructor(props) {
      super(props);
      this.state = {
      };
  }  

  render() {
      return (
          <tr key={this.props.Id.toString()}>
              <td>{this.props.Id}</td>
              <td>{this.props.Fullname}</td>
              <td>{this.props.User_name}</td>
              <td>{this.props.Tel}</td>
              <td>{this.props.Email}</td>
              <td><Badge color={this.props.Is_lock === false ? "success" : "secondary"}>{this.props.Is_lock === false ? "Active" : "Inactive"}</Badge></td>
          </tr>
      )
  }
}

class Users extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
    };
  };

  componentDidMount() {
    this.props.fetchUsers();
  };

  render() {
    const { users, user, loading, error } = this.props.userState;
    if (users === 'undefined' || loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    const userComponent = users.map((user) => (
      <UserRow key={user.Id}
        Id={user.Id}
        Fullname={user.Fullname}
        User_name={user.User_name}
        Tel={user.Tel}
        Email={user.Email}
        Is_lock={user.Is_lock}
      />
    ));

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users example
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Fullname</th>
                      <th scope="col">Username</th>
                      <th scope="col">Tel</th>
                      <th scope="col">Email</th>
                      <th scope="col">Is lock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userComponent}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default reduxForm({ form: 'Users' })(Users)