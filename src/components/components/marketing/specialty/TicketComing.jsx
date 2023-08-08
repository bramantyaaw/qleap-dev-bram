// import node module libraries
import React, { Fragment, useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Image,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";

// import media files
import ComingSoonImage from "../../../../assets/images/background/comingsoon.svg";
import { Link } from "react-router-dom";
import Logo from "../../../../assets/images/logo/qleap-text.svg";

const TicketComing = () => {
  const calculateTimeLeft = () => {
    let launchdate = "2023-08-09";
    const difference = +new Date(launchdate) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)).toLocaleString(
          "en-US",
          { minimumIntegerDigits: 2, useGrouping: false }
        ),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toLocaleString(
          "en-US",
          { minimumIntegerDigits: 2, useGrouping: false }
        ),
        minutes: Math.floor((difference / 1000 / 60) % 60).toLocaleString(
          "en-US",
          { minimumIntegerDigits: 2, useGrouping: false }
        ),
        seconds: Math.floor((difference / 1000) % 60).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const timerComponents = [];

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  Object.keys(timeLeft).forEach((interval, index) => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents.push(
      <ListGroup.Item
        as="li"
        bsPrefix="list-inline-item"
        key={index}
        className="me-md-5"
      >
        <span className="days display-4 fw-bold  text-primary">
          {timeLeft[interval]}
        </span>
        <p className="fs-4 mb-0">{interval}</p>
      </ListGroup.Item>
    );
  });

  return (
    <Fragment>
      {/* Page Content */}
      <section className="bg-white">
        <Container className="d-flex flex-column">
          <Row>
            <Col lg={12} md={12}>
              <div className="mt-0 ms-0">
                <Link to="/">
                  <Image
                    src={Logo}
                    alt=""
                    width="100"
                    height="100"
                    className="logo-inverse"
                  />
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center g-0 py-lg-22 py-10">
            {/* Docs */}
            <Col
              xl={{ span: 5, offset: 1 }}
              lg={6}
              md={12}
              sm={12}
              className="text-center text-lg-start"
            >
              <h1 className="display-3 mb-2 fw-bold">We're coming soon.</h1>
              <p className="mb-4 fs-4">
                Ticketing is under construction. We'll be here soon with our new
                awesome site
              </p>
              <div className="countdown">
                <ListGroup as="ul" bsPrefix="list-inline">
                  {timerComponents.length ? (
                    timerComponents
                  ) : (
                    <ListGroup.Item as="li" bsPrefix="list-inline-item">
                      <h1 className="text-danger">Time's up!</h1>{" "}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </div>
            </Col>
            {/* img */}
            <Col
              xl={{ span: 5, offset: 1 }}
              lg={6}
              md={12}
              sm={12}
              className="mt-8 mt-lg-0"
            >
              <Image src={ComingSoonImage} alt="" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default TicketComing;
