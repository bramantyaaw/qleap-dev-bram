// import node module libraries
import React, { Fragment } from "react";
import {
  Col,
  Row,
  Tab,
  Container,
  Nav,
  Image,
  Dropdown,
} from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";

// import custom sub components
import CoursesTab from "./CoursesTab";

// import media files
import PathBootstrap from "../../../../../assets/images/png/learningcard1.png";
import EUnivLayout from "../../../../../layouts/navbars/EUnivLayout";
const CoursePathSingle = () => {
  const { categoryName } = useParams();
  const { state } = useLocation();

  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  };

  return (
    <Fragment>
      <EUnivLayout>
        {/* Bg cover */}
        <section
          className="py-6"
          style={{
            background: `linear-gradient(270deg, #9D4EFF 0%, #782AF4 100%)`,
          }}
        ></section>
        {/* Page header */}
        <Tab.Container defaultActiveKey="courses">
          <section className="bg-white shadow-sm">
            {/* <Container> */}
            <div className="px-15">
              <Row className="align-items-center">
                <Col xl={12} lg={12} md={12} sm={12}>
                  <div className="d-md-flex align-items-center justify-content-between bg-white  pt-3 pb-3 pb-lg-5">
                    <div className="d-md-flex align-items-center text-lg-start text-center ">
                      <div className="me-3  mt-n8">
                        <Image
                          src={PathBootstrap}
                          className="avatar-xxl rounded border p-4 bg-white "
                          alt=""
                        />
                      </div>
                      <div>
                        <h1 className="mb-0 fw-bold me-3  ">
                          {capitalizeFirstLetter(categoryName)} Learning
                        </h1>
                        <span className="text-dark fw-medium">
                          {state?.length}
                        </span>{" "}
                        Program
                      </div>
                    </div>
                    {/* Dropdown */}
                    <div className="mt-3 mt-lg-0 text-lg-start text-center d-flex">
                      <Link
                        className="btn btn-light-primary btn-sm text-primary rounded-3"
                        to="/e-univ/learning"
                      >
                        Back to Homepage
                      </Link>
                    </div>
                  </div>
                  {/* Nav tab */}

                  {/*  Nav tabs  */}
                  <Nav className="nav-lt-tab ms-0">
                    {["Courses"].map((item, index) => (
                      <Nav.Item
                        key={index}
                        className={`${index === 0 ? "ms-0 " : ""}`}
                      >
                        <Nav.Link
                          eventKey={item.toLowerCase()}
                          className="mb-sm-3 mb-md-0"
                        >
                          {item}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </Col>
              </Row>
            </div>
            {/* </Container> */}
          </section>
          {/* Content  */}
          <section className="py-6 bg-wrapper">
            <div className="px-10">
              <Row>
                <Col md={12}>
                  <Tab.Content>
                    <Tab.Pane eventKey="courses" className="pb-4 px-0">
                      <CoursesTab items={state} />
                    </Tab.Pane>
                    {/* <Tab.Pane eventKey="about" className="pb-4 px-0">
                    <CoursesTab />
                  </Tab.Pane> */}
                  </Tab.Content>
                </Col>
              </Row>
            </div>
          </section>
        </Tab.Container>
      </EUnivLayout>
    </Fragment>
  );
};

export default CoursePathSingle;
