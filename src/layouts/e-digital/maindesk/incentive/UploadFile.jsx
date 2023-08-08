import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import FileInput from "../../../../components/components/dashboard/ticketing/elements/input/FileInput";

export const UploadFile = ({ setWarningFile, setFileIDCard }) => {
  const onChangeFile = (e) => {
    if (e.target.files[0].size >= 1000000) {
      setWarningFile(true);
    } else {
      setFileIDCard(e.target.files[0]);
    }
  };
  return (
    <Card className="border-0">
      <Card.Header>
        <div className="mb-3 mb-lg-0">
          <h4 className="mb-0">Upload File Incentive</h4>
          <p className="mb-0">You can upload your file incentive here.</p>
        </div>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row className="mb-2">
            {/* <Col lg={2} md={3} sm={12}>
              <h5>File</h5>
            </Col> */}
            <Col lg={10} md={9} sm={12}>
              <Form.Group className="d-flex align-items-center flex-row">
                <FileInput
                  handleChange={onChangeFile}
                  accept="file/xls, file/xlsx"
                />
              </Form.Group>
              <Form.Text className="text-danger ps-2">.xls , .xlsx</Form.Text>
            </Col>
          </Row>
          {/*  Button  */}
          <Row>
            <Col sm={12} className="d-flex">
              <Button
                variant="primary"
                className="justify-content-end"
                type="submiclast"
                size="xs"
              >
                Upload File
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};
