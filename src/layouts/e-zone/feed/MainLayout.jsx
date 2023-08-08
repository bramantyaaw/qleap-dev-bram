import { Fragment, useEffect } from "react";
import MainNavbar from "/src/components/ezone/navbar/MainNavbar";

function MainLayout(props) {
  return (
    <Fragment>
      <MainNavbar bg="transparent" className="navbar-transparent" />

      {props.children}
      {/* <Footer /> */}
    </Fragment>
  );
}

export default MainLayout;
