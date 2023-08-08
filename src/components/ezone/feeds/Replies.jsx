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

const Replies = ({ items }) => {
  const ReplyMain = ({ item }) => {
    return (
      <li className="comment-item">
        <div className="d-flex">
          <div className="avatar avatar-xs">
            <a href="#!">
              <Image
                className="avatar-img rounded-circle"
                src="assets/images/avatar/06.jpg"
                alt=""
              />
            </a>
          </div>
          <div className="ms-2">
            <div className="bg-light p-3 rounded">
              <div className="d-flex justify-content-between">
                <h6 className="mb-1">
                  {" "}
                  <a href="#!"> Lori Stevens </a>{" "}
                </h6>
                <small className="ms-2">2hr</small>
              </div>
              <p className="small mb-0">{item?.comment}</p>
            </div>
            <ul className="nav nav-divider py-2 small">
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  {" "}
                  Like (5)
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  {" "}
                  Reply
                </a>
              </li>
            </ul>
          </div>
        </div>
      </li>
    );
  };
  return (
    <ul className="comment-item-nested list-unstyled">
      <ReplyMain item={items} />
    </ul>
  );
};

export default Replies;
