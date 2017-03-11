import React from 'react'
import { Modal, Select, FormControl, Button, FieldGroup } from 'react-bootstrap'

class LeaveReviewComponent extends React.Component {
  render() {
    return (    
      <div>
        <Modal.Body>
          <p>Please leave a review for {this.props.user.username}</p>

          <FieldGroup componentClass="input" placeholder="Name" />
          <FieldGroup componentClass="textarea" />
          <br></br>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onHide} className="pull-right" bsStyle ="primary">
            Submit
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

LeaveReviewComponent.displayName = 'LeaveReviewComponent';

export default LeaveReviewComponent
