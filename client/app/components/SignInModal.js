var React = require("react");
var Modal = require("react-bootstrap/lib/Modal");
var Button = require('react-bootstrap/lib/Button');
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

        <Modal show={this.state.showModal} onHide = {this.close}>
          <Modal.Header closeButton>
              <Modal.Title> Create an account! </Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <h4> User Name / Email </h4>
              <p>ID TEXTBOX SHOULD GO IN HERE.</p>

              <h4> Password  </h4>
              <p>PASSWORD TEXTBOX SHOULD GO IN HERE. </p>

              <h4> Are you a not member? Create an account! </h4>


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
