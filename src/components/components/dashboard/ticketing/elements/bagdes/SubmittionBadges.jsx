import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import TicketingBadges from "./TicketingBadges";

const SubmittionBadges = ({ title, secStatus, thirdStatus }) => {
  const submittionArr = [
    {
      title: "MY SUBMISSION",
      subtitle: "New this month",
      value: "3",
      badgeValue: "1",
      colorVariant: "warning",
      status: "process",
    },
    {
      title: "MY SUBMISSION",
      subtitle: "New this month",
      value: "5",
      badgeValue: "1",
      colorVariant: "success",
      status: secStatus ? secStatus : "done",
    },
    {
      title: "MY SUBMISSION",
      subtitle: "New this month",
      value: "1",
      badgeValue: "1",
      colorVariant: "danger",
      status: thirdStatus ? thirdStatus : "reject",
    },
  ];

  return (
    <>
      <Row>
        {submittionArr?.map((data, id) => {
          return (
            <Col
              key={id}
              xl={4}
              lg={4}
              md={12}
              sm={12}
              xs={12}
              className={id === 1 && "my-3 my-lg-0"}
            >
              <Card className="w-100">
                <Card.Body className="p-0">
                  <div className="p-4 overview-card">
                    <span className="fs-6 text-uppercase fw-semi-bold">
                      {title} -{" "}
                      <span className={`text-${data.colorVariant}`}>
                        {data.status}
                      </span>
                    </span>

                    <div className="mt-4 mb-1 d-flex align-items-center justify-content-center desc-overview">
                      <h2 className="h1 lh-1 fw-bold ">{data.value}</h2>
                      <span className="d-flex justify-content-between">
                        <span className="text-secondary mx-3">
                          New This Month
                        </span>

                        <TicketingBadges
                          colorVariant={data.colorVariant}
                          className="ms-2"
                          badgeValue={data.badgeValue}
                        />
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

// Specifies the default values for props
SubmittionBadges.defaultProps = {
  classValue: "",
};

// Typechecking With PropTypes
SubmittionBadges.propTypes = {
  classValue: PropTypes.string,
};

export default SubmittionBadges;
