import React from "react";
// import Icon from "@mdi/react";
import { Card, Col, ProgressBar, Row } from "react-bootstrap";
import Icon from "@mdi/react";

export const StatLeftInfo = (props) => {
  const {
    title,
    span1,
    value1,
    span2,
    value2,
    progress,
    value4,
    iconName,
    iconColorVariant,
    classValue,
  } = props;

  return (
    <>
      <div className={`${classValue}`}>
        <Row>
          <Col className="col-auto">
            <span
              className={`bg-light-${iconColorVariant} icon-shape icon-md rounded-3 text-dark-${iconColorVariant}`}
            >
              <Icon path={iconName} size={0.8} />
            </span>
          </Col>
          <Col className="ms-n3">
            {progress ? (
              <>
                <p className="mb-0 fw-bold text-secondary">{title}</p>
                <span className="me-2 fs-6">
                  <span className="text-dark  me-1 fw-semi-bold">{span1}</span>
                  {value1}
                </span>
                <span className="me-2 fs-6">
                  <span className="text-dark  me-1 fw-semi-bold">{span2}</span>
                  {value2}
                </span>
                <ProgressBar
                  now={25}
                  striped
                  variant="info"
                  style={{
                    height: "5px",
                  }}
                />
              </>
            ) : (
              <>
                <h4 className="mb-0 h5">{title}</h4>
                <span className="me-2 fs-6">{value1}</span>
              </>
            )}
          </Col>
          <Col className="col-auto">{value4} </Col>
        </Row>
      </div>
    </>
  );
};
