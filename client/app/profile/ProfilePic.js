import React from 'react'
import FallbackImage from 'react-image-fallback'

class ProfilePic extends React.Component {
  render() {
    return (
      <FallbackImage width={this.props.width}
                     height={this.props.height}
                     src={'/profiles/' + this.props.user + '.jpg'}
                     fallbackImage='/profiles/default.jpg'
                     className={this.props.className} />
    );
  }
}

ProfilePic.displayName = 'ProfilePic';

export default ProfilePic