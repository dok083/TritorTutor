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
          <td>
            <img src={'/profiles/' + message.userID +'.jpg'} alt='' width={20} height={20} />
          </td>
          <td>{message.name}</td>
          <td>{message.subject}</td>
        </tr>
      </LinkContainer>
    );
  }
}

MessageComponent.displayName = 'MessageComponent';

export default MessageComponent