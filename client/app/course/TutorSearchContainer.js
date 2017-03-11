import React from 'react'
import { Button } from 'react-bootstrap'

import { Button } from 'react-bootstrap'
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

    clearFilter() {
        this.setState({
            nameFilter: "",
            priceFrom: 0,
            priceTo: 99999.99,
            star0: true,
            star1: true,
            star2: true,
            star3: true,
            star4: true
            },
            this.filter.bind(this));
    }

    filter() {
        var filtered = this.props.data.filter((tutor)=> {
            if (tutor.username.toLowerCase().indexOf(this.state.nameFilter) == -1) {
                return false;
            }
            if (tutor.price < this.state.priceFrom || tutor.price > this.state.priceTo) {
                return false;
            }

            if (tutor.avgRating == null || this.state['star' + Math.max(Math.floor(tutor.avgRating) - 1, 0)]) {
                return true;
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
        console.log(key, value)
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
                <Button onClick={this.clearFilter.bind(this)}>Clear Filter</Button>
            </div>
        );
    }
}

TutorSearchContainer.displayName = 'TutorSearchContainer';

export default TutorSearchContainer