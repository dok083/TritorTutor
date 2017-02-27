import React from 'react'
import { Table, Grid } from 'react-bootstrap'
import MessageComponent from './MessageComponent'

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        {id: 1, userID: 1, name: 'Judy', subject: 'Where is my money'},
        {id: 2, userID: 2, name: 'Tritor', subject: 'You have received a tutor request from Brian Hang'},
        {id: 3, userID: 3, name: 'Rick Ord', subject: 'When are you available?'}
      ]
    };
  }

  render() {
    var messages = this.state.messages.map((message) => {
      return <MessageComponent message={message} />
    });
  
    return (
      <div id='container'>
        <Grid>
          <Table responsive hover>
            <thead>
              <tr>
                <th></th>
                <th>From</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {messages}
            </tbody>
          </Table>
        </Grid>
      </div>
    );
  }
}

MessageContainer.displayName = 'MessageContainer';

export default MessageContainer
