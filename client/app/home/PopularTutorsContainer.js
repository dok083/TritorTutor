import React from 'react'
import PopularTutorsComponent from './PopularTutorsComponent'
import axios from 'axios'

class PopularTutorsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tutors: []
    };
  }

  componentWillMount() {
    axios.get('/api/popular-tutors')
      .then((results) => {
        this.setState({tutors: results.data});
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  render() {
    return <PopularTutorsComponent tutors={this.state.tutors} />
  }
}

export default PopularTutorsContainer
