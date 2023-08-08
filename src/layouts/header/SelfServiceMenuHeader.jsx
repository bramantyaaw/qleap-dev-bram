import { Col, Row, Container } from "react-bootstrap";

import ProfileBackground from "../../assets/images/background/background_qleap.png";

const SelfServiceMenuHeader = ({ title, sub }) => {
  return (
    <div
      className="border-0"
      style={{
        background: `url(${ProfileBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col xl={12} lg={12} md={12} sm={12}>
            <div className="py-4 py-lg-6">
              <h1 className="mb-1 text-white display-4">{title}</h1>
              <p className="text-white mb-0 lead">{sub}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SelfServiceMenuHeader;
