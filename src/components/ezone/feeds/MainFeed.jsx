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

import Comments from "./Comments";
import { CommentsData } from "../../../data/ezone/Comments";

const MainFeed = ({ item }) => {
  const data = item;

  const newData = CommentsData?.filter((value) => {
    if (value?.statusId.toString().includes(data?.id.toString())) {
      return value;
    }
  });

  const PosterProfile = () => {
    return (
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="avatar avatar-story me-2">
            <Link to="#">
              <Image className="avatar-img rounded-circle"></Image>
            </Link>
          </div>
          <div>
            <div className="nav nav-divider">
              <h6 className="nav-item card-title mb-0">
                <Link to="#"></Link>
              </h6>
              <span className="nav-item small"></span>
            </div>
            <p className="mb-0 small"></p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <Card className="mb-4">
        <Card.Header className="border-0 pb-0">
          <PosterProfile />
        </Card.Header>
        <Card.Body>
          <p>{data?.post}</p>
          <ul className="nav nav-stack py-3 small">
            <li className="nav-item">
              <Link className="nav-link active" to="#!">
                {" "}
                <i className="bi bi-hand-thumbs-up-fill pe-1"></i>Liked (56)
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#!">
                {" "}
                <i className="bi bi-chat-fill pe-1"></i>Comments (
                {newData.length})
              </Link>
            </li>
          </ul>
          <div className="d-flex mb-3">
            <div className="avatar avatar-xs me-2">
              <Link to="#!">
                {" "}
                <Image
                  className="avatar-img rounded-circle"
                  src=""
                  alt=""
                />{" "}
              </Link>
            </div>
            <Form className="w-100">
              <Form.Control
                data-autoresize
                className="form-control pe-4 bg-light"
                as="textarea"
                rows="1"
                placeholder="Add a comment..."
              ></Form.Control>
            </Form>
          </div>
          {CommentsData?.map((itemComment, index) => {
            return (
              data?.id == itemComment?.statusId &&
              itemComment?.replyId === null && <Comments item={itemComment} />
            );
          })}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default MainFeed;
