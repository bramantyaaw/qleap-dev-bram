// import node module libraries
import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import AssessmentData from "../../../../../../data/profile/AssessmentData";

// import data files

const AssessmentTable = () => {
  return (
    <Card style={{ height: "100%" }}>
      {/* Card header */}
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <h4 className="mb-0 fw-bold">Assessment</h4>
          <p className="mb-0">Need to Improve</p>
        </div>
        {/* <div>
          <Link to="#" className="btn btn-xs btn-outline-primary mt-1">
            View Detail
          </Link>
        </div> */}
      </Card.Header>

      {/* Card body */}
      <Card.Body>
        {/* List group */}
        <ListGroup variant="flush" className="">
          <h5 className="text-muted text-center fst-italic">
            No Data to Display
          </h5>
          {/* {AssessmentData.map((item, index) => {
            return (
              <ListGroup.Item className="px-0 pt-0 border-0 pb-6" key={index}>
                <Row className="position-relative">
                  <Col xs="auto">
                    <div
                      className={`icon-shape icon-md bg-light-${item.iconColorVariant} text-dark-${item.iconColorVariant} rounded-circle`}
                    >
                      {item.icon}
                    </div>
                  </Col>
                  <Col className="ms-n3">
                    <h4 className="mb-0 h5">{item.activity}</h4>
                    <p
                      className="mb-0 text-body"
                      dangerouslySetInnerHTML={{ __html: item.activitybrief }}
                    ></p>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })} */}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
export default AssessmentTable;
