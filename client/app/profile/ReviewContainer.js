import React from 'react'
import ReviewComponent from './ReviewComponent'

class ReviewContainer extends React.Component {
  constructor(props) {
    super(props);

    // TODO: Load reviews using this.props.userID
    
    this.state = {
      reviews: [
        {userID: 1, name: 'Judy', stars: 5, comment: 'Super star!'},
        {userID: 2, name: 'Manager', stars: 5, comment: 'Good!'},
        {userID: 3, name: 'Rick Ord', stars: 4, comment: 'Great help with CSE 11!'},
      ]
    };
  }

  render() {
    var reviews = this.state.reviews.map((review) => {
      return <ReviewComponent review={review} />
    });

    return <div>{reviews}</div>
  }
}

export default ReviewContainer
