import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class PopularTutorsComponent extends React.Component {
  render() {
    var entries = this.props.tutors.map((user, index) => {
      return (
        <LinkContainer to={'/profile/' + user.userID} key={index}>
          <ListGroupItem>
            {index + 1}. {user.name}
          </ListGroupItem>
        </LinkContainer>
      );
    });

    return (
      <ListGroup>
        {entries}
      </ListGroup>  
    );
  }
}

export default PopularTutorsComponent
