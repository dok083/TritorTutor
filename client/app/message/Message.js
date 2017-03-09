import React from 'react'
import { Grid, Col, Image, Well, Button, PanelGroup, Panel, ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import { Link } from 'react-router'

import MessageContainer from './MessageContainer' 
import Dispatch from '../Dispatch'

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentWillMount() {
    console.log('herro')
    // Get who we are currently logged in as.
    Dispatch.addListener('getUserInfo', (data) => {
      console.log(data)
      if (data.component == this) {
        this.setState({
          user: data.user
        });
      }
    });

    var action = Dispatch.createAction('requestUserInfo');
    action.set('component', this);
    action.dispatch();
  }

	render() {
    if (!this.state.user) {
      return <p className='text-center'>You must be logged in to view messages.</p>;
    }

		return (
			<div id='container'>
				<MessageContainer user={this.state.user} />
			</div>
		);
	}
}

Messages.displayName = 'Messages'

export default Messages
