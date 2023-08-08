// import node module libraries
import { Fragment, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import {
  ListGroup,
  Accordion,
  Card,
  Image,
  Badge,
  useAccordionButton,
  AccordionContext,
} from "react-bootstrap";
import {
  // mdiToolboxOutline,
  mdiViewGridPlusOutline,
  mdiAccountGroupOutline,
  mdiViewDashboardVariantOutline,
  mdiAccountArrowUpOutline,
  mdiFileDocumentCheckOutline,
  mdiFileDocumentArrowRightOutline,
} from "@mdi/js";
import Icon from "@mdi/react";

// import simple bar scrolling used for notification item scrolling
import SimpleBar from "simplebar-react";
import Logo from "../../assets/images/svg/e-univ-edigital-icon.svg";
import Footer from "../footers/Footer";

const NavbarVertical = (props) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [dept, setDept] = useState(localStorage.getItem("sub_dept"));
  // const [level, setLevel] = useState(localStorage.getItem("level"));

  const [totalBadge, setTotalBadge] = useState(0);
  const [count, setCount] = useState("");

  // let levelInt = parseInt(level);

  const location = useLocation();

  const objTalentDash =
    uid === "ID0106789" || uid === "ID0003113" || uid === "ID0038007"
      ? {
          id: uuid(),
          title: "Talent Dashboard ",
          icon: (
            <Icon
              path={mdiAccountArrowUpOutline}
              className="nav-icon me-2"
              size={0.8}
            />
          ),
          link: "/talent-dashboard",
        }
      : null;

  const EdigitalMenu = [
    {
      id: uuid(),
      title: "Analytic",
      grouptitle: true,
    },
    {
      id: uuid(),
      title: "Managerial",
      icon: (
        <Icon
          path={mdiViewDashboardVariantOutline}
          className="nav-icon me-2"
          size={0.8}
        />
      ),
      link: "/managerial",
    },
    objTalentDash,
    {
      id: uuid(),
      title: "Function",
      grouptitle: true,
    },
    {
      id: uuid(),
      title: "Main Desk",
      icon: (
        <Icon
          path={mdiViewGridPlusOutline}
          className="nav-icon me-2"
          size={0.8}
        />
      ),
      badge: totalBadge,
      badgecolor: "success",
      link: "/main-desk",
    },
    // {
    //   id: uuid(),
    //   title: "Roles & Responsibility",
    //   icon: (
    //     <Icon path={mdiToolboxOutline} className="nav-icon me-2" size={0.8} />
    //   ),
    //   link: "/edigital/rnr",
    // },
    // {
    //   id: uuid(),
    //   title: "Dashboard",
    //   icon: (
    //     <Icon path={mdiViewGridOutline} className="nav-icon me-2" size={0.8} />
    //   ),
    //   link: "#",
    // },
    {
      id: uuid(),
      title: "Team ",
      grouptitle: true,
    },
    {
      id: uuid(),
      title: "My Team",
      icon: (
        <Icon
          path={mdiAccountGroupOutline}
          className="nav-icon me-2"
          size={0.8}
        />
      ),
      link: "/myteam",
    },
    {
      id: uuid(),
      title: "Submission",
      icon: (
        <Icon
          path={mdiFileDocumentArrowRightOutline}
          className="nav-icon me-2"
          size={0.8}
        />
      ),
      badge: count?.count_submission,
      badgecolor: "success",
      link: "/submission",
    },
    {
      id: uuid(),
      title: "Approval",
      icon: (
        <Icon
          path={mdiFileDocumentCheckOutline}
          className="nav-icon me-2"
          size={0.8}
        />
      ),
      badge: count?.count_approval,
      badgecolor: "success",
      link: "/approval",
    },
  ];

  const fetchPermissionsList = async () => {
    try {
      await axios
        .post(
          "/main-desk/get-data",
          {
            uid: uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            const newData = res?.data?.data?.total_badge;
            setTotalBadge(newData);
          } else {
            return res;
          }
        });
    } catch (e) {
      return e;
    }
  };

  const fetchBadgeCount = async () => {
    try {
      await axios
        .post(
          "/team/count-approval",
          {
            uid: uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            const newData = res?.data?.data;
            setCount(newData);
          } else {
            return res;
          }
        });
    } catch (e) {
      return e;
    }
  };

  const CustomToggle = ({ children, eventKey, icon }) => {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("Event Key : " + eventKey)
    );
    const isCurrentEventKey = activeEventKey === eventKey;

    return (
      <li className="nav-item">
        <Link
          className="nav-link "
          onClick={decoratedOnClick}
          to="#!"
          data-bs-toggle="collapse"
          data-bs-target="#navDashboard"
          aria-expanded={isCurrentEventKey ? true : false}
          aria-controls="navDashboard"
        >
          {icon ? <i className={`nav-icon fe fe-${icon} me-2`}></i> : ""}{" "}
          {children}
        </Link>
      </li>
    );
  };

  const generateLink = (item) => {
    return (
      <Link
        className={`nav-link ${
          location.pathname === item.link ? "active" : ""
        }`}
        to={item.link}
        onClick={(e) =>
          isMobile ? props.onClick(!props.showMenu) : props.showMenu
        }
      >
        {item.name}
        {""}
        {item.badge ? (
          <Badge
            className="ms-1"
            bg={item.badgecolor ? item.badgecolor : "primary"}
          >
            {item.badge}
          </Badge>
        ) : (
          ""
        )}
      </Link>
    );
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
    setToken(localStorage.getItem("access_token"));
    setDept(localStorage.getItem("sub_dept"));
    // setLevel(localStorage.getItem("level"));
    // eslint-disable-next-line
  }, [localStorage]);

  useEffect(() => {
    fetchPermissionsList();
    fetchBadgeCount();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <SimpleBar style={{ maxHeight: "100vh" }}>
        <div className="nav-scroller">
          <Link className="d-flex justify-content-center mt-1" to="/">
            <Image src={Logo} alt="" className="logo-navbar-vertical" />
          </Link>
          <div className="pb-1 mx-4  mb-2">
            <h5 className="text-white">{dept}</h5>
          </div>
          {/* </Link> */}
        </div>
        {/* Dashboard Menu */}
        <Accordion
          defaultActiveKey="0"
          as="ul"
          className="navbar-nav flex-column"
        >
          {EdigitalMenu.map(function (menu, index) {
            if (menu?.grouptitle) {
              return (
                <Card bsPrefix="nav-item" key={index}>
                  {/* group title item */}
                  <div className="navbar-heading">{menu?.title}</div>
                  {/* end of group title item */}
                </Card>
              );
            } else {
              if (menu?.children) {
                return (
                  <Fragment key={index}>
                    {/* main menu / menu level 1 / root items */}
                    <CustomToggle eventKey={menu?.id} icon={menu?.icon}>
                      {menu?.title}
                      {menu?.badge ? (
                        <Badge
                          className="ms-1"
                          bg={menu?.badgecolor ? menu?.badgecolor : "primary"}
                        >
                          {menu?.badge}
                        </Badge>
                      ) : (
                        ""
                      )}
                    </CustomToggle>
                    <Accordion.Collapse
                      eventKey={menu?.id}
                      as="li"
                      bsPrefix="nav-item"
                    >
                      <Accordion className="navbar-nav flex-column" as="ul">
                        <ListGroup
                          as="ul"
                          bsPrefix=""
                          className="nav flex-column"
                        >
                          {menu?.children.map(function (
                            menuItem,
                            menuItemIndex
                          ) {
                            if (menuItem?.children) {
                              return (
                                <Fragment key={menuItemIndex}>
                                  {/* second level with children */}
                                  <CustomToggle eventKey={menuItem?.id}>
                                    {menuItem?.title}
                                    {menuItem?.badge ? (
                                      <Badge
                                        className="ms-1"
                                        bg={
                                          menuItem?.badgecolor
                                            ? menuItem?.badgecolor
                                            : "primary"
                                        }
                                      >
                                        {menuItem?.badge}
                                      </Badge>
                                    ) : (
                                      ""
                                    )}
                                  </CustomToggle>
                                  <Accordion.Collapse
                                    eventKey={menuItem?.id}
                                    bsPrefix="nav-item"
                                    as="li"
                                  >
                                    <Accordion
                                      className="navbar-nav flex-column"
                                      as="ul"
                                    >
                                      <ListGroup
                                        as="ul"
                                        bsPrefix=""
                                        className="nav flex-column"
                                      >
                                        {/* third level menu started  */}
                                        {menuItem?.children?.map(function (
                                          subMenuItem,
                                          subMenuItemIndex
                                        ) {
                                          return subMenuItem?.children ? (
                                            <Fragment key={subMenuItemIndex}>
                                              <CustomToggle
                                                eventKey={subMenuItem?.id}
                                              >
                                                {subMenuItem?.title}
                                                {subMenuItem?.badge ? (
                                                  <Badge
                                                    className="ms-1"
                                                    bg={
                                                      subMenuItem?.badgecolor
                                                        ? subMenuItem?.badgecolor
                                                        : "primary"
                                                    }
                                                  >
                                                    {subMenuItem?.badge}
                                                  </Badge>
                                                ) : (
                                                  ""
                                                )}
                                              </CustomToggle>
                                              <Accordion.Collapse
                                                eventKey={subMenuItem?.id}
                                                bsPrefix="nav-item"
                                                as="li"
                                              >
                                                <ListGroup
                                                  as="ul"
                                                  bsPrefix=""
                                                  className="nav flex-column"
                                                >
                                                  {subMenuItem?.children?.map(
                                                    function (
                                                      thirdLevelItem,
                                                      thirdLevelItemIndex
                                                    ) {
                                                      return (
                                                        <ListGroup.Item
                                                          key={
                                                            thirdLevelItemIndex
                                                          }
                                                          as="li"
                                                          bsPrefix="nav-item"
                                                        >
                                                          {/* third level with children */}
                                                          {generateLink(
                                                            thirdLevelItem
                                                          )}
                                                        </ListGroup.Item>
                                                      );
                                                    }
                                                  )}
                                                </ListGroup>
                                              </Accordion.Collapse>
                                            </Fragment>
                                          ) : (
                                            <ListGroup.Item
                                              key={subMenuItemIndex}
                                              as="li"
                                              bsPrefix="nav-item"
                                            >
                                              {/* third level without children */}
                                              {generateLink(subMenuItem)}
                                            </ListGroup.Item>
                                          );
                                        })}
                                        {/* end of third level menu  */}
                                      </ListGroup>
                                    </Accordion>
                                  </Accordion.Collapse>
                                  {/* end of second level with children */}
                                </Fragment>
                              );
                            } else {
                              return (
                                <ListGroup.Item
                                  as="li"
                                  bsPrefix="nav-item"
                                  key={menuItemIndex}
                                >
                                  {/* second level without children */}
                                  {generateLink(menuItem)}
                                  {/* end of second level without children  */}
                                </ListGroup.Item>
                              );
                            }
                          })}
                        </ListGroup>
                      </Accordion>
                    </Accordion.Collapse>
                    {/* end of main menu / menu level 1 / root items */}
                  </Fragment>
                );
              } else {
                return (
                  <Card bsPrefix="nav-item" key={index}>
                    {/* menu item without any childern items like Help Center, Documentation and Changelog items*/}
                    <Link
                      to={menu?.link}
                      className={`nav-link ${
                        menu?.link !== "#" &&
                        location.pathname.includes(menu?.link)
                          ? "active"
                          : ""
                      }`}
                    >
                      {typeof menu?.icon === "string" ? (
                        <i className={`nav-icon fe fe-${menu?.icon} me-2`}></i>
                      ) : (
                        menu?.icon
                      )}
                      {menu?.title}
                      {menu?.badge ? (
                        <Badge
                          className="ms-1"
                          bg={menu?.badgecolor ? menu?.badgecolor : "primary"}
                        >
                          {menu?.badge}
                        </Badge>
                      ) : (
                        ""
                      )}
                    </Link>
                    {/* end of menu item without any childern items */}
                  </Card>
                );
              }
            }
          })}
        </Accordion>
        {/* end of Dashboard Menu */}
      </SimpleBar>
      {/* <Footer /> */}
    </Fragment>
  );
};
export default NavbarVertical;
