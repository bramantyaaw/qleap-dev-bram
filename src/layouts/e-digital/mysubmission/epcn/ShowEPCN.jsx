import axios from "axios";
import React, { Fragment, useState } from "react";
import { Alert, Badge, Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FlatPickr } from "../../../../components/components/dashboard/ticketing/elements/date/FlatPickr";
import Swal from "sweetalert2";
import {
  getDateValueEng,
  getScoreColor,
} from "../../../../config/helper/utils";
import { CoreCompetency } from "./CoreCompetency";
import { TechnicalCompetency } from "./TechnicalCompetency";
import TextForm from "../../../../components/components/dashboard/ticketing/elements/text/TextForm";
import ProcessLoadingModal from "../../../../components/components/elements/modal/ProcessLoadingModal";
import ErrorAlert from "../../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import NotifSuccessModal from "../../../../components/components/elements/modal/NotifSuccessModal";

export const ShowEPCN = (props) => {
  const { token, data, type, employee, uid } = props;

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [com, setCom] = useState([]);
  const [tech, setTech] = useState([]);
  const navigate = useNavigate();
  const effectiveDate = data?.map((item) => {
    return item?.effective_date;
  });

  const total = [...com, ...tech];
  let totalScore = 0;
  let count = 0;
  let scoreName;
  let statusName;

  total.forEach((item) => {
    if (item.score_com !== null) {
      totalScore += item.score_com;
      count++;
    }
  });

  const averageScore = count > 0 ? totalScore / count : 0;
  const avgScore = averageScore.toFixed(2);

  if (averageScore >= 0 && averageScore <= 1.9) {
    scoreName = "Failed";
    statusName = "TERMINATED";
  } else if (averageScore >= 2 && averageScore <= 3.49) {
    scoreName = "Achieved";
    statusName = "PERMANENT";
  } else if (averageScore >= 3.5 && averageScore <= 4) {
    scoreName = "Exceed";
    statusName = "PERMANENT";
  } else {
    scoreName = "Invalid input";
  }

  const hasNullScore = total.some(
    (competency) =>
      competency.score_com === null || competency.name_com.trim() === ""
  );

  const submitEPCN = async (e) => {
    e.preventDefault();
    try {
      setModalLoading(true);
      setDisableButton(true);
      await axios
        .post(
          "/epcn/submit-epcn",
          {
            uid_initiator: uid,
            uid_employee: employee,
            change: type,
            notes: note,
            score: "" + avgScore,
            score_name: scoreName,
            effective_date: date,
            score_competency: total,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setModalLoading(false);
            setDisableButton(false);
            // setShow(true);
            // alert("Data submitted successfully!");
            navigate("/submission");
          } else if (res?.status === 500) {
            setWarning(true);
            setModalLoading(false);
            setDisableButton(false);
            return setWarningMessage(res?.data?.message);
          } else if (res?.status === 429) {
            setWarning(true);
            setWarningMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            setModalLoading(false);
            setDisableButton(false);
          }
        });
    } catch (error) {
      return error;
    }
  };

  return (
    <Fragment>
      <div className="mb-4">
        {data?.map((data, id) => {
          return (
            <Fragment>
              {type == 6 && (
                <Row>
                  <Card key={id}>
                    <Card.Header>
                      <h4
                        style={{ fontFamily: "Roboto" }}
                        className="fw-bold my-0"
                      >
                        PROBATION : {data?.nama} ({data?.nik})
                      </h4>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Row>
                          {/* Prob Start */}
                          <Col md={6} sm={12} className="mb-3">
                            <Form.Group className="mb-3">
                              <Form.Label>Probation Start</Form.Label>
                              <Form.Control
                                type="text"
                                value={data?.contract_start}
                                readOnly
                              />
                            </Form.Group>
                          </Col>
                          {/* Prob End */}
                          <Col md={6} sm={12} className="mb-3">
                            <Form.Group className="mb-3">
                              <Form.Label>Probation End</Form.Label>
                              <Form.Control
                                type="text"
                                value={data?.contract_end}
                                readOnly
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6} sm={12} className="mb-3">
                            <Form.Group className="mb-3">
                              <TextForm text="Effective Date" span="*" />
                              <Form.Control
                                type="date"
                                placeholderText="dd/mm/yyyy"
                                as={FlatPickr}
                                setDate={setDate}
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                    </Card.Body>
                  </Card>
                  <Col xl={6} md={12} xs={12} className="my-4 ps-2">
                    <CoreCompetency setTotal={setCom} />
                  </Col>
                  <Col xl={6} md={12} xs={12} className="my-4">
                    <TechnicalCompetency setTotal={setTech} />
                  </Col>
                  <Col xl={4} md={3} xs={12} className="my-4">
                    <Card className="d-flex justfy-content-between pt-3 pb-0 p-4">
                      <h4 className="mb-2">Score Total</h4>
                      <Button
                        variant={`${getScoreColor(scoreName)} `}
                        size="xs"
                        className="text-white"
                      >
                        {scoreName} ({avgScore})
                      </Button>
                      <Row>
                        <p className="fst-italic text-center">
                          0-1,9{" "}
                          <span className="text-danger pe-2">Failed </span>
                          2-3.4
                          <span className="text-warning pe-2"> Achieved </span>
                          3,5-4 <span className="text-success"> Exceed </span>
                        </p>
                      </Row>
                    </Card>
                  </Col>
                  <Col xl={3} md={3} xs={12} className="my-4">
                    {" "}
                    <Card className="d-flex justfy-content-center pt-3 pb-5 p-4">
                      <h4 className=" mb-2">Status :</h4>
                      <Button
                        size="xs"
                        className="text-white"
                        variant={`${getScoreColor(scoreName)} `}
                      >
                        {statusName}
                      </Button>
                    </Card>
                  </Col>
                  <Col xl={5} md={6} xs={12} className="my-4">
                    {" "}
                    <Card className="p-1">
                      <Form.Group className="mb-3">
                        <Form.Label className="ps-2 fst-italic text-muted">
                          Note
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          id="note"
                          name="note"
                          onChange={(e) => setNote(e.target.value)}
                        />
                      </Form.Group>
                    </Card>
                  </Col>
                  {date !== "" && note !== "" && !hasNullScore ? (
                    <Button
                      className="d-flex justify-content-center"
                      onClick={submitEPCN}
                      disabled={disableButton}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button className="d-flex justify-content-center" disabled>
                      Submit
                    </Button>
                  )}
                </Row>
              )}
              {type == 1 && (
                <Row>
                  <Card key={id}>
                    <Card.Header>
                      <h4
                        style={{ fontFamily: "Roboto" }}
                        className="my-0 fw-bold"
                      >
                        CONTRACT TO PERMANENT : {data?.nama} ({data?.nik})
                      </h4>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Row>
                          <Col md={6} sm={12} className="mb-3">
                            <Form.Group
                              className="mb-3"
                              controlId="formProbStart"
                            >
                              <Form.Label>Contract Start</Form.Label>
                              <Form.Control
                                type="text"
                                value={data?.contract_start}
                                readOnly
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6} sm={12} className="mb-3">
                            <Form.Group
                              className="mb-3"
                              controlId="formProbEnd"
                            >
                              <Form.Label>Contract End</Form.Label>
                              <Form.Control
                                type="text"
                                value={data?.contract_end}
                                readOnly
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6} sm={12} className="mb-3">
                            <Form.Group
                              className="mb-3"
                              controlId="formProbEnd"
                            >
                              <Form.Label>Number of Contract</Form.Label>
                              <Form.Control
                                type="text"
                                value={data?.status}
                                readOnly
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6} sm={12} className="mb-3">
                            <Form.Group className="mb-3" controlId="formDate">
                              <TextForm text="Effective Date" span="*" />
                              <Form.Control
                                type="text"
                                placeholderText="dd/mm/yyyy"
                                as={FlatPickr}
                                setDate={setDate}
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                    </Card.Body>
                  </Card>
                  <Col xl={6} md={12} xs={12} className="my-4 ps-2">
                    <CoreCompetency setTotal={setCom} />
                  </Col>
                  <Col xl={6} md={12} xs={12} className="my-4">
                    <TechnicalCompetency setTotal={setTech} />
                  </Col>
                  <Col xl={4} md={4} xs={12} className="my-4">
                    <Card className="d-flex justfy-content-between pt-3 pb-0 p-4">
                      <h4 className="mb-2">Score Total</h4>
                      <Button
                        variant={`${getScoreColor(scoreName)} `}
                        size="xs"
                        className="text-white"
                      >
                        {scoreName} ({avgScore})
                      </Button>
                      <Row>
                        <p className="fst-italic text-center">
                          0-1,9{" "}
                          <span className="text-danger pe-2">Failed </span>
                          2-3.4
                          <span className="text-warning pe-2"> Achieved </span>
                          3,5-4 <span className="text-success"> Exceed </span>
                        </p>
                      </Row>
                    </Card>
                  </Col>

                  <Col xl={8} md={8} xs={12} className="my-4">
                    {" "}
                    <Card className="p-1">
                      <Form.Group className="mb-3">
                        <Form.Label className="ps-2 fst-italic text-muted">
                          Note
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          required
                          onChange={(e) => setNote(e.target.value)}
                        />
                      </Form.Group>
                    </Card>
                  </Col>
                  {date !== "" && note !== "" && !hasNullScore ? (
                    <Button
                      className="d-flex justify-content-center"
                      onClick={submitEPCN}
                      disabled={disableButton}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button className="d-flex justify-content-center" disabled>
                      Submit
                    </Button>
                  )}
                </Row>
              )}
            </Fragment>
          );
        })}
        {warning && (
          <NotifSuccessModal show={warning} setShow={setWarning}>
            <ErrorAlert setState={setWarning} text1={warningMessage} />
          </NotifSuccessModal>
        )}
        {modalLoading && (
          <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
        )}
      </div>
    </Fragment>
  );
};
