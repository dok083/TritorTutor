import React from 'react'
import { Grid, Col, Image, Well, Button, PanelGroup, Panel, ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import { Link } from 'react-router'

import NotificationContainer from './NotificationContainer' 

class Notifications extends React.Component {
	render() {
		return (
			<NotificationContainer />
		);
	}
}

Notifications.displayName = 'Notifications'

export default Notifications