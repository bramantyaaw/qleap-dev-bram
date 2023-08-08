import React, { Fragment } from "react";
import { Col, Row, Container, Image, Form } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

import bg_home from "../../assets/images/background/background_home_qleap.png";
import ImgPhoto from "../../assets/images/png/home-image.png";

const HomeHeader = () => {
  const isPhone = useMediaQuery({
    query: "(max-width: 746px)",
  });
  return (
    <section
      className="p-lg-6 pb-lg-0 px-4 bg-cover"
      style={{
        backgroundImage: `url(${bg_home})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* container */}
      {/* <Container> */}
      <Row className=" d-flex flex-column flex-md-row align-items-end w-100 h-100 pt-10">
        <Col
          lg={7}
          sm={12}
          className="w-100 w-md-50 h-100 d-flex align-items-start"
        >
          <div className="pb-5 pb-md-10 h-100 align-items-start d-flex align-items-start flex-column">
            <div
              className={`text-md-start d-flex align-items-start flex-column justify-content-start ${
                !isPhone ? "ps-10" : ""
              }`}
            >
              {/* heading */}
              <h1
                className=" display-1  fw-bold text-white mb-0"
                // style={!isPhone ? { fontSize: 70 } : {}}
              >
                Welcome,
              </h1>
              <h1 className=" display-5 fw-bold text-white">To QLEAP</h1>
              {/* lead */}
              <span className="lead text-white opacity-75 pe-10">
                Empower your remote workforce to learn what they need, when they
                need it.
              </span>
            </div>
            <div className="mt-6 d-none d-sm-inline"></div>
          </div>
        </Col>
        <Col
          lg={5}
          sm={12}
          className={`text-center w-100 w-md-50 d-flex align-items-end`}
        >
          <div className="position-relative h-100 w-100">
            <Image
              src={ImgPhoto}
              alt=""
              className="text-center w-100 h-100 align-items-center"
            />
          </div>
        </Col>
      </Row>
      {/* </Container> */}
    </section>
  );
};
export default HomeHeader;
