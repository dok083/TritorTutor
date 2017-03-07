import React from 'react'
import { Grid, Table, Image } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'

import HistoryEntryContainer from './HistoryEntryContainer'

class History extends React.Component {
  render () {
    return (
      <div id='container'>
        <HistoryEntryContainer />
      </div>
    );
  }
}

History.displayName = 'History'

export default History
