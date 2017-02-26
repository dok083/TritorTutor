import React from 'react'
import { Link } from 'react-router'
import { Table, Thumbnail } from 'react-bootstrap'

class NotificationComponent extends React.Component {
  render() {
    var notification = this.props.notification;
    return (
      <tr>
        <th>notification.name</th>
        <th>
          <Thumbnail link={'/profiles/' + notification.userID +'.jpg'} alt=''>
          </Thumbnail>
        </th>
        <th>notification.subject</th>
      </tr>
    );
  }
}

NotificationComponent.displayName = 'NotificationComponent';

export default NotificationComponent