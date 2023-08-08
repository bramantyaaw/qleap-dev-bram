import { Fragment, useEffect } from "react";
import { Menu, Search } from "react-feather";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Nav,
  Navbar,
  InputGroup,
  Dropdown,
  Form,
  ListGroup,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Image,
} from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiBellOutline as notifIcon } from "@mdi/js";

import SimpleBar from "simplebar-react";
import DotBadge from "../../components/components/elements/bootstrap/DotBadge";
import NotificationList from "../../data/Notification";
import { LogoutEmail } from "../../redux/action/authAction";
import {
  profileAction,
  LogoutProfile,
  getEmployeePhoto,
} from "../../redux/action/profileAction";
import { clearEPCN } from "../../redux/action/epcnAction";

const HeaderDefault = (props) => {
  const photo = localStorage.getItem("photo");
  const token = localStorage.getItem("access_token");
  const uid = localStorage.getItem("uid");

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
  }, []);

  const notif = 0;

  return (
    <Fragment>
      <Navbar expanded="lg" className="navbar-default">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Link
              id="nav-toggle"
              to="#"
              onClick={() => props.data.SidebarToggleMenu(!props.data.showMenu)}
            >
              <Menu size="18px" />
            </Link>
            <div className="ms-lg-3 d-none d-md-none d-lg-block">
              {/* <!-- Form --> */}
              <Form className=" d-flex align-items-center">
                <InputGroup
                  className="input-group-merge search-bar"
                  bsPrefix="group-of-input"
                >
                  <InputGroup.Text className="ps-2 pe-1 mx-2 my-1 h-40 position-absolute search-icon border-0">
                    <Search size="12px" className="text-secondary" />
                  </InputGroup.Text>
                  <Form.Control
                    type="search"
                    className="form-control form-control-sm ps-6"
                    placeholder="Search Entire Dashboard"
                  />
                </InputGroup>
              </Form>
            </div>
          </div>

          <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex align-items-center nav-top-wrap">
            <Dropdown as={Nav.Item}>
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
                    {NotificationList.map(function (item, index) {
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
                </SimpleBar> */}
                <div className="border-top px-3 pt-3 pb-3">
                  <Link
                    // to="/authentication/notifications"
                    to="#"
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
                    height={50}
                  />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu
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

                <Dropdown.Item eventKey="2" className="w-100 h-100">
                  <Link to="/rnr" className="w-100 h-100 link-menu-navbar">
                    <i className="fe fe-file me-2"></i> Role & Responsibility
                  </Link>
                </Dropdown.Item>
                {/* <Dropdown.Item eventKey="3">
                  <i className="fe fe-star me-2"></i> Subscription
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className="fe fe-settings me-2"></i> Settings
                </Dropdown.Item> */}
                <Dropdown.Divider />
                <Dropdown.Item className="mb-3" onClick={handleLogout}>
                  <i className="fe fe-power me-2"></i> Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Navbar>
    </Fragment>
  );
};

export default HeaderDefault;
