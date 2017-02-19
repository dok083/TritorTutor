import React from 'react'
import { Glyphicon, Media } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'

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
          <Link to={'/profiles/' + review.userID}>
            <img width={64} height={64} src={'/profiles/' + review.userID + '.jpg'} />
          </Link>
        </Media.Left>
        <Media.Body>
          <Media.Heading><Link to={'/profiles/' + review.userID}>{review.name}</Link> {stars}</Media.Heading>
          <p>{review.comment}</p>
        </Media.Body>
      </Media>
    );
  }
}

export default ReviewComponent
