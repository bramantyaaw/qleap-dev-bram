import React, { Fragment, useEffect, useState } from "react";
import { NewLearningLayout } from "./NewLearningLayout";
import { Button, Card, Col, Container, Row, Image } from "react-bootstrap";
import onboardLearning from "../../assets/images/png/onboard-learning.png";
import onboardDevelopment from "../../assets/images/png/onboard-development.png";
import onBoardLock from "../../assets/images/svg/onboard-lock.svg";
import card1 from "../../assets/images/png/learningcard1.png";
import card2 from "../../assets/images/png/learningcard2.png";
import Icon from "@mdi/react";
import {
  mdiCalendarCheck,
  mdiSchoolOutline,
  mdiAccountArrowUpOutline,
} from "@mdi/js";
import { ChevronLeft, ChevronRight } from "react-feather";

import { StatLeftInfo } from "../../components/components/dashboard/common/stats/StatLeftInfo";
import ReactPaginate from "react-paginate";
import { DateRange } from "react-date-range";
import { Link } from "react-router-dom";
import NewNavbar from "../navbars/NewNavbar";
import { ChangeLocationModal } from "./ChangeLocationModal";
import axios from "axios";
import NoEvent from "../../assets/images/svg/NoEvent.svg";
import EUnivLayout from "../navbars/EUnivLayout";
import NewJoiner from "./NewJoiner";

