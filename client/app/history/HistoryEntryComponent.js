import React from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Table } from 'react-bootstrap'

class HistoryEntryComponent extends React.Component {
  render() {
    var entry = this.props.entry;

    return (
      <tr>
        <td>{entry.course}</td>
        <LinkContainer to={'/profile/' + entry.tutorID}>
          <td>
            <img src={'/profiles/' + entry.tutorID + '.jpg'}
            alt={entry.tutorName} width={20} height={20} />
            &nbsp; {entry.tutorName}
          </td>
        </LinkContainer>
        <LinkContainer to={'/profile/' + entry.studentID}>
          <td>
            <img src={'/profiles/' + entry.studentID + '.jpg'}
            alt={entry.studentName} width={20} height={20} />
            &nbsp; {entry.studentName}
          </td>
        </LinkContainer>
      </tr>
    );
  }
}

HistoryEntryComponent.displayName = 'HistoryEntryComponent';

export default HistoryEntryComponent
