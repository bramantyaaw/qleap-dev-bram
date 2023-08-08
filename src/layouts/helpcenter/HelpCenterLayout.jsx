// import node module libraries
import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FooterWithLinks from "../footers/Footer";
import NavbarHelpCenter from "../navbars/NavbarHelpCenter";
import NewNavbar from "../navbars/NewNavbar";
import logoEService from "../../assets/ezone/images/svg/logo-header-eservice.svg";

const HelpCenterLayout = (props) => {
  useEffect(() => {
    document.body.style.backgroundColor = "white";
  });

  const navs = [
    { title: "Help Center", link: "/help" },
    { title: "Self Service", link: "/self-service" },
    // { title: "My Submission", link: "/overview" },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <Fragment>
      {/* {location.pathname === "/help" ||
      location.pathname === "/self-service" ? (
        <NavbarHelpCenter
          // bg="transparent"
          // className="navbar-transparent bg-colors-gradient"
          className="bg-colors-gradient w-100"
        />
      ) : (
        // <NavbarHelpCenter className="navbar-transparent bg-colors-default" />
        <NavbarHelpCenter className="bg-colors-default" />
      )} */}
      <NewNavbar navs={navs} logoSectionImg={logoEService} logoSize={13} />
      {props.children}
      <FooterWithLinks />
    </Fragment>
  );
};

export default HelpCenterLayout;
