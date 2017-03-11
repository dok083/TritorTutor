import React from 'react'

import { Form, FormGroup, InputGroup, FormControl, Button, Panel, Col, Grid, ButtonToolbar } from 'react-bootstrap'

class TutorPriceFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minPrice: "",
      maxPrice: ""
    }
  }
  
  onMinChange(e) {
    this.setState({minPrice: e.target.value})
  }

  onMaxChange(e) {
    this.setState({maxPrice: e.target.value})

  }

  filterPrice() {
    var min = parseFloat(this.state.minPrice);
    var max = parseFloat(this.state.maxPrice);
    this.props.filter(min, max);
  }

  render() {
    const style = {
      marginBottom: '0px'
    };

    return (
      <Panel header='Filter by Price'>
        <Form>
          <FormGroup>
            <InputGroup>
            <InputGroup.Addon>$</InputGroup.Addon>
            <FormControl type='text' placeholder='From' onChange={this.onMinChange.bind(this)}/>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
            <InputGroup.Addon>$</InputGroup.Addon>
            <FormControl type='text' placeholder='To' onChange={this.onMaxChange.bind(this)}/>
            </InputGroup>
          </FormGroup>
          <FormGroup style={style}>
          <Button onClick={this.filterPrice.bind(this)}>Filter</Button>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

TutorPriceFilter.displayName = 'TutorPriceFilter';

export default TutorPriceFilter
