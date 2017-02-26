import React from 'react'

import { Grid, Col, Row } from 'react-bootstrap'

import CourseTutorComponent from './CourseTutorComponent'
import TutorSearchContainer from './TutorSearchContainer'

class CourseTutorContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tutors: [
        {userID: 0, name: 'Gary Gillespie', stars: 5, price: 25, negotiable: true, desc: 'Be tutored by a superstar!'},
        {userID: 3, name: 'Rick Ord', stars: 5, price: 25, negotiable: false, desc: 'Simple boy from the midwest looking to tutor!'}
      ]
    };

    // Have this set when the tutor state is finished.
    // This allows for the search box to keep a copy of the original data while
    // allowing the tutors state to change.
    this.search = <TutorSearchContainer onRefine={this.updateMatches} data={this.state.tutors} />
  }

  updateMatches(newMatches) {
    // New matches = list of matching tutors
    this.setState({tutors: newMatches});
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

    return (
      <Row>
        <Col xs={12} sm={3}>
          {this.search}
        </Col>
        <Col xs={12} sm={9}>
          {tutors}
        </Col>
      </Row>
    );
  }
}

CourseTutorContainer.displayName = 'CourseTutorContainer';

export default CourseTutorContainer

