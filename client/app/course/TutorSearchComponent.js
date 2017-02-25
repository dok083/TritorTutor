import React from 'react'

import { FormGroup, InputGroup, FormControl, Button, Glyphicon } from 'react-bootstrap'

class TutorSearchComponent extends React.Component {
  render() {
    return (
      <FormGroup>
        <InputGroup>
          <FormControl type='text' placeholder='Search for a specific tutor' />
          <InputGroup.Button>
            <Button><Glyphicon glyph='search' /></Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    );
  }
}

TutorSearchComponent.displayName = 'TutorSearchComponent';

export default TutorSearchComponent
