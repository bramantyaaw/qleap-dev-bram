import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import SubmittionBadges from "../../components/components/dashboard/ticketing/elements/bagdes/SubmittionBadges";

const SubmittionOverview = () => {
  return (
    <Card className="border-0">
      <Card.Header>
        <div className="mb-3 mb-lg-0">
          <h3 className="mb-0">Self Service Overview</h3>
          <p className="mb-0">
            Here is a overview list of submission that you submitted
          </p>
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col className="overview-card-body">
            <SubmittionBadges />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SubmittionOverview;
