import React from 'react'

import AccountSettings from './AccountSettings'
import ProfileSettings from './ProfileSettings'
import TutorSettings from './TutorSettings'

import { Grid, Col, Nav, NavItem, Panel } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'

class Settings extends React.Component {
  render() {
    return (
      <div id='container'>
        <Grid>
          <Col xs={12} md={3}>
            <Panel header='Settings'>
            <Nav bsStyle='pills' stacked>
              <IndexLinkContainer to='/settings/profile'>
                <NavItem eventKey={1}>Profile</NavItem>
              </IndexLinkContainer>
              <IndexLinkContainer to='/settings/account'>
                <NavItem eventKey={1}>Account</NavItem>
              </IndexLinkContainer>
              <IndexLinkContainer to='/settings/tutor'>
                <NavItem eventKey={1}>Tutoring</NavItem>
              </IndexLinkContainer>
            </Nav>
            </Panel>
          </Col>
          <Col xs={12} md={12}>
            {this.props.children} 
          </Col>
        </Grid>
      </div>
    );
  }
}

Settings.displayName = 'Settings';

export default Settings
