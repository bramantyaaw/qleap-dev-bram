import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EdigitalLayout from "../../../home/EDigitalLayout";
import { Card, Col, ListGroup, Row, Image, Breadcrumb } from "react-bootstrap";
import IncentiveCard from "../../../../components/components/dashboard/projects/single/budget/IncentiveCard";
import AttendanceCard from "../../../../components/components/dashboard/projects/single/budget/AttendanceCard";
import PerformanceCard from "../../../../components/components/dashboard/projects/single/budget/PerformanceCard";
import { attendanceAction } from "../../../../redux/action/profileAction";
import axios from "axios";
import { PerformanceDevelopment } from "../../../../components/components/dashboard/projects/single/budget/PerformanceDevelopment";
import { useLocation, useParams } from "react-router-dom";

export const DetailProfile = () => {
  const dispatch = useDispatch();
  const { uid } = useParams();
  const { state } = useLocation();
  const photo = state?.photo;
  const level = state?.level;

  const { attendanceData } = useSelector((state) => state.profileReducer);
  const dataAttendance = attendanceData?.data?.data?.detail;
  const detailAttendance = attendanceData?.data?.data;
  const [month] = useState(
    new Date().toLocaleString("en-US", { month: "2-digit" })
  );
  const [currYear] = useState(new Date().getFullYear());
  const year = currYear.toString();
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [performance, setPerformance] = useState();
  const [learning, setLearning] = useState();
  const [dataUser, setDataUser] = useState();
  const [bu, setBu] = useState(localStorage.getItem("bu"));

  const fetchDataUser = async () => {
    try {
      await axios
        .post(
          "/profile/details",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => setDataUser(res?.data?.data));
    } catch (e) {
      return e;
    }
  };

  const fetchDataPerformance = async () => {
    try {
      await axios
        .post(
          "profile/get-performance",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        .then((res) => setPerformance(res?.data?.data));
    } catch (e) {
      return e;
    }
  };

  const fetchDataLearning = async () => {
    try {
      await axios
        .post(
          "/profile/get-journey",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        .then((res) => setLearning(res?.data?.data));
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    fetchDataPerformance();
    fetchDataUser();
    fetchDataLearning();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setBu(localStorage.getItem("bu"));
  }, []);

  useEffect(() => {
    dispatch(attendanceAction(token, uid, month, year));
  }, [month, year]);

  return (
    <EdigitalLayout>
      <Fragment>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="border-bottom pb-2 mb-4 d-md-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">Detail Profile</h1>
                <Breadcrumb>
                  <Breadcrumb.Item href="/main-desk">E-Digital</Breadcrumb.Item>
                  <Breadcrumb.Item href="/myteam?activeKey=team">
                    My Team
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>View Detail</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} xl={12} xs={12}>
            <Row>
              <Col lg={4} md={12}>
                <Card className="mb-5">
                  <Card.Body>
                    {dataUser?.map((data) => {
                      return (
                        <div key={data?.unique_id}>
                          <div className="text-center border-bottom pb-4">
                            <Image
                              src={photo}
                              className="rounded-circle avatar-xl mb-3"
                              alt=""
                            />
                            <p className="mb-1">Name</p>
                            <h5 className="mb-0 ">{data?.name}</h5>
                          </div>
                          <div className="pt-4 text-center">
                            <p className="mb-1">Job Title</p>
                            <h5 className="mb-0">{data?.roleTitle}</h5>
                          </div>
                        </div>
                      );
                    })}
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={8} md={12} className="mb-4">
                <Card>
                  <Card.Header className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="mb-0">Personal Data</h4>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    {dataUser?.map((data) => {
                      return (
                        <ListGroup variant="flush" key={data?.unique_id}>
                          <ListGroup.Item className="px-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="ms-2">
                                  <h5 className="mb-0 text-body">NIK</h5>
                                </div>
                              </div>
                              <div>
                                <p className="text-dark mb-0 fw-semi-bold">
                                  {data?.nik}
                                </p>
                              </div>
                            </div>
                          </ListGroup.Item>
                          <ListGroup.Item className="px-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="ms-2">
                                  <h5 className="mb-0 text-body">Level</h5>
                                </div>
                              </div>
                              <div>
                                <p className="text-dark mb-0 fw-semi-bold">
                                  {level}
                                </p>
                              </div>
                            </div>
                          </ListGroup.Item>
                          <ListGroup.Item className="px-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="ms-2">
                                  <h5 className="mb-0 text-body">Joined At</h5>
                                </div>
                              </div>
                              <div>
                                <p className="text-dark mb-0 fw-semi-bold">
                                  {data?.dateV}
                                </p>
                              </div>
                            </div>
                          </ListGroup.Item>
                          <ListGroup.Item className="px-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="ms-2">
                                  <h5 className="mb-0 text-body">Email</h5>
                                </div>
                              </div>
                              <div>
                                <p className="text-dark mb-0 fw-semi-bold">
                                  {data?.email}
                                </p>
                              </div>
                            </div>
                          </ListGroup.Item>
                        </ListGroup>
                      );
                    })}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={12} className="">
                {bu === "Commercial" && <IncentiveCard />}
              </Col>
              <Col md={12} className="">
                <AttendanceCard
                  data={dataAttendance}
                  month={month}
                  year={year}
                  absen={detailAttendance}
                />
              </Col>
              <Col md={12} className="">
                {/* <ProgressCard /> */}
                <PerformanceDevelopment data={learning} />
              </Col>
              {/* <Col md={6} className="mb-4">
                <AssesmentSummaryTalent selectedUid={uid} />
              </Col>
              <Col md={6} className="mb-4">
                <AssesementResultTalent selectedUid={uid} />
              </Col> */}
              <Col md={12} className="mb-4">
                <PerformanceCard
                  data={performance}
                  title="Performance"
                  desc="Here is the last score based on Performance Appraisal Employee"
                  classValue="pt-3 pb-2 ps-4"
                />
              </Col>
            </Row>
          </Col>
          {/* <Col md={12} xl={4} xs={12} className="mb-4">
            <PendingSubmission />
          </Col> */}
        </Row>
      </Fragment>
    </EdigitalLayout>
  );
};
