import React from 'react'

import Media from 'react-bootstrap/lib/Media'

class Review extends React.Component {
  render() {
    return (
      <Media>
        <Media.Left align="top">
          <img width={64} height={64} src="/profile.jpg" />
        </Media.Left>
        <Media.Body>
          <Media.Heading>{this.props.name}</Media.Heading>
          <p>{this.props.comment}</p>
        </Media.Body>
      </Media>
    );
  }
}

export default Review
