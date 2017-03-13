import React from 'react'

import { Jumbotron, Grid, Col, Panel } from 'react-bootstrap'
import CourseSearchComponent from './CourseSearchComponent'
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
              <CourseSearchComponent />
            </Col>
          </Grid>
        </Jumbotron>
        <div id='container'>
          <Grid>
            <Col xs={12} md={12}>
              <h2>Need some tutoring?</h2>
              
              <Col xs={9} md={9}>
              <p>
              <font size="4">
              We all need help sometimes. Tritor is here for you to get private tutoring 
              for UCSD courses. Search right now to get in touch with tutors for your classes!
              </font>
              </p>
              </Col>
              <Col xs={3} md={3}>
              </Col>

            </Col>
            <Col xs={12} md={12}>
              <h2>Interested in tutoring?</h2>
              <p>
              <font size="4">
              Excelled in some courses and need some quick money? 
              You can be a tutor for specific courses that are offered in UCSD!
              </font>
              </p>

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
