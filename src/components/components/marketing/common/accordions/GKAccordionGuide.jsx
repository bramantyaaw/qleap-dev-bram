// import node module libraries
import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  Accordion,
  Card,
  useAccordionButton,
  AccordionContext,
  OverlayTrigger,
  Tooltip,
  Col,
  Form,
} from "react-bootstrap";
import ReactQuill from "react-quill";

const GKAccordionGuide = ({ article, setArticles }) => {
  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    const isCurrentEventKey = currentEventKey === eventKey;
    const overlayKeyEdit = uuid();
    const overlayKeyDelete = uuid();
    return (
      <Fragment>
        <div className="d-flex align-items-center justify-content-between">
          <h4
            className="mb-0 text-dark-primary"
            style={{ fontFamily: "Roboto" }}
          >
            <Link
              onClick={decoratedOnClick}
              aria-expanded={isCurrentEventKey}
              to="#"
              className="text-inherit"
            >
              <span className="align-middle p-1">{children}</span>
            </Link>
          </h4>
          <div>
            <OverlayTrigger
              key={overlayKeyDelete}
              placement="top"
              overlay={<Tooltip id="tooltip-top"> Delete</Tooltip>}
            >
              <Link to="#" className="me-1 text-inherit" title="Delete">
                <i className="fe fe-trash-2 fs-4"></i>
              </Link>
            </OverlayTrigger>

            <Link
              to="#"
              className="text-inherit"
              data-bs-toggle="collapse"
              onClick={decoratedOnClick}
              aria-expanded={isCurrentEventKey}
            >
              <span className="chevron-arrow">
                <i className="fe fe-chevron-down fs-4"></i>
              </span>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Accordion defaultActiveKey={article.id} flush>
        <Accordion.Item eventKey={article.id}>
          <div className="bg-light px-3 py-2">
            <ContextAwareToggle eventKey={article.id}>
              #{`Articles ${article.id}`}
            </ContextAwareToggle>
          </div>
          <Accordion.Body>
            <Col md={6} xs={12} className="mb-3">
              <Form.Label>
                Title Articles
                <span className="text-danger"> *</span>{" "}
              </Form.Label>
              <Form.Control type="text" />
            </Col>
            <Col md={12} sm={12} className="mb-1">
              <Form.Label>
                Articles Description *<span className="text-danger"> *</span>{" "}
              </Form.Label>
              <Form.Group className="mb-3">
                <ReactQuill value="" />
              </Form.Group>
            </Col>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Fragment>
  );
};

export default GKAccordionGuide;
