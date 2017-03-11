import React from 'react'
import axios from 'axios'

import CourseListComponent from './CourseListComponent'

class CourseListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: []
    };
  }

  componentWillMount() {
    if (!this.props.query) {
      return;
    }

    axios.get('/api/course/' + this.props.query)
      .then((results) => {
        this.setState({courses: results.data});
      });
  }

  componentWillReceiveProps(props) {
    if (!props.query) {
      return;
    }

    axios.get('/api/course/' + props.query)
      .then((results) => {
        this.setState({courses: results.data});
      });
  }
 
  render () {
    var courseList = this.state.courses;
    courseList.sort((a, b) => {
      if (a.length == b.length) {
        return a.localeCompare(b);
      }

      return a.length - b.length;
    })
    var courses = courseList.map((course) => {
      return <CourseListComponent course={course} />
    });

    return (
      <div id='container'>
        {courses}
      </div>
    );
  }

}

CourseListContainer.displayName = 'CourseListContainer';

export default CourseListContainer