import React, { Fragment } from "react";
import { Col, Row, Container, Image, Form, Button } from "react-bootstrap";

const TicketingPart = () => {
  return (
    <section className="py-lg-5 pt-8 py-10 px-5 bg-white">
      {/* container */}
      {/* <Container> */}
      <Row>
        <Col xl={{ span: 10, offset: 1 }} md={12} xs={12}>
          <Row className="text-center">
            {/* col */}
            <Col md={12} className="px-lg-10 mb-8 mt-6">
              <span className="text-uppercase text-primary fw-semi-bold ls-md">
                if you have problems regarding company administration
              </span>
              {/* heading */}
              <h2 className="fsc-32 fw-bold mt-3">Submit Ticketing</h2>
            </Col>
          </Row>
          <Row className="gy-6">
            {/* col */}
            <Col md={4} sm={12}>
              <div className=" text-center">
                {/* icon */}
                <div className="icon-shape icon-lg border border-primary border-2 fs-3 rounded-circle mb-4 process-line text-primary smooth-shadow-md">
                  {" "}
                  1
                </div>
                {/* heading */}
                <h3>Click Self Service</h3>
                {/* text */}
                <p className="mb-0 px-4">
                  Self service is in the menu bar located above
                </p>
              </div>
            </Col>
            {/* col */}
            <Col md={4} sm={12}>
              <div className=" text-center">
                {/* icon */}
                <div className="icon-shape icon-lg border border-primary border-2 fs-3 rounded-circle mb-4 process-line text-primary smooth-shadow-md">
                  2
                </div>
                {/* heading */}
                <h3>Click Submit Ticket</h3>
                {/* text */}
                <p className="mb-0 px-2">
                  Submit Tickets are on the Help Center page, and the button are
                  located on the top right corner
                </p>
              </div>
            </Col>
            {/* col */}
            <Col md={4} sm={12}>
              <div className=" text-center">
                {/* icon */}
                <div className="icon-shape icon-lg border border-primary border-2 fs-3 rounded-circle mb-4 text-primary smooth-shadow-md">
                  3
                </div>
                {/* heading */}
                <h3>Submit a Request</h3>
                {/* text */}
                <p className="mb-0 px-3">
                  Fill in the fields based on your NIK and name, if you have
                  filled, select the type of issue based on your constraints
                </p>
              </div>
            </Col>
            {/* button */}
            <Col sm={12} className="mt-8 text-center">
              <Button as="a" href="/my-submission/ticket/create">
                Submit Ticket
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* </Container> */}
    </section>
  );
};

export default TicketingPart;
