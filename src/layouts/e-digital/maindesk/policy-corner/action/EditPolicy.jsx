import React, { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Breadcrumb, Row, Col, Form, Card, Button } from "react-bootstrap";

export default function EditPolicy() {

    const [token, setToken] = useState(localStorage.getItem("access_token"));
    const [nameMemo, setNameMemo] = useState("");
    const [memoLink, setMemoLink] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    
    const getDataMemo = async (memoId) => {
      try {
        const res = await axios.post(
          "/services/get-policy-data",
          {
            policy_id: parseInt(memoId),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = res?.data?.data;
        setNameMemo(data[0].policy_name);
        setMemoLink(data[0].pdf_link);
      } catch (err) {
        console.error(err);
      }
    };

    const UpdateMemo = async (e) => {
      e.preventDefault();
      try {
        await axios.post(
          "/services/update-policy",
          {
            policy_id: parseInt(id),
            policy_name: nameMemo,
            pdf_link: memoLink,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        navigate("/main-desk/policy-corner");
      } catch (err) {
        console.error(err);
      }
    };

    useEffect(() => {
      getDataMemo(id);
    }, []);

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
                    <Breadcrumb.Item href="/main-desk">
                      Main Desk
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/main-desk/policy-corner">
                      Policy Corner
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Create </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
            </Col>
          </Row>
        </Fragment>
        <Card>
          <Card.Header>
            <h5 className="mb-0">Create</h5>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={UpdateMemo}>
              <Row className="mb-3 d-flex justify-content-between">
                <Form.Group as={Col} md="5">
                  <Form.Label>Nama Policy</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Memo Name"
                    className="form-control-sm"
                    onChange={(e) => setNameMemo(e.target.value)}
                    value={nameMemo}
                  />
                </Form.Group>
                <Form.Group as={Col} md="5">
                  <Form.Label>Link Pdf Policy</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Memo Name"
                    className="form-control-sm"
                    onChange={(e) => setMemoLink(e.target.value)}
                    value={memoLink}
                  />
                </Form.Group>
                <Form.Group as={Col} md="2" className="align-self-end w-12">
                  <Button
                    type="submit"
                    variant="primary"
                    className="btn-sm w-100"
                    disabled={nameMemo === "" || memoLink === ""}
                  >
                    Create
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </>
  )
}
