import React from 'react'

import { Media, Grid, Alert, FormControl, FormGroup, Modal, Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'

import MessageReply from './MessageReply'
import ProfilePic from '../profile/ProfilePic'

class MessageView extends React.Component {
  delete() {
    if (this.props.onDelete) {
      this.props.onDelete(this.props.message);
    }
  }

  render() {
    const message = this.props.message;
    const areaStyle = {
      resize: 'vertical'
    };

    var reply;
    var senderProfile;

    // Only allow replying to non-automated messages.
    if (message.sender) {
      reply = (
        <Media>
          <Media.Left>
            <ProfilePic user={this.props.user.userID} width={64} height={64} />
          </Media.Left>
          <Media.Body>
            <FormGroup>
              <FormControl style={areaStyle} componentClass='textarea' placeholder='Reply to the message' />
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
    }

    return (
      <Modal show={true} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{message.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Media>
            {senderProfile}
            <Media.Body>
              <p>{message.content}</p>
            </Media.Body>
          </Media>
          {reply}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='danger' onClick={this.delete.bind(this)}>
            <Glyphicon glyph='trash' />
          </Button>
          <Button bsStyle='primary' className='pull-right'>Reply</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

MessageView.displayName = 'MessageView';

export default MessageView