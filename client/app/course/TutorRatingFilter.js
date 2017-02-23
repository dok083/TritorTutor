import React from 'react'

import { FormGroup, InputGroup, FormControl, Button, Glyphicon, Panel } from 'react-bootstrap'

class TutorRatingFilter extends React.Component {
    render() {
        return (
            <Panel header='Filter by Rating'>
                <FormGroup>
                <InputGroup>
                    <Checkbox>
                        1
                    </Checkbox>
                    <Checkbox>
                        2
                    </Checkbox>
                    <Checkbox>
                        3
                    </Checkbox>                    
                    <Checkbox>
                        4
                    </Checkbox>
                    <Checkbox>
                        5
                    </Checkbox>                     
                </InputGroup>
                </FormGroup>
            </Panel>
        );
    }

}

TutorRatingFilter.displayName = 'TutorRatingFilter'

export default TutorRatingFilter