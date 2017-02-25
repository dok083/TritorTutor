import React from 'react'

import { FormGroup, InputGroup, FormControl, Button, Glyphicon, Panel, Checkbox } from 'react-bootstrap'

class TutorRatingFilter extends React.Component {
  render() {
    var starOptions = [];

    // Get the multiple stars for option labels.
    for (var i = 0; i < 5; i++) {
      starOptions[i] = Array(5 - i).fill(<Glyphicon glyph='star' />);
    }

    // Create a checkbox for each option.
    var ratingOptions = starOptions.map((stars) => {
      return <Checkbox checked>{stars}</Checkbox>
    });

    return (
      <Panel header='Filter by Rating'>
        <FormGroup>
          {ratingOptions}
        </FormGroup>
      </Panel>
    );
  }
}

TutorRatingFilter.displayName = 'TutorRatingFilter'

export default TutorRatingFilter