import React from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'

import { Button, Navbar, NavItem, Nav, FormGroup, InputGroup, FormControl, Glyphicon} from 'react-bootstrap'

class NavBar extends React.Component {
  render() {
    var userProfile;

    if (this.props.user) {
      userProfile = <UserProfileTabContainer user={this.props.user} />
    } else {
      userProfile = <p></p>
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Tritor</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/courses">
              <NavItem>Courses</NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
              <NavItem>About</NavItem>
            </LinkContainer>
            {userProfile}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar
