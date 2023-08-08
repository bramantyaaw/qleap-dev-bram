import React from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { PendingSubmissionData } from "../../../../../../data/PendingSubmissionData";
import { Link } from "react-router-dom";

export const PendingSubmission = () => {
  return (
    <>
      <Card>
        {/* Card header */}
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0">Pending Submission </h4>
          </div>
          <div>
            <Link to="#" className=" mt-1">
              View Detail
            </Link>
          </div>
        </Card.Header>

        {/* Card body */}
        <Card.Body>
          {/* List group */}
          <ListGroup variant="flush" className="">
            {PendingSubmissionData.map((item, index) => {
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
                    <Col xs="auto">
                      <span className="text-secondary">{item.result}</span>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};
