import React from "react";
import { Card } from "react-bootstrap";
import CheckCustomize from "../elements/check/CheckCustomize";

const SubmissionSectionLayout = ({ children }) => {
  return (
    <div className="mt-4">
      <Card>
        <Card.Header>
          <div style={{ width: "fit-content" }} className="position-relative">
            <CheckCustomize
              width="200px"
              leftText="Submission"
              rightText="Ticketing"
              leftPathname="/my-submission"
              rightPathname="/my-submission/ticket"
            />
          </div>
        </Card.Header>
        <Card.Body className="p-0">{children}</Card.Body>
      </Card>
    </div>
  );
};

export default SubmissionSectionLayout;
