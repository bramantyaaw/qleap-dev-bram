import React, { Fragment } from "react";
import { Card, Col } from "react-bootstrap";
import TableStrength from "../../../components/components/marketing/talent-dashboard/TableStrength";

const StrengthWeakness = ({
  isNull,
  strength1,
  strength2,
  strength3,
  strength4,
  strength5,
  needImprove1,
  needImprove2,
  needImprove3,
  needImprove4,
  needImprove5,
}) => {
  const arrTableStrength = isNull
    ? [
        {
          strength: "-",
          improve: "-",
        },
      ]
    : [
        {
          strength: strength1,
          improve: needImprove1,
        },
        {
          strength: strength2,
          improve: needImprove2,
        },
        {
          strength: strength3,
          improve: needImprove3,
        },
        {
          strength: strength4,
          improve: needImprove4,
        },
        {
          strength: strength5,
          improve: needImprove5,
        },
      ];
  return (
    <>
      <Fragment>
        <Col xl={12} lg={12} md={12} sm={12} className="px-0 mb-4">
          <Card>
            <Card.Header className="border-bottom px-4 py-3 bg-white">
              <h4 className="mb-0 fw-bold">Strength and Need to Improve</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <TableStrength arrDataTable={arrTableStrength} />
            </Card.Body>
          </Card>
        </Col>
      </Fragment>
    </>
  );
};

export default StrengthWeakness;
