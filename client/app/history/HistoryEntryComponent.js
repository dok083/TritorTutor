import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table } from 'react-bootstrap'

import ProfilePic from '../profile/ProfilePic'

class HistoryEntryComponent extends React.Component {
  render() {
    var entry = this.props.entry;

    var tutorPicture = <ProfilePic width={20} height={20} user={entry.tutorID} />;
    var studentPicture= <ProfilePic width={20} height={20} user={entry.studentID} />;

    var tutor = <span>{tutorPicture} {entry.tutorName}</span>
    var student = <span>{studentPicture} {entry.studentName}</span>

    return (
      <tr>
        <LinkContainer to={'/course/' + entry.classID}>
          <td>{entry.classID}</td>
        </LinkContainer>
        <LinkContainer to={'/profile/' + entry.tutorID}>
          <td>{tutor}</td>
        </LinkContainer>
        <LinkContainer to={'/profile/' + entry.studentID}>
          <td>{student}</td>
        </LinkContainer>
      </tr>
    );
  }
}

HistoryEntryComponent.displayName = 'HistoryEntryComponent';

export default HistoryEntryComponent
