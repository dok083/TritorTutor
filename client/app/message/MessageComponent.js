import React from 'react'
import { Link } from 'react-router'
import { Table, Thumbnail } from 'react-bootstrap'

class MessageComponent extends React.Component {
  render() {
    var message = this.props.message;
    return (
      <tr>
        <th>message.name</th>
        <th>
          <Thumbnail link={'/profiles/' + message.userID +'.jpg'} alt=''>
          </Thumbnail>
        </th>
        <th>message.subject</th>
      </tr>
    );
  }
}

MessageComponent.displayName = 'MessageComponent';

export default MessageComponent