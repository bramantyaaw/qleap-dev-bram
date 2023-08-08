// import node module libraries
import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { LogoutEmail } from "../../redux/action/authAction";
import { clearEPCN } from "../../redux/action/epcnAction";
import { v4 as uuid } from "uuid";

import SimpleBar from "simplebar-react";
// import "simplebar/dist/simplebar.min.css";

// import custom components
import DotBadge from "../../components/components/elements/bootstrap/DotBadge";
import { useMediaQuery } from "react-responsive";

// import media files
import Logo from "../../assets/images/logo/qleap-text.svg";

//data
import Notification from "../../data/Notification";
import { profileAction, LogoutProfile } from "../../redux/action/profileAction";
import Icon from "@mdi/react";
import { mdiBellOutline as notifIcon } from "@mdi/js";

const MainNavbar = ({ className }) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [expandedMenu, setExpandedMenu] = useState(false);

  const navs = [
    { title: "E-University", link: "/e-univ" },
    { title: "E-Service", link: "/self-service" },
    { title: "E-Digital", link: "/main-desk" },
    { title: "E-Zone", link: "/ezone" },
  ];

  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.profileReducer);
  const newProfile = profileData?.data?.data;
  const photo = localStorage.getItem("photo");
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(LogoutEmail());
    dispatch(LogoutProfile());
    dispatch(clearEPCN());
    const ssoStatus = localStorage.getItem("sso");
    localStorage.clear();
    localStorage.setItem("sso", ssoStatus);

    window.location.reload(true);
  };

  useEffect(() => {
    profileData === null && dispatch(profileAction(token, uid));
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
    if (token === null) navigate("/login");
  }, [localStorage]);

  const QuickMenu = () => {
    const notif = "0";
    return (
      <Fragment>
        <Dropdown
          as={Nav.Item}
          className={`${isDesktop || isLaptop ? "mt-2 me-0" : "mt-2 me-2"}`}
        >
          <Dropdown.Toggle
            as={Nav.Link}
            bsPrefix="dt"
            className="position-relative me-lg-1  btn-icon bg-transparent text-muted"
            id="dropdownNotification"
            style={{ borderBottom: "none" }}
          >
            <div
              className="bg-danger text-white position-absolute rounded-circle text-center"
              style={{
                top: "5px",
                right: "3px",
                width: "fitContent",
                fontSize: notif?.length > 1 ? "8px" : "10px",
                padding: "2px 7px",
              }}
            >
              {notif}
            </div>
            <Icon path={notifIcon} size={1} className="text-kinda-dark" />
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
                                <h5 className="fw-bold mb-1">{item.sender}</h5>
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
                              <Tooltip id="tooltip-top">Mark as unread</Tooltip>
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

        <Dropdown as={Nav.Item}>
          <Dropdown.Toggle
            as={Nav.Link}
            bsPrefix="dt"
            className="rounded-circle border-bottom-0"
            id="dropdownUser"
          >
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <Image
                alt="avatar"
                src={photo}
                className="rounded-circle"
                // height={50}
                width={90}
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            show={isDesktop ? true : false}
            className="dashboard-dropdown dropdown-menu-end mt-4 py-0"
            aria-labelledby="dropdownUser"
            align="end"
          >
            <Dropdown.Item className="mt-3">
              <div className="d-flex">
                <div className="avatar avatar-md avatar-indicators avatar-online">
                  <Image
                    alt="avatar"
                    src={photo}
                    className="rounded-circle"
                    height={50}
                  />
                </div>
                {newProfile?.map((data, id) => {
                  return (
                    <div className="ms-3 lh-1" key={id}>
                      <h5 className="mb-1">{data?.name}</h5>
                      <p className="mb-0 text-muted">{data?.email}</p>
                    </div>
                  );
                })}
              </div>
            </Dropdown.Item>
            <Dropdown.Divider />
            {/* <Dropdown.Item eventKey="2" className="w-100 h-100">
              <Link to="/profile" className="w-100 h-100 link-menu-navbar">
                <i className="fe fe-user me-2"></i> Profile
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              className="mb-3 w-100 h-100 link-menu-navbar"
              onClick={handleLogout}
            >
              <i className="fe fe-power me-2"></i> Sign Out
            </Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Navbar
        onToggle={(collapsed) => setExpandedMenu(collapsed)}
        expanded={expandedMenu}
        expand="lg"
        className={`navbar p-2 navbar-default py-1 ${className}`}
      >
        <Container fluid className="px-0 ps-2">
          <Navbar.Brand as={Link} to="/">
            <Image src={Logo} alt="" height={50} />
          </Navbar.Brand>
          <div
            className={`navbar-nav navbar-right-wrap ms-auto d-lg-none nav-top-wrap ${
              isDesktop || isLaptop ? "d-none" : "d-flex"
            }`}
          >
            <QuickMenu />
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="icon-bar top-bar mt-0"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={`navbar-home ${
              isLaptop && "d-flex"
            } flex-lg-row flex-column align-items-start align-items-lg-center justify-content-start justify-content-lg-between`}
          >
            <Form className="mt-3 mt-lg-0 ms-lg-3 d-flex align-items-center">
              <span className="position-absolute ps-3 search-icon">
                <i className="fe fe-search"></i>
              </span>
              <Form.Control
                type="Search"
                id="formSearch"
                className="ps-6 search-navbar-home"
                placeholder="Search"
              />
            </Form>
            <Nav>
              {navs?.map((data, index) => {
                return (
                  <Nav.Link
                    key={index}
                    as={Link}
                    to={data?.link}
                    className="navbar-home-link ps-4"
                  >
                    {data?.title}
                  </Nav.Link>
                );
              })}
            </Nav>
            {["", "", "", "", "", "", ""].map((data) => (
              <div>{data}</div>
            ))}

            {/* Right side quick / shortcut menu  */}

            <Nav className="navbar-nav navbar-right-wrap d-flex nav-top-wrap">
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
    </Fragment>
  );
};

MainNavbar.propTypes = {
  bg: PropTypes.string,
  className: PropTypes.string,
};

MainNavbar.defaultProps = {
  bg: "dark",
  className: "",
};

export default MainNavbar;

// {navs?.map((data, index) => {
// 	return (
// 	  <div
// 		className={`text-white justify-content-between d-flex mx-2`}
// 		key={index}
// 	  >
// 		{/* <div className={`vr bg-light`}></div> */}
// 		<Link
// 		  to={data?.link}
// 		  className={`d-flex align-items-center text-inherit text-decoration-none fs-6 font-weight-normal`}
// 		>
// 		  <p className="ms-3 mb-0">{data?.title}</p>
// 		</Link>
// 		{/* {navbarItems(data, index)} */}
// 	  </div>
// 	);
//   })}
