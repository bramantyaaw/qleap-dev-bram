import { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Card,
  Navbar,
  Nav,
  Container,
  Form,
  Dropdown,
  ListGroup,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";

function MainSidebar() {
  const [isOpen, setIsopen] = useState(false);

  const ToggleSidebar = () => {
    const target = document.getElementById("offcanvasSideNavbar");
    if (isOpen === true) {
      setIsopen(false);
      target.style.visibility = "hidden";
    } else {
      setIsopen(true);
      target.style.visibility = "visible";
    }
  };

  return (
    <Fragment>
      <div className="col-lg-3">
        <div className="d-flex align-items-center d-lg-none">
          <Button
            className="border-0 bg-transparent"
            type="button"
            onClick={ToggleSidebar}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSideNavbar"
            aria-controls="offcanvasSideNavbar"
          >
            <i className="btn btn-primary fw-bold fa-solid fa-sliders-h"></i>
            <span className="h6 mb-0 fw-bold d-lg-none ms-2">My profile</span>
          </Button>
        </div>

        <nav className="navbar navbar-expand-lg mx-0">
          <div
            className={`offcanvas offcanvas-start ${
              isOpen == true ? "show" : ""
            }`}
            tabIndex="-1"
            id="offcanvasSideNavbar"
          >
            <div className="offcanvas-header">
              <Button
                type="button"
                onClick={ToggleSidebar}
                className="btn-close text-reset ms-auto"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></Button>
            </div>

            <div className="offcanvas-body d-block px-2 px-lg-0">
              <Card className="overflow-hidden">
                <div
                  className="h-50px"
                  style={{
                    // backgroundImage: url(assets / images / bg / (01).jpg),
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no - repeat",
                  }}
                ></div>

                <Card.Body className="pt-0">
                  <div className="text-center">
                    <div className="avatar avatar-lg mt-n5 mb-3">
                      <a href="#!">
                        <Image
                          className="avatar-img rounded border border-white border-3"
                          src="assets/images/avatar/07.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <h5 className="mb-0">
                      {" "}
                      <a href="#!">Sam Lanson </a>{" "}
                    </h5>
                    <small>Web Developer at Webestica</small>
                  </div>

                  <hr />

                  <ul className="nav nav-link-secondary flex-column fw-bold gap-2">
                    <li className="nav-item">
                      <a className="nav-link" href="my-profile.html">
                        {" "}
                        <Image
                          className="me-2 h-20px fa-fw"
                          src="assets/images/icon/home-outline-filled.svg"
                          alt=""
                        />
                        <span>Feed </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="my-profile-connections.html"
                      >
                        {" "}
                        <Image
                          className="me-2 h-20px fa-fw"
                          src="assets/images/icon/person-outline-filled.svg"
                          alt=""
                        />
                        <span>Connections </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="blog.html">
                        {" "}
                        <Image
                          className="me-2 h-20px fa-fw"
                          src="assets/images/icon/earth-outline-filled.svg"
                          alt=""
                        />
                        <span>Latest News </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="events.html">
                        {" "}
                        <Image
                          className="me-2 h-20px fa-fw"
                          src="assets/images/icon/calendar-outline-filled.svg"
                          alt=""
                        />
                        <span>Events </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="groups.html">
                        {" "}
                        <Image
                          className="me-2 h-20px fa-fw"
                          src="assets/images/icon/chat-outline-filled.svg"
                          alt=""
                        />
                        <span>Groups </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="notifications.html">
                        {" "}
                        <Image
                          className="me-2 h-20px fa-fw"
                          src="assets/images/icon/notification-outlined-filled.svg"
                          alt=""
                        />
                        <span>Notifications </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="settings.html">
                        {" "}
                        <Image
                          className="me-2 h-20px fa-fw"
                          src="assets/images/icon/cog-outline-filled.svg"
                          alt=""
                        />
                        <span>Settings </span>
                      </a>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </div>
          </div>
        </nav>
      </div>
    </Fragment>
  );
}

export default MainSidebar;
