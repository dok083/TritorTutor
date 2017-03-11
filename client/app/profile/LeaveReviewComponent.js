import React from 'react'
import { Modal, Select, FormControl, Button, FieldGroup, FormGroup } from 'react-bootstrap'

class LeaveReviewComponent extends React.Component {
  render() {
    return (    
      <div>
        <Modal.Body>
          <p>Please leave a review for {this.props.user.username}</p>

          <FormGroup>
            <FormControl type="text" placeholder="Name" required />
          </FormGroup>

          <FormGroup>
            <FormControl componentClass="select">
              <option value="-1" disabled>--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </FormControl>
          </FormGroup>

          <FormGroup>
            <FormControl componentClass="textarea" placeholder="Review" rows={5}/>
          </FormGroup>
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
