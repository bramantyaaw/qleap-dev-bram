import React, { Fragment } from "react";
import EdigitalLayout from "../../../home/EDigitalLayout";
import { Breadcrumb, Button, Col, Nav, Row, Tab } from "react-bootstrap";
import { LibraryProgram } from "./library/LibraryProgram";
import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { ReportProgram } from "./list/ReportProgram";

export const ManageProgram = () => {
  return (
    <EdigitalLayout>
      <Fragment>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="d-md-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">Manage Program</h1>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="/main-desk">Main Desk</Breadcrumb.Item>
                  <Breadcrumb.Item active>Manage Program</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div>
                <Button
                  href="/main-desk/manage-program/create"
                  className="btn btn-primary rounded-3"
                >
                  <FiPlusCircle className="me-1 my-0" size="15px" />
                  Create
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12} className="ps-0 pe-0 ">
            <Tab.Container defaultActiveKey="create">
              <Nav className="nav-lb-tab">
                <Nav.Item>
                  <Nav.Link eventKey="create" className="mb-sm-3 mb-md-0">
                    Library
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="overview" className="mb-sm-3 mb-md-0">
                    Report
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="create" className="pb-4 ps-2 p-4">
                  <LibraryProgram />
                </Tab.Pane>
                <Tab.Pane eventKey="overview" className="pb-4 p-4 ps-2">
                  {/* <ReportProgram /> */}
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Fragment>
    </EdigitalLayout>
  );
};
