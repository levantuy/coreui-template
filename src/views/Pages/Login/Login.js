import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { reduxForm } from 'redux-form';

class Login extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      fields: {},
      errors: {}
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  };

  componentDidMount() {    
  }

  handleLogin() {
    if(this.handleValidation()){
      this.props.fetchToken(this.state.fields.username, this.state.fields.password);  
    }    
  };

  handleChange(field, e){    		
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    // this.setState({fields});
  }

  handleEnter(event) {    
    if (event.key === 'Enter')
    {
      if(this.handleValidation()){
        this.handleLogin();
        event.preventDefault();
      }      
    }       
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if(!fields["username"]){
      formIsValid = false;
      errors["username"] = "Cannot be empty";
    }

    if(typeof fields["username"] !== "undefined"){
      if(!fields["username"].match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["username"] = "Only letters";
      }      	
    }

    //Email
    // if(!fields["email"]){
    //   formIsValid = false;
    //   errors["email"] = "Cannot be empty";
    // }

    // if(typeof fields["email"] !== "undefined"){
    //   let lastAtPos = fields["email"].lastIndexOf('@');
    //   let lastDotPos = fields["email"].lastIndexOf('.');

    //   if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
    //     formIsValid = false;
    //     errors["email"] = "Email is not valid";
    //   }
    // }

    this.setState({errors: errors});
    return formIsValid;
  }

  render() {
    const Message = () => {
      if (typeof this.props.errorsMessage === 'string')
        return (<div><p className="text-danger">{this.props.errorsMessage}</p></div>);
      else return (<div></div>);
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onKeyPress={this.handleEnter}>
                      <h1>Đăng nhập</h1>
                      <p className="text-muted">Đăng nhập vào tài khoản của bạn</p>
                      <Message/>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input ref="username" type="text" size="250" placeholder="tên đăng nhập" defaultValue={''} onChange={this.handleChange.bind(this, "username")} value={this.state.fields["username"]}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input ref="password" type="password" size="250" placeholder="mật khẩu" defaultValue={''} onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.handleLogin}>Đăng nhập</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Quên mật khẩu?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Đăng ký</h2>
                      <p>Nếu chưa có tài khoản bạn nhấp vào nút "Đăng ký". Để thiết lập thông tin tài khoản của bạn.</p>
                      <Button color="primary" className="mt-3" active>Đăng ký!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default reduxForm({
  form: 'Login'
})(Login)
