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

const Moments = ({ item }) => {
  return (
    <Fragment>
      <div className="hstack gap-2 mb-3">
        <div className="avatar">
          <Link to="#!">
            <Image
              className="avatar-img rounded-circle"
              src="assets/images/avatar/04.jpg"
              alt=""
            />
          </Link>
        </div>
        <div className="overflow-hidden">
          <Link className="h6 mb-0" to="#!">
            {item?.name}
          </Link>
          <p className="mb-0 small text-truncate">{item?.occasion}</p>
        </div>
        <Link
          className="btn btn-primary-soft rounded-circle icon-md ms-auto"
          to="#"
        >
          <i className="fa-solid fa-plus"> </i>
        </Link>
      </div>
    </Fragment>
  );
};

export default Moments;
