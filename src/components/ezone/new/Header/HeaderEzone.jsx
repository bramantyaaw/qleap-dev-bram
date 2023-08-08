import React, { Component, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiMagnify as SearchIcon,
  mdiWeb as YourPostIcon,
  mdiNewspaperVariantMultiple as NewsIcon,
  mdiForumOutline as CommunityIcon,
  mdiAccountFilter as ILeadIcon,
} from "@mdi/js";

import QleapIcon from "../../../../assets/images/logo/qleap-text.svg";
import { Image } from "react-bootstrap";

// import Darkbutton from "../components/Darkbutton";

const HeaderEzone = ({ withoutSidebar }) => {
  const navLeftCustom = [
    {
      link: "/ezone",
      title: "Kata Qleap",
      icon: <Icon path={YourPostIcon} size={1} />,
    },
    {
      link: "/ezone/news",
      title: "ILEAD News",
      icon: <Icon path={NewsIcon} size={1} />,
    },
    {
      link: "/ezone/community",
      title: "Erajaya Communities",
      icon: <Icon path={CommunityIcon} size={1} />,
    },
    {
      link: "/ezone/ilead/diagnostic",
      title: "ILEAD Zone",
      icon: <Icon path={ILeadIcon} size={1} />,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isNoti, setIsNoti] = useState(false);

  const [photoProfile, setPhotoProfile] = useState(
    localStorage.getItem("photo")
  );

  useEffect(() => {
    setPhotoProfile(localStorage.getItem("photo"));
  }, [localStorage]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const toggleisNoti = () => {
    setIsNoti(!isNoti);
  };

  return (
    <>
      {withoutSidebar ? (
        <div className="nav-header bg-white shadow-xs border-0 pe-0">
          <div className="nav-top bg-white h-100">
            <Link
              to="/"
              className="d-flex align-items-center justify-content-center h-100"
            >
              <img src={QleapIcon} alt="logo" height={50} />
            </Link>
            <Link
              to="/defaultmessage"
              className="mob-menu ms-auto me-2 chat-active-btn"
            >
              <i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-gray-300"></i>
            </Link>
            <Link to="/defaultvideo" className="mob-menu me-2">
              <i className="feather-video text-grey-900 font-sm btn-round-md bg-gray-300"></i>
            </Link>
            <span
              onClick={toggleActive}
              className="me-2 menu-search-icon mob-menu"
            >
              <i className="feather-search text-grey-900 font-sm btn-round-md bg-gray-300"></i>
            </span>
            <button
              onClick={toggleOpen}
              className={`nav-menu me-0 ms-2 ${isOpen ? " active" : ""}`}
            ></button>
            <form
              action="#"
              className="float-left header-search ms-3 position-relative"
            >
              <div className="form-group mb-0 icon-input">
                <i
                  className=" font-sm text-grey-400 position-absolute"
                  style={{ top: "0", left: "15px" }}
                >
                  <Icon path={SearchIcon} size={0.9} />
                </i>
                <input
                  type="text"
                  placeholder="Start typing to search.."
                  className="bg-gray-200 border-0 lh-32 py-2 px-7 h6 mb-0 wc-350"
                  style={{ borderRadius: "40px" }}
                />
              </div>
            </form>
          </div>

          <div className="d-flex">
            <NavLink
              activeClassName="active"
              to="/ezone"
              className="p-2 text-center ms-3 menu-icon center-menu-icon"
            >
              {/* <i className="feather-video font-lg bg-gray-200 btn-round-lg text-grey-500 "></i> */}
              <p className="mb-0 text-black" style={{ fontWeight: "500" }}>
                Feed
              </p>
            </NavLink>
            <NavLink
              activeClassName="active"
              to="/ezone/story"
              className="p-2 text-center ms-0 menu-icon center-menu-icon"
            >
              {/* <i className="feather-video font-lg bg-gray-200 btn-round-lg text-grey-500 "></i> */}
              <p className="mb-0 text-black" style={{ fontWeight: "500" }}>
                Employees
              </p>
            </NavLink>

            <NavLink
              activeClassName="active"
              to="/ezone/community"
              className="p-2 text-center ms-0 menu-icon center-menu-icon"
            >
              {/* <i className="feather-user font-lg bg-gray-200 btn-round-lg text-grey-500 "></i> */}
              <p className="mb-0 text-black" style={{ fontWeight: "500" }}>
                Event
              </p>
            </NavLink>
            <NavLink
              activeClassName="active"
              to="/shop2"
              className="p-2 text-center ms-0 menu-icon center-menu-icon"
            >
              {/* <i className="feather-shopping-bag font-lg bg-gray-200 btn-round-lg text-grey-500 "></i> */}
              <p className="mb-0 text-black" style={{ fontWeight: "500" }}>
                Publication
              </p>
            </NavLink>
            {/* </div> */}
            <Link to="/" className="p-0 ms-3 menu-icon float-right">
              <div className="avatar avatar-md avatar-indicators avatar-online">
                <Image
                  alt="avatar"
                  src={photoProfile}
                  className="rounded-circle"
                  // height={50}
                  width={90}
                />
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="nav-header bg-white shadow-xs border-0">
          <div className="nav-top bg-white h-100">
            <Link
              to="/"
              className="d-flex align-items-center justify-content-center h-100"
            >
              <img src={QleapIcon} alt="logo" height={50} />
            </Link>
            <Link
              to="/defaultmessage"
              className="mob-menu ms-auto me-2 chat-active-btn"
            >
              <i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-gray-300"></i>
            </Link>
            <Link to="/defaultvideo" className="mob-menu me-2">
              <i className="feather-video text-grey-900 font-sm btn-round-md bg-gray-300"></i>
            </Link>
            <span
              onClick={toggleActive}
              className="me-2 menu-search-icon mob-menu"
            >
              <i className="feather-search text-grey-900 font-sm btn-round-md bg-gray-300"></i>
            </span>
            <button
              onClick={toggleOpen}
              className={`nav-menu me-0 ms-2 ${isOpen ? " active" : ""}`}
            ></button>
            <form
              action="#"
              className="float-left header-search ms-3 position-relative"
            >
              <div className="form-group mb-0 icon-input">
                <i
                  className=" font-sm text-grey-400 position-absolute"
                  style={{ top: "0", left: "15px" }}
                >
                  <Icon path={SearchIcon} size={0.9} />
                </i>
                <input
                  type="text"
                  placeholder="Start typing to search.."
                  className="bg-gray-200 border-0 lh-32 py-2 px-7 h6 mb-0 wc-350"
                  style={{ borderRadius: "40px" }}
                />
              </div>
            </form>
          </div>

          <div>
            <div className="d-flex">
              <NavLink
                activeClassName="active"
                to="/ezone"
                className="p-2 text-center ms-3 menu-icon center-menu-icon"
              >
                <p className="mb-0 text-black" style={{ fontWeight: "500" }}>
                  Feed
                </p>
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/ezone/story"
                className="p-2 text-center ms-0 menu-icon center-menu-icon"
              >
                <p className="mb-0 text-black" style={{ fontWeight: "500" }}>
                  Employees
                </p>
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/ezone/community"
                className="p-2 text-center ms-0 menu-icon center-menu-icon"
              >
                <p className="mb-0 text-black" style={{ fontWeight: "500" }}>
                  Event
                </p>
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/shop2"
                className="p-2 text-center ms-0 menu-icon center-menu-icon"
              >
                {/* <i className="feather-shopping-bag font-lg bg-gray-200 btn-round-lg text-grey-500 "></i> */}
                <p className="mb-0 text-black" style={{ fontWeight: "500" }}>
                  Publication
                </p>
              </NavLink>
              {/* </div> */}
              <Link to="/" className="p-0 ms-3 menu-icon float-right">
                {/* <img src={ImgIcon} alt="user" className="w40 mt--1" /> */}
                <div className="avatar avatar-md avatar-indicators avatar-online">
                  <Image
                    alt="avatar"
                    src={photoProfile}
                    className="rounded-circle"
                    // height={50}
                    width={90}
                  />
                </div>
              </Link>
            </div>
          </div>

          <nav
            className={`navigation scroll-bar ${isOpen ? " nav-active" : ""}`}
          >
            <div className="container ps-0 pe-0">
              <div className="nav-content">
                <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pb-1 mb-2">
                  <ul className="mb-1 top-content py-2">
                    {navLeftCustom?.map((data, id) => {
                      return (
                        <li key={id} className="mt-2">
                          <Link
                            to={data?.link}
                            className="nav-content-bttn open-font"
                          >
                            <i
                              className={`feather-tv btn-round-md me-3 d-flex align-items-center justify-content-center ${
                                data?.title === "ILEAD News"
                                  ? "bg-red-gradiant"
                                  : data?.title === "Erajaya Communities"
                                  ? "bg-gold-gradiant"
                                  : data?.title === "ILEAD Zone"
                                  ? "bg-primary-gradiant"
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
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default HeaderEzone;
