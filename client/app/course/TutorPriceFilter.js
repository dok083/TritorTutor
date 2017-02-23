import React from 'react'

import { FormGroup, InputGroup, FormControl, Button, Panel } from 'react-bootstrap'

class TutorPriceFilter extends React.Component {
    render() {
        return (
            <div>
                <Panel header='Filter by Price'>
                    <FormGroup>
                    <InputGroup>
                        <Col sm={2}>
                            <InputGroup.Addon>$</InputGroup.Addon>
                            <FormControl type='number' />
                        </Col>
                        <Col sm={1}>
                            to
                        </Col>
                        <Col sm={2}>
                            <InputGroup.Addon>$</InputGroup.Addon>
                            <FormControl type='number' />
                        </Col>
                    </InputGroup>
                    <ButtonToolbar>
                        <Button>Apply</Button>
                    </ButtonToolbar>
                    </FormGroup>
                </Panel>
            </div>
        );
    }
}

TutorPriceFilter.displayName = 'TutorPriceFilter';

export default TutorPriceFilter