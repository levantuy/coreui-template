import React, {Component} from 'react';
import { Button, Modal } from 'reactstrap';

class ConfirmMessage extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            title: 'Confirn action of you!',
            content: 'Are you sure?'
        };
        this.handleAccept = this.handleAccept.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    };

    open(p_title, p_content) {
        this.setState({ 
            showModal: true,
            title: p_title,
            content: p_content
         });
    };

    handleCancel() {        
        if (typeof this.props.onCancel === 'function') {
            this.props.onCancel();
        }
    };

    handleAccept() {
        if (typeof this.props.onAccept === 'function') {
            this.props.onAccept();
        } 
    };

    render(){
        return(<div>
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.state.content}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleAccept} className="btn btn-primary">Accept</Button>
                    <Button onClick={this.handleCancel} className="btn btn-default">Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>);
    }
}

export default ConfirmMessage;