export const NewLearning = () => {
  const onboarding = false;

  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [location, setLocation] = useState([]);
  const [show, setShow] = useState(false);
  const [imageLocation, setImageLocation] = useState([]);
  const [jobTitle, setJobTitle] = useState("");

  const fetchLocation = async () => {
    try {
      await axios
        .post(
          "/euniv/get-latest-location",
          {
            uid: uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setLocation(res?.data?.data);
            const bu = res?.data?.data?.bu_image;
            setImageLocation(bu);
            setJobTitle(res?.data?.data?.job_title);
          } else {
            return res;
          }
        });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, [localStorage]);

  useEffect(() => {
    fetchLocation();
  }, []);

  const CardMethod = ({ title, desc, image, buttonName, to, onboard }) => (
    <Card className=" h-100">
      <Card.Img variant="top" src={image} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>
          <h3 className="fw-semi-bold">{title}</h3>{" "}
        </Card.Title>
        <Card.Text>{desc} </Card.Text>
        <div className="d-flex justify-content-end">
          {onboard ? (
            <Link
              className="btn btn-kinda-grey btn-sm text-gray-600 rounded-3"
              to={to}
            >
              {buttonName}
            </Link>
          ) : (
            <Link
              className="btn btn-light-primary btn-sm text-primary rounded-3"
              to={to}
            >
              {buttonName}
            </Link>
          )}
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <>
      <EUnivLayout>
        <NewLearningLayout>
          <Fragment>
            {/* Page content */}
            <ChangeLocationModal
              show={show}
              setShow={setShow}
              token={token}
              uid={uid}
              setLocation={setLocation}
            />
            <div className="">
              <Container>
                <Row className="">
                  <Col xl={8} lg={12} md={12} sm={12} className="">
                    <Row>
                      <div
                        className="rounded-2"
                        style={{
                          backgroundImage: `url(${imageLocation})`,
                          // background: `url(${banner})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          // backgroundSize: "contain",
                          // backgroundRepeat: "no-repeat",
                          // backgroundPosition: "right",
                        }}
                      >
                        <div className="text-white p-4">
                          <Col lg={6} md={6} sm={6} className=" mb-lg-0">
                            <span className="fs-4">You're</span>
                            {jobTitle?.length > 10 ? (
                              <h3 className="text-white fw-bold mb-0">
                                {jobTitle}
                              </h3>
                            ) : (
                              <h2 className="text-white fw-bold mb-0">
                                {jobTitle}
                              </h2>
                            )}

                            <span>{location?.location}</span>
                          </Col>{" "}
                          <Button
                            variant="white"
                            className="text-primary  mt-4 rounded-3"
                            size="sm"
                            onClick={() => setShow(true)}
                          >
                            Change Location
                          </Button>
                        </div>
                      </div>
                    </Row>
                    {onboarding ? (
                      <div className="mt-4">
                        <NewJoiner />
                        <Row className="mt-4 px-0">
                          <Col md={6} className="mb-4">
                            <div
                              className="position-relative pe-0 h-100"
                              style={{ cursor: "not-allowed" }}
                            >
                              <div
                                className="position-absolute w-100 h-100 rounded-2 text-white d-flex align-items-center justify-content-center px-6 py-8"
                                style={{ zIndex: "10", fontWeight: "500" }}
                              >
                                <Image
                                  src={onBoardLock}
                                  width={150}
                                  height={150}
                                />
                              </div>
                              <div
                                className="position-absolute bg-light-grey w-100 h-100 opacity-50 rounded-2 text-white d-flex align-items-center justify-content-center px-6 py-8"
                                style={{ zIndex: "8" }}
                              ></div>
                              <CardMethod
                                onboard
                                image={onboardDevelopment}
                                title="Learning Academy"
                                buttonName="Continue Learning"
                                desc="Mempelajari hal teknis mengenai pengenalan product"
                              />
                            </div>
                          </Col>
                          <Col md={6} className="mb-4">
                            <div
                              className="position-relative pe-0 h-100"
                              style={{ cursor: "not-allowed" }}
                            >
                              <div
                                className="position-absolute w-100 h-100 rounded-2 text-white d-flex align-items-center justify-content-center px-6 py-8"
                                style={{ zIndex: "10", fontWeight: "500" }}
                              >
                                <Image
                                  src={onBoardLock}
                                  width={150}
                                  height={150}
                                />
                              </div>
                              <div
                                className="position-absolute bg-light-grey w-100 h-100 opacity-50 rounded-2 text-white d-flex align-items-center justify-content-center px-6 py-8"
                                style={{ zIndex: "8" }}
                              ></div>
                              <CardMethod
                                onboard
                                image={onboardDevelopment}
                                title="Development Academy"
                                buttonName="Continue Development"
                                desc="Mempelajari softskill, pengembangan diri dan penerapannya di perusahaan"
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ) : (
                      <>
                        <Row className="mt-4 px-0">
                          <Col md={6} className="mb-4">
                            <CardMethod
                              image={card1}
                              title="Learning Academy"
                              buttonName="Continue Learning"
                              to="/e-univ/learning"
                              desc="Mempelajari hal teknis mengenai pengenalan product"
                            />
                          </Col>
                          <Col md={6} className="mb-4">
                            <CardMethod
                              image={card2}
                              title="Development Academy"
                              buttonName="Continue Development"
                              to="/e-univ/development"
                              desc="Mempelajari softskill, pengembangan diri dan penerapannya di perusahaan"
                            />
                          </Col>
                        </Row>
                      </>
                    )}
                  </Col>
                  <Col xl={4} lg={12} md={12} sm={12} className="">
                    <Card>
                      {/* <Card.Header className="p-0 text-center">
                      <Image
                        src={calendar}
                        style={{
                          width: "fitContent",
                          height: "fitContent",
                          maxHeight: "400px",
                          maxWidth: "400px",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      /> */}
                      {/* <DatePicker inline /> */}
                      {/* <h3 className="">Calendar</h3> */}
                      {/* </Card.Header> */}
                      <Card.Body className="px-3">
                        <Card.Title>
                          <div className="d-flex justify-content-start pb-2">
                            <Icon path={mdiCalendarCheck} size={1} />
                            <div className="ms-2">
                              <h5 className="fw-semi-bold">Event</h5>
                            </div>
                          </div>
                        </Card.Title>
                        <div className="align-items-center text-center">
                          <Image
                            src={NoEvent}
                            style={{
                              width: "fitContent",
                              height: "fitContent",
                              maxHeight: "400px",
                              maxWidth: "400px",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                          <p className="pt-4 mb-0">
                            Masih belum ada{" "}
                            <span className="fst-italic">Event</span> yang
                            muncul
                          </p>
                        </div>
                        {/* <StatLeftInfo
                        title="Weekly Quiz"
                        value1="WQ Samsung S23 ultra"
                        value4="01/12/2021"
                        iconName={mdiSchoolOutline}
                        iconColorVariant="primary"
                        classValue="pb-3"
                      />
                      <StatLeftInfo
                        title="Talent Development"
                        value1="Certification For leader"
                        value4="01/12/2021"
                        iconName={mdiAccountArrowUpOutline}
                        iconColorVariant="success"
                        classValue="pb-3"
                      />
                      <StatLeftInfo
                        title="Weekly Quiz"
                        value1="WQ Samsung S23 ultra"
                        value4="01/12/2021"
                        iconName={mdiSchoolOutline}
                        iconColorVariant="primary"
                        classValue="pb-3"
                      />
                      <StatLeftInfo
                        title="Weekly Quiz"
                        value1="WQ Samsung S23 ultra"
                        value4="01/12/2021"
                        iconName={mdiSchoolOutline}
                        iconColorVariant="primary"
                        classValue="pb-3"
                      />
                      <ReactPaginate
                        previousLabel={<ChevronLeft size="14px" />}
                        nextLabel={<ChevronRight size="14px" />}
                        pageCount={1}
                        // onPageChange={changePage}
                        containerClassName={
                          "justify-content-center mb-0 pagination"
                        }
                        previousLinkClassName={"page-link mx-1 rounded"}
                        nextLinkClassName={"page-link mx-1 rounded"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link mx-1 rounded"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"active"}
                      /> */}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </Fragment>
        </NewLearningLayout>
      </EUnivLayout>
    </>
  );
};
