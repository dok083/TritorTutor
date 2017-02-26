import React from 'react'
import { Grid, Col, Image, Well, Button, PanelGroup, Panel, ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import { Link } from 'react-router'

import ReviewContainer from './ReviewContainer'
import RequestContainer from './RequestContainer'

// Fake user list here. In real code we wouldn't have this.
const users = [
  {userID: 0, username: 'Gary Gillespie'},
  {userID: 1, username: 'Judy'},
  {userID: 2, username: 'Manager'},
  {userID: 3, username: 'Rick Ord'}
];

var courses = [
  {id: 0, name: "CSE 12", price: 15},
  {id: 0, name: "CSE 15L", price: 10},
  {id: 0, name: "CSE 110", price: 25}
];

class Profile extends React.Component {
  constructor(props) {
    super(props);
    var userID = parseInt(props.params.id);
    this.state = { 
      showModal: false,
      user: users[userID],
      courses: ((userID == 0 || userID == 3) ? courses : [])
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  componentWillReceiveProps(props) {
    var userID = parseInt(props.params.id);

    this.setState({
      user: users[userID],
      courses: ((userID == 0 || userID == 3) ? courses : [])
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
    if (this.state.user.userID != 0) {
      options = (
        <Panel header="Options">
          <Button bsStyle="primary" bsSize="large" onClick={this.open.bind(this)} block>Request Tutoring</Button>
        </Panel>
      );
    }

    return (
      <div>
      <Grid>
        <Col xs={12} md={4}>
          <Well>
          <Image src={'/profiles/' + this.state.user.userID + '.jpg'} responsive className="center-block" />
          <h1>{this.state.user.username}</h1>
          </Well>
          {options}
        </Col>
        <Col xs={12} md={8}>
          <Panel>
            Hello, my name is {this.state.user.username}!
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
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
}

Profile.displayName = 'Profile';

export default Profile
