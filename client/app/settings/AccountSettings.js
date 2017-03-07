import React from 'react'
import { Grid, Col, Image, Well, Button, PanelGroup, Panel, ListGroup, ListGroupItem, Label, Glyphicon, FormControl } from 'react-bootstrap'
import { Link, browserHistory } from 'react-router'

class AccountSettings extends React.Component {

  eventHandle() {
    confirm('Are you sure to deactivate your account?');
    browserHistory.push('/');
  }

  render() {
    return <div>
    <Panel header="Password">
    <FormControl
      type="text"
      placeholder="Enter Password"
    /> <br />
    <FormControl
      type="text"
      placeholder="Confirm Password"
    /> <br />
    <Button type="submit" className='pull-right'>Update</Button>
    </Panel>


    <Panel header="Deactive Account">
      <Button vertical block bsStyle ="danger" onClick={this.eventHandle}> DEACTIVATE ACCOUNT</Button>
    </Panel>
    </div>
  }
}

AccountSettings.displayName = 'AccountSettings'

export default AccountSettings