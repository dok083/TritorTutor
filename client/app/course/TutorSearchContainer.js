import React from 'react'

import TutorNameFilter from './TutorNameFilter'
import TutorPriceFilter from './TutorPriceFilter'
import TutorRatingFilter from './TutorRatingFilter'


class TutorSearchContainer extends React.Component {
    render() {
        return (
            <div>
                <TutorNameFilter />
                <TutorPriceFilter />
                <TutorRatingFilter />
            </div>
        );
    }
}

TutorSearchContainer.displayName = 'TutorSearchContainer';

export default TutorSearchContainer
