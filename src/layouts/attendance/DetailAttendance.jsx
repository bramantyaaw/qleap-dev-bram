import React, { Fragment, useEffect, useState } from "react";

import ProfileBackground from "../../assets/images/background/background_qleap.png";
import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import AttendanceCard from "../../components/components/dashboard/projects/single/budget/AttendanceCard";
import { attendanceAction } from "../../redux/action/profileAction";
import { monthAction } from "../../redux/action/dateAction";
import { yearAction } from "../../redux/action/dateAction";
import { useDispatch, useSelector } from "react-redux";
import FormSelect from "../../components/components/elements/form-select/FormSelect";
import {
  getDateValue,
  getTimeValue,
  getDayValue,
  statusAttendance,
} from "../../config/helper/utils";
import HelpCenterLayout from "../helpcenter/HelpCenterLayout";
import SelfServiceHeader from "../selfservice/SelfServiceHeader";
import SelfServiceMenuHeader from "../header/SelfServiceMenuHeader";

export const DetailAttendance = () => {
  const { yearData } = useSelector((state) => state.dateReducer);
  const { monthData } = useSelector((state) => state.dateReducer);

  const yearOptions = yearData?.newObjArr;
  const monthOptions = monthData?.newValueArr;

  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "2-digit" })
  );
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const dispatch = useDispatch();
  const { attendanceData } = useSelector((state) => state.profileReducer);
  const dataAttendance = attendanceData?.data?.data?.detail;
  const detailAttendance = attendanceData?.data?.data;

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, [localStorage]);

  // useEffect(() => {
  //   dispatch(attendanceAction(token, uid, month, year));
  // }, [month, year]);

  useEffect(() => {
    dispatch(yearAction(token, uid));
  }, []);

  useEffect(() => {
    dispatch(monthAction(token, uid, year));
  }, [year]);

  return (
    <HelpCenterLayout>
      <div className="bg-wrapper">
        <Fragment>
          {/* Page header */}
          <SelfServiceMenuHeader
            title={"Attendance"}
            sub={"Here is your list attendance"}
          />

          {/* Content */}
          <div className="pt-6 pb-2 ">
            <Container>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <AttendanceCard
                    data={dataAttendance}
                    month={month}
                    year={year}
                    absen={detailAttendance}
                  />
                </Col>
              </Row>
            </Container>
          </div>
          {/* Content */}
          <Container className="pb-10">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <h4 className="mt-3">
                  Here is a list of your attendance per month
                </h4>
                <div className="d-flex">
                  <div className="pe-md-2">
                    <Form.Group className="">
                      <FormSelect
                        options={monthOptions}
                        placeholder="Month"
                        onChange={(e) => setMonth(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="pe-md-0">
                    <Form.Group className="">
                      <FormSelect
                        options={yearOptions}
                        placeholder="Year"
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Card.Header>

              {/* table */}
              <div className="table-responsive">
                <Table className="text-nowrap mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Date</th>
                      <th>Schedule</th>
                      <th>Clock In</th>
                      <th>Clock Out</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {month !== "" && year !== "" ? (
                      dataAttendance?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <Col
                                lg={3}
                                md={3}
                                sm={6}
                                className="mb-2 mb-lg-0"
                              >
                                <h6 className="mb-0">
                                  {getDayValue(item?.time_start)}
                                </h6>
                                <span className="fs-6">
                                  {getDateValue(item.time_start)}
                                </span>
                              </Col>
                            </td>
                            <td>
                              <Col
                                lg={3}
                                md={3}
                                sm={6}
                                className="mb-2 mb-lg-0"
                              >
                                <span className="fs-6">09:00 - 18:00</span>
                              </Col>
                            </td>
                            <td>
                              <Col
                                lg={3}
                                md={3}
                                sm={6}
                                className="mb-2 mb-lg-0"
                              >
                                <h6 className="mb-0">
                                  {getTimeValue(item?.time_start)}
                                </h6>
                                <span className="fs-6">{item.location}</span>
                              </Col>
                            </td>
                            <td>
                              <Col
                                lg={3}
                                md={3}
                                sm={6}
                                className="mb-2 mb-lg-0"
                              >
                                <h6 className="mb-0">
                                  {getTimeValue(item.time_end)}
                                </h6>
                                <span className="fs-6">{item.location}</span>
                              </Col>
                            </td>
                            <td>
                              <Col className="align-item-center text-wrap">
                                <p
                                  className={`text-${statusAttendance(
                                    item.status
                                  )} text-wrap`}
                                >
                                  {item.status}
                                </p>
                              </Col>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="d-flex justify-content-start ">
                        <td>
                          <h5 className="text-muted fst-italic">
                            no data to display
                          </h5>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Container>
        </Fragment>
      </div>
    </HelpCenterLayout>
  );
};
