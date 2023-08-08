// import node module libraries
import React, { useState, useEffect } from "react";
import HeaderDefault from "../navbars/HeaderDefault";
import NavbarVertical from "../navbars/NavbarVertical";
import Footer from "../footers/Footer";
// import sub components
const EdigitalLayout = (props) => {
  const { children, className, overflowHidden, withoutFooter, withoutNavbar } =
    props;
  const [showMenu, setShowMenu] = useState(true);
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };
  useEffect(() => {
    document.body.style.backgroundColor = "#f5f4f8";
  });
  return (
    <>
      <div>
        <div
          id="db-wrapper"
          className={`${overflowHidden ? "chat-layout" : ""} ${
            showMenu ? "" : "toggled"
          }  bg-wrapper`}
        >
          <div className="navbar-vertical navbar">
            <NavbarVertical
              showMenu={showMenu}
              onClick={(value) => setShowMenu(value)}
            />
          </div>
          <div id="page-content">
            {withoutNavbar ? null : (
              <div className="header">
                <HeaderDefault
                  data={{
                    showMenu: showMenu,
                    SidebarToggleMenu: ToggleMenu,
                  }}
                />
              </div>
            )}
            <div
              className={`container-fluid ${className ? className : "p-4"}`}
              style={{ minHeight: "100vh" }}
            >
              {children}
              {/* <Test /> */}
              {withoutFooter ? null : <Footer />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EdigitalLayout;
