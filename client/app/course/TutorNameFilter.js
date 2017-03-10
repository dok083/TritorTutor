import React from 'react'

import { FormGroup, InputGroup, FormControl, Button, Glyphicon, Panel } from 'react-bootstrap'

class TutorNameFilter extends React.Component {
  render() {
    const style = {
      marginBottom: '0px'
    };

    return (
      <div>
        <Panel header='Filter by Name'>
        <FormGroup style={style}>
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
