import React from 'react'

import { FormGroup, FormControl, Button } from 'react-bootstrap'

class MessageReply extends React.Component {
  render() {
    return (
      <form>
        <FormGroup>
          <FormControl componentClass='textarea' placeholder='Reply to the message' />
        </FormGroup>
        <Button bsStyle='primary' className='pull-right'>Reply</Button>
      </form>
    );
  }
}

MessageReply.displayName = 'MessageReply';

export default MessageReply