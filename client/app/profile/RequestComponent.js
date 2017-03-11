import React from 'react'
import { Modal, Select, FormControl, Button } from 'react-bootstrap'

class RequestComponent extends React.Component {
  render() {
    return (    
      <div>
        <Modal.Body>
          <p>Choose a course that you wanted to be tutored from {this.props.user.username}</p>

          <FormControl componentClass="select">
            <option value="-1" disabled>--</option>
            <option value="1">one</option>
            <option value="2">two</option>
            <option value="3">three</option>
          </FormControl>

          <br></br>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close} className="pull-right" bsStyle ="primary">
            Request Your Tutor
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

RequestComponent.displayName = 'RequestComponent';

export default RequestComponent