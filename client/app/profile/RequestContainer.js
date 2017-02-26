import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import RequestComponent from './RequestComponent'

class RequestContainer extends React.Component {
  render() {
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