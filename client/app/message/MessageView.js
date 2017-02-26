import React from 'react'

import { Media, Grid } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import MessageReply from './MessageReply'

class MessageView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {userID: 0, username: 'Gary Gillespie'},
      sender: {userID: 3, username: 'Rick Ord'},
      subject: 'When are you available?',
      message: 'Hey Gary! Thanks for accepting my tutor request. When are you available for a tutoring session?'
    }
  }

  render() {
    var reply;

    // Only allow replying to non-automated messages.
    if (this.state.sender.userID > 0) {
      reply = (
        <Media>
          <Media.Left>
            <img width={64} height={64} src={'/profiles/' + this.state.user.userID + '.jpg'} />
          </Media.Left>
          <Media.Body>
            <MessageReply recipient={this.state.sender.userID} subject={this.state.subject} />
          </Media.Body>
        </Media>
      );
    }

    return (
      <div id='container'>
        <Grid>
        <Media>
          <Media.Left>
            <Link to={'/profile/' + this.state.sender.userID}>
              <img width={64} height={64} src={'/profiles/' + this.state.sender.userID + '.jpg'} />
              Rick Ord
            </Link>
          </Media.Left>
          <Media.Body>
            <Media.Heading>{this.state.subject}</Media.Heading>
            <p>{this.state.message}</p>
          </Media.Body>
        </Media>
        {reply}
        </Grid>
      </div>
    );
  }
}

MessageView.displayName = 'MessageView';

export default MessageView
