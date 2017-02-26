import React from 'react'
import { Modal } from 'react-bootstrap'

class RequestComponent extends React.Component {
  render() {
    return (
      <Modal.Body>
        <p>You have requested tutoring from {this.props.user.username}</p>
      </Modal.Body>
    );
  }
}

RequestComponent.displayName = 'RequestComponent';

export default RequestComponent