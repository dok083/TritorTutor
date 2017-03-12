import React from 'react'
import ReviewComponent from './ReviewComponent'
import axios from 'axios'

class ReviewContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: []
    };
  }

  componentWillMount() {
    axios.get('/api/reviews/' + this.props.userID)
        .then((results) => {
            this.setState({reviews: results.data});
        });
  }

  componentWillReceiveProps(props) {
    axios.get('/api/reviews/' + props.userID)
        .then((results) => {
            this.setState({reviews: results.data});
        });
  }

  render() {
    var reviews;

    if (this.state.reviews.length > 0) {
      this.state.reviews.sort((a, b) => {
        if (a.stars == b.stars) {
          return a.name.localeCompare(b.name);
        }

        return a.stars < b.stars;
      });

      reviews = this.state.reviews.map((review) => {
        return <ReviewComponent review={review} />
      });
    } else {
      reviews = <em>There are no reviews for this user.</em>;
    }

    return <div>{reviews}</div>
  }
}

export default ReviewContainer
