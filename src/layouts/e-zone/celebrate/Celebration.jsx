import React, { Fragment, useEffect, useState } from "react";
import RightSideEzoneComponent from "../../../components/ezone/new/components/RightSideEzoneComponent";

import { Link } from "react-router-dom";
import { Card, Col, Image, Row } from "react-bootstrap";
import axios from "axios";
import Icon from "@mdi/react";
import {
  mdiCakeLayered as BirthdayIcon,
  mdiBriefcase as AnnivIcon,
} from "@mdi/js";
import LoadingComponent from "../../../components/components/elements/loading/LoadingComponent";
import CelebrationImgDesign from "../../../assets/ezone/images/svg/celebration-design.svg";

const Celebration = () => {
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [modalLoading, setModalLoading] = useState(false);

  const [arrAnniv, setArrAnniv] = useState([]);
  const [arrBirthday, setArrBirthday] = useState([]);

  const fetchDivisionMoment = async () => {
    try {
      setModalLoading(true);
      await axios
        .post(
          "/ezone/get-anniv-date",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setModalLoading(false);
          if (data?.status === 200) {
            const anniv = data?.data?.data?.anniversary;
            const birthday = data?.data?.data?.birthdays;

            const compareDatesAnniv = anniv?.sort((a, b) => {
              const dateA = new Date(a?.anniv_date);
              const dateB = new Date(b?.anniv_date);
              return dateA - dateB;
            });

            const DataAccendingAnniv = compareDatesAnniv?.sort((a, b) => {
              if (a?.anniv_date === b?.anniv_date)
                return a?.name?.localeCompare(b?.name);
            });

            const compareDatesBirthday = birthday?.sort((a, b) => {
              const dateA = new Date(a?.anniv_date);
              const dateB = new Date(b?.anniv_date);
              return dateA - dateB;
            });

            const DataAccendingBirthday = compareDatesBirthday?.sort((a, b) => {
              if (a?.anniv_date === b?.anniv_date)
                return a?.name?.localeCompare(b?.name);
            });

            setArrAnniv(DataAccendingAnniv);
            setArrBirthday(DataAccendingBirthday);
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchDivisionMoment();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
    setToken(localStorage.getItem("access_token"));
    // eslint-disable-next-line
  }, [localStorage]);

  return (
    <div>
      <Fragment>
        <RightSideEzoneComponent>
          <Row style={{ height: "100%", minHeight: "100%" }}>
            <Col lg={8} md={12} sm={12}>
              {modalLoading && <LoadingComponent className="mt-3" />}
              {(arrAnniv?.length > 0 || arrBirthday?.length > 0) && (
                <Row>
                  {arrBirthday?.length > 0 && (
                    <Col lg={12} md={12} sm={12}>
                      <div className="pb-2">
                        <Card>
                          <Card.Header className="bg-white">
                            <h3 className="mb-0">Birthday List</h3>
                          </Card.Header>
                          <div className="shadow-xss ps-5 pb-2">
                            {arrBirthday?.map((item, index) => {
                              return (
                                <div className="pt-4" key={index}>
                                  <div className="align-items-center">
                                    <div className={`mb-0`}>
                                      <div className="d-flex w-100">
                                        <div className="avatar avatar-lg">
                                          <Image
                                            alt="avatar"
                                            src={item?.photo}
                                            className="rounded-circle"
                                            height={100}
                                            width={110}
                                          />
                                        </div>
                                        <div
                                          className={`ms-3 w-100 d-flex justify-content-between align-items-center  ${
                                            arrBirthday?.length !== index + 1 &&
                                            "border-bottom border-gray-200"
                                          }`}
                                        >
                                          <div>
                                            <div className="d-flex align-items-center pe-5">
                                              <div>
                                                <p className="mb-0 text-body">
                                                  <span
                                                    p-4n
                                                    className="fw-bold mb-0 h5"
                                                  >
                                                    {item?.name}
                                                  </span>
                                                </p>
                                              </div>
                                              <span className="fs-6 text-muted ms-2">
                                                <span>
                                                  {item?.days_left ===
                                                  "0 days left"
                                                    ? "Today"
                                                    : item?.days_left}
                                                </span>
                                                <span className="ms-1">
                                                  {item?.time}
                                                </span>
                                              </span>
                                            </div>
                                            <p className="text-secondary mb-0">
                                              {item?.division}
                                            </p>
                                            <p className="text-secondary mb-4">
                                              {item?.gender === "Male"
                                                ? "His birthday is on "
                                                : "Her birthday is on "}
                                              {item?.anniv_date}
                                            </p>
                                            {/* <FillInput
                                            type="text"
                                            placeholder="Say happy birthday and make a wish to your colleague"
                                            className="w-100"
                                            setState={setWishBirthday}
                                          /> */}
                                          </div>
                                          {item?.days_left ===
                                            "0 days left" && (
                                            <div className="me-4">
                                              <Icon
                                                path={BirthdayIcon}
                                                size={1.3}
                                                className="text-danger"
                                              />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Card>
                      </div>
                    </Col>
                  )}
                  {arrAnniv?.length > 0 && (
                    <Col lg={12} md={12} sm={12}>
                      <div className="pb-2">
                        <Card>
                          <Card.Header className="bg-white">
                            <h3 className="mb-0">Work Anniversary List</h3>
                          </Card.Header>
                          <div className="shadow-xss ps-5 pb-2">
                            {arrAnniv?.map((item, index) => {
                              return (
                                <div className="pt-4" key={index}>
                                  <div className="align-items-center">
                                    <div className={`mb-0`}>
                                      <div className="d-flex w-100">
                                        <div className="avatar avatar-lg">
                                          <Image
                                            alt="avatar"
                                            src={item?.photo}
                                            className="rounded-circle"
                                            height={100}
                                            width={110}
                                          />
                                        </div>
                                        <div
                                          className={`ms-3 w-100 d-flex justify-content-between align-items-center  ${
                                            arrAnniv?.length !== index + 1 &&
                                            "border-bottom border-gray-200"
                                          }`}
                                        >
                                          <div>
                                            <div className="d-flex align-items-center pe-5">
                                              <div>
                                                <p className="mb-0 text-body">
                                                  <span
                                                    p-4n
                                                    className="fw-bold mb-0 h5"
                                                  >
                                                    {item?.name}
                                                  </span>
                                                </p>
                                              </div>
                                              <span className="fs-6 text-muted ms-2">
                                                <span>
                                                  {item?.days_left ===
                                                  "0 days left"
                                                    ? "Today"
                                                    : item?.days_left}
                                                </span>
                                                <span className="ms-1">
                                                  {item?.time}
                                                </span>
                                              </span>
                                            </div>
                                            <p className="text-secondary mb-0">
                                              {item?.division}
                                            </p>
                                            <p className="text-secondary mb-4">
                                              {item?.gender === "Male"
                                                ? "His work anniversary is on "
                                                : "Her work anniversary is on "}
                                              {item?.anniv_date}{" "}
                                              <span
                                                style={{
                                                  color:
                                                    " rgba(33, 37, 41, 0.7)",
                                                  fontWeight: "700",
                                                }}
                                              >
                                                • {item?.year_of_service}{" "}
                                                {item?.year_of_service > 1
                                                  ? "Years"
                                                  : "Year"}{" "}
                                                at Erajaya
                                              </span>
                                            </p>
                                            {/* <FillInput
                                            type="text"
                                            placeholder="Congratulate to your colleague work anniversary"
                                            className="w-100"
                                            setState={setWishAnniv}
                                          /> */}
                                          </div>
                                          {item?.days_left ===
                                            "0 days left" && (
                                            <div className="me-4">
                                              <Icon
                                                path={AnnivIcon}
                                                size={1.3}
                                                className="text-primary"
                                              />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Card>
                      </div>
                    </Col>
                  )}
                </Row>
              )}
            </Col>
            <Col lg={4} md={12} sm={12}>
              <Card className="mb-3 mb-lg-0">
                <Card.Body className="d-flex flex-column">
                  <Image src={CelebrationImgDesign} height={116} />
                  <p className="mb-0 fst-italic opacity-75 font-xsss text-navy-ezone mt-3 text-center">
                    "Celebrating their achievements and looking forward to even
                    greater milestones together."
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </RightSideEzoneComponent>
      </Fragment>
    </div>
  );
};

export default Celebration;
