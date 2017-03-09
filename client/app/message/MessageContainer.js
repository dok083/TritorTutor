import React from 'react'
import { Table, Grid, Modal, Button, Glyphicon, Label } from 'react-bootstrap'
import axios from 'axios'

import MessageComponent from './MessageComponent'
import MessageView from './MessageView'

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: null
    };
  }

  componentWillMount() {
    axios.get('/api/message')
      .then((messages) => {
        var messages = messages.data.sort((a, b) => {
          return b.id - a.id;
        });

        this.setState({messages: messages});
      });
  }

  viewMessage(message) {
    this.setState({message: message});
  }

  hideMessage() {
    this.setState({message: null});
  }

  delete(message) {
    // Delete the message from the server.
    axios.delete('/api/message/' + message.id);

    // Delete the message from this container.
    const newMessages = this.state.messages.filter((other) => {
      return message.id != other.id;
    });

    this.setState({
      message: null,
      messages: newMessages
    });
  }

  render() {
    if (!this.state.messages) {
      return <p className='text-center'>Loading messages...</p>;
    }

    var messages = this.state.messages.map((message) => {
      return <MessageComponent message={message}
                               onMessageView={this.viewMessage.bind(this)}
                               key={message.id} />
    });

    var messageView;
    const message = this.state.message;

    if (message) {
      messageView = <MessageView message={message}
                                 user={this.props.user}
                                 onHide={this.hideMessage.bind(this)}
                                 onDelete={this.delete.bind(this)} />
    }
  
    return (
      <div id='container'>
        {messageView}
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
