import React, { Fragment } from "react";
import EdigitalLayout from "../../../home/EDigitalLayout";
import { Breadcrumb, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ListGuidesResources from "./ListGuidesResources";

export const GuidesResources = () => {
  return (
    <EdigitalLayout>
      <Fragment>
        <Row>
          <Col>
            <div className="border-bottom pb-2 mb-4 d-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">Guides & Resources</h1>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="#">E-Digital</Breadcrumb.Item>
                  <Breadcrumb.Item href="/main-desk">Main Desk</Breadcrumb.Item>
                  <Breadcrumb.Item active>Guides & Resources</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="">
                <Link
                  to="/main-desk/guides-resources/create"
                  className="btn btn-primary btn-sm rounded-3"
                >
                  Add New
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Fragment>

      <ListGuidesResources />
    </EdigitalLayout>
  );
};
