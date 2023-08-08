import React, { Fragment, useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiCalendarStar as CalendarIcon } from "@mdi/js";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";
import PageTitle from "../../../components/ezone/new/Story/PageTitle";
import RightSideEzoneComponent from "../../../components/ezone/new/components/RightSideEzoneComponent";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingComponent from "../../../components/components/elements/loading/LoadingComponent";
import NotifSuccessModal from "../../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import { Card, Col, Row } from "react-bootstrap";

const GroupEzone = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [arrCommunity, setCommunity] = useState([]);

  const [modalLoading, setModalLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFetchErajayaCommunity = async () => {
    try {
      setModalLoading(true);
      await axios
        .post(
          `/ezone/get-community`,
          {
            uid,
            page,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setModalLoading(false);
          if (data?.status === 200) {
            const newData = data?.data?.data;
            if (newData !== null) {
              setTotalPage(newData?.total_page);
              setCommunity(newData?.community);
            }
          } else if (data?.status === 404) {
            setErrorModal(true);
            setErrorMessage(data?.data);
          } else {
            setErrorModal(true);
            setErrorMessage(data?.data?.message);
          }
        });
    } catch (err) {
      return err;
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  useEffect(() => {
    handleFetchErajayaCommunity();
    // eslint-disable-next-line
  }, [, page]);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
    // eslint-disable-next-line
  }, [localStorage]);
  return (
    <div>
      <Fragment>
        <RightSideEzoneComponent>
          <div className="col-xl-12">
            <PageTitle title="Community" />

            <Row className="ps-2 pe-1">
              {arrCommunity?.map((value, index) => {
                return (
                  <Col
                    lg={6}
                    md={12}
                    sm={12}
                    key={index}
                    style={{ height: "maxContent" }}
                    className=" mb-4"
                  >
                    <Card
                      className="d-block border-0 shadow-xss rounded-3 overflow-hidden mb-0 mt-2 position-relative"
                      style={{ height: "100%" }}
                    >
                      {/* {value?.hasEvent > 0 && (
                        <div
                          className="position-absolute bg-light-success d-flex align-items-center px-3 py-1"
                          style={{
                            zIndex: "1",
                            right: "0",
                            boxShadow: "-2px 3px 4px rgba(0, 0, 0, 0.25)",
                            borderBottomLeftRadius: "7px",
                          }}
                        >
                          <Icon
                            path={CalendarIcon}
                            size={1}
                            className="me-2 text-dark-success"
                          />
                          <div>
                            <p
                              className="text-kinda-dark mb-0 h6"
                              style={{ fontWeight: "600" }}
                            >
                              Upcoming
                            </p>
                            <p
                              className="text-kinda-dark mb-0 h6"
                              style={{ fontWeight: "600" }}
                            >
                              Event
                            </p>
                          </div>
                        </div>
                      )} */}
                      <div
                        className="card-body position-relative h100 bg-image-cover bg-image-center"
                        style={{
                          backgroundImage: `url(${value?.community_banner})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                      <Card.Body className="card-body  w-100 pl-10 pe-4 pb-4 pt-0 text-left position-relative h-100">
                        <figure
                          className="avatar position-absolute w75 z-index-1 left-15"
                          style={{ marginTop: `-40px`, height: "75px" }}
                        >
                          <img
                            src={value?.community_pic}
                            alt="avatar"
                            className="float-right  bg-white rounded-circle w-100 "
                          />
                        </figure>
                        <div className="clearfix"></div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h2
                              className="fw-700 font-xss mt-3 mb-0"
                              style={{ fontWeight: "700" }}
                            >
                              {value?.community_name}
                            </h2>
                            <p
                              className="fw-500 font-xsssss text-gray-500 mt-0 mb-0 lh-3"
                              style={{ fontWeight: "600" }}
                            >
                              {value?.member}{" "}
                              {value?.member > 1 ? "members" : "member"}
                            </p>
                            {value?.isJoined > 0 && (
                              <p
                                className="font-xsssss fst-italic my-0 text-dark-success"
                                style={{ fontWeight: "600" }}
                              >
                                You've joined this community
                              </p>
                            )}
                          </div>

                          <span className=" right-15 top-0 d-flex align-items-center">
                            <Link
                              to={`/ezone/community/${value?.community_id}`}
                              className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-primary font-xsssss fw-700 ls-lg text-white"
                            >
                              View Group
                            </Link>
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}

              {modalLoading && <LoadingComponent className="mb-3" />}
              {arrCommunity ? (
                <ReactPaginate
                  previousLabel={<ChevronLeft size="14px" />}
                  nextLabel={<ChevronRight size="14px" />}
                  pageCount={totalPage}
                  onPageChange={changePage}
                  containerClassName={"justify-content-center mb-0 pagination"}
                  previousLinkClassName={"page-link mx-1 rounded"}
                  nextLinkClassName={"page-link mx-1 rounded"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link mx-1 rounded"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"active"}
                />
              ) : (
                <p className="text-secondary">No Data</p>
              )}
            </Row>
          </div>
        </RightSideEzoneComponent>
      </Fragment>
      {errorModal && (
        <NotifSuccessModal show={errorModal} setShow={setErrorModal}>
          <ErrorAlert
            setState={setErrorModal}
            text1={errorMessage}
            className="mb-0"
          />
        </NotifSuccessModal>
      )}
    </div>
  );
};

export default GroupEzone;
