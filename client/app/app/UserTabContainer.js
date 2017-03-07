import React from 'react'

import { NavDropdown, MenuItem, NavItem, Nav } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'
import { browserHistory, Link } from 'react-router'
import Img from 'react-image-fallback'

import LogInModal from '../login/LogInModal'
import SignUpModal from '../login/SignUpModal'

const LOG_IN = 1;
const SIGN_UP = 2;
const LOG_OUT = 3;

class UserTabContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user || null,
      showLogInModal: false,
      showSignUpModal: false
    };
  }

  componentWillReceiveProps(props) {
    this.setState({user: props.user});
  }

  // Called when a user for this session is found.
  onGetUser(user) {
    this.hideLogInModal();
    this.hideSignUpModal();

    this.setState({user: user});

    if (this.props.onGetUser) {
      this.props.onGetUser(user);
    }
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
      this.onGetUser(null);
      browserHistory.push('/');
    }
  }

  /* need to do REST API thing*/
  eventHandle() {
    /*axios.get ('/api/user/logout')
    $.ajax({
      url: "/api/user/logout",
      dataType: "json",
      type : "GET",
      success : function(r) {
        alert("Come back soon!");
  }
});*/
    browserHistory.push('/');
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
      var profilePic = <Img width={24} height={24}
                            src={'/profiles/' + this.state.user.userID + '.jpg'}
                            fallbackImage='/profiles/default.jpg' />;
      var displayName = <span>{profilePic} {this.state.user.username}</span>

      userOptions = (
        <NavDropdown title={displayName}>
          <IndexLinkContainer to={'/profile/' + this.state.user.userID}>
            <MenuItem eventKey={0}>Profile</MenuItem>
          </IndexLinkContainer>
          <IndexLinkContainer to='/message'>
            <MenuItem eventKey={0}>Messages</MenuItem>
          </IndexLinkContainer>
          <IndexLinkContainer to='/history'>
            <MenuItem eventKey={0}>Tutoring History</MenuItem>
          </IndexLinkContainer>
          <IndexLinkContainer to='/settings/profile'>
            <MenuItem eventKey={0}>Settings</MenuItem>
          </IndexLinkContainer>
          <MenuItem divider/>
          <MenuItem eventKey={LOG_OUT} onClick={this.eventHandle}>Logout</MenuItem>
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
