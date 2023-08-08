import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import GKAccordionActions from "../../../../../components/components/marketing/common/accordions/GKAccordionActions";
import { AddNewModal } from "../../category/modal/AddNewModal";
import ReactQuill from "react-quill";
export const PreviewAll = (props) => {
  const { next, previous } = props;
  const NewCourseData = [];

  const [showAdd, setShowAdd] = useState(false);

  return (
    <>
      <Form>
        <div className="mb-4">
          <h4 className="mb-0 fw-bold">Preview all</h4>
          <span className="fs-6">
            Pastikan syllabus, module dan exam yang sudah dibuat sudah sesuai
          </span>
        </div>
        {/* row */}
        <Row>
          <Col>
            <div className="bg-light rounded p-4 mb-4">
              {/* Item list */}
              <GKAccordionActions
                accordionItems={NewCourseData}
                onClick={setShowAdd}
              />
            </div>
          </Col>
          <Col
            md={12}
            xs={12}
            className="d-md-flex justify-content-between mb-3"
          >
            {/* Go to Back button */}
            <Button
              className="rounded-3"
              variant="outline-secondary"
              onClick={previous}
            >
              Previous
            </Button>
            <div className="mt-2 mt-md-0">
              {/* Save and Continue button */}
              <Button className="rounded-3" variant="primary" onClick={next}>
                Next
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};
