import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class PopularCoursesComponent extends React.Component {
  render() {
    var entries = this.props.courses.map((course, index) => {
      return (
        <LinkContainer to={'/course/' + course} key={index}>
          <ListGroupItem>{index + 1}. {course}</ListGroupItem>
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

export default PopularCoursesComponent
