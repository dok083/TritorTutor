import React from 'react'

import { Grid, Col, Row, Panel } from 'react-bootstrap'

import CourseTutorComponent from './CourseTutorComponent'
import TutorSearchContainer from './TutorSearchContainer'
import Dispatch from '../Dispatch'

import axios from 'axios'

class CourseTutorContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tutors: [],
      filtered: []
    };


    // Have this set when the tutor state is finished.
    // This allows for the search box to keep a copy of the original data while
    // allowing the tutors state to change.

    /*
    // maybe someday this will work. refresh for easy life.
    Dispatch.addListener('updateTutor', (data) => {
      this.updateTutor(data.tutor);
    });

    Dispatch.addListener('addTutor', (data) => {
      this.addTutor(data.tutor);
    });

    Dispatch.addListener('deleteTutor', (data) => {
      this.deleteTutor(data.tutor);
    });
    */
  }

  /*
  addTutor(tutor) {
    this.setState({tutors: this.state.tutors.concat([tutor])});
  }

  deleteTutor(tutorID) {
    var newTutors = this.state.tutors.filter((other) => {
      return other.userID != tutorID;
    });

    this.setState({tutors: newTutors});
  }

  updateTutor(tutor) {
    var tutors = this.state.tutors;

    for (var i = 0; i < tutors.length; i++) {
      var other = tutors[i];

      if (other.userID == tutor.userID) {
        tutor.price = parseFloat(tutor.price) || 0.0;
        tutors[i] = tutor;
        console.log('new tutirs')
        console.log(tutors)   
        this.setState({tutors: tutors});

        return;
      }
    }
  }
  */

  componentWillMount() {
    axios.get('/api/course/tutors/' + this.props.course)
      .then((results) => {
        this.setState({tutors: results.data, filtered: results.data});
      });
  }

  updateMatches(newMatches) {
    // New matches = list of matching tutors
    this.setState({filtered: newMatches});
  }

  render() {
    var tutors;

    if(this.state.filtered.length == 0){
      tutors = <Panel>No tutors found.</Panel>
    } else {
      this.state.filtered.sort((a,b)=> {
        return ((a.avgRating || 0) < (b.avgRating || 0));
      });
      tutors = this.state.filtered.map((tutor) => {
        return (
          <CourseTutorComponent userID={tutor.userID}
                                name={tutor.username}
                                stars={tutor.avgRating}
                                price={tutor.price}
                                negotiable={tutor.negotiable}
                                desc={tutor.description} />
        );
      });
    }

    return (
      <Row>
        <Col xs={12} sm={3}>
          <TutorSearchContainer onRefine={this.updateMatches.bind(this)} data={this.state.tutors} />
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
