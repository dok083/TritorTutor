import React from 'react'
import { Grid, Col } from 'react-bootstrap'
import axios from 'axios'

import CourseListComponent from './CourseListComponent'

class CourseSearch extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      results: []
    };
  }

  componentWillMount() {
    axios.get('/api/course/search/' + this.props.params.query)
      .then((results) => {
        this.setState({results: results.data});
      });
  }

  componentWillReceiveProps(props) {
    axios.get('/api/course/search/' + props.params.query)
      .then((results) => {
        this.setState({results: results.data});
      });
    
  }

  render() {
    var courseList = this.state.results;

    courseList.sort((a, b) => {
      if (a.classID.length == b.classID.length) {
        return a.classID.localeCompare(b.classID);
      }

      return a.classID.length - b.classID.length;
    });

    var results = courseList.map((result, index) => {
      return <CourseListComponent course={result.classID} key={index} />;
    });

    return (
      <div id='container'>
        <Grid>
          <h2>Search results for &quot;{this.props.params.query}&quot;</h2>
          {results}
        </Grid>
      </div>
    )
  }
}

CourseSearch.displayName = 'CourseSearch';

export default CourseSearch
