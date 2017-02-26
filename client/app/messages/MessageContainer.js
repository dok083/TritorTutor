import React from 'react'
import { Table } from 'react-bootstrap'
import MessageComponent from './MessageComponent'

class MessageContainer extends React.Component {
	this.state = {
		messages: [
			{userID: 1, name: 'Judy', subject: 'Where is my money'},
			{userID: 2, name: 'Manager', subject: 'Tutor Request'},
			{userID: 3, name: 'Rick Ord', subject: 'When are you available?'}
		]
	};

	render() {
		var messages = this.state.messages.map((message) =>
			return <MessageComponent message={message} />
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
					{messages}
				</tbody>
			</Table>
		);
	}
}

MessageContainer.displayName = 'MessageContainer';

export default MessageContainer