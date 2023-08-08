import React, { Fragment, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { FlowSubmission } from "../../../../components/components/dashboard/projects/single/overview/FlowSubmission";
import FillInput from "../../../../components/components/dashboard/ticketing/elements/input/FillInput";
import TextForm from "../../../../components/components/dashboard/ticketing/elements/text/TextForm";
import SignaturePreview from "../../../../components/components/dashboard/ticketing/signature/SignaturePreview";
import Signature from "../../../../components/components/elements/signature/Signature";
import EdigitalLayout from "../../../home/EDigitalLayout";

export const DetailTunjangan = () => {
  const data = [];
  const [show, setShow] = useState(false);

  const ModalSignature = () => {
    return (
      <Fragment>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <h4 className="mb-0 fw-bold" style={{ fontFamily: "Roboto" }}>
              Verification Signature
            </h4>
          </Modal.Header>
          <Modal.Body>
            <Signature />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setShow(false)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  };
  return (
    <EdigitalLayout>
      <Fragment>
        {" "}
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">E-PCN</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="/submission">
                  Tunjangan Suka Duka
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/submission">
                  Approval & Submission
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Detail View</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12} xl={8}>
            <Card>
              <Card.Header>
                <h4 className="mb-0 fw-bold" style={{ fontFamily: "Roboto" }}>
                  First Marriage Allowance
                </h4>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <h5
                      className="pb-3 mt-0 fw-bold border-bottom"
                      style={{ fontFamily: "Roboto" }}
                    >
                      Employee Data
                    </h5>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <TextForm text="NIK" />
                        <Form.Control
                          type="text"
                          defaultValue="202298767"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <TextForm text="Name" />
                        <Form.Control
                          type="text"
                          defaultValue="Rudi Kurniawan"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <TextForm text="Level" />
                        <Form.Control type="text" defaultValue="2B" disabled />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <TextForm text="Position" />
                        <Form.Control
                          type="text"
                          defaultValue="UI/UX"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <TextForm text="Division" />
                        <Form.Control
                          type="text"
                          defaultValue="SS Human Capital & CSR/ HC SYSTEM WEB APPS DESIGN UNIT"
                          disabled
                        />
                      </Form.Group>
                    </Col>{" "}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <TextForm text="Company Name" />
                        <Form.Control
                          type="text"
                          defaultValue="PT Erajaya Swasembada, Tbk"
                          disabled
                        />
                      </Form.Group>
                    </Col>{" "}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <TextForm text="Work Location" />
                        <Form.Control
                          type="text"
                          defaultValue="Gedong Panjang"
                          disabled
                        />
                      </Form.Group>
                    </Col>{" "}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <TextForm text="Join Date" />
                        <Form.Control
                          type="text"
                          defaultValue="12/09/2022"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <h5
                      className="pb-3 mt-3 fw-bold border-bottom"
                      style={{ fontFamily: "Roboto" }}
                    >
                      Allowance Data
                    </h5>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <TextForm text="Tunjangan Type" />
                        <Form.Control
                          type="text"
                          defaultValue="Pengajuan pernihakan pertama"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <TextForm text="Submission Date" />
                        <Form.Control
                          type="text"
                          defaultValue="22/02/2023"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <TextForm text="Occurance Date" />
                        <Form.Control
                          type="text"
                          defaultValue="19/02/2023"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <TextForm text="No Rek" />
                        <Form.Control
                          type="text"
                          defaultValue="1234567890"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <TextForm text="on Behalf" />
                        <Form.Control
                          type="text"
                          defaultValue="Rudi Kurniawan"
                          disabled
                        />
                      </Form.Group>
                    </Col>{" "}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <TextForm text="Bank Name" />
                        <Form.Control
                          type="text"
                          defaultValue="Bank Central Asia"
                          disabled
                        />
                      </Form.Group>
                    </Col>{" "}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <TextForm text="Payment Type" />
                        <Form.Control
                          type="text"
                          defaultValue="Transfer"
                          disabled
                        />
                      </Form.Group>
                    </Col>{" "}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <TextForm text="Filling Amount" />
                        <Form.Control
                          type="text"
                          defaultValue="Rp. 500.0000 (Lima Ratus Ribu Rupiah)"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <TextForm text="Foto Akta Perkawinan" />
                        <Form.Control className="text-muted" type="file" />
                      </Form.Group>
                    </Col>{" "}
                  </Row>
                  <Row>
                    {/* <h5
                      className="pb-3 mt-3 fw-bold border-bottom"
                      style={{ fontFamily: "Roboto" }}
                    >
                      Verification Signature
                    </h5> */}
                    <Col md={12}>
                      <SignaturePreview />
                    </Col>
                  </Row>
                </Form>
                <div className="mt-3 d-flex justify-content-end">
                  <Button size="xs" variant="outline-primary ">
                    Reject
                  </Button>
                  <Button
                    onClick={() => setShow(true)}
                    size="xs"
                    className="ms-1"
                  >
                    Approve
                  </Button>
                </div>
                <ModalSignature show={show} setShow={setShow} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={12} xl={4} xs={12}>
            <FlowSubmission data={data} />
          </Col>
        </Row>
      </Fragment>
    </EdigitalLayout>
  );
};
