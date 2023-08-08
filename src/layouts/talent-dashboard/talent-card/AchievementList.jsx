import React, { Fragment } from "react";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import AchievementTalent from "../../../components/components/marketing/talent-dashboard/AchievementTalent";
import TrainingTalent from "../../../components/components/marketing/talent-dashboard/TrainingTalent";
import ProjectTalent from "../../../components/components/marketing/talent-dashboard/ProjectTalent";

const AchievementList = ({
  arrEmployeeAwards,
  selectedUid,
  arrEmployeeTraining,
}) => {
  return (
    <Fragment>
      <Col xl={12} lg={12} md={12} sm={12} className="px-0 mb-4">
        <Tab.Container defaultActiveKey="Achievement">
          <Card>
            <Card.Header className="border-bottom-0 p-0 bg-white">
              <Nav className="nav-lb-tab">
                <Nav.Item>
                  <Nav.Link eventKey="Achievement" className="mb-sm-3 mb-md-0">
                    Achievement
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="training" className="mb-sm-3 mb-md-0">
                    Training
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="project" className="mb-sm-3 mb-md-0">
                    Project
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body className="p-0">
              <Tab.Content>
                <Tab.Pane eventKey="Achievement" className="pb-4 p-4">
                  <AchievementTalent
                    arrEmployeeAwards={arrEmployeeAwards}
                    selectedUid={selectedUid}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="training" className="pb-4 p-4">
                  <TrainingTalent
                    arrEmployeeTraining={arrEmployeeTraining}
                    selectedUid={selectedUid}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="project" className="pb-4 p-4">
                  <ProjectTalent />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </Col>
    </Fragment>
  );
};

export default AchievementList;
