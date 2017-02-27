import React from 'react'
import ReviewComponent from './ReviewComponent'

const reviews = [
  [
    {userID: 1, name: 'Judy', stars: 5, comment: 'Super star!'},
    {userID: 2, name: 'Manager', stars: 5, comment: 'Good!'},
    {userID: 3, name: 'Rick Ord', stars: 4, comment: 'Great help with CSE 11!'},
  ]
];

class ReviewContainer extends React.Component {
  constructor(props) {
    super(props);

    // TODO: Load reviews using this.props.userID in componentWillMount
    this.state = {
      reviews: reviews[props.userID]
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      reviews: reviews[props.userID]
    });
  }

  render() {
    var reviews = [];

    if (this.state.reviews) {
      reviews = this.state.reviews.map((review) => {
        return <ReviewComponent review={review} />
      });
    } else if (reviews.length == 0) {
      reviews = <em>There are no reviews for this user.</em>;
    }

    return <div>{reviews}</div>
  }
}

export default ReviewContainer
