import React from 'react'
import PopularTutorsComponent from './PopularTutorsComponent'

class PopularTutorsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutors: [
        {name: 'Gary Gillespie', userID: 0},
        {name: 'Hope', userID: 0},
        {name: 'Yiming', userID: 0},
        {name: 'San', userID: 0},
        {name: 'Ryan', userID: 0},
        {name: 'David', userID: 0},
        {name: 'Bonnie', userID: 0},
        {name: 'Rish', userID: 0},
        {name: 'Ro', userID: 0},
        {name: 'Nat', userID: 0}
      ]
    };
  }

  render() {
    return <PopularTutorsComponent tutors={this.state.tutors} />
  }
}

export default PopularTutorsContainer
