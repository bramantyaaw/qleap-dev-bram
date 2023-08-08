import React from "react";
import TicketPage from "../../../components/components/dashboard/ticketing/hero/TicketPage";
import EdigitalLayout from "../../home/EDigitalLayout";
import { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import FlowProgress from "../../../components/components/dashboard/ticketing/elements/flow-progress/FlowProgress";

const RnRCreate = () => {
  return (
    <EdigitalLayout>
      <Fragment>
        <Row>
          <Col lg={12} md={12} sm={12}>
            {/* <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between"> */}
            <div className="pb-3 mb-md-0 border-bottom">
              <h1 className="h2 fw-bold">ROLE & RESPONSIBILITIES</h1>
              <TicketPage
                text1="Main Desk"
                link1="/main-desk"
                text2="Role & Responsibilities"
                link2="/edigital/rnr"
                text4="Create"
                className="my-0 ms-0 mb-3"
              />
            </div>
          </Col>
        </Row>
        <Row className="my-2">
          <Col lg={8} md={8} sm={8}></Col>
          <Col lg={4} md={4} sm={4}>
            <Card>
              <Card.Header>
                <p className="mb-0 text-kinda-dark font-xss fw-bold">
                  ROLE & RESPONSIBILITIES
                </p>
              </Card.Header>
              <FlowProgress
                text1="Employee Submit"
                text2="Employee submit Tunjangan"
                textcolor="text-success"
                status="Done"
              />
            </Card>
          </Col>
        </Row>
      </Fragment>
    </EdigitalLayout>
  );
};

export default RnRCreate;
