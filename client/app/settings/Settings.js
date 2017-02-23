import React from 'react'

import AccountSettings from './AccountSettings'
import ProfileSettings from './ProfileSettings'
import TutorSettings from './TutorSettings'

import { Grid, Col } from 'react-bootstrap'

class Settings extends React.Component {
  render() {
    return (
      <div id='container'>
        <Grid>
          <Col xs={12} md={3}>
          </Col>
          <Col xs={12} md={12}>
          </Col>
        </Grid>
      </div>
    );
  }
}