import React from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Thumbnail } from 'react-bootstrap'

class MessageComponent extends React.Component {
  render() {
    var message = this.props.message;

    return (
      <LinkContainer to={'/message/view/' + message.id}>
        <tr>
          <th>
            <img src={'/profiles/' + message.userID +'.jpg'} alt='' width={20} height={20} />
          </th>
          <th>{message.name}</th>
          <th>{message.subject}</th>
        </tr>
      </LinkContainer>
    );
  }
}

MessageComponent.displayName = 'MessageComponent';

export default MessageComponent