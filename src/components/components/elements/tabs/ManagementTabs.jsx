import React, { Fragment, useEffect, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";

export const ManagementTabs = (props) => {
  const { data } = props;
  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          {/* <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between"> */}
          <div className="mb-3 mb-md-0">
            <h1 className="mb-1 h2 fw-bold">{data[0]?.title}</h1>
          </div>
          {/* </div> */}
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12}>
          <Tab.Container defaultActiveKey={data[0]?.tabs[0]?.eventKey}>
            <Nav className="nav-lb-tab">
              {data[0]?.tabs?.map((data, index) => {
                return (
                  <Nav.Item>
                    <Nav.Link
                      eventKey={data?.eventKey}
                      index={index}
                      className="mb-sm-3 mb-md-0"
                    >
                      {data?.title}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>

            <Tab.Content>
              {data[0]?.tabs?.map((data, index) => {
                return (
                  <Tab.Pane
                    eventKey={data?.eventKey}
                    index={index}
                    className="pb-4 ps-2 p-4"
                  >
                    {data?.content}
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Fragment>
  );
};
