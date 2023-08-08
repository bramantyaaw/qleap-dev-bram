import React from "react";
import { Fragment, useState } from "react";
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

import MainSidebar from "../../../components/ezone/sidebar/MainSidebar";
import Create from "/src/components/ezone/feeds/Create";
import MainFeed from "/src/components/ezone/feeds/MainFeed";
import Moments from "/src/components/ezone/feeds/Moments";
import News from "/src/components/ezone/feeds/News";

import StatusData from "/src/data/ezone/Status";
import MomentsData from "/src/data/ezone/Moments";
import NewsData from "/src/data/ezone/News";

const Feed = () => {
  return (
    <Fragment>
      <main>
        <Container>
          <Row className="g-4">
            <MainSidebar />
            <Col className="col-md-8 col-lg-6 vstack gap-4">
              <Create />
              {StatusData?.map((item, index) => {
                return (
                  <div key={index}>
                    <MainFeed item={item} />
                  </div>
                );
              })}
            </Col>
            <Col className="col-lg-3">
              <Row className="g-4">
                <Col className="col-sm-6 col-lg-12">
                  <Card>
                    <Card.Header className="pb-0 border-0">
                      <h5 className="card-title mb-0">Who to follow</h5>
                    </Card.Header>
                    <Card.Body>
                      {MomentsData?.map((item, index) => {
                        return (
                          <div key={index}>
                            <Moments item={item} />
                          </div>
                        );
                      })}
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-sm-6 col-lg-12">
                  <Card>
                    <Card.Header className="pb-0 border-0">
                      <h5 className="card-title mb-0">Today’s news</h5>
                    </Card.Header>
                    <Card.Body>
                      {NewsData?.map((item, index) => {
                        return (
                          <div key={index}>
                            <News item={item} />
                          </div>
                        );
                      })}
                      <Link
                        to="#!"
                        role="button"
                        className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center"
                        data-bs-toggle="button"
                        aria-pressed="true"
                      >
                        <div className="spinner-dots me-2">
                          <span className="spinner-dot"></span>
                          <span className="spinner-dot"></span>
                          <span className="spinner-dot"></span>
                        </div>
                        View all latest news
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </main>
    </Fragment>
  );
};

export default Feed;
