// import node module libraries
import React, { Fragment, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import ProfileCoverTicket from "./ProfileCoverTicket";

import Background from "../../../../../assets/images/png/headerbg.png";
import TicketPage from "../hero/TicketPage";
// import TicketPage from "../hero/TicketPage";

const ProfileLayoutTicket = (props) => {
  const photo = localStorage.getItem("photo");

  const { profileData } = useSelector((state) => state.profileReducer);
  const newProfile = profileData?.data?.data;

  const dashboardData = newProfile?.map((data) => {
    const objNew = {
      avatar: photo,
      background: Background,
      name: data?.name,
      username: data?.nik,
      linkname: "Submit Ticket",
      link: "/my-submission/ticket/create",
      verified: true,
      outlinebutton: true,
      level: "",
    };
    return objNew;
  });

  return (
    <Fragment>
      <div className="pt-5 pb-5">
        <Container>
          <ProfileCoverTicket dashboardData={dashboardData} />
          <TicketPage
            text1="Service"
            text2="Help Center"
            text3="Ticketing Status"
          />
          <Row className="content-profile-wrapper">
            <Col className="card-content-wrapper">{props.children}</Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};
export default ProfileLayoutTicket;
