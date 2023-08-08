import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row, Container, Image, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { attendanceAction } from "../../redux/action/profileAction";
import { cutoffAction } from "../../redux/action/dateAction";

import att_log from "../../assets/images/icon/attendance_logo.svg";

const AttendancePart = (props) => {
  const { token, uid } = props;

  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "2-digit" })
  );
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const dispatch = useDispatch();
  const { attendanceData } = useSelector((state) => state.profileReducer);
  const { cutoffData } = useSelector((state) => state.dateReducer);
  const detailAttendance = attendanceData?.data?.data;
  const cutOff = cutoffData?.data?.data && cutoffData?.data?.data[0];

  useEffect(() => {
    dispatch(attendanceAction(token, uid, month, year));
  }, [month, year]);

  useEffect(() => {
    dispatch(cutoffAction(token));
  }, []);

  return (
    <Fragment>
      <div className="py-lg-5 pt-8 py-10 px-5 bg-white">
        {/* <Container> */}
        <Row>
          <Col xl={10} md={12} className="col-12 offset-xl-1">
            <Row className="text-center">
              <Col md={12} className="px-md-16 mb-8 mt-6">
                <span className="text-uppercase text-primary fw-semi-bold ls-md">
                  YOUR ATTENDANCE DATA
                </span>
                <h2 className="fsc-32 fw-bold mt-3  mb-2">Attendance</h2>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col lg={5} md={12} className="col-12">
                <div>
                  <Image src={att_log} className="d-3 w-100" />
                </div>
              </Col>
              <Col lg={7} md={12} className="col-12">
                <div className="mb-8 mb-lg-0 me-lg-4">
                  <p className="fs-3 mt-8">
                    Here is your attendance data, you can check your attendance
                    data, if there is an empty attendance data, you must
                    immediately complete the absence
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col lg={4} md={12} className="py-3">
                <Row>
                  <h3>Total Absence</h3>
                  <Row>
                    <Col lg={2} md={2}>
                      <p className="display-3 mt-3 text-success">
                        {detailAttendance?.total_attend
                          ? detailAttendance?.total_attend
                          : 0}
                      </p>
                    </Col>
                    <Col lg={10} md={10}>
                      <p className="fs-4 mt-3">
                        The following is the number of your attendance data that
                        is empty this month
                      </p>
                    </Col>
                  </Row>
                </Row>
              </Col>
              <Col lg={4} md={12} className="py-3">
                <h3>Cut Off Date</h3>
                <p className="fs-4 mt-3">
                  Immediately complete attendance before the cut off date. for
                  this month the cut off will fall on: <br />
                  <span className="text-danger">{cutOff?.cut_off}</span>
                </p>
              </Col>
              <Col lg={4} md={12} className="py-3">
                <h3>Complete Your Absent Guide</h3>
                <p className="fs-4 mt-3">
                  To make attendance improvements you have to click the
                  button&nbsp;
                  {/* <Link   to="#" className="text-dark"> */}
                  <strong>“Complete Your Absent”</strong>
                  {/* </Link> */}
                </p>
                <Link className="btn btn-secondary disabled btn-sm">
                  View Guidance
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* </Container> */}
      </div>
    </Fragment>
  );
};
export default AttendancePart;
