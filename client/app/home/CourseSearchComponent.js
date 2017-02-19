import React from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'

class CourseSearchComponent extends React.Component {
  render() {
    return (
      <form>
        <FormGroup bsSize='large'>
          <FormControl type='text' placeholder='Enter your desired course' />
        </FormGroup>
      </form>
    );
  }
}

export default CourseSearchComponent
