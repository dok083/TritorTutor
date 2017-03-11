import React from 'react'

import { Media, Glyphicon, Label, Panel } from 'react-bootstrap'
import { Link } from 'react-router'
import ProfilePic from '../profile/ProfilePic'

class CourseTutorComponent extends React.Component {
  render() {
    var stars;

    if (this.props.stars) {
      stars = [];

      for (var i = 1; i <= 5; i++) {
        var glyph;

        if (this.props.stars < i) {
          glyph = 'star-empty';
        } else {
          glyph = 'star';
        }

        stars[i] = <Glyphicon glyph={glyph} />
      }
    }

    var profileURL = '/profile/' + this.props.userID;

    var negotiable = <div></div>;

    if (this.props.negotiable) {
      negotiable = <Label bsStyle='info'>Price Negotiable</Label>
    }

    var price = <Label>{'$' + this.props.price.toFixed(2)}</Label>

    return (
      <Panel>
      <Media>
        <Media.Left>
          <ProfilePic width={64} height={64} user={this.props.userID} />
        </Media.Left>

        <Media.Body>
          <Media.Heading><Link to={profileURL}>{this.props.name}</Link> {stars} {price} {negotiable}</Media.Heading>
          <p>{this.props.desc}</p>
        </Media.Body>
      </Media>
      </Panel>
    );
  }
}

CourseTutorComponent.displayName = 'CourseTutorComponent';

export default CourseTutorComponent
