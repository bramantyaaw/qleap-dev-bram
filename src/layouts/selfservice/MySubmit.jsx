// import node module libraries
import React, { useState } from "react";

import { Card, Row, Col, Tab, Nav } from "react-bootstrap";

import HelpCenterLayout from "../helpcenter/HelpCenterLayout";
import NewProfileLayout from "../../components/components/dashboard/ticketing/ticket-list/NewProfileLayout";
import SubmittionBadges from "../../components/components/dashboard/ticketing/elements/bagdes/SubmittionBadges";
import SubmissionStatusTable from "./my-submit/SubmissionStatusTable";
import SearchInput from "../../components/components/dashboard/ticketing/elements/search/SearchInput";

const MySubmit = () => {
  const [search, setSearch] = useState("");
  return (
    <HelpCenterLayout>
      <div className="subs-wrapper">
        <NewProfileLayout>
          <Card className="border-0">
            <Card.Header>
              <SubmittionBadges title="MY SUBMISSION" />
            </Card.Header>
            <Card.Body className="p-0">
              <Tab.Container defaultActiveKey="Submission Status">
                <div className="d-flex justify-content-between align-items-center border-bottom border-gray-300">
                  <Nav className="nav-lb-tab" style={{ borderBottom: "none" }}>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Submission Status"
                        className="mb-sm-3 mb-md-0"
                      >
                        Submission Status
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Need To Response"
                        className="mb-sm-3 mb-md-0"
                      >
                        Need To Response
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <SearchInput setSearch={setSearch} />
                </div>
                <Tab.Content>
                  <Tab.Pane eventKey="Submission Status">
                    <div className="mt-3">
                      <SubmissionStatusTable />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="Need To Response"></Tab.Pane>
                </Tab.Content>
              </Tab.Container>
              {/* <Row>
                <Col lg={9} md={7} sm={12} className="global-filter ">
                  <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                    placeholder="Search Your Submit"
                  />
                </Col>
                <Col lg={3} md={5} sm={12} className="">
                  <SortByStatus
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    title="Sort By Status"
                    className="mt-2 mt-md-0"
                  />
                </Col>
              </Row> */}
            </Card.Body>
          </Card>
        </NewProfileLayout>
      </div>
    </HelpCenterLayout>
  );
};

export default MySubmit;
