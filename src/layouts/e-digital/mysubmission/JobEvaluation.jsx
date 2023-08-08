import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import CompetencyChart from "../../../components/components/dashboard/chart/CompetencyChart";
import { JobEvaluationButton } from "../../../components/components/elements/button/JobEvaluationButton";
import { ApproveModal } from "../../../components/components/elements/popup/ApproveModal";
import { RejectModal } from "../../../components/components/elements/popup/RejectModal";
import { getEffectiveDate, getScoreColor } from "../../../config/helper/utils";
import { useNavigate } from "react-router-dom";
import { AdjustmentSalary } from "./epcn/AdjustmentSalary";
import NotifSuccessModal from "../../../components/components/elements/modal/NotifSuccessModal";
import ProcessLoadingModal from "../../../components/components/elements/modal/ProcessLoadingModal";
import ErrorAlert from "../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";

export const JobEvaluation = ({ data, pcn_id, date, button }) => {
  const score = data?.score;
  const scoreValue = data?.transaction?.score;
  const transactions = data?.transaction;
  const notes = data?.notes;

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [salary, setSalary] = useState([]);
  const [appNotes, setAppNotes] = useState("");
  const effDate = !date ? getEffectiveDate(transactions?.effective_date) : date;
  const type = transactions?.pcn_type;
  const hasEmptySalaryValue = salary.some(
    (item) => item.salary_item_value === "" || item.salary_item_code === ""
  );

  const chartDataCore = {
    series: [
      {
        name: "Nilai",
        data: score?.score_core.map((item) => Number(item.nilai)),
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      xaxis: {
        categories: score?.score_core.map((item) => item.kompetensi),
        max: 4,
        tickAmount: 4,
      },
      dataLabels: {
        enabled: false,
      },
      colors: [
        function ({ value, seriesIndex, w }) {
          if (value == 1) {
            return "#E53F3C";
          } else if (value == 2) {
            return "#FFAA46";
          } else if (value == 3) {
            return "#FFAA46";
          } else if (value == 4) {
            return "#19CB98";
          } else {
            return "#BCBCBC";
          }
        },
      ],
    },
  };

  const chartDataTechnical = {
    series: [
      {
        name: "Nilai",
        data: score?.score_techincal.map((item) => Number(item.nilai)),
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      xaxis: {
        categories: score?.score_techincal.map((item) => item.kompetensi),
        max: 4,
        tickAmount: 4,
      },

      dataLabels: {
        enabled: false,
      },
      colors: [
        function ({ value, seriesIndex, w }) {
          if (value == 1) {
            return "#E53F3C";
          } else if (value == 2) {
            return "#FFAA46";
          } else if (value == 3) {
            return "#FFAA46";
          } else if (value == 4) {
            return "#19CB98";
          } else {
            return "#BCBCBC";
          }
        },
      ],
    },
  };

  let scoreName;
  if (scoreValue >= 0 && scoreValue <= 1.9) {
    scoreName = "Failed";
  } else if (scoreValue >= 2 && scoreValue <= 3.49) {
    scoreName = "Achieved";
  } else if (scoreValue >= 3.5 && scoreValue <= 4) {
    scoreName = "Exceed";
  } else {
    scoreName = "Invalid input";
  }

  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const approveEPCN = async (e, value) => {
    e.preventDefault();
    const pcnIdInt = +pcn_id;
    const toStringData = value?.toString();
    try {
      setModalLoading(true);
      setDisableButton(true);
      setShowApprove(false);
      setShowReject(false);
      await axios
        .post(
          "/epcn/submit-approval",
          {
            app_uid: uid,
            result: toStringData,
            pcn_id: pcnIdInt,
            app_type: data?.app_type,
            app_notes: appNotes,
            effective_date: effDate,
            salary,
            score_competency: [],
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setSuccess(res?.status);
            setModalLoading(false);
            setDisableButton(false);
            // alert(`EPCN ${toStringData} successfully!`);
            if (data?.app_type === "bp" && data?.status_approve === true) {
              navigate("/main-desk/epcn?activeKey=transaction");
            } else if (
              data?.app_type === "pr" &&
              data?.status_approve === true
            ) {
              window.location.reload();
              // navigate("/main-desk/epcn?activeKey=transaction");
            } else {
              navigate("/approval");
            }
          } else if (res?.status === 500) {
            setWarning(true);
            setModalLoading(false);
            setDisableButton(false);
            return setWarningMessage(res?.data?.message);
          } else if (res?.status === 429) {
            setWarning(true);
            setModalLoading(false);
            setDisableButton(false);
            return setWarningMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            setModalLoading(false);
            setDisableButton(false);
          }
        });
    } catch (err) {
      return err;
    }
  };

  const approve = () => {
    setShowApprove(true);
  };
  const reject = () => {
    setShowReject(true);
  };

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, [localStorage]);

  return (
    <Fragment>
      <Row>
        <Col md={12} xl={6} xs={12}>
          {/* <Row> */}
          <Col xs={12} className="mb-2">
            <CompetencyChart
              cardHeader="Core Competency"
              dataOption={chartDataCore.options}
              dataSeries={chartDataCore.series}
              type="bar"
            />
          </Col>
          {chartDataTechnical?.series[0]?.data?.length > 0 ? (
            <Col md={12} className="mb-2">
              <CompetencyChart
                cardHeader="Technical Competency"
                dataOption={chartDataTechnical.options}
                dataSeries={chartDataTechnical.series}
                type="bar"
                height="100%"
              />
            </Col>
          ) : null}

          <Col md={12} className="mb-2">
            <Card className="d-flex justfy-content-between pb-2 pt-3 px-4">
              <h5 style={{ fontFamily: "Roboto" }} className="fw-bold">
                Score Total (Total/Number Of Competency) :{" "}
                <Button
                  size="sm"
                  className="flex-column text-white "
                  variant={`${getScoreColor(scoreName)} `}
                >
                  {scoreName} ({scoreValue})
                </Button>
              </h5>
            </Card>
          </Col>
          {/* </Row> */}
        </Col>
        <Col md={12} xl={6} xs={12}>
          <Card>
            <Card.Body className="pt-3">
              {notes?.initiator_notes?.map((item, index) => {
                return (
                  <div>
                    <p className="fst-italic my-2">Note : {item?.name}</p>
                    <Form.Control
                      value={item?.note}
                      id="note"
                      as="textarea"
                      rows={3}
                      style={{ resize: "none" }}
                      disabled
                    />
                  </div>
                );
              })}

              {data?.app_type !== "bp" &&
                notes?.latest_notes?.map((item, index) => {
                  return (
                    <div key={index} className="pt-3">
                      <p className="fst-italic my-2">Note : {item?.name}</p>
                      <Form.Control
                        value={item?.note}
                        id="note"
                        // type="text"
                        as="textarea"
                        rows={3}
                        style={{ resize: "none" }}
                        disabled
                      />
                    </div>
                  );
                })}

              {type === "Pass Probation" ? (
                <Col md={8}>
                  <AdjustmentSalary setSalary={setSalary} data={data} />
                </Col>
              ) : null}

              {data?.status_approve && button ? (
                <div class="d-flex justify-content-end mt-3 mb-3 pb-0">
                  {hasEmptySalaryValue ? (
                    <div>
                      {data?.app_type !== "pr" && (
                        <JobEvaluationButton
                          onClick={() => reject()}
                          size="xs"
                          className="me-2"
                          variant="danger"
                          buttonName="Reject"
                          disabled
                        />
                      )}
                      <JobEvaluationButton
                        onClick={() => approve()}
                        size="xs"
                        variant="primary"
                        buttonName="Approve"
                        disabled
                      />
                    </div>
                  ) : (
                    <div>
                      {data?.app_type !== "pr" && (
                        <JobEvaluationButton
                          onClick={() => reject()}
                          size="xs"
                          className="me-2"
                          variant="danger"
                          buttonName={
                            scoreName === "Failed" && data?.app_type === "bp"
                              ? "Terminate"
                              : "Reject"
                          }
                        />
                      )}
                      {data?.app_type === "bp" &&
                      scoreName === "Failed" ? null : (
                        <JobEvaluationButton
                          onClick={() => approve()}
                          size="xs"
                          variant="primary"
                          buttonName={
                            scoreName === "Failed" && data?.app_type === "bp"
                              ? "Pass"
                              : "Approve"
                          }
                        />
                      )}
                    </div>
                  )}
                </div>
              ) : null}
            </Card.Body>
          </Card>
          {notes?.payroll_notes && notes?.payroll_notes?.length !== 0 ? (
            <Card className="mt-2">
              <Card.Body className="pt-1">
                {notes?.payroll_notes?.map((item, index) => {
                  return (
                    <div key={index}>
                      <p className="fst-italic my-2">Note : {item?.name}</p>
                      <Form.Control
                        value={item?.note}
                        id="note"
                        as="textarea"
                        rows={3}
                        style={{ resize: "none" }}
                        disabled
                      />
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          ) : null}
        </Col>
        <ApproveModal
          show={showApprove}
          setShow={setShowApprove}
          handleApprove={approveEPCN}
          setAppNotes={setAppNotes}
          score={scoreName}
          appType={data?.app_type}
          note={appNotes}
          disableButton={disableButton}
        />
        <RejectModal
          show={showReject}
          setShow={setShowReject}
          handleApprove={approveEPCN}
          setAppNotes={setAppNotes}
          score={scoreName}
          appType={data?.app_type}
          note={appNotes}
          disableButton={disableButton}
        />
        {warning && (
          <NotifSuccessModal show={warning} setShow={setWarning}>
            <ErrorAlert
              setState={setWarning}
              text1={warningMessage}
              className="mb-0"
            />
          </NotifSuccessModal>
        )}
        {modalLoading && (
          <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
        )}
      </Row>
    </Fragment>
  );
};
