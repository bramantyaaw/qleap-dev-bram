import React, { useEffect, useState } from "react";
import RightSideEzoneComponent from "../../../components/ezone/new/components/RightSideEzoneComponent";
import HeaderCommunity from "./HeaderCommunity";
import { Card, Col, Row } from "react-bootstrap";
import RegisterCommunityCard from "./RegisterCommunityCard";
import GroupPhoto from "./GroupPhoto";
import CommunityForm from "./CommunityForm";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotifSuccessModal from "../../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import LoadingComponent from "../../../components/components/elements/loading/LoadingComponent";
import SuccessAlert from "../../../components/components/dashboard/ticketing/elements/alerts/SuccessAlert";

const DetailGroup = () => {
  const [isHover, setIsHover] = useState(false);
  const [isClickJoin, setIsClickJoin] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const [arrDetailCommunity, setArrDetailCommunity] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [success, setSuccess] = useState(false);

  const { id } = useParams();

  const handleFetchDetailCommunity = async () => {
    try {
      setModalLoading(true);
      await axios
        .post(
          `/ezone/get-single-community`,
          {
            uid,
            community_id: parseInt(id),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setModalLoading(false);
          if (data?.status === 200) {
            setArrDetailCommunity(data?.data?.data);
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

  useEffect(() => {
    handleFetchDetailCommunity();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
    // eslint-disable-next-line
  }, [localStorage]);

  return (
    <>
      <RightSideEzoneComponent>
        <HeaderCommunity
          isClickJoin={isClickJoin}
          setIsClickJoin={setIsClickJoin}
          arrData={arrDetailCommunity}
        />
        {success && (
          <SuccessAlert
            clasNameText1="mb-0"
            classNameAlert="mb-0 mt-3"
            text1="You have successfully joined this community, you can register for community event."
            isLinkNull
          />
        )}
        {modalLoading && (
          // <div className="d-flex justify-content-center pt-14">
          <LoadingComponent className="mb-3" />
          // </div>
        )}
        {arrDetailCommunity?.map((data, idData) => {
          return (
            <div className="w-100" key={idData}>
              <Row className=" px-0 mx-0 mt-3 w-100">
                <Col
                  xl={4}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className="ps-0 pe-0 pe-xl-3"
                >
                  <Card className="mb-3 rounded-4">
                    <Card.Body>
                      <p
                        className="text-navy-ezone"
                        style={{ fontWeight: "700" }}
                      >
                        About
                      </p>
                      <p className="mb-0 text-grey-ezone-community">
                        {data?.about}
                      </p>
                    </Card.Body>
                  </Card>

                  {/* {data?.hasEvent > 0 &&
                    (data?.isJoined > 0 ? (
                      <RegisterCommunityCard
                        event={data?.event}
                        className="bg-white"
                        classNameDate="bg-success"
                      />
                    ) : (
                      <>
                        <div
                          onMouseEnter={() => setIsHover(true)}
                          onMouseLeave={() => setIsHover(false)}
                        >
                          {isHover ? (
                            <div
                              className="position-relative"
                              style={{ cursor: "not-allowed" }}
                            >
                              <div
                                className="position-absolute bg-dark w-100 h-100 opacity-75 rounded-4 text-white d-flex align-items-center justify-content-center px-6 py-8"
                                style={{ zIndex: "10", fontWeight: "500" }}
                              >
                                <p className="mb-0 text-center lh-sm">
                                  You have to join community first to attend the
                                  event
                                </p>
                              </div>
                              <RegisterCommunityCard
                                className="bg-kinda-grey opacity-75"
                                classNameDate="bg-secondary"
                                event={data?.event}
                              />
                            </div>
                          ) : (
                            <RegisterCommunityCard
                              className="bg-kinda-grey opacity-75"
                              classNameDate="bg-secondary"
                              event={data?.event}
                            />
                          )}
                        </div>
                      </>
                    ))} */}
                </Col>
                <Col xl={8} lg={12} md={12} sm={12} xs={12} className="px-0">
                  <div className="mt-4 mt-lg-0">
                    {isClickJoin ? (
                      <CommunityForm
                        setIsClickJoin={setIsClickJoin}
                        token={token}
                        isClickJoin={isClickJoin}
                        uid={uid}
                        id={id}
                        setSuccess={setSuccess}
                        success={success}
                      />
                    ) : (
                      <GroupPhoto arrPhoto={data?.photos} />
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}
      </RightSideEzoneComponent>
      {errorModal && (
        <NotifSuccessModal show={errorModal} setShow={setErrorModal}>
          <ErrorAlert
            setState={setErrorModal}
            text1={errorMessage}
            className="mb-0"
          />
        </NotifSuccessModal>
      )}
    </>
  );
};

export default DetailGroup;
