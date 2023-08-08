import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Alert,
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import FormSelect from "../../../../components/components/elements/form-select/FormSelect";
import EdigitalLayout from "../../../home/EDigitalLayout";
import { getEmployeeAction } from "../../../../redux/action/epcnAction";
import { useDispatch, useSelector } from "react-redux";
import { ShowEPCN } from "./ShowEPCN";
import NotifSuccessModal from "../../../../components/components/elements/modal/NotifSuccessModal";
import { ProbationForm } from "./ProbationForm";
import { ContractPermanentForm } from "./ContractPermanentForm";

export const CreateEPCN = () => {
  const dispatch = useDispatch();

  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const [show, setShow] = useState(false);
  const [typeOptions, setTypeOptions] = useState([]);
  const [EmployeeOptions, setEmployeeOptions] = useState([]);
  const { employeeData } = useSelector((state) => state.epcnReducer);
  const detailEmployee = employeeData?.data?.data;

  const [type, setType] = useState("");
  const [employee, setEmployee] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const uidEmp = "" + employee;

  const handleChange = (selectedOption) => {
    setEmployee(selectedOption?.value);
    const nik =
      selectedOption?.label && selectedOption?.label?.length >= 9
        ? selectedOption?.label?.substring(0, 9)
        : null;
    fetchDataAdmin(nik);
  };

  const selectInputRef = useRef();
  const onClear = () => {
    selectInputRef?.current?.select?.clearValue();
  };

  const handleType = (event) => {
    event.preventDefault();
    setType(event.target.value);
    setEmployee("");
    onClear();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    {
      employee && type ? setIsSearch(true) : setIsSearch(false);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#e8e7ed",
      minHeight: "32px",
      height: "37px",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided) => ({
      ...provided,
      height: "32px",
      padding: "0 6px",
    }),

    input: (provided) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      background: "#000",
      height: "32px",
    }),
  };

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, [localStorage]);

  useEffect(() => {
    fetchDataTypeEPCN();
  }, []);

  useEffect(() => {
    employee && fetchDataAdmin();
  }, []);

  useEffect(() => {
    type && fetchDataEmployeEPCN();
    // setEmployee("");
  }, [type]);

  const fetchDataAdmin = async (value) => {
    try {
      await axios
        .post(
          "/epcn/check-admin",
          {
            uid,
            nik_employee: value,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setIsAdmin(res?.data?.data?.is_admin);
        });
    } catch (e) {
      return e;
    }
  };

  const fetchDataTypeEPCN = async () => {
    try {
      await axios
        .get("/epcn/list-type", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const newData = res?.data?.data;
          const newObjArr = newData?.map((data) => {
            const obj = {
              value: data?.typeId,
              label: data?.typeName,
            };
            return obj;
          });
          setTypeOptions(newObjArr);
        });
    } catch (e) {
      return e;
    }
  };
  const fetchDataEmployeEPCN = async () => {
    try {
      await axios
        .post(
          "/epcn/list-emp",
          {
            type,
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          const newData = res?.data?.data;
          const newValueArr = newData?.map((data) => {
            const obj = {
              value: data?.uid,
              label: data?.name,
            };
            return obj;
          });
          setEmployeeOptions(newValueArr);
        });
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    uidEmp && dispatch(getEmployeeAction(token, uidEmp));
    setIsSearch(false);
  }, [type, uidEmp]);

  return (
    <EdigitalLayout>
      <Fragment>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="border-bottom pb-2 d-md-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">E-PCN</h1>
                <Breadcrumb>
                  <Breadcrumb.Item href="/main-desk">E-Digital</Breadcrumb.Item>
                  <Breadcrumb.Item href="/submission">
                    Submission
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active href="/submission/create-epcn">
                    Create EPCN
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div>
                <Link to="/myteam" className="btn btn-secondary">
                  Back
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        <div className="py-4">
          <Row>
            <Col lg={12} md={12} xs={12}>
              <Card>
                <Card.Header className="bg-white">
                  <h4
                    style={{ fontFamily: "Roboto" }}
                    className="fw-normal my-0"
                  >
                    Create New FPP
                  </h4>
                </Card.Header>
                <Card.Body className="">
                  <Form>
                    <Row>
                      <Col md={5} xs={12} className="mb-3">
                        <Form.Group controlId="formType">
                          <Form.Label>Type</Form.Label>
                          <Form.Control
                            className="form-select-sm rounded-2"
                            as={FormSelect}
                            placeholder="Select Type"
                            options={typeOptions}
                            // onChange={(e) => {
                            //   setType(e.target.value);
                            //   onClear();
                            // }}
                            onChange={handleType}
                            // onClick={onClear}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={5} xs={12} className="mb-3">
                        <Form.Group controlId="formEmployeeNIK">
                          <Form.Label>
                            Select Employee
                            <span className="text-danger"> *</span>
                          </Form.Label>
                          <Select
                            ref={selectInputRef}
                            onChange={handleChange}
                            options={EmployeeOptions}
                            placeholder=""
                            isSearchable
                            isClearable={true}
                            // value={employee}
                            onClick={() => setEmployee("")}
                            components={{
                              DropdownIndicator: () => null,
                              IndicatorSeparator: () => null,
                              ClearIndicator: () => null,
                            }}
                            styles={customStyles}
                          />
                        </Form.Group>
                      </Col>
                      <Col
                        sm={2}
                        className="d-flex flex-column align-self-center justify-content-center mt-4 mb-3"
                      >
                        {employee && type ? (
                          <Button
                            variant="primary"
                            type="submit"
                            className="text-center"
                            onClick={handleSearch}
                            size="sm"
                          >
                            Search
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            type="submit"
                            className="text-center"
                            disabled
                            size="sm"
                          >
                            Search
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4 ps-2">
            <Col lg={12} md={12} xs={12}>
              {isSearch && (
                <div>
                  {type === "1" ? (
                    <ContractPermanentForm
                      data={detailEmployee}
                      uid={uid}
                      type={type}
                      employee={employee}
                      token={token}
                      isAdmin={isAdmin}
                    />
                  ) : type === "6" ? (
                    <ProbationForm
                      data={detailEmployee}
                      uid={uid}
                      type={type}
                      employee={employee}
                      token={token}
                      isAdmin={isAdmin}
                    />
                  ) : null}
                  {/* <ShowEPCN
                    data={detailEmployee}
                    uid={uid}
                    type={type}
                    employee={employee}
                    token={token}
                  /> */}
                </div>
              )}
              {!isSearch && (
                <Alert variant="info">
                  - For "Probation" type, to change employees who are still in
                  probation to become permanent employees / terminate<br></br> -
                  For "Contract to Permanent" type, to make changes to employees
                  who are still on contract to become permanent employees
                </Alert>
              )}
              <NotifSuccessModal
                show={show}
                setShow={setShow}
                text="Data submitted successfully!"
              />
            </Col>
          </Row>
        </div>
      </Fragment>
    </EdigitalLayout>
  );
};
