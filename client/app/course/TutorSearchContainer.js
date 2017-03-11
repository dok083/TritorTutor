import React from 'react'

import TutorNameFilter from './TutorNameFilter'
import TutorPriceFilter from './TutorPriceFilter'
import TutorRatingFilter from './TutorRatingFilter'
import Dispatch from '../Dispatch'


class TutorSearchContainer extends React.Component {
    constructor(props) {
    	super(props);

    	this.state = {
    		nameFilter: "",
    		priceFrom: 0,
    		priceTo: 99999.99,
    		star0: true,
    		star1: true,
    		star2: true,
    		star3: true,
    		star4: true 
    	};
    }

    filter() {
        var filtered = this.props.data.filter((tutor)=> {
            if (tutor.username.toLowerCase().indexOf(this.state.nameFilter) == -1) {
                return false;
            }
            if (tutor.price < this.state.priceFrom || tutor.price > this.state.priceTo) {
                return false;
            }
            for (var i = 4; i >= 0; i--) {
                if (tutor.avgRating == null || this.state['star' + Math.ceil(tutor.avgRating)]) {
                    return true;
                }
            }

            return false;
        });
        this.props.onRefine(filtered);
    }

    onNameChange(name) {
    	this.setState({nameFilter: name.toLowerCase()}, this.filter.bind(this));
 
    }

    onPriceChange(min, max) {

    	this.setState({priceFrom: min, priceTo: max}, this.filter.bind(this));

    }

    onStarsChange(key, value) {
    	this.setState({
    	   ['star' + key]: value
    	}, this.filter.bind(this));
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
