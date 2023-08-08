import React, { Fragment } from "react";
import { Breadcrumb, Col, Nav, Row, Tab } from "react-bootstrap";
import EdigitalLayout from "../../../home/EDigitalLayout";
import { Overview } from "../epcn/Overview";
import { Transaction } from "../epcn/Transaction";

export const TunjanganMainDesk = () => {
  return (
    <EdigitalLayout>
      <Fragment>
        <Row>
          <Col lg={12} md={12} sm={12}>
            {/* <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between"> */}
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Tunjangan Suka Duka</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">E-Digital</Breadcrumb.Item>
                <Breadcrumb.Item href="/main-desk">Main Desk</Breadcrumb.Item>
                <Breadcrumb.Item active>Tunjangan Suka Duka</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {/* </div> */}
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Tab.Container defaultActiveKey="overview">
              <Nav className="nav-lb-tab">
                <Nav.Item>
                  <Nav.Link eventKey="overview" className="mb-sm-3 mb-md-0">
                    Overview
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="transaction" className="mb-sm-3 mb-md-0">
                    Transaction List
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="overview" className="pb-4 ps-2 p-4">
                  <Overview />
                </Tab.Pane>
                <Tab.Pane eventKey="transaction" className="pb-4 ps-2 p-4">
                  <Transaction />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Fragment>
    </EdigitalLayout>
  );
};
