import React, { Fragment } from "react";
import {
  Card,
  Col,
  Container,
  Image,
  Nav,
  Navbar,
  Row,
  Tab,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeadingBriefinfo from "../../components/components/marketing/common/page-headings/PageHeadingBriefinfo";
import { EUnivRoutes, OnBoardRoutes } from "../../routes/EUnivRoutes";
import EUnivMenu from "../../components/components/dashboard/e-univ/EUnivMenu";
import eraEuniv from "../../assets/images/background/era_euniv_banner.svg";

import weeklyIcon from "../../assets/images/icon/weekly_book_icon.svg";
import talentIcon from "../../assets/images/icon/talent_book_icon.svg";
import { WeeklyNotification } from "../../components/components/marketing/common/notification/WeeklyNotification";

const LearningLayout = (props) => {
  const { isDisable, imageLocation } = props;

  const notification = [
    {
      src: weeklyIcon,
      title: "New Weekly Quiz",
      isNew: true,
      notification: "WQ Samsung Galaxy S23 Ultra",
      date: "19/03/2023",
    },
    {
      src: talentIcon,
      title: "Talent Development Program",
      isNew: true,
      notification: "Feedback from Mentor",
      date: "19/03/2023",
    },
    {
      src: talentIcon,
      title: "Talent Development Program",
      isNew: false,
      notification: "Feedback from Mentor",
      date: "19/03/2023",
    },
  ];
  return (
    <Fragment>
      {/* Page header */}
      <Container fluid style={{ backgroundImage: `url(${imageLocation})` }}>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <PageHeadingBriefinfo
              pagetitle={props.pagetitle}
              briefinfo1={props.briefinfo1}
              briefinfo2={props.briefinfo2}
              briefinfo3={props.briefinfo3}
              span1={props.span1}
              span2={props.span2}
              spantitle={props.spantitle}
            />
          </Col>
          {/* <Col lg={4} md={12} sm={12}>
            {!isDisable && (
              <div className="px-8">
                <Image
                  src={Erafone}
                  alt=""
                  className="card-img-top rounded pt-8 pb-12"
                />
              </div>
            )}
          </Col> */}
        </Row>
      </Container>
      <div className="pt-5 bg-wrapper pb-5">
        <Container fluid className="px-md-10">
          {/* Content */}
          <Row className="mt-n14 mb-4 mb-lg-0">
            <Col lg={3} md={3} sm={12}>
              <Navbar
                expand="lg"
                className="navbar navbar-expand-md navbar-light shadow-sm mb-4 mb-lg-0 sidenav"
              >
                <Link
                  className="d-xl-none d-lg-none d-md-none text-inherit fw-bold fs-5 float-start py-1"
                  to="#"
                >
                  Menu
                </Link>
                <Navbar.Toggle
                  aria-controls="basic-navbar-nav"
                  className="p-0 focus-none border-0"
                  label="Responsive Menu"
                >
                  <span
                    className="navbar-toggler d-md-none icon-shape icon-sm rounded bg-primary p-0 text-white float-end"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidenav"
                    aria-controls="sidenav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="fe fe-menu"></span>
                  </span>
                </Navbar.Toggle>

                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto flex-column" as="ul">
                    <Nav.Item className="navbar-header" as="li">
                      E-University
                    </Nav.Item>
                    {isDisable ? (
                      <EUnivMenu data={OnBoardRoutes} />
                    ) : (
                      <EUnivMenu data={EUnivRoutes} />
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <Card className="card-hover p-0 mt-3">
                <Card.Header>
                  <h4>Notification</h4>
                </Card.Header>
                <Card.Body>
                  {notification?.map((data, index) => {
                    return <WeeklyNotification data={data} />;
                  })}
                </Card.Body>
              </Card>
            </Col>

            <Col lg={9} md={8} sm={12}>
              {props.children}
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};
export default LearningLayout;
