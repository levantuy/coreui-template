import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { reduxForm } from 'redux-form';

class Logout extends Component {
    constructor(props, context) {
        super(props);
    }

    componentWillMount() {
        this.props.logout();
    }

    render() {
        return (
            <Redirect to="/login" />
        );
    }
}

export default reduxForm({
    form: 'Logout'
})(Logout)