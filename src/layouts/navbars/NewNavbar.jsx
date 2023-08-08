// import node module libraries
import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Image,
  Navbar,
  Nav,
  Container,
  Dropdown,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import SimpleBar from "simplebar-react";
import Icon from "@mdi/react";
import {
  mdiBellOutline as notifIcon,
  mdiHomeOutline as homeIcon,
  mdiChevronDown as chevronDownIcon,
  mdiChevronRight as chevronRightIcon,
} from "@mdi/js";
import DotBadge from "../../components/components/elements/bootstrap/DotBadge";
import Logo from "../../assets/images/logo/qleap-text.svg";
import { LogoutEmail } from "../../redux/action/authAction";
import { clearEPCN } from "../../redux/action/epcnAction";
import Notification from "../../data/Notification";
import {
  profileAction,
  LogoutProfile,
  getEmployeePhoto,
} from "../../redux/action/profileAction";
import { EUnivNavbarData, LearningJourneyData } from "../../data/MyTeamData";

const NewNavbar = ({
  className,
  navs,
  logoSectionImg,
  logoSize,
  isEzone,
  isHome,
  navLeftCustom,
}) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const isPhone = useMediaQuery({
    query: "(max-width: 990px)",
  });

  const [expandedMenu, setExpandedMenu] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [photo, setPhoto] = useState(localStorage.getItem("photo"));
  const dispatch = useDispatch();
  const { profileData, employeePhoto } = useSelector(
    (state) => state.profileReducer
  );

  const newProfile = profileData?.data?.data;

  const doesEmployeeHaveAPhoto = employeePhoto?.filter(
    (data) => data?.uid === uid
  );

  doesEmployeeHaveAPhoto?.map((data) =>
    localStorage.setItem("photo", data?.photo)
  );

  const navigate = useNavigate();

  const { id } = useParams();

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
    (profileData === null || profileData?.length === 0) &&
      dispatch(profileAction(token, uid));

    !doesEmployeeHaveAPhoto && dispatch(getEmployeePhoto(token, uid));
    // eslint-disable-next-line
  }, [, doesEmployeeHaveAPhoto, employeePhoto]);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
    setPhoto(localStorage.getItem("photo"));
    if (token === null) navigate("/login");
    // eslint-disable-next-line
  }, [localStorage]);

  const location = window.location?.pathname;

  let locationSplitted = location?.split("/");

  const DropdownLearningJourney = ({ data }) => {
    const [isClick, setIsClick] = useState(false);

    const handleClick = () => setIsClick((prevState) => !prevState);
    return (
      <Fragment>
        {isPhone ? (
          <div className="custom-dropdown-wrapper">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                as={Nav.Link}
                bsPrefix="dt"
                className="rounded-circle border-bottom-0 pb-0"
                id="dropdownUser"
              >
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ padding: "0 20px 5px 20px" }}
                >
                  <p className="mb-0 me-1">{data?.title}</p>
                  <Icon path={chevronDownIcon} size={0.8} />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu
                show={isDesktop ? true : false}
                className="dashboard-dropdown dropdown-menu-start mt-4 py-2 py-0"
                aria-labelledby="dropdownUser"
                align="start"
              >
                {LearningJourneyData?.map((data, id) => {
                  return (
                    <Dropdown.Item className="w-100 h-100" key={id}>
                      <Link
                        to={data?.link}
                        className="link-menu-navbar"
                        style={{ width: "100%", height: "100%" }}
                      >
                        {data?.title}
                      </Link>
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <div className="position-relative">
            <Dropdown.Item
              className=" w-100 h-100 link-menu-navbar"
              onClick={handleClick}
              onMouseEnter={() => setIsClick(true)}
            >
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ paddingBottom: "5px" }}
              >
                <p className="mb-0 me-1">{data?.title}</p>
                <Icon path={chevronRightIcon} size={0.8} />
              </div>
            </Dropdown.Item>
            {isClick && (
              <Card
                className="position-absolute py-2"
                style={{ right: "-170px", top: "0" }}
              >
                {LearningJourneyData?.map((data, id) => {
                  return (
                    <Dropdown.Item className="w-100 h-100" key={id}>
                      <Link
                        to={data?.link}
                        className="link-menu-navbar"
                        style={{ width: "100%", height: "100%" }}
                      >
                        {data?.title}
                      </Link>
                    </Dropdown.Item>
                  );
                })}
              </Card>
            )}
          </div>
        )}
      </Fragment>
    );
  };

  const EUnivDropdownMenu = ({ data }) => {
    return (
      <Fragment>
        <Dropdown
          as={Nav.Item}
          className="navbar-home-link"
          style={{ paddingTop: "3px" }}
        >
          <Dropdown.Toggle
            as={Nav.Link}
            bsPrefix="dt"
            className="rounded-circle border-bottom-0 pb-0"
            id="dropdownUser"
          >
            <div className="d-flex justify-content-between navbar-home-link ps-4 align-items-center">
              <p className="mb-0 me-1">{data?.title}</p>
              <Icon path={chevronDownIcon} size={0.8} />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            show={isDesktop ? true : false}
            className="dashboard-dropdown dropdown-menu-end mt-4 py-2 py-0"
            aria-labelledby="dropdownUser"
            align="end"
          >
            {EUnivNavbarData?.map((data, id) => {
              const date = new Date();
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              const today = `${year}-${month}-${day}`;

              const string = `${data?.link};${uid};${today}`;
              const encodedString = window.btoa(string);

              return (
                <div key={id}>
                  {data?.dropdown ? (
                    <DropdownLearningJourney data={data} />
                  ) : data?.newtab ? (
                    <div className="w-100 h-100 dropdown-item" key={id}>
                      <Link
                        to={`https://qleap.erajaya.com/qleapci/login/react_frame?auth=${encodedString}`}
                        className="link-menu-navbar"
                        style={{ width: "100%", height: "100%" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {data?.title}
                      </Link>
                    </div>
                  ) : (
                    <Dropdown.Item className="w-100 h-100" key={id}>
                      <Link
                        to={data?.link}
                        className="link-menu-navbar"
                        style={{ width: "100%", height: "100%" }}
                      >
                        {data?.title}
                      </Link>
                    </Dropdown.Item>
                  )}
                </div>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    );
  };

  const getSecondWordFromPath = (pathname) => {
    const words = pathname.split("/");
    return words.length > 1 ? words[1] : pathname;
  };

  const QuickMenu = () => {
    const notif = 0;
    return (
      <Fragment>
        <Dropdown
          as={Nav.Item}
          className={`${isDesktop || isLaptop ? " me-0" : "mt-2 me-2"}`}
          style={{ marginTop: (isDesktop || isLaptop) && "5px" }}
        >
          <Dropdown.Toggle
            as={Nav.Link}
            bsPrefix="dt"
            className="position-relative me-lg-1  btn-icon bg-transparent text-muted"
            id="dropdownNotification"
            style={{ borderBottom: "none" }}
          >
            {notif > 0 && (
              <div
                className="bg-danger text-white position-absolute rounded-circle text-center"
                style={{
                  top: "5px",
                  right: "3px",
                  width: "fitContent",
                  fontSize: notif > 1 ? "8px" : "10px",
                  padding: "2px 7px",
                }}
              >
                {notif}
              </div>
            )}
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
            {/* <SimpleBar style={{ maxHeight: "300px" }}>
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
            </SimpleBar> */}
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
                src={
                  doesEmployeeHaveAPhoto?.length > 0
                    ? doesEmployeeHaveAPhoto[0]?.photo
                    : photo
                }
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
            <Dropdown.Item eventKey="2" className="w-100 h-100">
              <Link to="/profile" className="w-100 h-100 link-menu-navbar">
                <i className="fe fe-user me-2"></i> Profile
              </Link>
            </Dropdown.Item>
            {/* <Dropdown.Divider /> */}
            <Dropdown.Item eventKey="2" className="w-100 h-100">
              <Link to="/rnr" className="w-100 h-100 link-menu-navbar">
                <i className="fe fe-file me-2"></i> Role & Responsibility
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              className="mb-3 w-100 h-100 link-menu-navbar"
              onClick={handleLogout}
            >
              <i className="fe fe-power me-2"></i> Sign Out
            </Dropdown.Item>
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
        className={`navbar p-2 navbar-default py-1 ${className} ${
          isEzone && "w-100"
        }`}
        style={{
          position: isEzone && "fixed",
          top: isEzone && "0",
          zIndex: "9",
        }}
      >
        <Container fluid className="px-0 ps-2 ">
          <Navbar.Brand
            as={Link}
            to="/"
            target="_top"
            className="d-flex align-items-center"
          >
            <Image src={Logo} alt="" height={50} />
            <Image
              src={logoSectionImg}
              alt=""
              height={logoSize}
              className="ms-2"
            />
          </Navbar.Brand>
          {isHome && isLaptop && (
            <>
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
            </>
          )}
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
            {isHome && !isLaptop ? (
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
            ) : (
              <div className="mt-3 mt-lg-0 ms-lg-3 d-flex align-items-center"></div>
            )}

            <Nav>
              {navs?.map((data, index) => {
                return (
                  <>
                    {/* {data?.title === "E-University" ? (
                      <>
                        <EUnivDropdownMenu data={data} />
                      </>
                    ) : ( */}
                    <Nav.Link
                      key={index}
                      as={Link}
                      to={data?.link}
                      className={`navbar-home-link ps-4`}
                    >
                      <p
                        className={`mb-0 pb-1 ${
                          (location === data?.link ||
                            (data?.link === "/self-service" &&
                              locationSplitted[1] === "self-service") ||
                            (data?.link === "/help" &&
                              locationSplitted[1] === "help")) &&
                          " text-primary"
                        }`}
                        style={{
                          borderBottom:
                            (location === data?.link ||
                              (data?.link === "/self-service" &&
                                locationSplitted[1] === "self-service") ||
                              (data?.link === "/help" &&
                                locationSplitted[1] === "help")) &&
                            "2px solid #2642CA",
                        }}
                      >
                        {data?.title}
                      </p>
                    </Nav.Link>
                    {/* )} */}
                  </>
                );
              })}
            </Nav>
            {isHome &&
              ["", "", "", "", "", "", ""]?.map((data) => <div>{data}</div>)}

            {/* Search Form */}

            {/* Right side quick / shortcut menu  */}
            <div className={`d-flex align-items-center my-3 my-lg-0`}>
              {!isHome && (
                <Link to="/" className="d-flex align-items-center me-2">
                  <Button
                    variant="outline-primary px-2 py-1"
                    style={{ maxHeight: "fit-content" }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Icon path={homeIcon} size={0.8} />
                      <p
                        className="mb-0 ms-1"
                        style={{ fontSize: "14px", fontWeight: "500" }}
                      >
                        Back Homepage
                      </p>
                    </div>
                  </Button>
                </Link>
              )}
              <div className="navbar-nav navbar-right-wrap d-flex nav-top-wrap">
                <span
                  className={`${isDesktop || isLaptop ? "d-flex" : "d-none"}`}
                >
                  <QuickMenu />
                </span>
              </div>
            </div>
            {isEzone && !isLaptop && (
              <>
                <ul
                  className="mb-3 px-3 mt-2 pt-3 border-top top-content"
                  style={{ listStyleType: "none" }}
                >
                  {navLeftCustom?.map((data, idData) => {
                    return (
                      <li key={idData} className="mt-2">
                        <Link
                          to={data?.link}
                          className="nav-content-bttn open-font d-flex align-items-center text-secondary px-0"
                          style={{
                            fontWeight: "500",
                            background:
                              (location === data?.link ||
                                (data?.link === "/ezone/community" &&
                                  window.location.pathname ===
                                    `/ezone/community/${id}`) ||
                                (data?.link === "/ezone/ilead/diagnostic" &&
                                  (window.location.pathname ===
                                    "/ezone/ilead/room" ||
                                    window.location.pathname ===
                                      "/ezone/ilead/insight" ||
                                    window.location.pathname ===
                                      "/ezone/ilead/insight/detail"))) &&
                              "rgba(217, 217, 217, .5)",
                            borderRadius: "30px",
                          }}
                        >
                          <i
                            className={`feather-tv btn-round-md me-3 d-flex align-items-center justify-content-center ${
                              data?.title === "ILEAD News"
                                ? "bg-red-gradiant"
                                : data?.title === "Erajaya Communities"
                                ? "bg-light-blue-gradiant"
                                : data?.title === "ILEAD Zone"
                                ? "bg-yellow-gradiant"
                                : "bg-blue-gradiant"
                            }`}
                          >
                            <div className="text-white d-flex align-items-center justify-content-center">
                              {data?.icon}
                            </div>
                          </i>
                          <span>{data?.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            {/* end of right side quick / shortcut menu  */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

NewNavbar.propTypes = {
  bg: PropTypes.string,
  className: PropTypes.string,
};

NewNavbar.defaultProps = {
  bg: "dark",
  className: "",
};

export default NewNavbar;
