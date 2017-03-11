import React from 'react'

import { Modal, FormGroup, ControlLabel, FormControl, InputGroup, Checkbox, Button, Alert } from 'react-bootstrap'
import Dispatch from '../Dispatch'

import axios from 'axios'

class CourseTutorRequest extends React.Component {
  constructor(props) {
    super(props);

    const tutorInfo = props.tutorInfo;

    this.state = {
      description: tutorInfo ? tutorInfo.description : '',
      price: tutorInfo ? tutorInfo.price : 0,
      negotiable: tutorInfo ? Boolean(tutorInfo.negotiable) : false,
      message: '',
      messageType: '',
      busy: false
    }
  }

  componentWillReceiveProps(props) {
    const tutorInfo = props.tutorInfo;

    this.setState({
      description: tutorInfo ? tutorInfo.description : '',
      price: tutorInfo ? tutorInfo.price : 0,
      negotiable: tutorInfo ? Boolean(tutorInfo.negotiable) : false,
    });
  }

  onHide() {
    // Reset the states when hidden.
    this.setState({
        message: '',
        messageType: '',
        busy: false
    });

    if (this.props.onHide) {
      this.props.onHide();
    }
  }

  onDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  onPriceChange(e) {
    this.setState({price: e.target.value});
  }

  onNegotiableChange() {
    this.setState({negotiable: !this.state.negotiable});
  }

  getValues() {
    var price = parseFloat(this.state.price).toFixed(2);

    if (!price || price < 0) {
      this.setState({
        message: 'You have entered an invalid price.',
        messageType: 'danger'
      }); 

      return;
    }

    this.setState({busy: true});

    return {
        desc: this.state.description,
        price: this.state.price,
        nego: this.state.negotiable
    };
  }

  update() {
    var listing = this.getValues();

    if (!listing) {
      return;
    }

    var changes = {};

    Object.keys(listing).forEach((key) => {
      if (this.props.tutorInfo[key] != listing[key]) {
        changes[key] = listing[key];
      }
    });

    if (changes.length == 0) {
      this.setState({
        message: 'There is nothing to update.',
        messageType: 'warning'
      });

      return;
    }

    axios.put('/api/tutor/' + this.props.course, changes)
      .then(() => {
        this.setState({
          message: 'Your tutoring listing has been updated.',
          messageType: 'success',
          busy: false
        });
      })
      .catch((error) => {
        var message = error.response && error.response.data;

        if (message.message) {
          message = message.message;
        } else {
          message = error.toString();
        }

        this.setState({
          message: message,
          messageType: 'danger',
          busy: false
        });
      });
  }

  submit() {
    this.setState({busy: true});

    var listing = this.getValues();

    if (!listing) {
      return;
    }

    axios.post('/api/tutor/' + this.props.course, listing)
      .then(() => {
          this.onHide();
      })
      .catch((error) => {
        var message = error.response;

        if (message && message.data && message.data.message) {
          message = message.data.message;
        } else {
          message = error.toString();
        }       

        this.setState({
          message: message,
          messageType: 'danger',
          busy: false
        });
      });
  }

  render() {
    if (!this.props.user) {
      return <p className='text-center'>Loading</p>;
    }

    // Show an error if the user is not verified.
    if (this.props.user.verified == false) {
      return <p className='text-center'>Sorry, you must be verified to use this feature.</p>;
    }

    var message;

    if (this.state.message.length > 0) {
      message = <Alert bsStyle={this.state.messageType}>{this.state.message}</Alert>;
    }

    const buttonText = this.props.tutorInfo ? 'Update Listing' : 'Add Listing';

    return (
      <Modal show={this.props.show} onHide={this.onHide.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Tutor for this Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
          <form>
            <FormGroup controlId='offer'>
              <ControlLabel>Offer Description</ControlLabel>
              <FormControl type='text' onChange={this.onDescriptionChange.bind(this)}
                           defaultValue={this.state.description} />
            </FormGroup>

            <FormGroup controlId='price'>
              <ControlLabel>Price per Lesson</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl type='text' onChange={this.onPriceChange.bind(this)}
                                         defaultValue={this.state.price} />
              </InputGroup>
            </FormGroup>

            <FormGroup controlId='negotiable'>
              <Checkbox onChange={this.onNegotiableChange.bind(this)}
                        defaultChecked={this.state.negotiable}
                        inline>Negotiable pricing</Checkbox>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' bsStyle='primary'
                  onClick={this.props.tutorInfo ? this.update.bind(this) : this.submit.bind(this)}
                  disabled={this.state.busy}>{buttonText}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CourseTutorRequest.displayName = 'CourseTutorRequest';

export default CourseTutorRequest
