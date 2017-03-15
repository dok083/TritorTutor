import React from 'react'
import { Modal, Select, FormControl, Button, FormGroup, ControlLabel, Alert } from 'react-bootstrap'
import axios from 'axios'

class MessageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      subject: "",
      content: "",
      busy: false,
      message: '',
      messageType: 'danger'
    };
  }

  subjectChange(e) {
    this.setState({subject: e.target.value});
  }

  contentChange(e) {
    this.setState({content: e.target.value});
  }

  send() {
    if (this.state.subject.length == 0) {
      this.setState({
        message: 'Your subject cannot be empty.',
        messageType: 'danger'
      });

      return;
    } else if (this.state.content.length == 0) {
      this.setState({
        message: 'Your message content cannot be empty.',
        messageType: 'danger'
      });

      return;
    }

    this.setState({busy: true});
    axios.post('/api/message/' + this.props.user.userID, {
      subject: this.state.subject,
      content: this.state.content
    })
      .then(()=> {
        this.setState({
          message: 'Your message has been sent.',
          messageType: 'success'
        });
      }).catch((error) => {
        var message = error.response && error.response.data;

        if (message && message.message) {
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

  render() {
    var alert;

    if (this.state.message.length > 0) {
      alert = <Alert bsStyle={this.state.messageType}>{this.state.message}</Alert>;
    }

    return (    
      <div>
        <Modal.Body>
          {alert}
          <FormGroup id="subject" key="subject">
            <ControlLabel>Subject</ControlLabel>
            <FormControl onChange={this.subjectChange.bind(this)} type="text" placeholder="Subject" required />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Content</ControlLabel>
            <FormControl onChange={this.contentChange.bind(this)} componentClass="textarea" placeholder="Content" rows={5}/>
          </FormGroup>
        </Modal.Body>
                         
        <Modal.Footer>
          <Button className="pull-right" onClick={this. send.bind(this)} bsStyle ="primary" disabled={this.state.busy}>
            Send
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

MessageComponent.displayName = 'MessageComponent';

export default MessageComponent