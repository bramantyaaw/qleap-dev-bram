import React from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FlowSubmission } from "../../../components/components/dashboard/projects/single/overview/FlowSubmission";
import { FlatPickr } from "../../../components/components/dashboard/ticketing/elements/date/FlatPickr";
import TextForm from "../../../components/components/dashboard/ticketing/elements/text/TextForm";
import { saveAs } from "file-saver";

export const FragEmployeeData = ({ data, setDate, isAdmin }) => {
  const transactions = data?.transaction;
  const apptype = data?.app_type;
  const pcntype = transactions?.pcn_type;
  const fileName = data.file
    ? data?.file.map((item) => item.collection_name)
    : "";

  const file = data?.file ? data.file : "";

  const fileUrls = data.file ? data.file.map((item) => item.url) : [];

  const saveFile = (fileUrl) => {
    const fileName = fileUrl.split("/").pop();
    saveAs(fileUrl, fileName);
  };

  return (
    <Row>
      <Col md={12} xl={8} xs={12}>
        <Card className="mb-2">
          <Card.Header>
            {transactions?.emp_type_name_from === "PROBATION" ? (
              <h4 style={{ fontFamily: "Roboto" }} className="fw-bold mb-0">
                Probation : {transactions?.employee_name} (
                {transactions?.employee_nik})
              </h4>
            ) : (
              <h4 style={{ fontFamily: "Roboto" }} className="fw-bold mb-0">
                Contract to Permanent : {transactions?.employee_name} (
                {transactions?.employee_nik})
              </h4>
            )}
          </Card.Header>
          <Card.Body>
            <Form>
              <Row>
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={transactions?.job_title_name_from}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Level</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={transactions?.job_level_code_from}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Work Location</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={transactions?.location_name_from}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={transactions?.company_name_from}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Superior</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={transactions?.superior_name}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3">
                    {apptype === "bp" && data?.status_approve ? (
                      <div>
                        <TextForm text="Effective Date" span="*" />
                        <Form.Control
                          type="text"
                          defaultValue={transactions?.effective_date}
                          placeholderText={transactions?.effective_date}
                          as={FlatPickr}
                          setDate={setDate}
                          required
                        />
                      </div>
                    ) : (
                      <div>
                        <TextForm text="Effective Date" />
                        <Form.Control
                          type="text"
                          defaultValue={transactions?.effective_date}
                          disabled
                        />
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col md={12} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Division</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={transactions?.div}
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="formWorkPlace">
                    {pcntype === "Pass Probation" ? (
                      <Form.Label>Probation Start</Form.Label>
                    ) : (
                      <Form.Label>Contract Start</Form.Label>
                    )}
                    <Form.Control
                      type="text"
                      defaultValue={transactions?.start_contract_from}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3">
                    {pcntype === "Pass Probation" ? (
                      <Form.Label>Probation End</Form.Label>
                    ) : (
                      <Form.Label>Contract End</Form.Label>
                    )}
                    <Form.Control
                      type="text"
                      defaultValue={transactions?.end_contract_from}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Actual Date</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={transactions?.actual_date}
                      disabled
                    />
                  </Form.Group>
                </Col>
                {transactions?.emp_type_name_from !== "PROBATION" ? (
                  <Col md={6} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Number of Contract</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={transactions?.emp_type_name_from}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                ) : null}

                {!isAdmin && file.length > 0 ? (
                  <Col md={6} sm={12}>
                    <Form.Label>File</Form.Label>
                    <InputGroup className="">
                      <Form.Control disabled defaultValue={fileName} />
                      {fileUrls.map((fileUrl, index) => (
                        <div key={index}>
                          <Button
                            onClick={() => saveFile(fileUrl)}
                            variant="outline-secondary"
                          >
                            Download
                          </Button>
                        </div>
                      ))}
                    </InputGroup>
                  </Col>
                ) : null}
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>One on One Date</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={
                        transactions?.coaching_date === null
                          ? "-"
                          : transactions?.coaching_date
                      }
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={12} xl={4} xs={12}>
        <FlowSubmission data={data} isAdmin={isAdmin} />
      </Col>
    </Row>
  );
};
