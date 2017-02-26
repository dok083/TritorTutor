import React from 'react'
import { Table } from 'react-bootstrap'
import NotificationComponent from './NotificationComponent'

class NotificationContainer extends React.Component {
	this.state = {
		notifications: [
			{userID: 1, name: 'Judy', subject: 'Where is my money'},
			{userID: 2, name: 'Manager', subject: 'Tutor Request'},
			{userID: 3, name: 'Rick Ord', subject: 'When are you available?'}
		]
	};

	render() {
		var notifications = this.state.notifications.map((notification) =>
			return <NotificationComponent notification={notification} />
		);
	
		return (
			<Table responsive>
				<thead>
					<tr>
						<th>From</th>
						<th></th>
						<th>Subject</th>
					</tr>
				</thead>
				<tbody>
					{notifications}
				</tbody>
			</Table>
		);
	}
}

NotificationContainer.displayName = 'NotificationContainer';

export default NotificationContainer