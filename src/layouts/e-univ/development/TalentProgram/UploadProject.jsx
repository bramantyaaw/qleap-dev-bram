import React from "react";
import { TalentProgram } from "./TalentProgram";
import { Button, Card, Form } from "react-bootstrap";
import IdleCourse from "../../../../components/components/dashboard/e-univ/on-board/IdleCourse";

export const UploadProject = () => {
  return (
    <TalentProgram>
      <Card>
        <Card.Header>
          <h4 className="display-7 fw-bold">Upload Project</h4>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }}>
                Project Name
              </Form.Label>
              <Form.Control
                className=" form-sm"
                placeholder="Masukan nama project disini"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }}>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                className="mb-1"
                placeholder="Tuliskan penjelasan anda disini"
              />
              <span className="fs-6">Maks 500 karakter</span>
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-0">
              <Form.Label style={{ fontWeight: "500" }}>
                Upload Project <span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="file"
                accept="file/doc, file/docx, file/pdf"
                multiple
              />
              <span className="fs-6">
                Maks upload 100 mb (upload file berupa; pdf, doc, atau ppt)
              </span>
            </Form.Group>
          </Form>
          <div className="d-flex align-items-end justify-content-end">
            <Button variant="primary" className="rounded-3">
              Submit
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Card className="my-4">
        <Card.Header>
          <h4 className="display-7 fw-bold">Mentoring</h4>
        </Card.Header>
        <Card.Body>
          <div className="text-center">
            <IdleCourse texth3="Submit terlebih dahulu project anda sebelum melakukan mentoring" />
          </div>
        </Card.Body>
      </Card>
    </TalentProgram>
  );
};
