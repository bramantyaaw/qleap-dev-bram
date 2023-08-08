import React, { Fragment } from "react";
import { Col, Row, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// import custom components
import FeatureTopIconWithLink from "../../components/components/marketing/common/features/FeatureTopIconWithLink";
// import media files
import SelfServiceIcon from "../../assets/images/svg/self-service.svg";

// import data files
import SelfServicesData from "../../data/selfservices/SelfServicesData";

import "../../assets/scss/theme/utilities/_background.scss";

const SelfServiceHeader = () => {
  return (
    <Fragment>
      <div className="py-lg-5 bg-colors-gradient-reversed">
        <Container className="mb-10">
          <Row className="align-items-center justify-content-center">
            <Col md={6} xs={12} className="mb-7">
              <h1 className="fw-bold display-3 white-font text-left">
                Self Service Application
              </h1>
              <span className=" mt-2 d-block white-font text-left">
                Have questions? You can go to Help Center page
              </span>
            </Col>
            <Col md={6} xs={12} className="mb-7 mb-md-3">
              <div className="d-flex align-items-center justify-content-center">
                <Image
                  src={SelfServiceIcon}
                  alt=""
                  className="text-center img-fluid align-items-end"
                  style={{ height: "400px", width: "467px" }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="mt-n16 pb-7">
        <Container>
          <div className="bg-white rounded-3 border">
            <Row className="p-4">
              {SelfServicesData?.map((item, index) => {
                return (
                  <Col
                    xl={4}
                    lg={6}
                    md={6}
                    sm={12}
                    // className={index === 0 ? '' : 'border-start-md d-flex align-items-stretch'}
                    className="d-flex align-items-stretch"
                    key={index}
                  >
                    <Link
                      to={item?.link}
                      className="text-secondary h-100 w-100"
                    >
                      <Container className="p-2 pt-4 h-100 w-100">
                        <FeatureTopIconWithLink
                          item={item}
                          isHeader
                          className={`h-100 w-100`}
                        />
                      </Container>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};
export default SelfServiceHeader;
