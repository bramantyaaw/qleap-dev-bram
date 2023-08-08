import React, { Fragment, useState } from "react";
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
import { Link } from "react-router-dom";

const News = ({ item }) => {
  return (
    <Fragment>
      <div className="mb-3">
        <h6 className="mb-0">
          <Link to="#">{item?.title}</Link>
        </h6>
        <small>2hr</small>
      </div>
    </Fragment>
  );
};

export default News;
