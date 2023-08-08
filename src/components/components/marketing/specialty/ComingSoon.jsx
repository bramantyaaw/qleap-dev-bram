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
// import ComingSoonImage from "assets/images/background/comingsoon.svg";

const ComingSoon = ({ launchdate }) => {
  const calculateTimeLeft = () => {
    // let launchdate = "2023-03-30";
    // let launchdate = "2023-06-20 18:00:00";
    // let launchdate = "23-05-2023 15:19:47";
    const difference = +new Date(launchdate) - +new Date();

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)).toLocaleString(
          "en-US",
          { minimumIntegerDigits: 2, useGrouping: false }
        ),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toLocaleString(
          "en-US",
          { minimumIntegerDigits: 2, useGrouping: false }
        ),
        Minutes: Math.floor((difference / 1000 / 60) % 60).toLocaleString(
          "en-US",
          { minimumIntegerDigits: 2, useGrouping: false }
        ),
        Seconds: Math.floor((difference / 1000) % 60).toLocaleString("en-US", {
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
        className={`d-flex flex-column justify-content-center lh-1 ${
          interval === "Seconds" ? "me-0" : "me-3"
        } `}
      >
        <span
          className="days h1 fw-bold text-white text-center mb-0"
          style={{ fontWeight: "700" }}
        >
          {timeLeft[interval]}
        </span>
        <p
          className="mb-0 text-center text-kinda-dark"
          style={{ fontSize: "9px" }}
        >
          {interval}
        </p>
      </ListGroup.Item>
    );
  });

  const obj = [
    {
      type: "Days",
      value: "0",
    },
    {
      type: "Hours",
      value: "0",
    },
    {
      type: "Minutes",
      value: "0",
    },
    {
      type: "Seconds",
      value: "0",
    },
  ];

  const timeIsUp = obj?.map((data, index) => {
    return (
      <ListGroup.Item
        as="li"
        bsPrefix="list-inline-item"
        key={index}
        className={`d-flex flex-column justify-content-center lh-1 ${
          data?.type === "Seconds" ? "me-0" : "me-3"
        } `}
      >
        <span
          className="days h1 fw-bold text-white text-center mb-0"
          style={{ fontWeight: "700" }}
        >
          {data?.value}
        </span>
        <p
          className="mb-0 text-center text-kinda-dark"
          style={{ fontSize: "9px" }}
        >
          {data?.type}
        </p>
      </ListGroup.Item>
    );
  });

  return (
    <Fragment>
      {/* Page Content */}
      <div className="countdown">
        <ListGroup as="ul" className="d-flex flex-row">
          {timerComponents?.length
            ? timerComponents
            : // <ListGroup.Item as="li" bsPrefix="list-inline-item">
              //   <h1 className="text-danger">Time's up!</h1>{" "}
              // </ListGroup.Item>
              timeIsUp}
        </ListGroup>
      </div>
    </Fragment>
  );
};

export default ComingSoon;
