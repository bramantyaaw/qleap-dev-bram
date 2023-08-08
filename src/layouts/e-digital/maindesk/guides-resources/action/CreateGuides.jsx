import React, { Fragment, useState } from "react";
import EdigitalLayout from "../../../../home/EDigitalLayout";
import {
  Accordion,
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import ReactQuill from "react-quill";
import GKAccordionGuide from "../../../../../components/components/marketing/common/accordions/GKAccordionGuide";
import { Link } from "react-router-dom";

export const CreateGuides = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "",
      description: "",
    },
  ]);

  const handleAddArticle = () => {
    // Create a new article object with default values
    const newArticle = {
      id: articles.length + 1,
      title: "",
      description: "",
    };

    // Add the new article to the articles array in the state
    setArticles([...articles, newArticle]);
  };
  return (
    <EdigitalLayout>
      {" "}
      <Fragment>
        <Row>
          <Col>
            <div className="border-bottom pb-2 mb-4 d-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">Guides & Resources</h1>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="#">E-Digital</Breadcrumb.Item>
                  <Breadcrumb.Item href="/main-desk">Main Desk</Breadcrumb.Item>
                  <Breadcrumb.Item active>Guides & Resources</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Card className="px-0">
            <Card.Header>
              <p
                style={{ fontFamily: "Roboto" }}
                className="mb-0 h4 text-primary"
              >
                General Information
              </p>
            </Card.Header>
            <Card.Body>
              <Col md={6} xs={12} className="mb-3">
                <Form.Label>
                  Title Guides & Resources{" "}
                  <span className="text-danger"> *</span>{" "}
                </Form.Label>
                <Form.Control type="text" />
              </Col>
              <Col md={12} sm={12} className="mb-1">
                <Form.Label>
                  Intro Description
                  <span className="text-danger"> *</span>{" "}
                </Form.Label>
                <Form.Group className="mb-3">
                  <ReactQuill value="" />
                </Form.Group>
              </Col>
            </Card.Body>
            {articles.map((article) => (
              <GKAccordionGuide
                key={article.id}
                article={article}
                setArticles={setArticles}
              />
            ))}
            <p className="d-flex border-bottom border-top px-4 py-2 text-primary fst-italic">
              <Link to="#" onClick={handleAddArticle}>
                + Add new articles
              </Link>
            </p>
            <div className="d-flex justify-content-end p-4">
              <Button variant="primary" className="rounded-3">
                Publish
              </Button>
            </div>
          </Card>
        </Row>
      </Fragment>
    </EdigitalLayout>
  );
};
