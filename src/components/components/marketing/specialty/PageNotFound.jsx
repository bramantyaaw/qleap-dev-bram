// import node module libraries
import React, { Fragment } from "react";
import { Col, Row, Image, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

// import media files.
import MaintenanceModeSVG from "../../../../assets/images/background/maintenance-mode.svg";
import Logo from "../../../../assets/images/logo/qleap-text.svg";
import QRView from "./QRView";
import MainDeskToken from "../../../../layouts/e-digital/maindesk/MainDeskToken";
import DynamicIframe from "../../../../layouts/selfservice/offboarding/DynamicIframe";
import ResetPassword from "./ResetPassword";

const PageNotFound = () => {
  const location = useLocation();
  const { pathname, search } = location;

  // reset pass
  const splitResetPass = pathname?.split("/accounts/password/reset/confirm/");
  const getTokenReset = splitResetPass?.length > 1 && search?.split("?token=");

  // dynamic iframe
  const splitIframe = pathname?.split("/self-service/frame");

  // maindesk token
  const split = search?.split("?=");
  const routeSplit = pathname?.split("/login");
  const nik = split?.length > 1 ? split[1] : split[0];
  const navigateLink = routeSplit?.length > 1 && routeSplit[0];

  return (
    <>
      {splitResetPass?.length > 1 ? (
        <ResetPassword
          getTokenReset={getTokenReset?.length > 1 && getTokenReset[1]}
        />
      ) : splitIframe?.length > 1 ? (
        <DynamicIframe route={splitIframe[1]} />
      ) : split?.length > 1 ? (
        <MainDeskToken nik={nik} navigateLink={navigateLink} />
      ) : pathname === "/tracking-approval" ? (
        <QRView search={search} />
      ) : (
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
                      <p className="mb-2 fs-4">
                        This feature is not yet available. <br /> if you have
                        problems please contact{" "}
                        <Link to="#" className="text-decoration-underline">
                          Qleap support
                        </Link>
                      </p>
                      <div>
                        <Link to="/" className="btn px-3 py-2 btn-primary mb-2">
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
                      <Image
                        src={MaintenanceModeSVG}
                        alt=""
                        className="w-100"
                      />
                    </Col>
                  </Row>
                </main>
                {/* <FooterWithSocialIcons /> */}
              </Container>
            </section>
          </main>
        </Fragment>
      )}
    </>
  );
};

export default PageNotFound;
