import React from 'react'

import { Grid, Col, Nav, NavItem, Panel, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {userID: 0, username: 'Gary Gillespie'}
    };
  }

  render() {
    var user = this.state.user;

    return (
      <div>
        <form>
          <FormGroup>
            <ControlLabel>Profile Picture</ControlLabel>
            <p>
            <img width={256} height={256} src={'/profiles/' + user.userID + '.jpg'} />
            <br />
            <Button>Upload</Button>
            </p>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Display Name</ControlLabel>
            <FormControl type='text' value={user.username} />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Profile Description</ControlLabel>
            <FormControl type='text' placeholder='Enter your description here' />
          </FormGroup>
            
          <Button className="pull-right" type="Edit">Update</Button>
        </form>
      </div>
    );
  }
}

ProfileSettings.displayName = 'ProfileSettings'

export default ProfileSettings