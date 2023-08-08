// import node module libraries
import { Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CareerJourney = () => {
  return (
    <section className=" bg-white">
      {/* container */}
      <Container>
        <Row>
          <Col xl={12} md={12} xs={12}>
            <Row className="gy-6 d-flex">
              {/* col */}
              <Col className="px-5">
                <div className="text-center">
                  {/* icon */}
                  <div className="icon-shape bg-light-success icon-md border border-success border-2 fs-4 mb-1 rounded-circle process-line-sm text-dark-success smooth-shadow-md">
                    1
                  </div>
                  {/* heading */}
                  <p className="text-success fs-6 mb-3">Done </p>
                  <h4 className="mb-3"> NSER </h4>
                  {/* text */}
                  <Link className="mb-0 fs-6 text-decoration-underline">
                    See Detail
                  </Link>
                </div>
              </Col>
              {/* col */}
              <Col className="px-5">
                <div className="text-center">
                  {/* icon */}
                  <div className="icon-shape bg-light-success icon-md border border-success border-2 fs-4 mb-1 rounded-circle process-line-sm text-dark-success smooth-shadow-md">
                    2
                  </div>
                  {/* heading */}
                  <p className="text-success fs-6 mb-3">Done </p>
                  <h4 className="mb-3">TAP</h4>
                  {/* text */}
                  <Link className="mb-0 fs-6 text-decoration-underline">
                    See Detail
                  </Link>
                </div>
              </Col>
              <Col className="px-5">
                <div className="text-center">
                  {/* icon */}
                  <div className="icon-shape bg-light-success icon-md border border-success border-2 fs-4 mb-1 rounded-circle process-line-sm text-dark-success smooth-shadow-md">
                    3
                  </div>
                  {/* heading */}
                  <p className="text-success fs-6 mb-3">Done </p>
                  <h4 className="mb-3">Certification</h4>
                  {/* text */}
                  <Link className="mb-0 fs-6 text-decoration-underline">
                    See Detail
                  </Link>
                </div>
              </Col>
              <Col className="px-5">
                <div className="text-center">
                  {/* icon */}
                  <div className="icon-shape bg-light-warning icon-md border border-warning border-2 fs-4 mb-1 rounded-circle process-line-sm text-dark-warning smooth-shadow-md">
                    4
                  </div>
                  {/* heading */}
                  <p className="text-warning bg-light-warning border border-warning fs-6 rounded">
                    Current{" "}
                  </p>
                  <h4 className="mb-3">ASLDP</h4>
                  {/* text */}
                  <Link className="mb-0 fs-6 text-decoration-underline">
                    See Detail
                  </Link>
                </div>
              </Col>
              <Col className="px-5">
                <div className="text-center">
                  {/* icon */}
                  <div className="icon-shape bg-light-success icon-md border border-success border-2 fs-4 mb-1 rounded-circle process-line-sm text-dark-success smooth-shadow-md">
                    5
                  </div>
                  {/* heading */}
                  <p className="text-success fs-6 mb-3">Done </p>
                  <h4 className="mb-3">BDP</h4>
                  {/* text */}
                  <Link className="mb-0 fs-6 text-decoration-underline">
                    See Detail
                  </Link>
                </div>
              </Col>
              <Col className="px-5">
                <div className="text-center">
                  {/* icon */}
                  <div className="icon-shape bg-light-success icon-md border border-success border-2 fs-4 mb-1 rounded-circle process-line-sm text-dark-success smooth-shadow-md">
                    6
                  </div>
                  {/* heading */}
                  <p className="text-success fs-6 mb-3">Done </p>
                  <h4 className="mb-3">SLDP</h4>
                  {/* text */}
                  <Link className="mb-0 fs-6 text-decoration-underline">
                    See Detail
                  </Link>
                </div>
              </Col>
              <Col className="px-5">
                <div className="text-center">
                  {/* icon */}
                  <div className="icon-shape bg-light-success icon-md border border-success border-2 fs-4 mb-1 rounded-circle text-dark-success smooth-shadow-md">
                    7
                  </div>
                  {/* heading */}
                  <p className="text-success mb-3 fs-6">Done </p>
                  <h4 className="mb-3">SDP</h4>
                  {/* text */}
                  <Link className="mb-0 fs-6 text-decoration-underline">
                    See Detail
                  </Link>
                </div>
              </Col>

              {/* col */}
              {/* <Col md={4} sm={12}>
                <div className=" text-center">
                  <div className="icon-shape icon-lg border border-primary border-2 fs-3 rounded-circle mb-4 text-primary smooth-shadow-md">
                    3
                  </div>
                  <h3>Purchase the listing </h3>
                  <p className="mb-0 px-3">
                    Preview your listing and once you are ready to post it you
                    can add your billing information.
                  </p>
                </div>
              </Col> */}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CareerJourney;
