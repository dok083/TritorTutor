import React from 'react'
import PopularCoursesComponent from './PopularCoursesComponent'
import axios from 'axios'

class PopularCoursesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: []
    };
  }

  componentWillMount() {
    axios.get('/api/course/popular')
      .then((results) => {
        this.setState({courses: results.data});
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  render() {
    return <PopularCoursesComponent courses={this.state.courses} />
  }
}

PopularCoursesContainer.displayName = 'PopularCoursesContainer';

export default PopularCoursesContainer
