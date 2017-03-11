import React from 'react'
import { Grid, Col } from 'react-bootstrap'

import CourseListContainer from './CourseListContainer'

class CourseSearch extends React.Component {
  render() {
    return (
      <div id='container'>
        <Grid>
          <h1>Search results for {this.props.params.query}</h1>
          <Col>
            <CourseListContainer />
          </Col>
        </Grid>
      </div>
    )
  }
}

CourseSearch.displayName = 'CourseSearch';

export default CourseSearch
