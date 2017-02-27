import React from 'react'

import { Jumbotron, Grid, Col, Panel } from 'react-bootstrap'
import CourseSearchContainer from './CourseSearchContainer'
import PopularCoursesContainer from './PopularCoursesContainer'
import PopularTutorsContainer from './PopularTutorsContainer'

class Home extends React.Component {
  render() {
    const jumboStyle = {
      backgroundImage: 'url("/geisel.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: '0% 40%',
      backgroundRepeat: 'no-repeat',
      minHeight: '300px',
      color: '#fff',
      textShadow: '#303030 0em 0em 0.3em',
      textAlign: 'center',
      marginTop: '-20px'
    };

    return (
      <div>
        <Jumbotron style={jumboStyle}>
          <h1>Welcome to Tritor!</h1>
          <h3>The private tutoring marketplace for UCSD</h3>
          <br />
          <Grid>
            <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
              <CourseSearchContainer />
            </Col>
          </Grid>
        </Jumbotron>
        <div id='container'>
          <Grid>
            <Col xs={12} md={12}>
              <h2>Need some tutoring?</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text ever
              since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.</p>
            </Col>
            <Col xs={12} md={12}>
              <h2>Interested in tutoring?</h2>
              <p>It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem
              Ipsum.</p>

              <h2>What does Tritor offer?</h2>
            </Col>
            <Col xs={12} md={6}>
              <h3>Popular Courses</h3>
              <PopularCoursesContainer />
            </Col>
            <Col xs={12} md={6}>
              <h3>Popular Tutors</h3>
              <PopularTutorsContainer />
            </Col>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home
