import React, { Fragment } from "react";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import StatRightCenterIcon from "../../../common/stats/StatRightCenterIcon";
import {
  mdiLightbulbOn,
  mdiAccountGroup,
  mdiAccountMultiplePlus,
  mdiSpeedometer,
  mdiMonitorCellphone,
  mdiTallyMark5,
} from "@mdi/js";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";

export const PerformanceDevelopment = ({ data }) => {
  return (
    <Fragment>
      <Col xl={12} lg={12} md={12} sm={12} className="px-0 mb-4">
        <Tab.Container defaultActiveKey="Achievement">
          <Card>
            <Card.Header className="border-bottom-0 p-0 bg-white">
              <Nav className="nav-lb-tab">
                <Nav.Item>
                  <Nav.Link eventKey="Achievement" className="mb-sm-3 mb-md-0">
                    Learning
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="training" className="mb-sm-3 mb-md-0">
                    Development
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body className="p-0">
              <Tab.Content>
                <Tab.Pane eventKey="Achievement" className="pb-0 p-4">
                  <Row>
                    <Col
                      lg={12}
                      className="d-flex justify-content-between border-bottom"
                    >
                      <p>
                        Here is a final score learning based on E University, by
                        this employee
                      </p>
                      <Link className="btn btn-outline-primary btn-xs mb-3">
                        View Detail
                      </Link>
                    </Col>
                    <Col lg={4} md={6} xs={12} className="border-bottom">
                      <StatRightCenterIcon
                        title={
                          data?.avg_assignment ? data?.avg_assignment : "-"
                        }
                        value="Avg Assignment"
                        iconName={mdiLightbulbOn}
                        iconColorVariant="primary"
                        classValue="mt-3 mb-2 ps-2"
                      />
                    </Col>
                    <Col
                      lg={4}
                      md={6}
                      xs={12}
                      className="border-start border-bottom"
                    >
                      <StatRightCenterIcon
                        title={data?.avg_module ? data?.avg_module : "-"}
                        value="Avg Module"
                        iconName={mdiAccountGroup}
                        iconColorVariant="success"
                        classValue="mt-3 mb-2 ps-2"
                      />
                    </Col>
                    <Col
                      lg={4}
                      md={6}
                      sm={12}
                      className="border-start border-bottom"
                    >
                      <StatRightCenterIcon
                        title={
                          data?.avg_supplementary
                            ? data?.avg_supplementary
                            : "-"
                        }
                        value="Avg Suplementary"
                        iconName={mdiAccountMultiplePlus}
                        iconColorVariant="danger"
                        classValue="mt-3 mb-2 pe-3"
                      />
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <StatRightCenterIcon
                        title={data?.final_score ? data?.final_score : "-"}
                        value="Final Score Learning Journey"
                        iconName={mdiSpeedometer}
                        iconColorVariant="warning"
                        classValue="mt-3 mb-2 ps-2"
                      />
                    </Col>
                    <Col lg={4} md={6} sm={12} className="border-start">
                      <StatRightCenterIcon
                        title="-"
                        value="Digital"
                        iconName={mdiMonitorCellphone}
                        iconColorVariant="info"
                        classValue="mt-3 mb-2 ps-2"
                      />
                    </Col>
                    <Col lg={4} md={6} sm={12} className="border-start">
                      <StatRightCenterIcon
                        title="-"
                        value="Total Score"
                        iconName={mdiTallyMark5}
                        iconColorVariant="secondary"
                        classValue="mt-3 mb-2 pe-3"
                      />
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="training" className="pb-4 p-4">
                  <Row className="position-relative">
                    <Col lg={12} className="d-flex justify-content-between">
                      <p>Here is the program this employee has participated</p>
                      <Link className="btn btn-outline-primary btn-xs mb-3">
                        View Detail
                      </Link>
                    </Col>
                    <Col xs="auto">
                      <div
                        className={`icon-shape icon-md bg-light-warning text-dark-warning rounded-3`}
                      >
                        <Icon
                          path={mdiTallyMark5}
                          className="nav-icon"
                          size={0.8}
                        />
                      </div>
                    </Col>
                    <Col className="ms-n3 mt-2">
                      <h4 className="mb-0 h4">Talent Development Program</h4>
                    </Col>
                    <Col xs="auto">
                      <span className="text-secondary">
                        Period : 12/03/2023 - 19/03/2023
                      </span>
                    </Col>
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </Col>
    </Fragment>
  );
};
