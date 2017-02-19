import React from 'react'

import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Image from 'react-bootstrap/lib/Image'
import Well from 'react-bootstrap/lib/Well'
import Button from 'react-bootstrap/lib/Button'
import PanelGroup from 'react-bootstrap/lib/PanelGroup'
import Panel from 'react-bootstrap/lib/Panel'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import Label from 'react-bootstrap/lib/Label'

import Review from './Review'

class Profile extends React.Component {
  render() {
    const { params } = this.props;

    var reviews = [
      {reviewer: "John Doe", rating: 5, comment: "Good tutor!"},
      {reviewer: "Judy", rating: 2, comment: "Not super star!!"},
      {reviewer: "Manager Person", rating: 3, comment: "Coughed up blood :("}
    ];

    var courses = [
      {name: "CSE 12", price: 15},
      {name: "CSE 15L", price: 10},
      {name: "CSE 110", price: 25}
    ];

    var reviewList = reviews.map((review) => {
      return <Review name={review.reviewer} comment={review.comment} />
    });

    var courseList = courses.map((course) => {
      return (
        <ListGroupItem>
          <h4>
            {course.name} <Label>${course.price} per lesson</Label>
          </h4>
        </ListGroupItem>
      );        
    });

    return (
      <div>
      <Grid>
        <Col xs={12} md={4}>
          <Well>
          <Image src='/profile.jpg' responsive className="center-block" />
          <h1>Gary Gillespie</h1>
          <h3>{params.userID}</h3>
          </Well>
          <Panel header="Options">
            <Button bsStyle="primary" bsSize="large" block>Request Tutoring</Button>
          </Panel>
          <Panel header="Pricing">
            <h1>$5</h1>
          </Panel>
          <Panel header="Ratings">
            5 stars from 100 reviews
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
          {reviewList}
        </Col>
      </Grid>
      </div>
    );
  }
}

export default Profile
