import React from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'
import { browserHistory } from 'react-router'

class CourseSearchComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {query: ''};
  }

  onQueryChange(e) {
    this.setState({query: e.target.value});
  }

  search() {
    browserHistory.push('/course/search/' + this.state.query);
  }

  render() {
    return (
      <form onSubmit={this.search.bind(this)}>
        <FormGroup bsSize='large'>
          <FormControl type='text' placeholder='Enter your desired course'
                       onChange={this.onQueryChange.bind(this)} />
        </FormGroup>
      </form>
    );
  }
}

export default CourseSearchComponent
