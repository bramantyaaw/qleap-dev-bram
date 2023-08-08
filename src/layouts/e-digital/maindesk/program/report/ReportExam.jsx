import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Nav, Row, Tab } from "react-bootstrap";
import StatLeftBGIcon from "../../../../../components/components/dashboard/common/stats/StatLeftBGIcon";
import {
  mdiClockTimeEightOutline,
  mdiAccountGroupOutline,
  mdiFileOutline,
  mdiClipboardCheckOutline,
} from "@mdi/js";
import { ListParticipant } from "./ListParticipant";
import { QuestionList } from "./QuestionList";
import axios from "axios";
import ProcessLoadingModal from "../../../../../components/components/elements/modal/ProcessLoadingModal";
import ErrorAlert from "../../../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import NotifSuccessModal from "../../../../../components/components/elements/modal/NotifSuccessModal";

export const ReportExam = (props) => {
  const { show, setShow, onHide, className, id, title } = props;

  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [dataList, setDataList] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const fetchExam = async () => {
    try {
      setSpinner(true);
      await axios
        .post(
          "/euniv/get-report-exam",
          {
            exam_id: parseInt(id),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setSpinner(false);
            setDataList(res?.data?.data);
          } else if (res?.status === 500) {
            setSpinner(false);
            setWarning(true);
            setWarningMessage(res?.data?.message);
          } else {
            setSpinner(false);
          }
        });
    } catch (e) {
      setWarning(true);
      setWarningMessage("Problem occurred");
      return e;
    }
  };

  // console.log(title);

  const ExportExcel = async () => {
    try {
      setModalLoading(true);
      const { data, headers } = await axios.post(
        "/euniv/export-excel",
        { exam_id: parseInt(id) },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "arraybuffer",
        }
      );
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Report_${title}.xlsx`);
      document.body.appendChild(link);
      link.click();
      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      setWarning(true);
      setWarningMessage("Error generating download, please try again later");
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    fetchExam();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, [localStorage]);

  return (
    <>
      <Modal
        size="xl"
        show={show}
        onHide={onHide ? onHide : () => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title className={`text-darkest fw-bold ${className}`}>
            Report Exam
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="d-flex justify-content-between">
            <Col lg={3} md={6} sm={12} className="">
              <StatLeftBGIcon
                title="All Participant"
                value={dataList?.all_participant}
                iconName={mdiAccountGroupOutline}
                iconColorVariant="primary"
                classValue="h-100"
                classText="fw-bold m-0"
                euniv
              />
            </Col>
            <Col lg={3} md={6} sm={12}>
              <StatLeftBGIcon
                title="Average Score"
                value={dataList?.average_grade}
                iconName={mdiFileOutline}
                iconColorVariant="warning"
                classValue="h-100"
                classText="fw-bold m-0"
                euniv
                spanClassName="fs-6 text-muted"
              />
            </Col>
            <Col lg={3} md={6} sm={12}>
              <StatLeftBGIcon
                title="Pass Participant"
                value={dataList?.pass_participant}
                iconName={mdiClipboardCheckOutline}
                iconColorVariant="info"
                classValue="h-100"
                summary2={`Who got score up to ${dataList?.min_score}`}
                classText="fw-bold m-0"
                euniv
              />
            </Col>
            <Col lg={3} md={6} sm={12}>
              <StatLeftBGIcon
                title="Average Time"
                value={dataList?.average_time}
                iconName={mdiClockTimeEightOutline}
                iconColorVariant="success"
                classValue="h-100"
                classText="fw-bold m-0"
                euniv
              />
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12} sm={12} className="mt-3">
              <Tab.Container defaultActiveKey="all">
                <Nav className="nav-lb-tab">
                  <Nav.Item>
                    <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                      List Participant{" "}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="approved" className="mb-sm-3 mb-md-0">
                      Questions List
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="all" className="pb-4">
                    <ListParticipant
                      id={id}
                      items={dataList?.list_participant}
                      spinner={spinner}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="approved" className="pb-4">
                    <QuestionList
                      id={id}
                      title={title}
                      items={dataList?.questions}
                      spinner={spinner}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
          <div className="d-flex justify-content-end mt-3">
            <Button
              onClick={ExportExcel}
              variant="outline-primary"
              size="md"
              className="rounded-3"
            >
              Export Exam Report
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
      {warning && (
        <NotifSuccessModal show={warning} setShow={setWarning}>
          <ErrorAlert
            setState={setWarning}
            text1={warningMessage}
            className="mb-0"
          />
        </NotifSuccessModal>
      )}
    </>
  );
};
