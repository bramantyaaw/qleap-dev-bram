import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { ProfileLayout } from "../ProfileLayout";
import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileAction } from "../../../redux/action/profileAction";
import { KPITable } from "./KPITable";
import MainLayout from "../../home/MainLayout";

const BasicProfile = (props) => {
  const dispatch = useDispatch();

  const { profileData } = useSelector((state) => state.profileReducer);
  const dataUser = profileData?.data?.data;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const uid = localStorage.getItem("uid");
    profileData === null && dispatch(profileAction(token, uid));
  }, []);

  return (
    <MainLayout>
      <ProfileLayout>
        <Fragment>
          <Card className="border-0 mb-4">
            <Card.Header>
              <div className="mb-3 mb-lg-0">
                <h3 className="mb-0">Profile Details</h3>
                <p className="mb-0">
                  You have full control to manage your own account setting.
                </p>
              </div>
            </Card.Header>
            <Card.Body>
              <div>
                <h4 className="mb-0">Personal Details</h4>
                <p className="mb-4">
                  Here's your personal information and address.
                </p>
                {/* Form */}
                {dataUser?.map((data) => {
                  return (
                    <Form>
                      <Row>
                        {/* NIK */}
                        <Col md={6} sm={12} className="mb-3">
                          <Form.Group className="mb-3" controlId="formSuperior">
                            <Form.Label>Superior</Form.Label>
                            <Form.Control
                              type="text"
                              value={data?.superior}
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6} sm={12} className="mb-3">
                          <Form.Group
                            className="mb-3"
                            controlId="formSupSuperior"
                          >
                            <Form.Label>Super Superior</Form.Label>
                            <Form.Control
                              type="text"
                              value={data?.superSuperior}
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        {/* Phone */}
                        <Col md={6} sm={12} className="mb-3">
                          <Form.Group className="mb-3" controlId="formJobTitle">
                            <Form.Label>Role Title</Form.Label>
                            <Form.Control
                              type="text"
                              value={data?.roleTitle}
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        {/* Last name */}
                        <Col md={6} sm={12} className="mb-3">
                          <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="text"
                              value={data?.email}
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        {/* Departement */}

                        <Col md={6} sm={12} className="mb-3">
                          <Form.Group className="mb-3" controlId="formDept">
                            <Form.Label>Group Directorate</Form.Label>
                            <Form.Control
                              type="text"
                              value={data?.groupDir}
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6} sm={12} className="mb-3">
                          <Form.Group className="mb-3" controlId="formSubDept">
                            <Form.Label>Directorate</Form.Label>
                            <Form.Control
                              type="text"
                              value={data?.directorate}
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        {/* Address Line 1 */}
                        <Col md={6} sm={12} className="mb-3">
                          <Form.Group
                            className="mb-3"
                            controlId="formWorkPlace"
                          >
                            <Form.Label>Division</Form.Label>
                            <Form.Control
                              type="text"
                              value={data?.division}
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} sm={12} className="mb-3">
                          <Form.Group
                            className="mb-3"
                            controlId="formWorkPlace"
                          >
                            <Form.Label>Date Version</Form.Label>
                            <Form.Control
                              type="text"
                              value={data?.dateV}
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  );
                })}
              </div>
            </Card.Body>
          </Card>
          {/* <KPITable /> */}
        </Fragment>
      </ProfileLayout>
    </MainLayout>
  );
};

export default BasicProfile;
