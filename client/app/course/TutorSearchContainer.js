import React from 'react'

import TutorNameFilter from './TutorNameFilter'
import TutorPriceFilter from './TutorPriceFilter'
import TutorRatingFilter from './TutorRatingFilter'


class TutorSearchContainer extends React.Component {
    constructor(props) {
    	super(props);

    	this.state = {
    		nameFilter: "",
    		priceFrom: 0,
    		priceTo: 99999.99,
    		one: true,
    		two: true,
    		three: true,
    		four: true,
    		five: true 
    	};
    }

    onNameChange(name) {
    	this.setState({nameFilter: name});
    	
    }

    onPriceRangeChange(min, max) {
    	this.setState({priceFrom: min, priceTo: max});
    }

    onStarsChange(stars) {
    	this.setState({
    		one: stars[0],
    		two: stars[1],
    		three: stars[2],
    		four: stars[3]
    		five: stars[4]
    	});
    }

    render() {
        return (
            <div>
                <TutorNameFilter filter={this.onNameChange.bind(this)}/>
                <TutorPriceFilter filter={this.onPriceChange.bind(this)}/>
                <TutorRatingFilter filter={this.onStarsChange.bind(this)}/>
            </div>
        );
    }
}

TutorSearchContainer.displayName = 'TutorSearchContainer';

export default TutorSearchContainer
