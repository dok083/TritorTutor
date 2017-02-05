var React = require("react");
var Modal = require("react-bootstrap/lib/Modal");
var Button = require('react-bootstrap/lib/Button');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var SignInModal = React.createClass( {
  displayName:'SignInModal',

  getInitialState: function(){
    return {showModal: false} ;
  },
  
  close: function() {
    this.setState({ showModal: false});
  },

  open: function() {
    this.setState({showModal: true})
  },

  render: function() {
    /*
    const signIn = (
      <Signin id="sign in" title="sign in")
      */

    return (
      <div style={{display: 'inline'}}>

        <Button onClick={this.open}><Glyphicon glyph="user" /> Login </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
              <Modal.Title> Create an account! </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
                <FormGroup>
                  <ControlLabel>Username/Email</ControlLabel>
                  <FormControl type="text" placeholder="Email address" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl type="password" placeholder="Password" />
                </FormGroup>

                {/* <Button type="submit">Submit</Button> */}
            </form>

            <h4>Are you a not member? Create an account!</h4>
          </Modal.Body>
          
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = SignInModal;
