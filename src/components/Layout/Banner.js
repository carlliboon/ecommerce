import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../assets/css/App.css";

const Banner = () => {
  return (
    <div className="banner">
      <Container>
        <Row className="align-items-left">
          <Col md={6}>
            <div className="banner-text">
              <h1>Welcome to HomeDeco</h1>
              <p>Discover the best products at unbeatable prices</p>
              <Button variant="dark" size="lg">
                Shop Now
              </Button>
            </div>
          </Col>
          {/* <Col md={6}>
            <div className="banner-image">
              <img
                src="path/to/your/image.jpg"
                alt="Banner"
                className="img-fluid"
              />
            </div>
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
