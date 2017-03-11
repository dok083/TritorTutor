import React from 'react'

import { Grid, Col, Row, Panel } from 'react-bootstrap'

import CourseTutorComponent from './CourseTutorComponent'
import TutorSearchContainer from './TutorSearchContainer'

import axios from 'axios'

class CourseTutorContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tutors: []
    };

    // Have this set when the tutor state is finished.
    // This allows for the search box to keep a copy of the original data while
    // allowing the tutors state to change.
    this.search = <TutorSearchContainer onRefine={this.updateMatches} data={this.state.tutors} />
  }

  componentWillMount() {
    axios.get('/api/course/tutors/' + this.props.course)
      .then((results) => {
        this.setState({tutors: results.data});
      });
  }

  updateMatches(newMatches) {
    // New matches = list of matching tutors
    this.setState({tutors: newMatches});
  }

  render() {
    var tutors;

    if(this.state.tutors.length == 0){
      tutors = <Panel>There are currently no tutors for this course.</Panel>
    } else {
      tutors = this.state.tutors.map((tutor) => {
        return (
          <CourseTutorComponent userID={tutor.userID}
                                name={tutor.username}
                                stars={tutor.avgRatig}
                                price={tutor.price}
                                negotiable={tutor.negotiable}
                                desc={tutor.description} />
        );
      });
    }

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
