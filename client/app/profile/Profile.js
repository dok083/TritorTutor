import React from 'react'
import { Grid, Col, Image, Well, Button, PanelGroup, Panel, ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import { Link } from 'react-router'

import ReviewContainer from './ReviewContainer'
import RequestContainer from './RequestContainer'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false};
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const { params } = this.props;

    var courses = [
      {id: 0, name: "CSE 12", price: 15},
      {id: 0, name: "CSE 15L", price: 10},
      {id: 0, name: "CSE 110", price: 25}
    ];

    var courseList = courses.map((course) => {
      return (
        <ListGroupItem>
          <h4>
            <Link to={'/course/' + course.id}>{course.name}</Link> <Label>${course.price} per lesson</Label>
          </h4>
        </ListGroupItem>
      );        
    });

    return (
      <div>
      <Grid>
        <Col xs={12} md={4}>
          <Well>
          <Image src={'/profiles/' + params.userID + '.jpg'} responsive className="center-block" />
          <h1>Gary Gillespie</h1>
          <h3>{params.userID}</h3>
          </Well>
          <Panel header="Options">
            <Button bsStyle="primary" bsSize="large" onClick={this.open.bind(this)} block>Request Tutoring</Button>
          </Panel>
        </Col>
        <Col xs={12} md={8}>
          <Panel>
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
          <ReviewContainer userID={params.userID} />
        </Col>
      </Grid>
      <RequestContainer show={this.state.showModal} onHide={this.close.bind(this)}/>
      </div>
    );
  }
}

Profile.displayName = 'Profile';

export default Profile
