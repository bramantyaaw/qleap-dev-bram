import { Fragment, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Row, Col, Container, Nav, Navbar } from "react-bootstrap";
import Avatar1 from "../../assets/images/avatar/avatar-1.jpg";

import { ProfileCover } from "../../layouts/profile/ProfileCover";
import { ProfileRoutes } from "../../routes/ProfileRoutes";
import { useSelector, useDispatch } from "react-redux";
import { profileAction } from "../../redux/action/profileAction";

export const ProfileLayout = (props) => {
  const dispatch = useDispatch();

  const { profileData } = useSelector((state) => state.profileReducer);
  const dataUser = profileData?.data?.data;

  const win = window.localStorage;

  useEffect(() => {
    document.body.style.backgroundColor = "#D4D4D4";
  });

  useEffect(() => {
    const token = win.getItem("access_token");
    const uid = win.getItem("uid");
    profileData === null && dispatch(profileAction(token, uid));
  }, []);

  const dashboardData = dataUser?.map((data) => {
    const obj = {
      avatar: win.getItem("photo"),
      name: data?.name,
      username: data?.nik,
    };

    return obj;
  });

  return (
    <Fragment>
      <div className="pt-5 pb-5">
        <Container>
          {/* User info */}
          <ProfileCover dashboardData={dashboardData} />

          {/* Content */}
          <Row className="mt-0 mt-md-4">
            <Col lg={12} md={12} sm={12}>
              {props.children}
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};
