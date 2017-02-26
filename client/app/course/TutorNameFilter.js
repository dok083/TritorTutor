import React from 'react'

import { FormGroup, InputGroup, FormControl, Button, Glyphicon, Panel } from 'react-bootstrap'

class TutorNameFilter extends React.Component {
  render() {
    return (
      <div>
        <Panel header='Filter by Name'>
        <FormGroup>
          <InputGroup>
            <FormControl type='text' placeholder='Name' />
            <InputGroup.Button>
              <Button><Glyphicon glyph='search' /></Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        </Panel>
      </div>
    );
  }
}

TutorNameFilter.displayName = 'TutorNameFilter';

export default TutorNameFilter
