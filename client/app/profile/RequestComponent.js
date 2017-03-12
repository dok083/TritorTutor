import React from 'react'
import axios from 'axios'
import { Modal, Select, FormControl, Button, Alert } from 'react-bootstrap'

class RequestComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      selectedCourse: '',
      busy: true,
      message: '',
      messageType: 'danger'
    };
  }

  selected(e) {
    console.log(e.target.value);
    this.setState({busy: false, selectedCourse: e.target.value});
  }

  requestTutor() {
    this.setState({busy: true});
    axios.post('/api/tutorSessions/' + this.props.user.userID, {
      courseID: this.state.selectedCourse
    }).then(()=> {
        window.location.reload();   
        this.setState({busy: false});

    }).catch((error) => {
      var message = error.response && error.response.data;

      if (message && message.message) {
        message = message.message;
      } else {
        message = error.toString();
      }

      this.setState({
        message: message,
        messageType: 'danger',
        busy: false
      })
    });
  }

  render() {
    var list = this.props.courses.map((course)=> {
      var course = course.classID;
      return <option value={course}>{course}</option>
    });

    var message;

    if (this.state.message.length > 0) {
      message = <Alert bsStyle={this.state.messageType}>{this.state.message}</Alert>;
    }

    return (    
      <div>
        <Modal.Body>
          {message}
          <p>Choose a course that you wanted to be tutored from {this.props.user.username}</p>

          <FormControl componentClass="select" onChange={this.selected.bind(this)}>
            <option value={-1} disabled selected>Select Course</option>
            {list}
          </FormControl>

          <br></br>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={this.state.busy} onClick={this.requestTutor.bind(this)} className="pull-right" bsStyle ="primary">
            Request Your Tutor
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

RequestComponent.displayName = 'RequestComponent';

export default RequestComponent
