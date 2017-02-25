import React from 'react'

import { PageHeader, Grid, Col, Button, Panel } from 'react-bootstrap'
import CourseTutorContainer from './CourseTutorContainer'

class Course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'CSE 110',
      title: 'Software Engineering',
      desc: 'Introduction to software development and engineering methods, including specification, design, implementation, testing, and process. An emphasis on team development, agile methods, and use of tools such as IDE’s, version control, and test harnesses.'
    };
  }

  render() {
    return (
      <div id='container'>
        <Grid>
          <PageHeader>{this.state.name}
            <small> {this.state.title}</small> 
          <Button className='pull-right'>Tutor for this Course</Button>
          </PageHeader>
          <Panel header='Description'>{this.state.desc}</Panel>

          <h2>Available Tutors</h2>
          <CourseTutorContainer course={this.props.params.id} />
        </Grid>
      </div>
    );
  }
}

Course.displayName = 'Course';

export default Course
