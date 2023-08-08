import { Fragment, useEffect, useState } from "react";
import {
  Badge,
  Breadcrumb,
  Card,
  Col,
  Form,
  Nav,
  Row,
  Tab,
  Table,
} from "react-bootstrap";
import EdigitalLayout from "../../home/EDigitalLayout";
import { ListSubmission } from "./ListSubmission";
import { CreateSubmission } from "./CreateSubmission";
import FormSelect from "../../../components/components/elements/form-select/FormSelect";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import NotifSuccessModal from "../../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";

export const Submission = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const [selectedItem, setSelectedItem] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedSubmissionType, setSelectedSubmissionType] = useState("");
  const [dataList, setDataList] = useState([]);
  const [dataNtR, setDataNtR] = useState([]);
  const [count, setCount] = useState("");

  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submissionOptions = [{ value: "E-PCN", label: "E-PCN" }];

  const statusOptions = [
    { value: "Open", label: "Open" },
    { value: "In Progress", label: "In Progress" },
    { value: "Full Approved", label: "Full Approve" },
    { value: "Reject", label: "Rejected" },
  ];

  const fetchData = async () => {
    try {
      // const { data } =
      await axios
        .post(
          "/team/list-submission",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setDataList(res?.data?.data);
          } else if (res?.status === 429) {
            setErrorModal(true);
            setErrorMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            setErrorModal(true);
            setErrorMessage(res?.data?.message);
          }
        });
    } catch (e) {
      return e;
    }
  };

  const fetchDataNtR = async () => {
    try {
      await axios
        .post(
          "/team/list-submission-need-response",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setDataNtR(res?.data?.data);
          } else if (res?.status === 429) {
            setErrorModal(true);
            setErrorMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            setErrorModal(true);
            setErrorMessage(res?.data?.message);
          }
        });
    } catch (e) {
      return e;
    }
  };

  const fetchBadgeCount = async () => {
    try {
      await axios
        .post(
          "/team/count-approval",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            const newData = res?.data?.data;
            setCount(newData);
          } else {
            return res;
          }
        });
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataNtR();
    fetchBadgeCount();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, [localStorage]);

  return (
    <EdigitalLayout>
      <Fragment>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="border-bottom pb-2 mb-4 d-md-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">Submission</h1>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="/main-desk">E-Digital</Breadcrumb.Item>
                  <Breadcrumb.Item active>Submission</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="border-bottom">
              <CreateSubmission />
            </div>
            <Col lg={12} md={12} xs={12}>
              <div className="d-flex justify-content-end mt-4 mb-0 pb-0">
                <div className="pe-md-2">
                  <Form.Group className="mb-3">
                    <FormSelect
                      options={submissionOptions}
                      placeholder="Submission Type"
                      className="form-select-sm"
                      value={selectedSubmissionType}
                      onChange={(e) =>
                        setSelectedSubmissionType(e.target.value)
                      }
                    />
                  </Form.Group>
                </div>
                <div className="pe-md-2">
                  <Form.Group className="mb-3">
                    <Form.Control
                      as={FormSelect}
                      placeholder="Status"
                      className="form-select-sm"
                      options={statusOptions}
                      value={selectedItem}
                      onChange={(e) => setSelectedItem(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
            </Col>
            <Row className="mt-2">
              <Tab.Container defaultActiveKey="design">
                <Card>
                  <Card.Header className="border-bottom d-flex justify-content-between px-2 pt-2 pb-0">
                    <Nav className="nav-lb-tab border-bottom-0">
                      <Nav.Item>
                        <Nav.Link eventKey="design" className="mb-sm-3 mb-md-0">
                          List Submission
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="react" className="mb-sm-3 mb-md-0">
                          Need To Response{" "}
                          {count.count_submission > 0 ? (
                            <Badge className="ms-1" bg={"primary"}>
                              {count.count_submission}
                            </Badge>
                          ) : (
                            ""
                          )}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>{" "}
                    <div className="">
                      <Form.Control
                        type="text"
                        className="form-control mt-2 form-control-sm"
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </div>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <Tab.Content>
                      <Tab.Pane eventKey="design" className="pb-4 p-4">
                        <ListSubmission
                          selectedItem={selectedItem}
                          selectedSubmissionType={selectedSubmissionType}
                          searchText={searchText}
                          dataList={dataList}
                          status={true}
                        />
                      </Tab.Pane>
                      <Tab.Pane
                        eventKey="react"
                        className="pb-4 p-4 react-code"
                      >
                        <ListSubmission
                          selectedItem={selectedItem}
                          selectedSubmissionType={selectedSubmissionType}
                          searchText={searchText}
                          dataList={dataNtR}
                          status={false}
                        />
                      </Tab.Pane>
                    </Tab.Content>
                  </Card.Body>
                </Card>
              </Tab.Container>
            </Row>
          </Col>
        </Row>
        {errorModal && (
          <NotifSuccessModal show={errorModal} setShow={setErrorModal}>
            <ErrorAlert
              setState={setErrorModal}
              text1={errorMessage}
              className="m-0"
            />
          </NotifSuccessModal>
        )}
      </Fragment>
    </EdigitalLayout>
  );
};
