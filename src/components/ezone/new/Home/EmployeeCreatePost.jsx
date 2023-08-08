import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Icon from "@mdi/react";
import {
  mdiImageOutline as imgIcon,
  mdiVideoOutline as videoIcon,
} from "@mdi/js";
import CreatePostModal from "../components/CreatePostModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { profileAction } from "../../../../redux/action/profileAction";

const EmployeeCreatePost = ({ uid, token }) => {
  const [photoProfile, setPhotoProfile] = useState(
    localStorage.getItem("photo")
  );
  const [popUpModal, setPopUpModal] = useState(false);
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state?.profileReducer);
  const newProfile = profileData?.data?.data;
  const [isClickImg, setIsClickImg] = useState(false);
  const [isClickVideo, setIsClickVideo] = useState(false);

  useEffect(() => {
    setPhotoProfile(localStorage.getItem("photo"));
    // eslint-disable-next-line
  }, [localStorage]);

  useEffect(() => {
    profileData === null && dispatch(profileAction(token, uid));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="mb-2 mb-lg-3 " style={{ height: "fitContent" }}>
      <Row>
        <Col lg={10} md={10} sm={10} xs={9}>
          <div
            className="card rounded-5 d-flex flex-row align-items-center "
            role="button"
            onClick={() => {
              setPopUpModal(true);
              setIsClickImg(false);
              setIsClickImg(false);
            }}
          >
            <div
              className="avatar avatar-md rounded-circle me-4"
              style={{ border: "1px solid #FFFFFF" }}
            >
              <Image alt="" src={photoProfile} className="rounded-circle" />
            </div>
            <p
              className="mb-0 text-grey-ezone opacity-75"
              style={{ fontWeight: "400" }}
            >
              What’s on your mind?
            </p>
          </div>
        </Col>
        <Col lg={2} md={2} sm={2} xs={3}>
          <div className="d-flex justify-content-center">
            <div
              className="card rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{ width: "42px", height: "42px" }}
              onClick={() => {
                setPopUpModal(true);
                setIsClickImg(true);
                setIsClickVideo(false);
              }}
              role="button"
            >
              <Icon path={imgIcon} className="text-success" size={0.8} />
            </div>
            <div
              className="card rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "42px", height: "42px" }}
              onClick={() => {
                setPopUpModal(true);
                setIsClickVideo(true);
                setIsClickImg(false);
              }}
              role="button"
            >
              <Icon path={videoIcon} className="text-danger" size={0.8} />
            </div>
          </div>
        </Col>
      </Row>
      <CreatePostModal
        show={popUpModal}
        setShow={setPopUpModal}
        photoProfile={photoProfile}
        dataArr={newProfile}
        videoIcon={videoIcon}
        imgIcon={imgIcon}
        token={token}
        uid={uid}
        setIsClickVideo={setIsClickVideo}
        isClickVideo={isClickVideo}
        setIsClickImg={setIsClickImg}
        isClickImg={isClickImg}
      />
    </div>
  );
};

export default EmployeeCreatePost;
