import React, { Fragment } from "react";
import { Breadcrumb, Card, Col, Nav, Row, Tab } from "react-bootstrap";

import EdigitalLayout from "../../home/EDigitalLayout";
import ProjectBudget from "./budget/ProjectBudget";
import FilesTable from "./files/FilesTable";
import { Transaction } from "../maindesk/epcn/Transaction";
import ProjectOverview from "./overview/ProjectOverview";
import ProjectTask from "./task/ProjectTask";
import TeamGrid from "./team/TeamGrid";

import { Approval } from "../myapproval/Approval";
import { useLocation } from "react-router-dom";

export const MyTeam = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeKey = searchParams.get("activeKey") || "team";
  return (
    <EdigitalLayout>
      <Fragment>
        <Row>
          <Col lg={12} md={12} sm={12}>
            {/* <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between"> */}
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">My Team</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">E-Digital</Breadcrumb.Item>
                <Breadcrumb.Item href="/myteam">My Team</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {/* </div> */}
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={12} sm={12}>
            <Tab.Container defaultActiveKey={activeKey}>
              <Nav className="nav-lb-tab">
                {/* <Nav.Item>
                  <Nav.Link eventKey="overview" className="mb-sm-3 mb-md-0">
                    Overview
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="task" className="mb-sm-3 mb-md-0">
                    Task
                  </Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link eventKey="team" className="mb-sm-3 mb-md-0">
                    Team
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="sales" className="mb-sm-3 mb-md-0">
                    Sales
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="files" className="mb-sm-3 mb-md-0">
                    Files
                  </Nav.Link>
                </Nav.Item> */}
              </Nav>

              <Tab.Content>
                {/* <Tab.Pane eventKey="overview" className="pb-4 ps-2 p-4">
                  <ProjectOverview />
                </Tab.Pane>
                <Tab.Pane eventKey="task" className="pb-4 ps-2 p-4">
                  <ProjectTask />
                </Tab.Pane> */}
                <Tab.Pane eventKey="sales" className="pb-4 ps-2 p-4">
                  <ProjectBudget />
                </Tab.Pane>
                {/* <Tab.Pane eventKey="files" className="pb-4 ps-2 p-4">
                  <FilesTable />
                </Tab.Pane> */}
                <Tab.Pane eventKey="team" className="pb-4 ps-2 pe-0 p-4">
                  <TeamGrid />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Fragment>
    </EdigitalLayout>
  );
};
