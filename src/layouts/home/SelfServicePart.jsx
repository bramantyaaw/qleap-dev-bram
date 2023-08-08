// import node module libraries
import { Col, Row, Container, Button } from "react-bootstrap";

// import custom components
import StatTopSVGIcon from "../../components/components/marketing/common/stats/StatTopSVGIcon";

// import required data files
import SelfServicesData from "../../data/selfservices/SelfServicesData";

const SelfServicePart = () => {
  return (
    <section className="py-lg-5 bg-gray-100 pt-8 px-5 pb-10">
      {/* <Container> */}
      <Row>
        <Col xl={{ span: 10, offset: 1 }} md={12} xs={12}>
          <Row className="text-center">
            <Col md={12} className="px-lg-10 mb-8 mt-6">
              {/* text */}
              <span className="text-uppercase text-primary fw-semi-bold ls-md">
                Self Service
              </span>
              {/* heading */}
              <h2 className="fsc-32 fw-bold mt-3">
                Discover all forms of Self Service submission
              </h2>
            </Col>
          </Row>
          <Row className="gy-4">
            {SelfServicesData?.slice(0, 4)?.map((item, index) => {
              return (
                <Col
                  lg={3}
                  md={4}
                  xs={12}
                  key={index}
                  className="d-flex align-items-stretch justify-content-center"
                >
                  <StatTopSVGIcon item={item} />
                </Col>
              );
            })}
            {/* view all categories button/link */}
            <Col xs={12} className="mt-8 text-center">
              <Button as="a" variant="outline-primary" href="/self-service">
                View All Self Service
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* </Container> */}
    </section>
  );
};

export default SelfServicePart;
