// import node module libraries
import React, { Fragment } from "react";
import { Col, Row, Container, Image, Form, Button } from "react-bootstrap";

// import custom components
import FeatureTopIconWithLink from "../../components/components/marketing/common/features/FeatureTopIconWithLink";

// import media files
import ThreeDGirlSeeting from "../../assets/images/svg/help_icon.svg";
// import data files
import HelpCenterFeaturesData from "../../data/helpcenter/HelpCenterFeaturesData";
import "../../assets/scss/theme/utilities/_background.scss";
import { Link } from "react-router-dom";

const HeroGradientHeader = () => {
  const border = (index) => {
    let items = " d-flex align-items-stretch";
    if (index === 0) {
      return "";
    } else {
      if (index === 3) {
        return "border-top" + items;
      } else if (index === 1 || index === 2) {
        return "border-start" + items;
      } else {
        return "border-start border-top" + items;
      }
    }
  };
  return (
    <Fragment>
      <div className="py-lg-5 bg-colors-gradient-reversed">
        <Container className="mb-10">
          <Row className="align-items-center justify-content-center">
            <Col md={6} xs={12} className="mb-3">
              <h1 className="fw-bold display-5 white-font text-left">
                How can we help you?
              </h1>
              <p className="mt-5 mb-4 white-font text-left">
                Have a problem? You can make a ticket
              </p>
              {/* <div className="pe-md-6">
                <Form className="d-flex align-items-center">
                  <span className="position-absolute ps-3 search-icon">
                    <i className="fe fe-search"></i>
                  </span>

                  <Form.Control
                    type="search"
                    placeholder="Enter a question, topic or keyword"
                    className="ps-6 border-0 py-3 smooth-shadow-md"
                  />
                </Form>
              </div> */}
              {/* <span className=" mt-2 mb-3 d-block white-font text-left">
                ... or choose a category to quickly find the help you need
              </span> */}
              <Link to="/coming-soon">
                <Button variant="light " className="text-primary rounded-2">
                  Submit Ticket
                </Button>
              </Link>
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <div className="d-flex align-items-center justify-content-center">
                <Image
                  src={ThreeDGirlSeeting}
                  alt=""
                  className="text-center img-fluid"
                  style={{ height: "400px", width: "450px" }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="mt-n16 mb-10">
        <Container>
          <div className="bg-white border-dark rounded-3 shadow-lg px-3">
            <Row>
              {HelpCenterFeaturesData.map((item, index) => {
                return (
                  <Col
                    md={4}
                    xs={12}
                    // className={index === 0 ? '' : 'border-start-md d-flex align-items-stretch'}
                    className={border(index)}
                    key={index}
                  >
                    <div className="h-100 d-flex flex-column justify-content-between">
                      {item?.title === "Chat Whatsapp" ? (
                        <FeatureTopIconWithLink item={item} isButton />
                      ) : (
                        <FeatureTopIconWithLink
                          item={item}
                          // className={
                          // 	HelpCenterFeaturesData.length - 1 === index
                          // 		? ''
                          // 		: 'border-bottom'
                          // }
                        />
                      )}
                    </div>
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
export default HeroGradientHeader;
