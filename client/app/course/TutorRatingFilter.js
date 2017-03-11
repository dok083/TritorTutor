import React from 'react'

import { FormGroup, InputGroup, FormControl, Button, Glyphicon, Panel, Checkbox } from 'react-bootstrap'

class TutorRatingFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  onStarsChange(e){
    this.props.filter(e.target.value).bind(this);
  }

  render() {
    const style = {
      marginBottom: '-10px',
      marginTop: '-10px'
    };

    var starOptions = [];

    // Get the multiple stars for option labels.
    for (var i = 0; i < 5; i++) {
      starOptions[i] = Array(5 - i).fill(<Glyphicon glyph='star' />);
    }

    // Create a checkbox for each option.
    var ratingOptions = starOptions.map((stars) => {
      return <Checkbox onChange={this.onStarsChange.bind(this)}
                       checked>{stars}</Checkbox>
    });

    return (
      <Panel header='Filter by Rating'>
        <FormGroup style={style}>
          {ratingOptions}
        </FormGroup>
      </Panel>
    );
  }
}

TutorRatingFilter.displayName = 'TutorRatingFilter'

export default TutorRatingFilter
