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
              <p>
              <font size="4">
                 We started from the bottom now we are here.
              </font>
              </p>

              <h2>Our Mission</h2>
              <Col xs={2} md={2}><p></p></Col>
              <Col xs={8} md={8}>
              <p>
              <font size="4">
                Some subjects don't come easily and that can be a barrier for you to moving 
                forward with your carrier. Maybe you're not feeling so confident on your 
                academic courses that you currently enrolled. We acknowlege that studying college courses
                are challenging so we wanted to encourage students by providing the private tutoring service.
                <b> Our mission</b> is to give a bridge between UCSD students and private tutors, 
                so the students can feel more confident at college courses. 
              </font>
              </p>
              </Col>
              <Col xs={2} md={2}><p></p></Col>
            </Row>

            
              <br></br>

              <h2>Meet The Team</h2>
              <Row className = "Team-1">
                <Col xs={6} md={6}>
                  <h3>Brian Minh Hang</h3>
                  <img 
                    style = {imgStyle}
                    src ={img}
                  />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>

                <Col xs={6} md={6}>
                  <h3>David Dinata</h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>
              </Row>

              <Row className = "Team-2">
                <Col xs={6} md={6}>
                  <h3>San Kang</h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>

                <Col xs={6} md={6}>
                  <h3>Rishiesh Hirendu Vaishnav</h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>
              </Row>

              <Row className = "Team-3">
                <Col xs={6} md={6}>
                  <h3>Doyoung Kim</h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>

                <Col xs={6} md={6}>
                  <h3>Yiming Chen</h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>
              </Row>

              <Row className = "Team-4">
                <Col xs={6} md={6}>
                  <h3>Amal Alhaidari</h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>

                <Col xs={6} md={6}>
                  <h3>Seonghyun Hong</h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>
              </Row>

              <Row className = "Team-5">
                <Col xs={6} md={6}>
                  <h3>Bonnie Chen</h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis gravida facilisis. Mauris porttitor urna tortor, auctor elementum lacus congue at. Sed vestibulum interdum eros, et faucibus massa rutrum nec. Pellentesque eleifend consequat metus sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare elit in diam rutrum tempor. Aliquam condimentum eget purus ut scelerisque. Vestibulum ac facilisis ipsum, vel convallis ligula. 
                  </p>
                </Col>

                <Col xs={6} md={6}>
                  <h3>Natchuta Wattanapenpaiboon</h3>
                  <img 
                    style = {imgStyle}
                    src = {img}
                  />
                  <p>
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
