import React from "react";
import EdigitalLayout from "../../home/EDigitalLayout";
import { Fragment } from "react";
import { Breadcrumb, Col, Nav, Row, Tab } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import TableListRnR from "./TableListRnR";
import TicketPage from "../../../components/components/dashboard/ticketing/hero/TicketPage";

const CMSRnR = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeKey = searchParams.get("activeKey") || "overview";

  const arrRnR = [
    {
      title: "HC System Design Supervisor",
      sublevel: "Sub Division",
      div: "HC Digital",
      updateDate: "17 July 2023",
    },
    {
      title: "HC System Design Supervisor",
      sublevel: "Sub Division",
      div: "HC Digital",
      updateDate: "17 July 2023",
    },
    {
      title: "HC System Design Supervisor",
      sublevel: "Sub Division",
      div: "HC Digital",
      updateDate: "17 July 2023",
    },
    {
      title: "HC System Design Supervisor",
      sublevel: "Sub Division",
      div: "HC Digital",
      updateDate: "17 July 2023",
    },
    {
      title: "HC System Design Supervisor",
      sublevel: "Sub Division",
      div: "HC Digital",
      updateDate: "17 July 2023",
    },
    {
      title: "HC System Design Supervisor",
      sublevel: "Sub Division",
      div: "HC Digital",
      updateDate: "17 July 2023",
    },
    {
      title: "HC System Design Supervisor",
      sublevel: "Sub Division",
      div: "HC Digital",
      updateDate: "17 July 2023",
    },
    {
      title: "HC System Design Supervisor",
      sublevel: "Sub Division",
      div: "HC Digital",
      updateDate: "17 July 2023",
    },
  ];

  return (
    <EdigitalLayout>
      <Fragment>
        <Row>
          <Col lg={12} md={12} sm={12}>
            {/* <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between"> */}
            <div className="mb-3 mb-md-0">
              <h1 className="h2 fw-bold">ROLE & RESPONSIBILITIES</h1>
              <TicketPage
                text1="E-Digital"
                link1="/main-desk"
                text2="Main Desk"
                link2="/main-desk"
                text4="Role & Responsibilities"
                className="my-0 ms-0 mb-3"
              />
            </div>
            {/* </div> */}
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Tab.Container defaultActiveKey={activeKey}>
              <Nav className="nav-lb-tab">
                <Nav.Item>
                  <Nav.Link eventKey="overview" className="mb-sm-3 mb-md-0">
                    Overview
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="transaction" className="mb-sm-3 mb-md-0">
                    Transaction List
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="overview" className="pb-4 ps-2 p-4">
                  {/* <Overview isDatabase={true} isEPCN={true} /> */}
                </Tab.Pane>
                <Tab.Pane eventKey="transaction" className="pb-4 ps-2 p-4">
                  {/* <Transaction /> */}
                  <TableListRnR dataArr={arrRnR} />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Fragment>
    </EdigitalLayout>
  );
};

export default CMSRnR;
