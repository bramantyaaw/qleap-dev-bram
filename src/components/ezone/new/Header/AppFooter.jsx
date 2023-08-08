import React, { Component } from "react";
import { Link } from "react-router-dom";

class AppFooter extends Component {
  render() {
    return (
      <div className="app-footer border-0 shadow-lg bg-primary-gradiant">
        <Link to="/ezone" className="nav-content-bttn nav-center">
          <i className="feather-home"></i>
        </Link>
        <Link to="/defaultvideo" className="nav-content-bttn">
          <i className="feather-package"></i>
        </Link>
        <Link to="/defaultlive" className="nav-content-bttn" data-tab="chats">
          <i className="feather-layout"></i>
        </Link>
        <Link to="/shop2" className="nav-content-bttn">
          <i className="feather-layers"></i>
        </Link>
        <Link to="/defaultsettings" className="nav-content-bttn"></Link>
      </div>
    );
  }
}

export default AppFooter;
