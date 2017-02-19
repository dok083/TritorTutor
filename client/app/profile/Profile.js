import React from 'react'

import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Image from 'react-bootstrap/lib/Image'

import Review from './Review'

class Profile extends React.Component {
  render() {
    const { params } = this.props;

    var reviews = [
        {reviewer: "John Doe", rating: 5, comment: "Good tutor!"},
        {reviewer: "Judy", rating: 2, comment: "Not super star!!"},
        {reviewer: "Manager Person", rating: 3, comment: "Coughed up blood :("}
    ]

    var reviewList = reviews.map((review) => {
      return <Review name={review.reviewer} comment={review.comment} />
    });

    return (
      <div>
      <Grid>
        <Col xs={6} md={4}>
          <Image src='/profile.jpg' responsive />
          <h1>Gary Gillespie</h1>
          <h3>{params.userID}</h3>
        </Col>
        <Col xs={12} md={8}>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </Col>
      </Grid>
      <Grid>
        <Col xs={18} md={12}>
        <h2>Reviews</h2>
          {reviewList}
        </Col>
      </Grid>
      </div>
    );
  }
}

export default Profile
