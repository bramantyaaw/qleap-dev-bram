import React, {Fragment, useState, useEffect} from 'react'
import { Breadcrumb, Row, Col, Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function CreateMemo() {
    const [token, setToken] = useState(localStorage.getItem("access_token"));
    const [nameMemo, setNameMemo] = useState("");
    const [memoLink, setMemoLink] = useState("");
    const navigate = useNavigate();

    const postDataMemo = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
              "/services/add-memo",
              {
                memo_name: nameMemo,
                pdf_link: memoLink,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            navigate("/main-desk/memo-internal");
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
                  <h1 className="mb-1 h2 fw-bold">Internal Memo</h1>
                  <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">E-Digital</Breadcrumb.Item>
                    <Breadcrumb.Item href="/main-desk">
                      Main Desk
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/main-desk/Memo-Internal">
                      Memo Internal
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
            <Form onSubmit={postDataMemo}>
              <Row className="mb-3 d-flex justify-content-between">
                <Form.Group as={Col} md="5">
                  <Form.Label>Nama Policy</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cantumkan nama memo"
                    className="form-control-sm"
                    onChange={(e) => setNameMemo(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="5">
                  <Form.Label>Link Pdf Policy</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Contoh : https://www.drive.google.com"
                    className="form-control-sm"
                    onChange={(e) => setMemoLink(e.target.value)}
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
    );
}
