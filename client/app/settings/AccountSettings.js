import React from 'react'
import { Grid, Col, Image, Well, Button, PanelGroup, Panel, ListGroup, ListGroupItem, Label, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'

class AccountSettings extends React.Component {
  render() {
    return <div>
    <Panel header="Password">
    </Panel>
    <Panel header="Deactive Account">
      <Button vertical block bsStyle ="danger" bsSize = "large">DEACTIVATE ACCOUNT</Button>
    </Panel>
    </div>
  }
}

AccountSettings.displayName = 'AccountSettings'

export default AccountSettings