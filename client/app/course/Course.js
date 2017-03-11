import React from 'react'

import { PageHeader, Grid, Col, Button, Panel } from 'react-bootstrap'
import CourseTutorContainer from './CourseTutorContainer'
import CourseTutorRequest from './CourseTutorRequest'
import Dispatch from '../Dispatch.js'
import axios from 'axios'

class Course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      name: '',
      title: '',
      desc: '',
      tutorModalVisible: false
    };
  }

  componentWillMount() {
    const courseID = this.props.params.id;

    axios.get('/api/course/view/' + courseID)
      .then((results) => {
         const info = results.data;

         // Do nothing if no data was found.
         if (!info.courseName) {
           return;
         }

         // Otherwise, set the corresponding states.
         this.setState({
           name: this.props.params.id.toUpperCase(),
           title: info.courseName,
           desc: info.description
         });
      });

    // Get who we are currently logged in as.
    Dispatch.addListener('getUserInfo', (data) => {
      if (data.component == this) {
        this.setState({
          user: data.user,
        });

        this.setupTutorState();
      }
    });

    var action = Dispatch.createAction('requestUserInfo');
    action.set('component', this);
    action.dispatch();
  }

  setupTutorState() {
    const courseID = this.props.params.id.toUpperCase();

    axios.get('/api/tutor/' + courseID)
      .then((result) => {
        this.setState({tutorInfo: result.data});
      });
  }

  showTutorModal() {
    this.setState({tutorModalVisible: true});
  }

  hideTutorModal() {
    this.setState({tutorModalVisible: false});
  }

  render() {
    if (this.state.title == '') {
      return (
        <p className='text-center'>The requested course could not be found.</p>
      );
      return;
    }

    var buttonText;

    if (this.state.tutorInfo) {
      buttonText = 'Edit Tutor Listing';
    } else {
      buttonText = 'Add Tutor Listing';
    }

    return (
      <div id='container'>
        <CourseTutorRequest show={this.state.tutorModalVisible}
                            onHide={this.hideTutorModal.bind(this)}
                            user={this.state.user}
                            tutorInfo={this.state.tutorInfo}
                            course={this.props.params.id} />
        <Grid>
          <PageHeader>{this.state.name}
            <small> {this.state.title}</small> 
          <Button className='pull-right'
          onClick={this.showTutorModal.bind(this)}>{buttonText}</Button>
          </PageHeader>
          <Panel header='Description'>{this.state.desc}</Panel>

          <h2>Available Tutors</h2>
          <CourseTutorContainer course={this.props.params.id} />
        </Grid>
      </div>
    );
  }
}

Course.displayName = 'Course';

export default Course
