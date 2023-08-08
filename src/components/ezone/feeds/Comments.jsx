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

import Reply from "./Replies";

import CommentsData from "/src/data/ezone/Comments";

const Comments = ({ item }) => {
  const MainComments = ({ item }) => {
    return (
      <li className="comment-item">
        <div className="d-flex position-relative">
          <div className="avatar avatar-xs">
            <a href="#!">
              <Image className="avatar-img rounded-circle" src="" alt="" />
            </a>
          </div>
          <div className="ms-2">
            <div className="bg-light rounded-start-top-0 p-3 rounded">
              <div className="d-flex justify-content-between">
                <h6 className="mb-1">
                  {" "}
                  <a href="#!"> Frances Guerrero </a>
                </h6>
                <small className="ms-2">5hr</small>
              </div>
              <p className="small mb-0">{item?.comment}</p>
            </div>
            <ul className="nav nav-divider py-2 small">
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  {" "}
                  Like (3)
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  {" "}
                  Reply
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  {" "}
                  View 5 replies
                </a>
              </li>
            </ul>
          </div>
        </div>
        {CommentsData.map((data, index) => {
          if (data?.replyId === item?.id) {
            return <Reply items={data} />;
          }
        })}
      </li>
    );
  };

  return (
    <Fragment>
      <ul className="comment-wrap list-unstyled">
        <MainComments item={item} />
      </ul>
    </Fragment>
  );
};

export default Comments;
