import React from 'react'
import { Link } from 'react-router'

import Button from 'react-bootstrap/lib/Button'
import Navbar from 'react-bootstrap/lib/Navbar'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

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
          <Navbar.Form pullLeft>
            <FormGroup>
              <InputGroup>
                <FormControl type="text" placeholder="Looking for a..." />
                <InputGroup.Button>
                  <Button type="submit">Search</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </Navbar.Form>

          {userProfile}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar
