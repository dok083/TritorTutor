import React from 'react'

import { Modal, FormGroup, ControlLabel, FormControl, InputGroup, Checkbox, Button } from 'react-bootstrap'

class CourseTutorRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      negotiable: false
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Tutor for this Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId='offer'>
              <ControlLabel>Offer Description</ControlLabel>
              <FormControl type='text' />
            </FormGroup>

            <FormGroup controlId='price'>
              <ControlLabel>Price per Lesson</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl type='text' />
              </InputGroup>
            </FormGroup>

            <FormGroup controlId='negotiable'>
              <Checkbox onChanged inline>Negotiable pricing</Checkbox>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' bsStyle='primary' onClick={this.props.onSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CourseTutorRequest.displayName = 'CourseTutorRequest'

export default CourseTutorRequest