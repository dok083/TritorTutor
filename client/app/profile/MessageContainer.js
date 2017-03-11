import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import MessageComponent from './MessageComponent'

class MessageContainer extends React.Component {
  render() {
    var hasActiveSession = false;
    const sessions = this.props.sessions;

    // Check if any sessions are active.
    for (var i = 0; i < sessions.length; i++) {
      const status = sessions[i].status;

      if (status == SESSION_ACTIVE) {
        hasActiveSession = true;

        break;
      }
    }

    // Do not render if there is no active session.
    if (!hasActiveSession) {
      return null;
    }

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
