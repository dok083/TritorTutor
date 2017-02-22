import React from 'react'

import CourseTutorComponent from './CourseTutorComponent'

class CourseTutorContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tutors: [
        {userID: 0, name: 'Gary Gillespie', stars: 5, price: 30, negotiable: true, desc: 'Be tutored by a superstar!'},
        {userID: 3, name: 'Rick Ord', stars: 5, price: 29, negotiable: false, desc: 'Simple boy from the midwest looking to tutor!'}
      ]
    };
  }

  render() {
    var tutors = this.state.tutors.map((tutor) => {
      return (
        <CourseTutorComponent userID={tutor.userID}
                              name={tutor.name}
                              stars={tutor.stars}
                              price={tutor.price}
                              negotiable={tutor.negotiable}
                              desc={tutor.desc} />
      );
    });

    return <div>{tutors}</div>;
  }
}

CourseTutorContainer.displayName = 'CourseTutorContainer';

export default CourseTutorContainer
