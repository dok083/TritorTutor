import React from 'react'
import { Grid, Col,Row} from 'react-bootstrap'

var img = '/profiles/0.jpg';

const imgStyle = {
  width: "200px",
  height: "200px",
  opacity: "0.3",
  margin: "auto",
  display: "block"
};


export default class About extends React.Component {
  render() {
    return (
      <div id='container'>
        <center>
          <Grid>
            <Col xs={12} md={12}>

            <Row className = "about-us">
              <h1>About Us</h1>
              <Col xs={1} md={1}><p></p></Col>
              <Col xs={10} md={10}>
              <p>
              <font size="5">
                 Our team, <font color="red">OkaySoftware</font>, made a promise that we would make a practical and innovative
                  solution to students who are struggling in college courses.
              </font>
              </p>
              </Col>
              <Col xs={1} md={1}><p></p></Col>
            </Row>

            <Row className = "our-mission">
              <h2>Our Mission</h2>
              <Col xs={2} md={2}><p></p></Col>
              <Col xs={8} md={8}>
              <p>
              <font size="4">
                Some subjects don't come easily and that can be a barrier for you to moving 
                forward with your career. Maybe you're not feeling so confident on your 
                academic courses that you currently enrolled. We acknowlege that studying college courses
                are challenging so we wanted to encourage students by providing the private tutoring service.
                <b><font color="red"> Our mission</font></b> is to give a bridge between UCSD students and private tutors, 
                so the students can feel more confident at college courses. 
              </font>
              </p>
              </Col>
              <Col xs={2} md={2}><p></p></Col>
            </Row>

          
              

              <h2>Meet The Team</h2>
              <Row className = "Team-1">
                <Col xs={12} md={6}>
                  <h3><b>Brian Minh Hang</b></h3>
                  <img 
                    style = {imgStyle}
                    src ={img}
                  />
                  <p>
                    <h4 className='text-center'>Project Manager</h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>

                <Col xs={12} md={6}>
                  <h3><b>David Dinata</b></h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    <h4 className='text-center'>Senior System Analyst</h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>
              </Row>

              <Row className = "Team-2">
                <Col xs={12} md={6}>
                  <h3><b>San Kang</b></h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    <h4 className='text-center'>Software Architect</h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>

                <Col xs={12} md={6}>
                  <h3><b>Rishiesh Hirendu Vaishnav</b></h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    <h4 className='text-center'>Software Architect</h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>
              </Row>

              <Row className = "Team-3">
                <Col xs={12} md={6}>
                  <h3><b>Doyoung Kim</b></h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    <h4 className='text-center'>Software Development Lead</h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>

                <Col xs={12} md={6}>
                  <h3><b>Yiming Chen</b></h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    <h4 className='text-center'>Algorithm Specialist</h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>
              </Row>

              <Row className = "Team-4">
                <Col xs={12} md={6}>
                  <h3><b>Amal Alhaidari</b></h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    <h4 className='text-center'>Database Specialist</h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>

                <Col xs={12} md={6}>
                  <h3><b>Seonghyun Hong</b></h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    <h4 className='text-center'>Business Analyst</h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>
              </Row>

              <Row className = "Team-5">
                <Col xs={12} md={6}>
                  <h3><b>Bonnie Chen</b></h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    <h4 className='text-center'>User Interface Specialist</h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>

                <Col xs={12} md={6}>
                  <h3><b>Natchuta Wattanapenpaiboon</b></h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    <h4 className='text-center'>Quality Assurance Lead</h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>
              </Row>

            </Col>
          </Grid>
        </center>
      </div>
    );
  }
}
