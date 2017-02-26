import React from 'react'
import { Grid, Col, Image, Well, Button, PanelGroup, Panel, ListGroup, ListGroupItem, Label, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'

class TutorSettings extends React.Component {

  render() {

    var buttonStyle = {
      position: 'right'
    };

    var courses = [
      {id: 0, name: "CSE 12", price: 15},
      {id: 0, name: "CSE 15L", price: 10},
      {id: 0, name: "CSE 110", price: 25}
    ];

    var courseList = courses.map((course) => {
      return (
        <ListGroupItem>
          <h4>
            <Link to={'/course/' + course.id}>{course.name}</Link> <Label>${course.price} per lesson</Label>
            <Button className="pull-right" bsStyle ="danger" bsSize = "small"><Glyphicon glyph="remove"/></Button>
          </h4>
        </ListGroupItem>
      );        
    });

    return (
      <div>
        <Panel header="Courses that you Tutor">
          <ListGroup>
            {courseList}
          </ListGroup>
        </Panel>
      </div>
    );
  }
}

TutorSettings.displayName = 'TutorSettings'

export default TutorSettings