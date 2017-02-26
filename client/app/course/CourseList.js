import React from 'react'
import { Grid, Col } from 'react-bootstrap'
import { Link } from 'react-router'

import CourseListContainer from './CourseListContainer'
import DepartmentContainer from './DepartmentContainer'

class CourseList extends React.Component {
 constructor(props) {
    super(props);

    this.state = {
      departments: [
        {id: 0, name: 'Computer Science'},
        {id: 0, name: 'Mathematics'},
        {id: 0, name: 'Physics'}
      ]
    };
  }

  render () {
    return (
      <div id='container'>
        <Grid>
          <Col sm={4} md={3}>
            <DepartmentContainer departments={this.state.departments}/>
          </Col>
          <Col sm={8} md={9}>
            <CourseListContainer />
          </Col>
        </Grid>
      </div>
          
    );
  }

}

CourseList.displayName = 'CourseList';

export default CourseList