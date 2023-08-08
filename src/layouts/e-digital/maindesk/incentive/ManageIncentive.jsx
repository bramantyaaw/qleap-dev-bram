import React, { Fragment } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import EdigitalLayout from "../../../home/EDigitalLayout";
import { ListIncentive } from "./ListIncentive";
import { UploadFile } from "./UploadFile";

export const ManageIncentive = () => {
  return (
    <EdigitalLayout>
      <Fragment>
        <Row>
          <Col lg={12} md={12} sm={12}>
            {/* <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between"> */}
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Incentive</h1>
            </div>
            {/* </div> */}
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={12} sm={12}>
            <Tab.Container defaultActiveKey="empData">
              <Nav className="nav-lb-tab">
                <Nav.Item>
                  <Nav.Link eventKey="empData" className="mb-sm-3 mb-md-0">
                    Upload File
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="jobEval" className="mb-sm-3 mb-md-0">
                    List Incentive
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="empData" className="pb-4 ps-2 p-4">
                  <UploadFile />
                </Tab.Pane>
                <Tab.Pane eventKey="jobEval" className="pb-4 p-4 ps-2">
                  <ListIncentive />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Fragment>
    </EdigitalLayout>
  );
};
