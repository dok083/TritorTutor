import React from 'react'
import { Alert, Grid, Col, Image, Well, Button, PanelGroup, Panel, ListGroup, ListGroupItem, Label, Modal } from 'react-bootstrap'
import { Link } from 'react-router'
import axios from 'axios'

import ProfilePic from './ProfilePic'
import ReviewContainer from './ReviewContainer'
import RequestContainer from './RequestContainer'
import MessageContainer from './MessageContainer'
import LeaveReviewContainer from './LeaveReviewContainer'
import UpdateReviewContainer from './UpdateReviewContainer'

import Dispatch from '../Dispatch.js'

const SESSION_REJECTED = -1;
const SESSION_PENDING = 0;
const SESSION_ACTIVE = 1;
const SESSION_DONE = 2;

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      localUser: null, // who you are logged in as
      showModal: false,
      showMsgModal: false,
      showRewModal: false,
      showEndModal: false,
      showUpdateRewModal: false,
      busy: false,
      endMessage: '',
      user: null, // viewing this person's profile
      courses: [],
      sessions: [],
      reviews: []
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

    axios.get('/api/tutor/' + userID + '/courses')
      .then((courses) => {
        this.setState({courses: courses.data});
      });

    axios.get('/api/tutorSessions/' + userID)
      .then((results) => {
        this.setState({sessions: results.data});
      });

    axios.get('/api/reviews/' + userID)
    .then((results) => {
        this.setState({reviews: results.data});
    });
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
 
  endSession() {
    const session = this.state.endSession;

    if (!session) {
      return;
    }

    this.setState({busy: true});

    axios.delete('/api/tutorSessions/' + session.sessionID)
      .then(() => {
        this.setState({busy: false});
        window.location.reload();
      })
      .catch((error) => {
        var message = error.response && error.response.data;

        if (message.message) {
          message = message.message;
        } else {
          message = error.toString();
        }

        this.setState({
          endMessage: message,
          busy: false
        });
      });
  }

  closeMsgModal() {
    this.setState({ showMsgModal: false });
  }

  openMsgModal() {
    this.setState({ showMsgModal: true });
  }
  
  closeUpdateRewModal() {
    this.setState({ showUpdateRewModal: false });
  }

  openUpdateRewModal() {
    this.setState({ showUpdateRewModal: true });
  }

  closeRewModal(){
    {/*
    axios.post('/api/reviews/'+ userID,  {
      userID: this.state.localUser,
      reviewerID: this.state.user,
      rating:
      comment:

    }*/}
    this.setState({ showRewModal: false });
    //window.location.reload();
  }

  closeEndModal(session) {
    this.setState({
      showEndModal: false,
      endMessage: '',
      endSession: null
    });
  }

  openRewModal(){
    this.setState({ showRewModal: true });
  }

  openEndModal(session) {
    console.log(session)
    this.setState({showEndModal: true, endSession: session});
  }

  accept() {
    const studentID = this.state.user && this.state.user.userID;

    if (!studentID) {
      return;
    }

    this.setState({busy: true});

    axios.put('/api/tutorSessions/' + studentID, {accept: true})
      .then(() => {
        window.location.reload();

      })
      .catch((error) => {
        console.log(error.response);
        this.setState({busy: false});
      });
  }

  reject() {
    const studentID = this.state.user && this.state.user.userID;

    if (!studentID) {
      return;
    }

    this.setState({busy: true});

    axios.put('/api/tutorSessions/' + studentID, {accept: false})
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({busy: false});
      });
  }

  componentWillReceiveProps(props) {
    var userID = parseInt(props.params.id);
    
    this.state.user.userID

    axios.get('/api/profile/' + userID)
      .then((user) => {
        this.setState({user: user.data});
      });

    axios.get('/api/tutor/' + userID + '/courses')
      .then((courses) => {
        this.setState({courses: courses.data});
      });

    axios.get('/api/tutorSessions/' + userID)
      .then((results) => {
        this.setState({sessions: results.data});
      });
  }

  render() {
    var courseList = this.state.courses.map((course) => {
      var negotiable;

      if (course.negotiable) {
        negotiable = <span> <Label bsStyle='info'>Price Negotiable</Label></span>;
      }

      return (
        <ListGroupItem key={course.classID}>
          <h4>
            <Link to={'/course/' + course.classID}>{course.classID}</Link> <Label>${parseFloat(course.price).toFixed(2)}</Label>{negotiable}
          </h4>
        </ListGroupItem>
      );        
    });

    if (courseList.length == 0) {
      courseList = <em>This user is currently not tutoring for any courses.</em>;
    }

    var options = [];

    // Get some information about the type of sessions between this user
    // and the user on the profile page.
    var isTutoring = false;
    var tutoringSession;
    var isBeingTutored = false;
    var beingTutoredSession;
    var hasDoneSession = false;
    var hasPendingSession = false;
    var reviewed = false;
    var review = [];
    
    for (var i = 0; i < this.state.reviews.length; i++) {
      if(this.state.reviews[i].userID == this.state.localUser.userID)
        reviewed = true;
        review = this.state.reviews[i];
    }

    for (var i = 0; i < this.state.sessions.length; i++) {
      const session = this.state.sessions[i];

      switch (session.status) {
        case SESSION_ACTIVE:
          if (!this.state.localUser) {
            break;
          }

          if (session.tutorID == this.state.localUser.userID) {
            isTutoring = true;
            tutoringSession = session;
          } else if (session.studentID == this.state.localUser.userID) {
            isBeingTutored = true;
            beingTutoredSession = session;
          }

          break;
        case SESSION_DONE:
          hasDoneSession = true;

          break;
        case SESSION_PENDING:
          if (this.state.localUser &&
              this.state.localUser.userID == this.state.sessions[i].tutorID) {
            hasPendingSession = true;
          }

          break;
      }
    }

    // Check if the user we are viewing is the same as the current user.
    var notSameUser = false;

    if (this.state.localUser && this.state.user) {
      notSameUser = this.state.localUser.userID != this.state.user.userID;
    }

    // Add request button if there are no active sessions.
    if (!isBeingTutored && notSameUser) {
      options.push(
        <Button bsStyle="primary" bsSize="large" onClick={this.open.bind(this)} block>
          Request Tutoring
        </Button>
      );
    }
    
    if (isBeingTutored || isTutoring) {
      options.push(
        <Button bsStyle="default" bsSize="large" onClick={this.openMsgModal.bind(this)} block>
          Send Message
        </Button>
      );
    }

    if (isTutoring) {
      options.push(
        <Button bsStyle="warning" bsSize="large"
                onClick={this.openEndModal.bind(this, tutoringSession)} block>
                Stop Tutoring
        </Button>
      );
    }

    if (isBeingTutored) {
      options.push(
        <Button bsStyle="warning" bsSize="large"
                onClick={this.openEndModal.bind(this, beingTutoredSession)} block>
                Stop Being Tutored
        </Button>
      );
    }

    if (hasPendingSession) {
      options.push(
        <Button bsStyle="success" bsSize="large"
                onClick={this.accept.bind(this)} block>
        Accept
        </Button>,
        <Button bsStyle="danger" bsSize="large"
                onClick={this.reject.bind(this)} block>
        Reject
        </Button>
      );
    }

    if (options.length > 0) {
      options = (
        <Panel header={"Options"}>
          {options}
        </Panel>
      );
    }
    
    var reviewButton;
    
    if (hasDoneSession) {
      const buttonText = reviewed ? 'Update Review' : 'Leave a Review';
      reviewButton = (
          <Button bsStyle='primary' onClick={this.openRewModal.bind(this)}>{buttonText}</Button>
        );  
      
    } 

    var content;

    if (!this.state.user) {
      content = <h2 className='text-center'>Sorry, this user does not exist.</h2>;
    } else {
      const style = {
        marginBottom: '0px'
      };

      content = (
        <div>
        <Grid>
          <Col xs={12} md={4}>
            <Well>
              <ProfilePic user={this.state.user.userID}
                          width={196}
                          height={196}
                          className='center-block' />
              <h3 className='text-center'>{this.state.user.username}</h3>
            </Well>
            {options}
          </Col>
          <Col xs={12} md={8}>
            <Panel header="About Me">
              {this.state.user.description}
            </Panel>
            <Panel header="Currently Tutoring">
              <ListGroup style={style}>
                {courseList}
              </ListGroup>
            </Panel>
          </Col>
        </Grid>
        <Grid>
          <Col xs={12} md={4}>
          <h2>Reviews {reviewButton}</h2>
            <ReviewContainer userID={this.state.user.userID} />
          </Col>
        </Grid>
        <RequestContainer show={this.state.showModal} 
                          onHide={this.close.bind(this)} 
                          user={this.state.user} 
                          courses={this.state.courses} 
                          localUser={this.state.localUser} />
        <MessageContainer show={this.state.showMsgModal} 
                          onHide={this.closeMsgModal.bind(this)} 
                          user={this.state.user} />
        <LeaveReviewContainer show={this.state.showRewModal} 
                              onHide={this.closeRewModal.bind(this)} 
                              user={this.state.user}
                              review={review}/>
        </div>
      );
    }

    var errorMessage;

    if (this.state.endMessage.length > 0) {
      errorMessage = <Alert bsStyle='danger'>{this.state.endMessage}</Alert>;
    }

    return (
      <div id='container'>
        <Modal show={this.state.showEndModal}
               onHide={this.closeEndModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>
              End Tutor Session
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorMessage}
            Are you sure you want to end your tutoring session with {this.state.user ? this.state.user.username : 'unknown'}?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeEndModal.bind(this)}
                    disabled={this.state.busy}>No</Button>
            <Button bsStyle='danger'
                    onClick={this.endSession.bind(this)}
                    disabled={this.state.busy}>Yes</Button>
          </Modal.Footer>
        </Modal>
        <Grid>
          {content}
        </Grid>
      </div>
    );
  }
}

Profile.displayName = 'Profile';

export default Profile
