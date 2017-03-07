import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table } from 'react-bootstrap'

class HistoryEntryComponent extends React.Component {
  render() {
    var entry = this.props.entry;

    var tutorPicture = <img src={'/profiles/' + entry.tutorID + '.jpg'}
                        alt={entry.tutorName} width={20} height={20} />
    var studentPicture = <img src={'/profiles/' + entry.studentID + '.jpg'}
                          alt={entry.studentName} width={20} height={20} />

    var tutor = <span>{tutorPicture} {entry.tutorName}</span>
    var student = <span>{studentPicture} {entry.studentName}</span>

    return (
      <tr>
        <LinkContainer to={'/course/' + entry.courseID}>
          <td>{entry.course}</td>
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
