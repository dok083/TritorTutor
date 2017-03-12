import React from 'react'
import { Modal, Select, FormControl, Button, FieldGroup, FormGroup, Alert } from 'react-bootstrap'
import axios from 'axios'

class LeaveReviewComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messageType: '',
      busy: false,
      rating: this.props.review == [] ? 5 : this.props.review.stars,
      comment: this.props.review == [] ? '' : this.props.review.comment
    };
  }

  submit() {
    this.setState({busy: true});
    
    var review = {
      rating: this.state.rating,
      comment: this.state.comment
    };

    axios.post('/api/reviews/' + this.props.user.userID, review)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        var message = error.response && error.response.data;

        if (message.message) {
          message = message.message;
        } else {
          message = error.toString();
        }

        this.setState({
          busy: false,
          message: message,
          messageType: 'danger'
        });
      });
  }

  onRatingChanged(e) {
    this.setState({rating: e.target.value});
  }

  onContentChanged(e) {
    this.setState({comment: e.target.value});
  }

  render() {
    var message;

    if (this.state.message.length > 0) {
      message = <Alert bsStyle={this.state.messageType}>{this.state.message}</Alert>;
    }

    return (    
      <div>
        <Modal.Body>
          {message}
          <p>Please leave a review for {this.props.user.username}</p>

          <FormGroup key='stars'>
            <FormControl componentClass="select"
                         onChange={this.onRatingChanged.bind(this)}
                         defaultValue={this.props.review == [] ? 5 : this.props.review.stars}>
              <option value="-1" disabled>--</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </FormControl>
          </FormGroup>

          <FormGroup key='content'>
            <FormControl componentClass="textarea" placeholder="Review" rows={5}
                         onChange={this.onContentChanged.bind(this)} 
                         defaultValue={this.props.review == [] ? "" : this.props.review.comment}/>
          </FormGroup>

        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.submit.bind(this)} className="pull-right" bsStyle ="primary"
                  disabled={this.state.busy}>
            Submit
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

LeaveReviewComponent.displayName = 'LeaveReviewComponent';

export default LeaveReviewComponent