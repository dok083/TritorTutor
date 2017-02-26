import React from 'react'
import { Grid, Col, Image, Well, Button, PanelGroup, Panel, ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import { Link } from 'react-router'

import MessageContainer from './MessageContainer' 

class Messages extends React.Component {
	render() {
		return (
			<div id='container'>
				<MessageContainer />
			</div>
		);
	}
}

Messages.displayName = 'Messages'

export default Messages