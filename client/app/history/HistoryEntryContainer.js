import React from 'react'
import { Table, Grid } from 'react-bootstrap'
import HistoryEntryComponent from './HistoryEntryComponent'

class HistoryEntryContainer extends React.Component {
  render() {
    var entries = this.props.history.map((entry, index) => {
      return <HistoryEntryComponent entry={entry} key={index} />
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
