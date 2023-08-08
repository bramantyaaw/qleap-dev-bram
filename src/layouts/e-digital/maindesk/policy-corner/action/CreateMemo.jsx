import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumb, Col, Row, Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateMemo() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [namePolicy, setNamePolicy] = useState("");
  const [linkPolicy, setLinkPolicy] = useState("");
  const navigate = useNavigate();

  const postDataPolicy = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/services/add-policy",
        {
          policy_name: namePolicy,
          pdf_link: linkPolicy,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/main-desk/policy-corner");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, [localStorage]);

  return (
    <>
      <Fragment>
        <Row>
          <Col>
            <div className="border-bottom pb-2 mb-4 d-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">Policy Corner</h1>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="#">E-Digital</Breadcrumb.Item>
                  <Breadcrumb.Item href="/main-desk">Main Desk</Breadcrumb.Item>
                  <Breadcrumb.Item href="/main-desk/policy-corner">
                    Policy Corner
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>Create </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </Col>
        </Row>
        <Card>
          <Card.Header>
            <h5 className="mb-0">Create</h5>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={postDataPolicy}>
              <Row className="mb-3 d-flex justify-content-between">
                <Form.Group as={Col} md="5">
                  <Form.Label>Nama Memo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cantumkan Nama Memo"
                    className="form-control-sm"
                    onChange={(e) => setNamePolicy(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="5">
                  <Form.Label>Link Pdf Memo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Contoh: https://www.drive.google.com"
                    className="form-control-sm"
                    onChange={(e) => setLinkPolicy(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="2" className="align-self-end w-12">
                  <Button
                    type="submit"
                    variant="primary"
                    className="btn-sm w-100"
                    disabled={namePolicy === "" || linkPolicy === ""}
                  >
                    Create
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Fragment>
    </>
  );
}
