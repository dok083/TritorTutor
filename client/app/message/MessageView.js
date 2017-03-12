import React from 'react'

import { Media, Grid, Alert, FormControl, FormGroup, Modal, Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'

import MessageReply from './MessageReply'
import ProfilePic from '../profile/ProfilePic'

class MessageView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      messageType: '',
      reply: '',
      busy: false
    };
  }

  delete() {
    if (this.props.onDelete) {
      this.props.onDelete(this.props.message);
    }
  }

  onReplyChange(e) {
    this.setState({reply: e.target.value});
  }

  reply() {
    if (!this.state.reply || this.state.reply.length == 0) {
      this.setState({
        message: 'Your reply cannot be empty.',
        messageType: 'danger',
      });

      return;
    }

    this.setState({busy: true});

    // Send the reply.
    axios.post('/api/message/' + this.props.message.id + '/reply', {
      content: this.state.reply
    }).then(() => {
      // On success, indicate it.
      this.setState({
        message: 'Your reply has been sent.',
        messageType: 'success',
        reply: '',
        busy: false
      });
    }).catch((error) => {
      // Get the error message.
      var message = error.response && error.response.data;

      if (message.message) {
        message = message.message;
      } else {
        message = error.toString();
      }

      // Display the error message.
      this.setState({
        message: message,
        messageType: 'danger',
        busy: false
      });
    });
  }

  render() {
    var messageAlert;

    if (this.state.message.length > 0) {
      messageAlert = (
        <Alert bsStyle={this.state.messageType}>
          {this.state.message}
        </Alert>
      );
    }

    const message = this.props.message;
    const areaStyle = {
      resize: 'vertical'
    };

    var reply;
    var senderProfile;
    var replySubmit;

    // Only allow replying to non-automated messages.
    if (message.sender) {
      reply = (
        <Media>
          <Media.Left>
            <ProfilePic user={this.props.user.userID} width={64} height={64} />
          </Media.Left>
          <Media.Body>
            <FormGroup>
              <FormControl style={areaStyle}
                           componentClass='textarea'
                           placeholder='Reply to the message'
                           onChange={this.onReplyChange.bind(this)} />
            </FormGroup>
          </Media.Body>
        </Media>
      );

      senderProfile = (
        <Media.Left>
          <Link to={'/profile/' + message.sender.userID}>
            <ProfilePic user={message.sender.userID} width={64} height={64} />
            {message.sender.username}
          </Link>
        </Media.Left>
      );

      replySubmit = (
        <Button bsStyle='primary' className='pull-right'
                disabled={this.state.busy}
                onClick={this.reply.bind(this)}>Reply</Button>
      );
    }

    return (
      <Modal show={true} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{message.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {messageAlert}
          <Media>
            {senderProfile}
            <Media.Body>
              <p>{message.content}</p>
            </Media.Body>
          </Media>
          {reply}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='danger' onClick={this.delete.bind(this)}
                  disabled={this.state.busy}>
            <Glyphicon glyph='trash' />
          </Button>
          {replySubmit}
        </Modal.Footer>
      </Modal>
    );
  }
}

MessageView.displayName = 'MessageView';

export default MessageView
