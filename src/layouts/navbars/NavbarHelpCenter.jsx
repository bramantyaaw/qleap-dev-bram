// import node module libraries
import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Image, Navbar, Nav, Container } from "react-bootstrap";
import PropTypes from "prop-types";

// import media files
import Logo from "../../assets/images/logo/qleap_white.svg";
import navs from "../../routes/HelpCenterRoutes";
import { useMediaQuery } from "react-responsive";

const NavbarHelpCenter = ({ bg, className }) => {
  const location = useLocation();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [expandedMenu, setExpandedMenu] = useState(false);

  const navbarItems = (data, index) => {
    if (location.pathname === data.link) {
      return (
        <>
          <u>{data.title}</u>
        </>
      );
    } else {
      return <>{data.title}</>;
    }
  };

  const QuickMenu = () => {
    return (
      <Fragment>
        {location.pathname === "/help" && (
          <div className="ms-auto d-flex align-items-center">
            <Link
              to="/my-submission/ticket/create"
              className="btn btn-light d-md-block blue-font p-2 px-3"
            >
              Submit Ticket
            </Link>
          </div>
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Navbar
        bg={bg}
        onToggle={(collapsed) => setExpandedMenu(collapsed)}
        expanded={expandedMenu}
        expand="lg"
        className={`navbar p-2 navbar-default py-1 ${className}`}
      >
        <Container className="px-0 pb-0">
          {/* <div className="d-flex align-items-center"> */}
          <Navbar.Brand
            as={Link}
            to="/"
            // className={bg === "dark" ? "text-inverse" : ""}
          >
            <Image src={Logo} height={50} alt="" />
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
          <Navbar.Collapse id="basic-navbar-nav" className="navbar-home">
            <Nav>
              {navs?.map((data, index) => {
                return (
                  <div
                    className={`text-white justify-content-between d-flex mx-2`}
                    key={index}
                  >
                    {isLaptop && <div className={`vr bg-light`}></div>}
                    <Nav.Link
                      to={data.link}
                      as={Link}
                      className={`ps-0 ps-lg-3 d-flex align-items-center text-inherit text-decoration-none fs-5 text-white font-weight-bold navbar-home-link`}
                    >
                      {navbarItems(data, index)}
                    </Nav.Link>
                  </div>
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
          </Navbar.Collapse>
          {/* </div> */}
        </Container>
      </Navbar>
    </Fragment>
  );
};

NavbarHelpCenter.propTypes = {
  bg: PropTypes.string,
  className: PropTypes.string,
};

NavbarHelpCenter.defaultProps = {
  bg: "dark",
  className: "",
};

export default NavbarHelpCenter;
