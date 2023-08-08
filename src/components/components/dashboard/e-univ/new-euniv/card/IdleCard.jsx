import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import card2 from "../../../../../../assets/images/svg/idleCard.svg";

export const IdleCard = () => {
  return (
    <>
      <div className="mb-4 px-0">
        <Row className="g-0 d-flex justify-content-between">
          {/*  Image */}
          <div
            className="col-lg-7 col-md-6 col-6 bg-cover"
            style={{
              background: `url(${card2})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "150px",
              //   maxHeight: "150px",
              width: "650px",
            }}
          ></div>
          <Col lg={5} md={6} sm={12}>
            <div className="align-middle">
              <h3 className="mb-1 fw-bold text-primary align-middle">
                Masih belum ada program yang dipelajari
              </h3>
              <span className="me-2 text-primary align-middle">
                Yuk klik program yang ada dibawah untuk mulai belajar{" "}
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
