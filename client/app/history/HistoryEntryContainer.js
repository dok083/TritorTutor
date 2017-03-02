import React from 'react'
import { Table, Grid } from 'react-bootstrap'
import HistoryEntryComponent from './HistoryEntryComponent'

class HistoryEntryContainer extends React.Component {
  constructor(props) {
    super(props);

    // placeholder data
    this.state = {
      entries: [
        {tutorID: 0, tutorName: 'Gary Gillespie', studentID: 3, studentName:
        'Rick Ord', course: 'CSE 11'},
        {tutorID: 1 ,tutorName: 'Judy', studentID: 0, studentName: 'Gary Gillespie', course: '####'},
      ]
    };
  }

  render() {
    var entries = this.state.entries.map((entry) => {
      return <HistoryEntryComponent entry={entry} />
    });

    return (
      <div id='container'>
        <Grid>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Course</th>
                <th>Tutor</th>
                <th>Student</th>
              </tr>
            </thead>
            <tbody>
              {entries}
            </tbody>
          </Table>
        </Grid>
      </div>
    );
  }
}

HistoryEntryContainer.displayName = 'HistoryEntryContainer';

export default HistoryEntryContainer
