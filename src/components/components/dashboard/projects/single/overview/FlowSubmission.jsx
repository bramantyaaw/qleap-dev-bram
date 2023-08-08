import React, { Fragment, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export const FlowSubmission = ({ data, isAdmin }) => {
  const [show, setShow] = useState(false);
  const approval = data?.approval;
  const notes = data?.notes?.latest_notes?.[0]?.note;
  const rejectedApprovals = approval?.filter(
    (approval) => approval.result === "rejected"
  );

  const ModalReason = (props) => {
    const { setShow, show, buttonClassName, title, className } = props;
    return (
      <Fragment>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header>
            <Modal.Title className={`text-darkest fw-bold ${className}`}>
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.children}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShow(false)}
              className={buttonClassName}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  };

  return (
    <Card>
      {/* Card header */}
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <h4 style={{ fontFamily: "Roboto" }} className="fw-bold mb-0">
            Flow Progress Submission
          </h4>
        </div>
      </Card.Header>

      {/* Card body */}
      <Card.Body>
        {/* List group */}
        <ListGroup variant="flush" className="list-timeline-activity">
          {approval?.map((item, index) => {
            return (
              <ListGroup.Item className="px-0 pt-0 border-0 pb-6" key={index}>
                <Row className="position-relative">
                  <Col xs="auto">
                    {item.result === "approved" && (
                      <div className="icon-shape icon-md bg-light-success text-success rounded-circle">
                        <i className="fe fe-check"></i>
                      </div>
                    )}
                    {item.result === "rejected" && (
                      <div className="icon-shape icon-md bg-light-danger text-danger rounded-circle">
                        <i className="fe fe-x"></i>
                      </div>
                    )}
                    {item.result === "progress" && (
                      <div className="icon-shape icon-md bg-light-warning text-warning rounded-circle">
                        <i className="fe fe-circle"></i>
                      </div>
                    )}
                    {item.result === "-" && (
                      <div className="icon-shape icon-md bg-light-secondary rounded-circle">
                        <i className=""></i>
                      </div>
                    )}
                  </Col>
                  <Col className="ms-n3">
                    <h4 className="mb-0 h5">{item?.type}</h4>
                    <span className="mb-0 text-body">{item?.nama}</span>
                    {item?.result === "rejected" && !isAdmin ? (
                      <Link
                        className="mb-0 fst-italic text-decoration-underline"
                        onClick={() => setShow(true)}
                      >
                        <p className="mb-0"> Reject Reason</p>
                      </Link>
                    ) : item?.result === "rejected" && isAdmin ? (
                      <p
                        className="mb-0 text-body"
                        dangerouslySetInnerHTML={{ __html: item?.created_date }}
                      ></p>
                    ) : (
                      <p
                        className="mb-0 text-body"
                        dangerouslySetInnerHTML={{ __html: item?.created_date }}
                      ></p>
                    )}
                    <ModalReason
                      setShow={setShow}
                      show={show}
                      buttonClassName="py-2 px-3 h4"
                      title="Reject Reason"
                      className="text-center w-100"
                    >
                      <Form.Control
                        id="note"
                        name="note"
                        as="textarea"
                        rows={2}
                        value={notes}
                        style={{ resize: "none" }}
                        disabled
                      />
                      {rejectedApprovals?.map((item) => {
                        return (
                          <p className="mb-0 pt-3">
                            {item?.type} : {item?.nama}
                          </p>
                        );
                      })}
                    </ModalReason>
                  </Col>
                  <Col xs="auto">
                    <p
                      className={`mb-0 ${
                        item.result === "approved"
                          ? "text-success"
                          : item.result === "rejected"
                          ? "text-danger"
                          : item.result === "progress"
                          ? "text-warning"
                          : ""
                      }`}
                    >
                      {item.result === "approved"
                        ? "Done"
                        : item.result === "rejected"
                        ? "Reject"
                        : item.result === "progress"
                        ? "Process"
                        : "-"}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
