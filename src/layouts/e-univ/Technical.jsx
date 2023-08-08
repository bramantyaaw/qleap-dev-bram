import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Image, Card, Alert } from "react-bootstrap";
import MainNavbar from "../navbars/MainNavbar";
import LearningLayout from "./LearningLayout";
import Learning from "../../assets/images/icon/Erafone-01.png";
import { Link } from "react-router-dom";
import axios from "axios";

export const Technical = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [data, setData] = useState([]);
  const weekly = data?.weekly;

  const fetchData = async () => {
    try {
      await axios
        .post(
          "/euniv/get-program",
          {
            uid: "ID0054552",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        .then((res) => setData(res?.data?.data));
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, [localStorage]);

  return (
    <>
      <MainNavbar />
      <LearningLayout
        pagetitle="Learning •"
        spantitle="Technical Expert Academy"
        briefinfo1="E-University merupakan laman bagi karyawan untuk mengembangkan "
        briefinfo2=" dan capai "
        briefinfo3=" kamu, Yuk belajar!"
        span1="knowledge, skill,"
        span2="goal learning"
      >
        <Fragment>
          {/* Page content */}
          <div className="pb-10">
            <Container>
              <Row className="ps-0">
                {weekly?.map((item) => {
                  return (
                    <Card
                      key={item?.programId}
                      className="card-bordered mb-4 card-hover p-0 cursor-pointer"
                    >
                      <Card.Body>
                        <div>
                          <div className="d-md-flex">
                            <div className="mb-md-0">
                              <Image
                                src={Learning}
                                className="rounded-3"
                                width={150}
                                height={150}
                              />
                            </div>
                            <div className="ms-md-3 w-100 mt-3 mt-xl-1">
                              <div className="d-flex justify-content-between mb-2">
                                <div>
                                  <h3 className="mb-1 fs-4">{item?.title}</h3>
                                  <div>
                                    <span>{item?.name}</span>
                                  </div>
                                </div>
                                <div>
                                  <Link
                                    to="/learning/courses"
                                    className="btn btn-xs btn-primary"
                                  >
                                    {" "}
                                    Go To Quiz
                                  </Link>
                                </div>
                              </div>
                              <div className="d-md-flex justify-content-between mb-5">
                                <div className="mb-md-0">
                                  <span className="me-2">
                                    <span className="me-1">Date Period :</span>
                                    <i className="fe fe-calendar text-muted"></i>
                                    <span className="ms-1">
                                      {item?.startDate} - {item?.endDate}
                                    </span>
                                  </span>
                                  <span className="me-2">
                                    <span className="ms-1 ">Your Change :</span>
                                    <span className="mx-1">3x</span>
                                    <i className="fe fe-alert-circle text-muted"></i>
                                  </span>
                                  <span className="me-2">
                                    <span className="ms-1 ">Your Score :</span>
                                    <span className="ms-1 ">0</span>
                                  </span>
                                </div>
                              </div>
                              <div>
                                <Alert variant="danger" className="py-1">
                                  <i className="fe fe-alert-circle text-dark-danger me-2 "></i>
                                  Mohon kerjakan sebelum Date Periode berakhir.
                                  Sisa waktu pengerjaanmu : 5 hari
                                </Alert>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </Row>
            </Container>
          </div>
        </Fragment>
      </LearningLayout>
    </>
  );
};
