import React from 'react'
import { Table, Grid } from 'react-bootstrap'
import MessageComponent from './MessageComponent'
import axios from 'axios'

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentWillMount() {
    axios.get('/api/message')
      .then((messages) => {
        this.setState({messages: messages.data});
      });
  }

  render() {
    if (!this.state.messages) {
      return <p className='text-center'>Loading messages...</p>;
    }

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
