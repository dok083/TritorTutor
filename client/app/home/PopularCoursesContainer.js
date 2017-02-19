import React from 'react'
import PopularCoursesComponent from './PopularCoursesComponent'

class PopularCoursesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        'CSE 11',
        'CSE 12',
        'CSE 15L',
        'CSE 30',
        'CSE 20',
        'MATH 20A',
        'MATH 20B',
        'MATH 20C',
        'MATH 18',
        'ETHN 170'
      ]
    };
  }

  render() {
    return <PopularCoursesComponent courses={this.state.courses} />
  }
}

export default PopularCoursesContainer
