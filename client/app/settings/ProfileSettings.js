import React from 'react'

import { Grid, Col, Nav, NavItem, Panel,Button, FormGroup,FormControl } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'


class ProfileSettings extends React.Component {
  render() {
    return (
    	
    <div id='container'>
        <Grid>
          <Col xs={12} md={9}>
            <Panel header='Profile'>
            <Nav bsStyle='pills' stacked>
             
              <form>
        		<FormGroup bsSize='large'>
         		 <FormControl type='text' placeholder='Change your display Name.' />
       			 </FormGroup>
     		  </form>

     		  <form>
        		<FormGroup bsSize='large'>
         		 <FormControl type='text' placeholder='Change your description.' />
       			 </FormGroup>
     		  </form>
              

              <Button className="pull-right" bsSize="large" type="Edit">
      			Edit
    	  	  </Button>

            </Nav>
            </Panel>
          </Col>
          
          

        </Grid>

        

      </div>
      );
}
}

ProfileSettings.displayName = 'ProfileSettings'

export default ProfileSettings