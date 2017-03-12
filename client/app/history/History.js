import React from 'react'
import axios from 'axios'

import HistoryEntryContainer from './HistoryEntryContainer'

class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: []
    };
  }

  componentWillMount() {
    axios.get('/api/tutorSessions')
      .then((results) => {
        this.setState({history: results.data});
      });
  }

  render () {
    return (
      <div id='container'>
        <HistoryEntryContainer history={this.state.history} />
      </div>
    );
  }
}

History.displayName = 'History'

export default History
