import React from 'react'

import { Form, FormGroup, InputGroup, FormControl, Button, Panel, Col, Grid, ButtonToolbar } from 'react-bootstrap'

class TutorPriceFilter extends React.Component {
  render() {
    return (
      <Panel header='Filter by Price'>
        <Form>
          <FormGroup>
            <InputGroup>
            <InputGroup.Addon>$</InputGroup.Addon>
            <FormControl type='text' placeholder='From' />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
            <InputGroup.Addon>$</InputGroup.Addon>
            <FormControl type='text' placeholder='To' />
            </InputGroup>
          </FormGroup>
          <FormGroup>
          <Button>Filter</Button>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

TutorPriceFilter.displayName = 'TutorPriceFilter';

export default TutorPriceFilter