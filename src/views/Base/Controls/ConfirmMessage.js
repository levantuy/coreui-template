import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ConfirmMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            title: 'Confirn action of you!',
            content: 'Are you sure?'
        };
        this.handleAccept = this.handleAccept.bind(this);
        this.toggle = this.toggle.bind(this);
        this.open = this.open.bind(this);
    }

    toggle() {
        this.setState({ showModal: !this.state.showModal });
    };

    open(p_title, p_content) {
        this.setState({
            showModal: true,
            title: p_title,
            content: p_content
        });
    };

    handleAccept() {
        if (typeof this.props.onAccept === 'function') {
            this.props.onAccept();
        }
    };

    render() {
        return (<div>
            <Modal isOpen={this.state.showModal} toggle={this.toggle}
                className={'modal-sm'}>
                <ModalHeader toggle={this.toggle}> {this.state.title}
                </ModalHeader>
                <ModalBody>
                    <p>{this.state.content}</p>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.handleAccept} color="danger">Chấp nhận</Button>
                    <Button onClick={this.toggle} color="primary">Hủy bỏ</Button>
                </ModalFooter>
            </Modal>
        </div>);
    }
}

export default ConfirmMessage;