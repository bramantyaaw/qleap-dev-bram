// import node module libraries
import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../layouts/footers/Footer";
import MainNavbar from "../../layouts/navbars/MainNavbar";
import NewNavbar from "../navbars/NewNavbar";

const MainLayout = (props) => {
  useEffect(() => {
    document.body.style.backgroundColor = "white";
  });

  const navs = [
    { title: "E-University", link: "/e-univ" },
    { title: "E-Service", link: "/help" },
    { title: "E-Digital", link: "/main-desk" },
    { title: "E-Zone", link: "/ezone" },
  ];

  return (
    <Fragment>
      {/* {location?.pathname === '/' ? (
				<MainNavbar bg="transparent" className="navbar-transparent bg-colors-gradient" />
			) : (
				<MainNavbar className="navbar-transparent bg-colors-default" />
			)} */}
      {/* <MainNavbar className="navbar-transparent bg-colors-default" /> */}
      {/* <MainNavbar bg="transparent" className="navbar-transparent" /> */}
      <NewNavbar
        isHome={true}
        bg="transparent"
        className="navbar-transparent"
        navs={navs}
      />

      {props.children}

      <Footer />
    </Fragment>
  );
};

export default MainLayout;
