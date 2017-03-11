import React from 'react'
import { Glyphicon, Media } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import ProfilePic from '../profile/ProfilePic'

class ReviewComponent extends React.Component {
  render() {
    var stars = [];
    var review = this.props.review;

    for (var star = 1; star <= 5; star++) {
      var glyph;

      if (star > review.stars) {
        glyph = 'star-empty';
      } else {
        glyph = 'star';
      }

      stars[star] = <Glyphicon glyph={glyph} />
    }

    return (
      <Media>
        <Media.Left align="top">
          <Link to={'/profile/' + review.userID}>
            <ProfilePic width={64} height={64} user={review.userID} />
          </Link>
        </Media.Left>
        <Media.Body>
          <Media.Heading><Link to={'/profile/' + review.userID}>{review.name}</Link> {stars}</Media.Heading>
          <p>{review.comment}</p>
        </Media.Body>
      </Media>
    );
  }
}

export default ReviewComponent
