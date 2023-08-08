import React from "react";
import { Fragment } from "react";
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

const Create = () => {
  return (
    <Fragment>
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex mb-3">
            <div className="avatar avatar-xs me-2">
              <a to="#">
                {" "}
                <Image
                  className="avatar-img rounded-circle"
                  src="assets/images/avatar/03.jpg"
                  alt=""
                />{" "}
              </a>
            </div>
            <Form>
              <Form.Group className="w-100">
                <Form.Control
                  className="form-control pe-4 border-0"
                  as="textarea"
                  rows="2"
                  data-autoresize
                  placeholder="Share your thoughts..."
                ></Form.Control>
              </Form.Group>
            </Form>
          </div>
          <ul className="nav nav-pills nav-stack small fw-normal">
            <li className="nav-item">
              <Link
                className="nav-link bg-light py-1 px-2 mb-0"
                to="#!"
                data-bs-toggle="modal"
                data-bs-target="#feedActionPhoto"
              >
                {" "}
                <i className="bi bi-image-fill text-success pe-2"></i>Photo
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link bg-light py-1 px-2 mb-0"
                to="#!"
                data-bs-toggle="modal"
                data-bs-target="#feedActionVideo"
              >
                {" "}
                <i className="bi bi-camera-reels-fill text-info pe-2"></i>Video
              </Link>
            </li>
          </ul>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Create;
