import React from 'react'

import { NavDropdown, MenuItem } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'

class UserTabContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {userID: 0, username: 'Gary Gillespie'}
    };
  }

  render() {
    var profilePic = <img width={24} height={24} src={'/profiles/' + this.state.user.userID + '.jpg'} />;
    var displayName = <span>{profilePic} {this.state.user.username}</span>
    return (
      <NavDropdown title={displayName}>
        <IndexLinkContainer to={'/profile/' + this.state.user.userID}>
          <MenuItem eventKey='1'>Profile</MenuItem>
        </IndexLinkContainer>
        <IndexLinkContainer to='/notifications'>
          <MenuItem eventKey='2'>Notifications</MenuItem>
        </IndexLinkContainer>
        <IndexLinkContainer to='/settings/profile'>
          <MenuItem eventKey='3'>Settings</MenuItem>
        </IndexLinkContainer>
        <MenuItem divider/>
        <IndexLinkContainer to='/user/logout'>
          <MenuItem eventKey='4'>Logout</MenuItem>
        </IndexLinkContainer>
      </NavDropdown>
    );
  }
}

UserTabContainer.displayName = 'UserTabContainer';

export default UserTabContainer
