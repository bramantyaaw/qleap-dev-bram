import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Breadcrumb, Col, Nav, Row, Tab } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import EdigitalLayout from "../../home/EDigitalLayout";
import { FragEmployeeData } from "./FragEmployeeData";
import { JobEvaluation } from "./JobEvaluation";
import NotifSuccessModal from "../../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import { ProbationForm } from "./epcn/ProbationForm";

export const DetailSubmission = (props) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const [dataList, setDataList] = useState([]);
  const { pcn_id } = useParams();
  const pcnIdInt = parseInt(pcn_id, 10);

  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const nik_employee = dataList?.transaction?.employee_nik;

  const transactionData = dataList?.transaction;
  const newData = [
    {
      nik: transactionData?.employee_nik,
      nama: transactionData?.employee_name,
      contract_start: transactionData?.start_contract_from,
      contract_end: transactionData?.end_contract_from,
      effective_date: transactionData?.effective_date,
      status: transactionData?.emp_type_name_from,
    },
  ];

  const fetchDataAdmin = async () => {
    try {
      await axios
        .post(
          "/epcn/check-admin",
          {
            uid,
            nik_employee,
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

  const fetchData = async () => {
    try {
      await axios
        .post(
          "/epcn/view-epcn",
          {
            uid,
            pcn_id: pcnIdInt,
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
  useEffect(() => {
    fetchDataAdmin();
  }, [nik_employee]);

  useEffect(() => {
    fetchData();
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
            <div
              className={
                dataList?.app_type === "1" && dataList.status_approve
                  ? "border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between"
                  : null
              }
            >
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">E-PCN</h1>
                <Breadcrumb>
                  <Breadcrumb.Item href="/main-desk">E-Digital</Breadcrumb.Item>
                  <Breadcrumb.Item href="/submission">
                    Submission
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>View Detail</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={12} sm={12}>
            {dataList?.app_type === "1" && dataList?.status_approve ? (
              <ProbationForm
                data={newData}
                uid={uid}
                type={dataList?.transaction?.pcn_type_id}
                token={token}
                isAdmin={false}
                apptype={dataList?.app_type}
                pcn_id={pcn_id}
              />
            ) : (
              <>
                {isAdmin ? (
                  <Tab.Container defaultActiveKey="empData">
                    <Nav className="nav-lb-tab">
                      <Nav.Item>
                        <Nav.Link
                          eventKey="empData"
                          className="mb-sm-3 mb-md-0"
                        >
                          Employee Data
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <Tab.Content>
                      <Tab.Pane eventKey="empData" className="pb-4 ps-2 p-4">
                        <FragEmployeeData data={dataList} isAdmin={isAdmin} />
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                ) : (
                  <Tab.Container defaultActiveKey="empData">
                    <Nav className="nav-lb-tab">
                      <Nav.Item>
                        <Nav.Link
                          eventKey="empData"
                          className="mb-sm-3 mb-md-0"
                        >
                          Employee Data
                        </Nav.Link>
                      </Nav.Item>

                      <Nav.Item>
                        <Nav.Link
                          eventKey="jobEval"
                          className="mb-sm-3 mb-md-0"
                        >
                          Job Evaluation
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <Tab.Content>
                      <Tab.Pane eventKey="empData" className="pb-4 ps-2 p-4">
                        <FragEmployeeData data={dataList} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="jobEval" className="pb-4 p-4 ps-2">
                        <JobEvaluation data={dataList} button={props.button} />
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                )}
              </>
            )}
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
