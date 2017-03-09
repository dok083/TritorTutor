import React from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Thumbnail } from 'react-bootstrap'

import ProfilePic from '../profile/ProfilePic'
import MessageView from './MessageView'

class MessageComponent extends React.Component {
  view() {
    this.props.onMessageView(this.props.message);
  }

  render() {
    var message = this.props.message;

    var profilePic;
    var username;

    if (message.sender) {
      profilePic = <ProfilePic user={message.sender.userID} width={24} height={24} />;
      username = message.sender.username;
    } else {
      profilePic = <ProfilePic user={0} width={24} height={24} />;
      username = <em>Tritor System</em>;
    }

    return (
      <tr onClick={this.view.bind(this)} key={message.id}>
        <td>
          {profilePic}
        </td>
        <td>{username}</td>
        <td>{message.title}</td>
      </tr>
    );
  }
}

MessageComponent.displayName = 'MessageComponent';

export default MessageComponent