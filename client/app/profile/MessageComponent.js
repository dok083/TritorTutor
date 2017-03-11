import React from 'react'
import { Modal, Select, FormControl, Button, FormGroup, ControlLabel } from 'react-bootstrap'

class MessageComponent extends React.Component {
  render() {
    return (    
      <div>
        <Modal.Body>
          <FormGroup id="subject" key="subject">
            <ControlLabel>Subject</ControlLabel>
            <FormControl type="text" placeholder="Subject" required />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Content</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Content" rows={5}/>
          </FormGroup>
        </Modal.Body>
                         
        <Modal.Footer>
          <Button className="pull-right" onClick="" bsStyle ="primary">
            Send
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

MessageComponent.displayName = 'MessageComponent';

export default MessageComponent