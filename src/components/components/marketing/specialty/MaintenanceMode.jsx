// import node module libraries
import React, { Fragment } from "react";
import { Col, Row, Image, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// import media files.
import MaintenanceModeSVG from "../../../../assets/images/background/maintenance-mode.svg";
import Logo from "../../../../assets/images/logo/qleap-text.svg";

const MaintenanceMode = () => {
  return (
    <Fragment>
      <main>
        <section className="bg-white">
          <Container className="d-flex flex-column">
            <Row>
              <Col lg={12} md={12}>
                <div className="mt-0 ms-0">
                  <Link to="/">
                    <Image
                      src={Logo}
                      alt=""
                      width="100"
                      height="100"
                      className="logo-inverse"
                    />
                  </Link>
                </div>
              </Col>
            </Row>
            <main>
              <Row className="align-items-center justify-content-center g-0 py-lg-15 py-5">
                <Col
                  xl={{ span: 5, offset: 1 }}
                  lg={6}
                  md={12}
                  sm={12}
                  className="text-center text-lg-start"
                >
                  <h1 className="display-3 mb-2 fw-bold">Sorry...</h1>
                  <p className="mb-5 fs-4">
                    This feature is not yet available. if you have problems
                    please contact <Link to="#">Qleap support</Link>. We’ll be
                    back up soon
                  </p>
                  <hr className="my-5" />
                  <div>
                    {/*  notify form */}

                    <Link to="/" className="btn btn-primary mb-2">
                      Back to Safety
                    </Link>
                  </div>
                </Col>
                {/*  image */}
                <Col
                  xl={{ span: 5, offset: 1 }}
                  lg={6}
                  md={12}
                  sm={12}
                  className="mt-8 mt-lg-0"
                >
                  <Image src={MaintenanceModeSVG} alt="" className="w-100" />
                </Col>
              </Row>
            </main>
            {/* <FooterWithSocialIcons /> */}
          </Container>
        </section>
      </main>
    </Fragment>
  );
};

export default MaintenanceMode;
