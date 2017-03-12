import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import LeaveReviewComponent from './LeaveReviewComponent'

class LeaveReviewContainer extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.review == [] ? 'Leave a Review' : 'Update Review'}
          </Modal.Title>
        </Modal.Header>
        <LeaveReviewComponent user={this.props.user} review={this.props.review}/>
      </Modal>
    );
  }
}

LeaveReviewContainer.displayName = 'LeaveReviewContainer';

export default LeaveReviewContainer