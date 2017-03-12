import React from 'react'
import { Grid, Col } from 'react-bootstrap'
import { Link } from 'react-router'

import CourseListContainer from './CourseListContainer'
import DepartmentContainer from './DepartmentContainer'

class CourseList extends React.Component {
  render () {
    return (
      <div id='container'>
        <Grid>
          <Col sm={4} md={3}>
            <DepartmentContainer />
          </Col>
          <Col sm={8} md={9}>
            <CourseListContainer query={this.props.params.id} />
          </Col>
        </Grid>
      </div>
          
    );
  }

}

CourseList.displayName = 'CourseList';

export default CourseList