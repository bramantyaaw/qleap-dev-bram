// import node module libraries
import { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Row, Col, Image, Container, ListGroup, Nav } from "react-bootstrap";

const Footer = () => {
  const help = window.location?.pathname === "/help";
  const selfservice = window.location?.pathname === "/self-service";
  return (
    <Fragment>
      {/*  footer */}
      <div
        className={`footer mt-auto ${
          help || selfservice ? null : "subs-wrapper"
        }`}
      >
        <Container>
          <Row className="align-items-center no-gutters border-top py-2">
            {/* <Col lg={4} md={6} sm={12}> */}
            {/* about company  */}
            {/* <div className="mb-4">
								<div className="mt-4"> */}
            <Col
              md={6}
              className="col-12 justify-content-center justify-content-md-start d-flex"
            >
              <span>&copy; 2016 - 2023, PT Erajaya Swasembada Tbk.</span>
            </Col>
            {/* social media */}
            <Col md={6} className="col-12">
              <nav className="nav nav-footer justify-content-center justify-content-md-end">
                <Link
                  className="nav-link active ps-0"
                  to="/terms-and-conditions"
                >
                  Term and Conditions
                </Link>

                <Link className="nav-link" to="#">
                  Feedback
                </Link>
                <Link className="nav-link" to="#">
                  Support
                </Link>
              </nav>
              {/* <Nav
                as="ul"
                className="nav justify-content-center justify-content-md-end"
              >
                <Nav.Item>
                  <Nav.Link to="/terms-and-conditions" className="nav-link ">
                    Term and Conditions
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link to="#" className="nav-link ">
                    Feedback
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link to="#" className="nav-link ">
                    Support
                  </Nav.Link>
                </Nav.Item>
              </Nav> */}
            </Col>
            {/* </div>
    					</div> */}
            {/* </Col> */}
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default Footer;
