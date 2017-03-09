import React from 'react'

import { Modal, FormGroup, ControlLabel, FormControl, InputGroup, Checkbox, Button, Alert } from 'react-bootstrap'
import Dispatch from '../Dispatch'

class CourseTutorRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      description: '',
      price: '',
      negotiable: false,
      message: '',
      messageType: '',
      busy: false
    }
  }

  componentWillMount() {
    // Get who we are currently logged in as.
    Dispatch.addListener('getUserInfo', (data) => {
      if (data.component == this) {
        this.setState({
          user: data.user,
        });
      }
    });

    var action = Dispatch.createAction('requestUserInfo');
    action.set('component', this);
    action.dispatch();
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

  submit() {
    var price = parseInt(this.state.price);

    if (!price || price < 0) {
      this.setState({message: 'You have entered an invalid price.'}); 
      this.setState({messageType: 'danger'}); 
      return;
    }

    this.setState({busy: true});
    var listing = {};

    listing.courseID = //TODO after course is completed.
    listing.userID = this.state.user;
    listing.desc = this.state.description;
    listing.price = price;
    listing.nego = this.state.negotiable;

    axios.post('/api/course/tutor/:id', listing)
      .then(() => {
          this.setState({busy: false});
          this.props.onHide();
      })
      .catch((error) => {
        var message = error.response;

        if (message && message.data && message.data.message) {
          message = message.data.message;
        } else {
          message = error.toString();
        }       

        this.setState({message: message, messageType: 'danger', busy: false});
      });
  }

  render() {
    var message;

    if (this.state.message.length > 0) {
      message = <Alert bsStyle={this.state.messageType}>{this.state.message}</Alert>;
    }

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Tutor for this Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
          <form>
            <FormGroup controlId='offer'>
              <ControlLabel>Offer Description</ControlLabel>
              <FormControl type='text' onChange={this.onDescriptionChange.bind(this)} />
            </FormGroup>

            <FormGroup controlId='price'>
              <ControlLabel>Price per Lesson</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl type='text' onChange={this.onPriceChange.bind(this)} />
              </InputGroup>
            </FormGroup>

            <FormGroup controlId='negotiable'>
              <Checkbox onChange={this.onNegotiableChange.bind(this)} inline>Negotiable pricing</Checkbox>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' bsStyle='primary' onClick={this.submit.bind(this)} disabled={this.state.busy}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CourseTutorRequest.displayName = 'CourseTutorRequest';

export default CourseTutorRequest