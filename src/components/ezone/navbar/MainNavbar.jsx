import { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Navbar,
  Nav,
  Container,
  Form,
  Dropdown,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import PropTypes from "prop-types";

import { useMediaQuery } from "react-responsive";

import SimpleBar from "simplebar-react";
import DotBadge from "../../../components/components/elements/bootstrap/DotBadge";

// import media files
import Logo from "../../assets/images/logo/qleap-text.svg";

//data
import Notification from "../../../data/Notification";
import navs from "../../../routes/MainLayoutRoutes";

function MainNavbar() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [expandedMenu, setExpandedMenu] = useState(false);

  const QuickMenu = () => {
    return (
      <Fragment>
        <li className="nav-item ms-2">
          <Dropdown
            as={Nav.Item}
            // className={`nav-link icon-md btn btn-light p-0 ${
            //   isDesktop || isLaptop ? "mt-2 me-0" : "mt-2 me-2"
            // }`}
          >
            <Dropdown.Toggle
              as={Nav.Link}
              bsPrefix="dt"
              className="nav-link icon-md btn btn-light p-0"
              id="dropdownNotification"
            >
              <i className="bi bi-bell-fill fs-6"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu
              show={isDesktop ? true : false}
              className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end mt-4 py-0"
              aria-labelledby="dropdownNotification"
              align="end"
            >
              <div className="border-bottom px-3 pt-3 pb-3 d-flex justify-content-between align-items-end">
                <span className="h4 mb-0">Notifications</span>
                <Link to="# " className="text-muted">
                  <span className="align-middle">
                    <i className="fe fe-settings me-1"></i>
                  </span>
                </Link>
              </div>
              <SimpleBar style={{ maxHeight: "300px" }}>
                <ListGroup variant="flush">
                  {Notification?.map(function (item, index) {
                    return (
                      <ListGroup.Item
                        className={index === 0 ? "bg-light" : ""}
                        key={index}
                      >
                        <Row>
                          <Col>
                            <Link className="text-body" to="#">
                              <div className="d-flex">
                                <Image
                                  src={item.image}
                                  alt=""
                                  className="avatar-md rounded-circle"
                                />
                                <div className="ms-3">
                                  <h5 className="fw-bold mb-1">
                                    {item.sender}
                                  </h5>
                                  <p className="mb-3">{item.message}</p>
                                  <span className="fs-6 text-muted">
                                    <span>
                                      <span className="fe fe-thumbs-up text-success me-1"></span>
                                      {item.date}
                                    </span>
                                    <span className="ms-1">{item.time}</span>
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </Col>
                          <Col className="col-auto text-center me-2">
                            <OverlayTrigger
                              key="top"
                              placement="top"
                              overlay={
                                <Tooltip id="tooltip-top">
                                  Mark as unread
                                </Tooltip>
                              }
                            >
                              <Link to="#">
                                <DotBadge bg="secondary"></DotBadge>
                              </Link>
                            </OverlayTrigger>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </SimpleBar>
              <div className="border-top px-3 pt-3 pb-3">
                <Link
                  to="/authentication/notifications"
                  className="text-link fw-semi-bold"
                >
                  See all Notifications
                </Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </li>
        <li className="nav-item ms-2">
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle
              as={Nav.Link}
              bsPrefix="dt"
              // className="rounded-circle border-bottom-0"
              id="dropdownUser"
            >
              <div className="avatar avatar-md avatar-indicators avatar-online">
                {/* {arrPhoto?.map((data, id) => {
                return (
                  <Image
                    key={id}
                    alt="avatar"
                    src={profilePhoto}
                    className="rounded-circle"
                    height={50}
                  />
                );
              })} */}
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu
              show={isDesktop ? true : false}
              className="dashboard-dropdown dropdown-menu-end mt-4 py-0"
              aria-labelledby="dropdownUser"
              align="end"
            >
              <Dropdown.Item className="mt-3">
                {/* {arrPhoto?.map((data, id) => {
                return (
                  <div key={id} className="d-flex">
                    <div className="avatar avatar-md avatar-indicators avatar-online">
                      <Image
                        alt="avatar"
                        src={data}
                        className="rounded-circle"
                        height={50}
                      />
                    </div>
                    <div className="ms-3 lh-1">
                      <h5 className="mb-1">Annette Black</h5>
                      <p className="mb-0 text-muted">annette@geeksui.com</p>
                    </div>
                  </div>
                );
              })} */}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="2" className="w-100 h-100 mb-3">
                <Link to="/profile" className="w-100 h-100">
                  <i className="fe fe-user me-2"></i>
                  <span>Profile</span>
                </Link>
              </Dropdown.Item>
              {/* <Dropdown.Item eventKey="3">
                <i className="fe fe-star me-2"></i> Subscription
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fe fe-settings me-2"></i> Settings
              </Dropdown.Item> */}
              {/* <Dropdown.Divider /> */}
              {/* <Dropdown.Item
                className="mb-3"
                // onClick={handleLogout}
              >
                <i className="fe fe-power me-2"></i> Sign Out
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <header className="navbar-light fixed-top header-static bg-mode">
        <Navbar
          onToggle={(collapsed) => setExpandedMenu(collapsed)}
          expanded={expandedMenu}
          expand="lg"
          className={`navbar navbar-expand-lg`}
        >
          <Container>
            <Navbar.Brand as={Link} to="/">
              <Image
                className="light-mode-item navbar-brand-item"
                src={Logo}
                alt=""
                height={50}
              />
            </Navbar.Brand>
            <ul
              className={`nav flex-nowrap align-items-center ms-sm-3 list-unstyled ${
                isDesktop || isLaptop ? "d-none" : "d-flex"
              }`}
            >
              <QuickMenu />
            </ul>
            <Navbar.Toggle
              aria-controls="navbarCollapse"
              className="navbar-toggler ms-auto icon-md btn btn-light p-0 collapsed"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-animation">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                {navs?.map((data, index) => {
                  return (
                    <Nav.Link key={index} as={Link} to={data?.link}>
                      {data?.title}
                    </Nav.Link>
                  );
                })}
              </Nav>

              <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
                <span
                  className={`${isDesktop || isLaptop ? "d-flex" : "d-none"}`}
                >
                  <QuickMenu />
                </span>
              </Nav>
              {/* end of right side quick / shortcut menu  */}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </Fragment>
  );
}

export default MainNavbar;
