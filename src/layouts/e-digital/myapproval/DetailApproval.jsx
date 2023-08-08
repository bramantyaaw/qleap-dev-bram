import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Breadcrumb, Button, Col, Nav, Row, Tab } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import EdigitalLayout from "../../home/EDigitalLayout";
import { FragEmployeeData } from "../mysubmission/FragEmployeeData";
import { JobEvaluation } from "../mysubmission/JobEvaluation";
import NotifSuccessModal from "../../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";

export const DetailApproval = (props) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [dataList, setDataList] = useState([]);
  const [date, setDate] = useState("");
  const { pcn_id } = useParams();
  const pcnIdInt = parseInt(pcn_id, 10);

  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeKey = searchParams.get("empData") || "jobEval";

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
  const saveBase64 = (base64Data) => {
    // Create a blob object from the base64 data
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a temporary URL for the blob object
    const fileUrl = URL.createObjectURL(blob);

    // Create a link element and click it to trigger the download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "adjustment_salary_file.xlsx";
    link.click();

    // Clean up the temporary URL
    URL.revokeObjectURL(fileUrl);
  };

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
            <div className="d-md-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">E-PCN</h1>
                <Breadcrumb>
                  <Breadcrumb.Item href={props.firstLink}>
                    {props.first}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href={props.secLink}>
                    {props.second}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>View Detail</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              {dataList?.base64_adjustment_salary &&
              dataList?.app_type === "" ? (
                <div>
                  <Button
                    size="sm"
                    className="rounded-3"
                    variant="primary"
                    onClick={() =>
                      saveBase64(dataList?.base64_adjustment_salary)
                    }
                  >
                    Download Adjustment Salary
                  </Button>
                </div>
              ) : null}
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={12} sm={12}>
            <Tab.Container defaultActiveKey="empData">
              <Nav className="nav-lb-tab">
                <Nav.Item>
                  <Nav.Link eventKey="empData" className="mb-sm-3 mb-md-0">
                    Employee Data
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="jobEval" className="mb-sm-3 mb-md-0">
                    Job Evaluation
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="empData" className="pb-4 px-2 p-4">
                  <FragEmployeeData data={dataList} setDate={setDate} />
                </Tab.Pane>
                <Tab.Pane eventKey="jobEval" className="pb-4 p-4 px-2">
                  <JobEvaluation
                    data={dataList}
                    pcn_id={pcn_id}
                    date={date}
                    button={props.button}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
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
