import React from 'react'
import PopularCoursesComponent from './PopularCoursesComponent'

class PopularCoursesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        {name: 'CSE 110', id: 0},
        {name: 'CSE 12', id: 0},
        {name: 'CSE 15L', id: 0},
        {name: 'CSE 30', id: 0},
        {name: 'CSE 20', id: 0},
        {name: 'MATH 20A', id: 0},
        {name: 'MATH 20B', id: 0},
        {name: 'MATH 20C', id: 0},
        {name: 'MATH 18', id: 0},
        {name: 'ETHN 170', id: 0}
      ]
    };
  }

  render() {
    return <PopularCoursesComponent courses={this.state.courses} />
  }
}

export default PopularCoursesContainer
