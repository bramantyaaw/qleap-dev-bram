import React, { Fragment } from "react";
import { Card, Col, Container, Nav, Navbar, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeadingBriefinfo from "../../components/components/marketing/common/page-headings/PageHeadingBriefinfo";
import logo from "../../assets/images/icon/euniv-logo.svg";
import EUnivMenu from "../../components/components/dashboard/e-univ/EUnivMenu";
import { newRoutes } from "../../routes/EUnivRoutes";
import { SpecialTask } from "../../components/components/dashboard/e-univ/new-euniv/process/SpecialTask";
import { LastProgram } from "../../components/components/dashboard/e-univ/new-euniv/process/LastProgram";
import Footer from "../footers/Footer";

export const NewLearningLayout = (props) => {
  return (
    <Fragment>
      <div className="p-4 bg-wrapper">
        <Container fluid className="d-flex justify-content-center">
          <Row>
            <Col lg={3} md={3} sm={12}>
              {/* <Navbar
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
                  <Nav className="me-auto flex-column" as="ul" activeKey="0">
                    <Nav.Item className="navbar-header" as="li">
                      <Image src={logo} className="pb-2" alt="" />
                    </Nav.Item>

                    <EUnivMenu data={newRoutes} />
                  </Nav>
                </Navbar.Collapse>
              </Navbar> */}
              <SpecialTask />
              <LastProgram />
            </Col>

            <Col lg={9} md={8} sm={12} className="p-0">
              {props.children}
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};
