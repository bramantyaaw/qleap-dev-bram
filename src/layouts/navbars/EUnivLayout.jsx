import React, { useEffect } from "react";
import NewNavbar from "./NewNavbar";
import Footer from "../footers/Footer";
import LogoEUniv from "../../assets/ezone/images/svg/logo-header-euniv.svg";

const EUnivLayout = ({ logoSectionImg, logoSize, children }) => {
  const navs = [
    { title: "Landings", link: "/e-univ" },
    { title: "Learning", link: "/e-univ/learning" },
    { title: "Development", link: "/e-univ/development" },
    { title: "ELTV Channel", link: "/e-univ/eltv" },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <NewNavbar navs={navs} logoSectionImg={LogoEUniv} logoSize={20} />
      {children}
      <Footer />
    </>
  );
};

export default EUnivLayout;
