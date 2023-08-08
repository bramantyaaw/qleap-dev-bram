// import node module libraries
import { Col, Row, Container } from "react-bootstrap";

const PageHeadingBriefinfo = ({
  pagetitle,
  briefinfo1,
  briefinfo2,
  briefinfo3,
  span1,
  span2,
  spantitle,
}) => {
  return (
    <div className="pt-lg-8 pb-lg-16 pt-8 pb-12">
      <Container>
        <Row className="align-items-center d-flex justify-content-center">
          <Col xl={7} lg={7} md={12} sm={12}>
            <div></div>
            <div className="ms-0 ms-md-5 ps-0 ps-md-5">
              <h1 className="text-white mb-3 fw-semi-bold">
                {pagetitle} <span className="fw-light">{spantitle}</span>
              </h1>
              <p className="text-white mb-5 lead brief-info-text fw-light">
                {briefinfo1}
                <span className="fst-italic">{span1}</span>
                {briefinfo2}
                <span className="fst-italic">{span2}</span>
                {briefinfo3}
              </p>
            </div>
            <div></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageHeadingBriefinfo;
