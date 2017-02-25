import React from 'react'

import TutorNameFilter from './TutorNameFilter'
import TutorPriceFilter from './TutorPriceFilter'
import TutorRatingFilter from './TutorRatingFilter'

import { Button } from 'react-bootstrap'

class CourseSearchContainer extends React.Component {
  render() {
    return (
      <div>
        <TutorNameFilter />
        <TutorPriceFilter />
        <TutorRatingFilter />
        <Button>Clear Filters</Button>
      </div>
    );
  }
}

