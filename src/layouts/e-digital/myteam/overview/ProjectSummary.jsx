// import node module libraries
import React from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup, Dropdown } from "react-bootstrap";

// import bootstrap icons
import { Calendar4, Clock, CurrencyDollar } from "react-bootstrap-icons";

const ProjectSummary = () => {
  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));

  const ActionMenu = () => {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            <i className="fe fe-more-vertical text-muted"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Header>Settings</Dropdown.Header>
            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
            <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  return (
    <Card>
      <Card.Header className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0">
              <span className="fw-bold">Project Summary </span>- Human Capital
              Program
            </h4>
          </div>
          <div>
            <ActionMenu />
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <p className="fw-bold text-dark">Challenge Group 1 : </p>
        <p className="mb-0">1. Successor or talent pool</p>
        <p className="mb-0">2. Turnover rate: 10% Corporate - 10% Store team</p>
        <p className="mb-0">
          3. Accountability to drive performance (Job Desc & KPI)
        </p>
        <p className="mb-0">4. Manpower effectiveness</p>
        <p>5. Communication & team work</p>
        {/* <ul>
          <li>1. Successor or talent pool</li>
          <li>2. Turnover rate: 10% Corporate - 10% Store team</li>
          <li>3. Accountability to drive performance (Job Desc & KPI)</li>
          <li>4. Manpower effectiveness</li>
          <li>5. Communication & team work</li>
        </ul> */}
        <ListGroup variant="flush">
          <ListGroup.Item className="px-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Calendar4 size={16} className="text-primary" />
                <div className="ms-2">
                  <h5 className="mb-0 text-body">Focus One</h5>
                </div>
              </div>
              <div>
                <p className="text-dark mb-0 fw-semi-bold">
                  Organization Readiness
                </p>
              </div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Calendar4 size={16} className="text-primary" />
                <div className="ms-2">
                  <h5 className="mb-0 text-body">Focus Two</h5>
                </div>
              </div>
              <div>
                <p className="text-dark mb-0 fw-semi-bold">
                  Improve SLA & Business Process
                </p>
              </div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Clock size={16} className="text-primary" />
                <div className="ms-2">
                  <h5 className="mb-0 text-body">Focus Three</h5>
                </div>
              </div>
              <div>
                <p className="text-dark mb-0 fw-semi-bold">
                  Improve SLA & Business Process
                </p>
              </div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <CurrencyDollar size={16} className="text-primary" />
                <div className="ms-2">
                  <h5 className="mb-0 text-body">Focus Four</h5>
                </div>
              </div>
              <div>
                <p className="text-dark mb-0 fw-semi-bold">
                  Drive Monthly Sales Growth through Training & Operational
                  Excellence
                </p>
              </div>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ProjectSummary;
