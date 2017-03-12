import React from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Panel } from 'react-bootstrap'

class CourseListComponent extends React.Component {
  render () {
    var course = this.props.course;

    return (
        <LinkContainer style={{cursor: 'pointer'}} to={'/course/' + course}>
            <Panel>
                {course}
            </Panel>
        </LinkContainer>
    );
  }

}

CourseListComponent.displayName = 'CourseListComponent';

export default CourseListComponent