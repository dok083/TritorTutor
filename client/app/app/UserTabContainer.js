import React from 'react'

import { NavDropdown, MenuItem, NavItem, Nav } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'
import { browserHistory } from 'react-router'

import LogInModal from '../login/LogInModal'
import SignUpModal from '../login/SignUpModal'

const LOG_IN = 1;
const SIGN_UP = 2;
const LOG_OUT = 3;

class UserTabContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      showLogInModal: false,
      showSignUpModal: false
    };
  }

  // Called when a user for this session is found.
  onGetUser(user) {
    this.hideLogInModal();
    this.hideSignUpModal();

    this.setState({user: user});
  }

  showLogInModal() {
    this.setState({
      showLogInModal: true,
      showSignUpModal: false
    });
  }

  hideLogInModal() {
    this.setState({showLogInModal: false});
  }

  showSignUpModal() {
    this.setState({
      showLogInModal: false,
      showSignUpModal: true
    });
  }

  hideSignUpModal() {
    this.setState({showSignUpModal: false});
  }

  onSelect(selectedKey) {
    if (selectedKey == LOG_IN) {
      this.showLogInModal();
    } else if (selectedKey == SIGN_UP) {
      this.showSignUpModal();
    } else if (selectedKey == LOG_OUT) {
      this.setState({user: null});
      browserHistory.push('/');
    }
  }

  render() {
    var userOptions;

    // The log in box.
    var logInModal = <LogInModal onLoggedIn={this.onGetUser.bind(this)}
                                 show={this.state.showLogInModal}
                                 onHide={this.hideLogInModal.bind(this)} />

    var signUpModal = <SignUpModal onSignedUp={this.onGetUser.bind(this)}
                                   show={this.state.showSignUpModal}
                                   onHide={this.hideSignUpModal.bind(this)} />

    if (this.state.user) {
      var profilePic = <img width={24} height={24} src={'/profiles/' + this.state.user.userID + '.jpg'} />;
      var displayName = <span>{profilePic} {this.state.user.username}</span>

      userOptions = (
        <NavDropdown title={displayName}>
          <IndexLinkContainer to={'/profile/' + this.state.user.userID}>
            <MenuItem eventKey={0}>Profile</MenuItem>
          </IndexLinkContainer>
          <IndexLinkContainer to='/message'>
            <MenuItem eventKey={0}>Messages</MenuItem>
          </IndexLinkContainer>
          <IndexLinkContainer to='/settings/profile'>
            <MenuItem eventKey={0}>Settings</MenuItem>
          </IndexLinkContainer>
          <MenuItem divider/>
          <MenuItem eventKey={LOG_OUT}>Logout</MenuItem>
        </NavDropdown>
      );
    } else {
      userOptions = [
        <NavItem eventKey={LOG_IN}>Log In</NavItem>,
        <NavItem eventKey={SIGN_UP}>Sign Up</NavItem>
      ];
    }

    return (
      <div>
        <Nav pullRight onSelect={this.onSelect.bind(this)}>{userOptions}</Nav>
        {logInModal}
        {signUpModal}
      </div>
    );
  }
}

UserTabContainer.displayName = 'UserTabContainer';

export default UserTabContainer