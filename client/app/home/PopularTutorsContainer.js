import React from 'react'
import PopularTutorsComponent from './PopularCoursesComponent'

class PopularTutorsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutors: [
        'Gary Gillespie',
        'Hope',
        'Yiming',
        'San',
        'Ryan',
        'David',
        'Bonnie',
        'Rish',
        'Ro',
        'Nat'
      ]
    };
  }

  render() {
    return <PopularTutorsComponent courses={this.state.tutors} />
  }
}

export default PopularTutorsContainer
