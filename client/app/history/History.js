import React from 'react'

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
