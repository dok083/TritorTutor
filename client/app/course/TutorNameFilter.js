import React from 'react'

import { FormGroup, InputGroup, FormControl, Button, Glyphicon, Panel } from 'react-bootstrap'

class TutorNameFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    }
  }

  onNameChange(e) {
    this.setState({name: e.target.value});
  }

  filterName() {
    var name = this.state.name;
    this.props.filter(name);
  }

  render() {
    const style = {
      marginBottom: '0px'
    };

    return (
      <div>
        <Panel header='Filter by Name'>
        <FormGroup style={style}>
          <InputGroup>
            <FormControl type='text' placeholder='Name' onChange={this.onNameChange.bind(this)}/>
            <InputGroup.Button>
              <Button onClick={this.filterName.bind(this)}><Glyphicon glyph='search' /></Button>
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
