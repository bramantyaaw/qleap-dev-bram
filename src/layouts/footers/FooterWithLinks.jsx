// import node module libraries
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Container, ListGroup } from "react-bootstrap";

// import MDI icons
import Icon from "@mdi/react";
import { mdiFacebook, mdiInstagram, mdiLinkedin } from "@mdi/js";

// import media files
import FooterLogo from "../../assets/images/logo/qleap-text.svg";

const FooterWithLinks = () => {
  return (
    <Fragment>
      {/*  footer */}
      <div className="pt-lg-10 pt-5 footer bg-white">
        <Container>
          <Row>
            <Col lg={4} md={6} sm={12}>
              {/* about company  */}
              <div className="mb-4">
                <Image src={FooterLogo} height={50} alt="" />
                <div className="mt-4">
                  <p>
                    qleap is a platform that helps employees to display the data
                    they need & helps make their work easier. More experience,
                    More personalize, More easy
                  </p>
                  {/* social media */}
                  <div className="fs-4 mt-4">
                    <Link
                      target="_top"
                      to="https://www.facebook.com/ErajayaGroup/"
                      className="mdi mdi-facebook text-muted me-2"
                    >
                      <Icon path={mdiFacebook} size={0.7} />
                    </Link>
                    <Link
                      target="_top"
                      to="https://www.linkedin.com/company/erajayaswasembada/"
                      className="mdi mdi-twitter text-muted me-2"
                    >
                      <Icon path={mdiLinkedin} size={0.7} />
                    </Link>
                    <Link
                      target="_top"
                      to="https://www.instagram.com/erajayaswasembada"
                      className="mdi mdi-instagram text-muted "
                    >
                      <Icon path={mdiInstagram} size={0.7} />
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={{ span: 2, offset: 1 }} md={3} sm={6}>
              <div className="mb-4">
                {/* list */}
                <h3 className="fw-bold mb-3">Company</h3>
                <ListGroup
                  as="ul"
                  bsPrefix="list-unstyled"
                  className="nav nav-footer flex-column nav-x-0"
                >
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link
                      target="_top"
                      to="https://ats.erajaya.com/en"
                      className="nav-link"
                    >
                      ATS
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link
                      target="_top"
                      to="https://biproo.bprohr.com/"
                      className="nav-link"
                    >
                      Biproo
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Col>
            <Col lg={2} md={3} sm={6}>
              <div className="mb-4">
                {/* list  */}
                <h3 className="fw-bold mb-3">Support</h3>
                <ListGroup
                  as="ul"
                  bsPrefix="list-unstyled"
                  className="nav nav-footer flex-column nav-x-0"
                >
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="/help" className="nav-link">
                      Help and Support
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="/help/faq" className="nav-link">
                      FAQ’s
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="/guide" className="nav-link">
                      Guides & Resources
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Col>
            <Col lg={3} md={12} sm={12}>
              {/* contact info */}
              <div className="mb-4">
                <h3 className="fw-bold mb-3">Get in touch</h3>
                <p>
                  Jl. Bandengan Sel. No.11, RT.1/RW.10, Pekojan, Tambora, West
                  Jakarta City, Jakarta 11240
                </p>
                <p className="mb-1">
                  Email: <Link to="#">support.leap@erajaya.com</Link>
                </p>
                <p>
                  Phone:{" "}
                  <span className="text-dark fw-semi-bold">0881-8865-687</span>
                </p>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center g-0 border-top py-2 mt-6">
            {/* Desc  */}
            <Col lg={4} md={5} sm={12}>
              <span>&copy; 2016 - 2023, PT Erajaya Swasembada Tbk.</span>
            </Col>
            {/*  Links  */}
            <Col
              lg={8}
              md={7}
              sm={12}
              className="d-md-flex justify-content-end"
            >
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
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default FooterWithLinks;
