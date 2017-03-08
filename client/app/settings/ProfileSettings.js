import React from 'react'

import { Grid, Col, Nav, NavItem, Panel, Button, FormGroup, FormControl, ControlLabel, Alert } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'
import axios from 'axios'

import ProfilePic from '../profile/ProfilePic'
import Dispatch from '../Dispatch'

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {userID: 0, username: 'Gary Gillespie'},
      username: '',
      description: '',
      error: '',
      saved: false,
      saving: false
    };
  }

  componentWillMount() {
    // Get who we are currently logged in as.
    Dispatch.addListener('getUserInfo', (data) => {
      if (data.component == this) {
        this.setState({
          user: data.user,
          username: data.user.username,
          description: data.user.description
        });
      }
    });

    var action = Dispatch.createAction('requestUserInfo');
    action.set('component', this);
    action.dispatch();
  }

  onNameChange(e) {
    this.setState({username: e.target.value});
  }

  onDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  save() {
    var changes = {};

    // Check for username changes.
    if (this.state.user.username != this.state.username) {
        changes.username = this.state.username;
    }

    // Check for description changes.
    if (this.state.user.description != this.state.description) {
        changes.description = this.state.description;
    }

    // Check if anything was actually changed.
    if (Object.keys(changes).length > 0) {
      this.setState({error: '', saved: false, saving: true});

      axios.post('/api/settings/profile', changes)
        .then(() => {
            var user = this.state.user;

            // Update the user.
            if (changes.username) {
              user.username = changes.username;
            }

            if (changes.description) {
              user.description = changes.description;
            }

            // Tell the app about the new user fields.
            var action = Dispatch.createAction('updateUserInfo');
            action.set('user', user);
            action.dispatch();

            this.setState({saved: true, saving: false});
        })
        .catch((error) => {
          var message = error.response;

          if (message && message.data && message.data.message) {
            message = message.data.message;
          } else {
            message = error.toString();
          }       

          this.setState({error: message, saving: false});
        });
    }
  }

  render() {
    var user = this.state.user;

    // If we saved, then show that.
    var saved;

    if (this.state.saved) {
      saved = <Alert bsStyle='success'>Your changes have been saved.</Alert>;
    }

    // Show errors if any.
    var error;

    if (this.state.error.length > 0) {
      error = <Alert bsStyle='danger'>{this.state.error}</Alert>;
    }

    return (
      <div>
        {error}
        {saved}
        <form>
          <FormGroup>
            <ControlLabel>Profile Picture</ControlLabel>
            <p>
            <ProfilePic width={256} height={256} user={user.userID} />
            <br />
            <Button>Upload</Button>
            </p>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Display Name</ControlLabel>
            <FormControl type='text'
                         onChange={this.onNameChange.bind(this)}
                         defaultValue={user.username} />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Profile Description</ControlLabel>
            <FormControl componentClass='textarea'
                         rows={5}
                         onChange={this.onDescriptionChange.bind(this)}
                         defaultValue={user.description} />
          </FormGroup>
            
          <Button bsStyle='primary'
                  className='pull-right'
                  onClick={this.save.bind(this)}
                  disabled={this.state.saving}
                  type='button'>Update</Button>
        </form>
      </div>
    );
  }
}

ProfileSettings.displayName = 'ProfileSettings'

export default ProfileSettings
