import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import MessageComponent from './MessageComponent'

class MessageContainer extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Send Message to {this.props.user.username}</Modal.Title>
        </Modal.Header>
        <MessageComponent/>
      </Modal>
    );
  }
}

MessageContainer.displayName = 'MessageContainer';

export default MessageContainer
