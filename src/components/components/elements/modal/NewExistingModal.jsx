import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import SelectAutocorrect from "../../dashboard/ticketing/elements/form-select/SelectAutocorrect";
import TextForm from "../../dashboard/ticketing/elements/text/TextForm";
import FormSelect from "../form-select/FormSelect";

export const NewExistingModal = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const [academy, setAcademy] = useState("");
  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      className="w-fit border-cyan border-0"
    >
      <Modal.Header closeButton>
        {" "}
        <Modal.Title>
          {" "}
          <h5 style={{ fontFamily: "Roboto" }} className="fw-bold mb-0">
            Add Question From Existing
          </h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <Row>
          <Col md={6} sm={12} className="mb-1">
            <Form.Group className="mb-3">
              <TextForm text="Academy" span="*" />

              <FormSelect
                className="form-select-sm"
                value={academy}
                onChange={(e) => setAcademy(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12} className="mb-1">
            <Form.Group className="mb-3">
              <TextForm text="Level" span="*" />
              <FormSelect
                className="form-select-sm"
                value={academy}
                onChange={(e) => setAcademy(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12} className="mb-1">
            <Form.Group className="mb-3">
              <TextForm text="Program" span="*" />
              <FormSelect
                className="form-select-sm"
                value={academy}
                onChange={(e) => setAcademy(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12} className="mb-1">
            <Form.Group className="mb-3">
              <TextForm text="Quiz Type" span="*" />
              <FormSelect
                className="form-select-sm"
                value={academy}
                onChange={(e) => setAcademy(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12} className="mb-1">
            <Form.Group className="mb-3">
              <TextForm text="Quiz Type" span="*" />
              <FormSelect
                className="form-select-sm"
                value={academy}
                onChange={(e) => setAcademy(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12} className="mb-1">
            <Form.Group className="mb-3">
              <TextForm text="Matrix Competency" span="*" />
              <FormSelect
                className="form-select-sm"
                value={academy}
                onChange={(e) => setAcademy(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <h5 className="mb-4 pb-3 border-bottom">Questions List</h5>
          <p className="text-center">
            Please select all type first to show a questions
          </p>
        </Row>
        <div className="d-flex justify-content-end ">
          <Button disabled>Add Question</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
