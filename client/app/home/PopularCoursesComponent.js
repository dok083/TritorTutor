import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

class PopularCoursesComponent extends React.Component {
  render() {
    var entries = this.props.courses.map((name, index) => {
      return <ListGroupItem>{index + 1}. {name}</ListGroupItem>
    });

    return (
      <ListGroup>
        {entries}
      </ListGroup>  
    );
  }
}

export default PopularCoursesComponent
