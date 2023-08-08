import React, { Fragment } from "react";
import { Card, Col, Nav, Tab } from "react-bootstrap";
import AssesmentDevelopment from "./AssesmentDevelopment";

const SelectedDevModule = ({
  selectedDataCourse,
  goToQuiz,
  setGoToQuiz,
  finishedQuiz,
  setFinishedQuiz,
}) => {
  return (
    <Fragment>
      <Col xl={12} lg={12} md={12} sm={12} className="px-0 mb-4">
        <Tab.Container defaultActiveKey="module">
          <Card className="">
            <div className={`pt-4 ps-4 bg-white header-border-radius`}>
              <h4 className={`mb-2 fw-bold card-title `}>
                {selectedDataCourse?.topic}
              </h4>
            </div>
            <Card.Header className="border-bottom-0 p-0 bg-white card-border-custom">
              <Nav className="nav-lb-tab">
                <Nav.Item>
                  <Nav.Link eventKey="module" className="mb-sm-3 mb-md-0">
                    Module
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="assesment" className="mb-sm-3 mb-md-0">
                    Assesment
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body className="p-0">
              <Tab.Content>
                <Tab.Pane eventKey="module" className="pb-4 p-4">
                  <p>Module</p>
                </Tab.Pane>
                <Tab.Pane eventKey="assesment" className="pb-4 p-4">
                  <AssesmentDevelopment
                    setGoToQuiz={setGoToQuiz}
                    goToQuiz={goToQuiz}
                    finishedQuiz={finishedQuiz}
                    setFinishedQuiz={setFinishedQuiz}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </Col>
    </Fragment>
  );
};

export default SelectedDevModule;
