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

    checkFilters(tutor) {
      console.log("priceFrom " + priceFrom);
      console.log("priceTo " + priceTo);
      console.log("tutor.price " + tutor.price);
      // tutor name also converted to lowercase
      var tutorName = tutor.username.toLowerCase();

      // only returns negative if the tutor's name does not contain the term
      var passedNameFilter = tutorName.indexOf(this.state.nameFilter) >= 0;
      var passedMinPrice = tutor.price >= priceFrom;
      var passedMaxPrice = tutor.price <= priceTo;
      // rating ignored for now

      return passedNameFilter && passedMinPrice && passedMaxPrice;
    }

    onNameChange(name) {
      console.log("data");
      console.log(this.props.data);
      // nameFilter stored in lowercase for case-insensitive comparison
    	this.setState({nameFilter: name.toLowerCase()});

      this.props.onRefine(this.props.data.filter(this.checkFilters));
      console.log("filtered data");
      console.log(this.props.data.filter(this.checkFilters));
    }

    onPriceChange(min, max) {
      console.log("price change");
      console.log(this.props.data);
    	this.setState({priceFrom: min, priceTo: max});

      this.props.onRefine(this.props.data.filter(this.checkFilters));
      console.log("filtered data");
      console.log(this.props.data.filter(this.checkFilters));
    }

    onStarsChange(stars) {
    	this.setState({
    		one: stars[0],
    		two: stars[1],
    		three: stars[2],
    		four: stars[3],
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
