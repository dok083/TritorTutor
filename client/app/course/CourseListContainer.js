import React from 'react'

import CourseListComponent from './CourseListComponent'

class CourseListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [
        {id: 0, name: 'CSE 12'},
        {id: 0, name: 'CSE 15L'},
        {id: 0, name: 'CSE 110'}
      ]
    };
  }
 
  render () {

    var courses = this.state.courses.map((course) => {
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