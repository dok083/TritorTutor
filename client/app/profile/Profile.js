import React from 'react'
import { Grid, Col, Image, Well, Button, PanelGroup, Panel, ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import axios from 'axios'

import ProfilePic from './ProfilePic'
import ReviewContainer from './ReviewContainer'
import RequestContainer from './RequestContainer'

import Dispatch from '../Dispatch.js'

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      localUser: null,
      showModal: false,
      user: null,
      courses: []
    };
  }

  /**
   * Called before the component renders. This is responsible for loading the
   * profile corresponding to the given user ID.
   */
  componentWillMount() {
    // Get who we are currently logged in as.
    Dispatch.addListener('getUserInfo', (data) => {
      if (data.component == this) {
        this.setState({
          localUser: data.user
        });
      }
    });

    var action = Dispatch.createAction('requestUserInfo');
    action.set('component', this);
    action.dispatch();

    // Get the user for the profile page.\
    var userID = parseInt(this.props.params.id);

    axios.get('/api/profile/' + userID)
      .then((user) => {
        this.setState({user: user.data});
      });
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  componentWillReceiveProps(props) {
    var userID = parseInt(props.params.id);

    axios.get('/api/profile/' + userID)
      .then((user) => {
        this.setState({user: user.data});
      });
  }

  render() {
    var courseList = this.state.courses.map((course) => {
      return (
        <ListGroupItem>
          <h4>
            <Link to={'/course/' + course.id}>{course.name}</Link> <Label>${course.price} per lesson</Label>
          </h4>
        </ListGroupItem>
      );        
    });

    if (courseList.length == 0) {
      courseList = <em>This user is currently not tutoring for any courses.</em>;
    }

    var options;

    // Eventually replace 0 with local user ID.
    if (this.state.localUser && this.state.user &&
        this.state.localUser.userID != this.state.user.userID) {
      options = (
        <Panel header="Options">
          <Button bsStyle="primary" bsSize="large" onClick={this.open.bind(this)} block>Request Tutoring</Button>
        </Panel>
      );
    }

    var content;

    if (!this.state.user) {
      content = <h2 className='text-center'>Sorry, this user does not exist.</h2>;
    } else {
      content = (
        <div>
        <Grid>
          <Col xs={12} md={4}>
            <Well>
              <ProfilePic user={this.state.user.userID}
                          width={196}
                          height={196}
                          className='center-block' />
              <h1 className='text-center'>{this.state.user.username}</h1>
            </Well>
            {options}
          </Col>
          <Col xs={12} md={8}>
            <Panel header="About Me">
              {this.state.user.description}
            </Panel>
            <Panel header="Currently Tutoring">
              <ListGroup>
                {courseList}
              </ListGroup>
            </Panel>
          </Col>
        </Grid>
        <Grid>
          <Col xs={12} md={12}>
          <h2>Reviews</h2>
            <ReviewContainer userID={this.state.user.userID} />
          </Col>
        </Grid>
        <RequestContainer show={this.state.showModal} onHide={this.close.bind(this)} user={this.state.user}/>
        </div>
      );
    }

    return (
      <div id='container'>
        <Grid>
          {content}
        </Grid>
      </div>
    );
  }
}

Profile.displayName = 'Profile';

export default Profile
