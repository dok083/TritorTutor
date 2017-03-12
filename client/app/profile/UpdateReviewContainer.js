import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import UpdateReviewComponent from './UpdateReviewComponent'

class UpdateReviewContainer extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Update Review</Modal.Title>
        </Modal.Header>
        <UpdateReviewComponent user={this.props.user} review={this.props.review}/>
      </Modal>
    );
  }
}

UpdateReviewContainer.displayName = 'UpdateReviewContainer';

export default UpdateReviewContainer
