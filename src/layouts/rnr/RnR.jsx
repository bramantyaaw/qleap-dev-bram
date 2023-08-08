import React from "react";
import MainLayout from "../home/MainLayout";
import { Card, Container, Nav, Tab } from "react-bootstrap";
import RoleIdentification from "./RoleIdentification";
import IframeLinkOutside from "../../components/components/marketing/specialty/IframeLinkOutside";

const RnR = () => {
  return (
    <>
      <MainLayout>
        {/* <div className="bg-wrapper pt-11 px-4">
          <Container>
            <Tab.Container defaultActiveKey="Role Identification">
              <Card className="">
                <div className={` p-4 bg-white header-border-radius`}>
                  <h2 className="mb-0">HC System Design Supervisor</h2>
                  <p className="mb-0 text-secondary font-xssss">
                    HC System Design Supervisor
                  </p>
                </div>
                <Card.Header className="border-bottom-0 p-0 bg-white card-border-custom">
                  <Nav className="nav-lb-tab">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Role Identification"
                        className="mb-sm-3 mb-md-0"
                      >
                        Role Identification
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link
                        eventKey="Key Accountability Areas"
                        className="mb-sm-3 mb-md-0"
                      >
                        Key Accountability Areas
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Organization Structure"
                        className="mb-sm-3 mb-md-0"
                      >
                        Organization Structure
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Role Requirement"
                        className="mb-sm-3 mb-md-0"
                      >
                        Role Requirement
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Key Performance Indicator"
                        className="mb-sm-3 mb-md-0"
                      >
                        Key Performance Indicator
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Change Log"
                        className="mb-sm-3 mb-md-0"
                      >
                        Change Log
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body className="p-0">
                  <Tab.Content>
                    <Tab.Pane
                      eventKey="Role Identification"
                      className="pb-4 p-4"
                    >
                      <RoleIdentification />
                    </Tab.Pane>

                    <Tab.Pane
                      eventKey="Key Accountability Areas"
                      className="pb-4 p-4"
                    >
                      Key Accountability Areas
                    </Tab.Pane>
                    <Tab.Pane
                      eventKey="Organization Structure"
                      className="pb-4 p-4"
                    >
                      Organization Structure
                    </Tab.Pane>
                    <Tab.Pane eventKey="Role Requirement" className="pb-4 p-4">
                      Role Requirement
                    </Tab.Pane>
                    <Tab.Pane
                      eventKey="Key Performance Indicator"
                      className="pb-4 p-4"
                    >
                      Key Performance Indicator
                    </Tab.Pane>
                    <Tab.Pane eventKey="Change Log" className="pb-4 p-4">
                      Change Log
                    </Tab.Pane>
                  </Tab.Content>
                </Card.Body>
              </Card>
            </Tab.Container>
          </Container>
        </div> */}

        <IframeLinkOutside
          style={{ backgroundColor: "#f5f4f8" }}
          height="calc(100vh + 40px)"
          src={`https://qleap.erajaya.com/qleapci/react_frame/accounts/rnr`}
          className="w-100 pt-11"
        />
      </MainLayout>
    </>
  );
};

export default RnR;
