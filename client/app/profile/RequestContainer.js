import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import RequestComponent from './RequestComponent'

const SESSION_PENDING = 0;
const SESSION_ACTIVE = 1;

class RequestContainer extends React.Component {
  render() {
    // Do not render if there is an active session.
    for (var i = 0; i < sessions.length; i++) {
      const status = sessions[i].status;

      if (status == SESSION_PENDING || status == SESSION_ACTIVE) {
        return;
      }
    }

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Tutoring Request</Modal.Title>
        </Modal.Header>
        <RequestComponent user={this.props.user} />
      </Modal>
    );
  }
}

RequestContainer.displayName = 'RequestContainer';

export default RequestContainer
