import React from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Panel } from 'react-bootstrap'

class CourseListComponent extends React.Component {
  render () {
    var course = this.props.course;

    return (
        <LinkContainer to={'/course/' + course.id}>
            <Panel>
                {course.name}
            </Panel>
        </LinkContainer>
    );
  }

}

CourseListComponent.displayName = 'CourseListComponent';

export default CourseListComponent