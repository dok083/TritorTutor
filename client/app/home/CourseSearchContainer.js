import React from 'react'
import CourseSearchComponent from './CourseSearchComponent'

class CourseSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {courses: []};
  }

  render() {
    return <CourseSearchComponent courses={this.courses} />
  }
}

export default CourseSearchContainer
