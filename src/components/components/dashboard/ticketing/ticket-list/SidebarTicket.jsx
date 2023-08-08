import React from "react";
import { Col, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoTicketOutline as TicketIcon } from "react-icons/io5";
import Icon from "@mdi/react";
import {
  mdiChartBoxOutline as OverviewIcon,
  mdiApplicationImport as SelfServiceIcon,
} from "@mdi/js";

import { DashboardMenu } from "./DashboardMenu";

const SidebarTicket = () => {
  const linkIcon = (item) => {
    switch (item.icon) {
      case "overview":
        return (
          <Nav.Item
            as="li"
            className={`${
              item.link === window.location.pathname ? "active" : ""
            }`}
          >
            <Link className="nav-link" to={item.link}>
              <Icon
                path={OverviewIcon}
                size={0.6}
                className="me-2 icon-ticket-overview"
              />
              {item.title}
            </Link>
          </Nav.Item>
        );
      case "self-service":
        return (
          <Nav.Item
            as="li"
            className={`${
              item.link === window.location.pathname ? "active" : ""
            }  `}
          >
            <Link className="nav-link" to={item.link}>
              <Icon
                path={SelfServiceIcon}
                size={0.5}
                className="me-2 icon-ticket-service"
              />
              {item.title}
            </Link>
          </Nav.Item>
        );
      case "ticket":
        return (
          <Nav.Item
            as="li"
            className={`${
              item.link === window.location.pathname ? "active" : ""
            }`}
          >
            <Link className="nav-link" to={item.link}>
              <TicketIcon className="me-2 icon-ticket-overview" />
              {item.title}
            </Link>
          </Nav.Item>
        );
      default:
        return <></>;
    }
  };

  return (
    <Col lg={3} md={4} sm={12} className="sidebar-ticket">
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
              Dashboard
            </Nav.Item>
            {DashboardMenu.map((item, index) => (
              <div key={index}>{linkIcon(item, index)}</div>
            ))}
            {/* {DashboardMenu.map((item, index) => (
              <Nav.Item
                as="li"
                key={index}
                className={`${item.link === location.pathname ? "active" : ""}`}
              >
                {linkIcon(item.icon, item.link)}
                <Link   className="nav-link" to={item.link}>
                  <i className={`fe fe-${item.icon} nav-icon`}></i>
                  {item.title}
                </Link>
              </Nav.Item>
            ))} */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Col>
  );
};

export default SidebarTicket;
