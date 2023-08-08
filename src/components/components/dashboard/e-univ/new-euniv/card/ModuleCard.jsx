import React from "react";
import { Card, Col, Image, ListGroup, ProgressBar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import card2 from "../../../../../../assets/images/png/learningcard2.png";
import PathBootstrap from "../../../../../../assets/images/svg/CARD_NO_IMAGE.svg";

export const ModuleCard = (props) => {
  const { data } = props;
  const progress = (
    ((data?.count_exam_user + data?.count_module_user) /
      (data?.count_exam + data?.count_module)) *
    100
  ).toFixed(2);

  return (
    <>
      <Card className="mb-4 shadow-lg card-hover px-0">
        <Row className="g-0">
          {/*  Image */}
          {/* <Link
            className="col-lg-3 col-md-3 col-3 bg-cover img-left-rounded"
            style={{
              backgroundImage: `url(${data?.files[0].url})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          ></Link> */}
          <Col lg={3} md={3} sm={12}>
            <Image
              src={
                data?.files?.length > 0 ? data?.files?.[0]?.url : PathBootstrap
              }
              alt=""
              style={{
                objectFit: "cover",
                height: "175px",
              }}
              className="card-img-top rounded-start-md"
            />
          </Col>
          <Col lg={9} md={9} sm={12}>
            {/*  Card body */}
            <Card.Body className="d-flex h-100 justify-content-between flex-column">
              <div className="d-flex justify-content-between">
                <h3 className="mb-1">{data?.name}</h3>
                <div>
                  <Link
                    to={`/e-univ/learning/courses/${data?.id}`}
                    className="btn btn-sm btn-light-primary text-primary rounded-3"
                    onClick={() => {
                      localStorage.setItem("lastProgramId", data?.id);
                      localStorage.setItem("lastProgram", JSON.stringify(data));
                    }}
                  >
                    {" "}
                    Continue Learning
                  </Link>
                </div>
              </div>
              {/* <div className="d-md-flex justify-content-between mb-5">
                <div className="mb-md-0">
                  <span className="me-2"></span>
                  <span className="me-2">
                    <i className="fe fe-alert-circle fw-bold"></i>
                    <span className="ms-1 fw-bold">{data?.count_module}</span>
                    <span className="mx-1">Module</span>
                  </span>
                  <span className="me-2">
                    <i className="fe fe-alert-circle fw-bold"></i>
                    <span className="ms-1 fw-bold">{data?.count_exam}</span>
                    <span className="ms-1 ">Assessment/Quiz</span>
                  </span>
                </div>
              </div> */}
              <ListGroup
                as="ul"
                bsPrefix="list-inline"
                className="mb-0 text-kinda-light-dark"
              >
                <ListGroup.Item
                  as="li"
                  bsPrefix="list-inline-item"
                  className="me-1"
                >
                  Module :{" "}
                  <span className="text-black">{data?.count_module}</span> •
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  bsPrefix="list-inline-item"
                  className="me-1"
                >
                  Exam : <span className="text-black">{data?.count_exam}</span>{" "}
                </ListGroup.Item>
                {data?.count_module === 1 && data?.count_exam === 1 ? (
                  <>
                    <ListGroup.Item
                      as="li"
                      bsPrefix="list-inline-item"
                      className="me-1"
                    >
                      • Chance :{" "}
                      <span className="text-black">
                        {data?.total_exam_attempt}x
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      bsPrefix="list-inline-item"
                      className="me-1"
                    >
                      • Final Score :{" "}
                      <span className="fw-bold text-black">
                        {data?.max_grade}
                      </span>
                      /100
                    </ListGroup.Item>
                  </>
                ) : (
                  <>
                    <ListGroup.Item
                      as="li"
                      bsPrefix="list-inline-item"
                      className="me-1"
                    >
                      • Average Score :{" "}
                      <span className="text-black">{data?.avg_score}</span>
                    </ListGroup.Item>
                    {data?.total_remedial_exam > 0 && (
                      <ListGroup.Item
                        as="li"
                        bsPrefix="list-inline-item"
                        className="me-1 text-danger"
                      >
                        • Remedial Exam :
                        <span className={`text-danger fw-bold`}>
                          {data?.total_remedial_exam}
                        </span>
                      </ListGroup.Item>
                    )}
                  </>
                )}
              </ListGroup>
              <div>
                <p className="mb-1 d-flex justify-content-between">
                  Program Progress{" "}
                  <span className="justify-content-end">
                    {data?.count_exam_user + data?.count_module_user === 0
                      ? 0
                      : progress}
                    %
                  </span>{" "}
                </p>

                <ProgressBar
                  variant={
                    data?.total_remedial_exam > 0
                      ? "danger"
                      : ((data?.count_exam_user + data?.count_module_user) /
                          (data?.count_exam + data?.count_module)) *
                          100 ===
                        100
                      ? "success"
                      : "warning"
                  }
                  now={
                    ((data?.count_exam_user + data?.count_module_user) /
                      (data?.count_exam + data?.count_module)) *
                    100
                  }
                  className="mt-0"
                  style={{ height: "5px" }}
                />
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};
