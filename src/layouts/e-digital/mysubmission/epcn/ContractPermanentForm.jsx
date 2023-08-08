import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CloseButton,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FlatPickr } from "../../../../components/components/dashboard/ticketing/elements/date/FlatPickr";
import {
  getDateValueEng,
  getEffectiveDate,
  getScoreColor,
} from "../../../../config/helper/utils";
import { CoreCompetency } from "./CoreCompetency";
import { TechnicalCompetency } from "./TechnicalCompetency";
import TextForm from "../../../../components/components/dashboard/ticketing/elements/text/TextForm";
import ProcessLoadingModal from "../../../../components/components/elements/modal/ProcessLoadingModal";
import ErrorAlert from "../../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import NotifSuccessModal from "../../../../components/components/elements/modal/NotifSuccessModal";
import {
  ExclamationCircleFill,
  InfoCircle,
  InfoCircleFill,
} from "react-bootstrap-icons";
import { mdiCalendarRange } from "@mdi/js";
import Icon from "@mdi/react";

export const ContractPermanentForm = (props) => {
  const { token, data, type, employee, uid, isAdmin, apptype, pcn_id } = props;

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [com, setCom] = useState([]);
  const [tech, setTech] = useState([]);
  const navigate = useNavigate();

  const pcnIdInt = parseInt(pcn_id, 10);
  const [fileName, setFileName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [fileExt, setFileExt] = useState("");

  const [warningFile, setWarningFile] = useState(false);
  const [file, setFile] = useState(null);
  const [disableFile, setDisableFile] = useState(false);

  const [isCoaching, setIsCoaching] = useState(false);
  const [coachingDate, setCoachingDate] = useState("");

  const onChangeFile = (e) => {
    if (e.target.files[0]?.size >= 1000000) {
      setWarningFile(true);
      setDisableFile(true);
    } else {
      setFile(e.target.files[0]);
      setDisableFile(false);
    }
  };

  const getDate = data?.[0].effective_date;
  const effDate = !date ? getEffectiveDate(getDate) : date;
  const setEffDate = getDate ? getDate : date;
  const today = new Date();

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

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      setIsLoading(true);
      await axios
        .post("/upload/single-file", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            const newFile = res?.data?.data?.file_name;
            const newFolder = res?.data?.data?.folder_name;
            const newExt = res?.data?.data?.file_ext;
            setFileName(newFile);
            setFolderName(newFolder);
            setFileExt(newExt);
            setIsLoading(false);
          } else {
            return res;
          }
        });
    } catch (err) {
      return err;
    }
  };

  const ref = useRef();
  const deleteFile = () => {
    ref.current.value = "";
    setDisableFile(false);
    file !== null && deleteFolder(folderName);
  };

  const deleteFolder = async (folderName) => {
    try {
      await axios
        .delete(
          `/upload/remove-temp-folder/${folderName}`,

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(async (res) => {
          if (res?.status === 200) {
            setFile(null);
            setFileName("");
            setFolderName("");
          } else {
            return res;
          }
        });
    } catch (e) {
      return e;
    }
  };

  const dataInput = isAdmin
    ? {
        uid_initiator: uid,
        uid_employee: employee,
        change: type,
        submit_by: "admin",
        effective_date: setEffDate,
      }
    : file
    ? {
        uid_initiator: uid,
        uid_employee: employee,
        change: type,
        notes: note,
        submit_by: "initiator",
        score: "" + avgScore,
        score_name: scoreName,
        effective_date: setEffDate,
        score_competency: total,
        coaching_date: coachingDate,
        is_coaching: isCoaching,
        files: [
          {
            folder_name: folderName,
            file_name: fileName,
            file_extension: fileExt,
            collection_name: "epcn_file",
          },
        ],
      }
    : {
        uid_initiator: uid,
        uid_employee: employee,
        change: type,
        notes: note,
        submit_by: "initiator",
        score: "" + avgScore,
        score_name: scoreName,
        effective_date: setEffDate,
        score_competency: total,
        coaching_date: coachingDate,
        is_coaching: isCoaching,
      };

  const submitEPCN = async (e) => {
    e.preventDefault();
    try {
      setModalLoading(true);
      setDisableButton(true);
      await axios
        .post("/epcn/submit-epcn", dataInput, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            setModalLoading(false);
            setDisableButton(false);
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
          } else if (res?.status === 400) {
            setWarning(true);
            setModalLoading(false);
            setWarningMessage("Please fill all the required fields..");
          } else {
            setModalLoading(false);
            setDisableButton(false);
          }
        });
    } catch (error) {
      return error;
    }
  };

  const approveInput = file
    ? {
        app_uid: uid,
        result: "approved",
        pcn_id: pcnIdInt,
        app_type: apptype,
        app_notes: note,
        effective_date: effDate,
        score: "" + avgScore,
        score_name: scoreName,
        score_competency: total,
        coaching_date: coachingDate,
        is_coaching: isCoaching,
        files: [
          {
            folder_name: folderName,
            file_name: fileName,
            collection_name: "epcn_file",
          },
        ],
      }
    : {
        app_uid: uid,
        result: "approved",
        pcn_id: pcnIdInt,
        app_type: apptype,
        app_notes: note,
        effective_date: effDate,
        score: "" + avgScore,
        score_name: scoreName,
        score_competency: total,
        coaching_date: coachingDate,
        is_coaching: isCoaching,
      };

  const approveEPCN = async (e) => {
    e.preventDefault();
    try {
      setModalLoading(true);
      setDisableButton(true);
      await axios
        .post("/epcn/submit-approval", approveInput, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            setModalLoading(false);
            setDisableButton(false);
            navigate("/submission");
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
          } else if (res?.status === 400) {
            setWarning(true);
            setWarningMessage("Please fill all the required fields..");
          } else {
            setModalLoading(false);
            setDisableButton(false);
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    file !== null && uploadFile();
  }, [file]);

  return (
    <Fragment>
      <div className="mb-4">
        {data?.map((data, id) => {
          return (
            <Fragment key={id}>
              <Row>
                <Card key={id} className="mb-4">
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
                              value={getDateValueEng(data?.contract_start)}
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} sm={12} className="mb-3">
                          <Form.Group className="mb-3" controlId="formProbEnd">
                            <Form.Label>Contract End</Form.Label>
                            <Form.Control
                              type="text"
                              value={getDateValueEng(data?.contract_end)}
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} sm={12} className="mb-3">
                          <Form.Group className="mb-3" controlId="formProbEnd">
                            <Form.Label>Number of Contract</Form.Label>
                            <Form.Control
                              type="text"
                              value={data?.status}
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} sm={12} className="mb-3">
                          {apptype === "1" ? (
                            <Form.Group className="mb-3">
                              <TextForm text="Effective Date" span="*" />
                              {getDate ? (
                                <Form.Control
                                  type="text"
                                  value={getDateValueEng(data?.effective_date)}
                                  readOnly
                                />
                              ) : (
                                <Form.Control
                                  type="date"
                                  placeholderText={data?.effective_date}
                                  as={FlatPickr}
                                  minDate={data?.effective_date}
                                  effDate
                                  setDate={setDate}
                                  required
                                />
                              )}
                            </Form.Group>
                          ) : (
                            <Form.Group className="mb-3">
                              <TextForm text="Effective Date" span="*" />
                              {getDate ? (
                                <Form.Control
                                  type="text"
                                  value={getDateValueEng(data?.effective_date)}
                                  readOnly
                                />
                              ) : (
                                <Form.Control
                                  type="date"
                                  placeholderText={data?.effective_date}
                                  as={FlatPickr}
                                  minDate={today}
                                  effDate
                                  setDate={setDate}
                                  required
                                />
                              )}
                            </Form.Group>
                          )}
                        </Col>
                        {!isAdmin && (
                          <Col md={6} sm={12} className="mb-0">
                            <Form.Group className="mb-0">
                              <Form.Label>Supporting Document </Form.Label>
                              <div className="position-relative">
                                <Form.Control
                                  type="file"
                                  accept=".doc,.docx,.pdf,.xls,.xlsx"
                                  onChange={(e) => onChangeFile(e)}
                                  ref={ref}
                                  disabled={fileName}
                                />
                                {file || disableFile ? (
                                  <div>
                                    <CloseButton
                                      onClick={deleteFile}
                                      className="btn-close form-contol position-absolute"
                                      style={{ top: "15px", right: "10px" }}
                                    />
                                  </div>
                                ) : null}
                              </div>
                              <div className="d-flex justify-content-between">
                                <Form.Text>
                                  If any (e.g performance, 360 assessment, etc)
                                </Form.Text>
                                {isLoading && (
                                  <Form.Text>Uploading...</Form.Text>
                                )}
                              </div>
                            </Form.Group>
                          </Col>
                        )}
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
                {!isAdmin ? (
                  <>
                    <Alert
                      variant="info"
                      className="d-flex flex-column flex-md-row justify-content-between align-items-center"
                    >
                      <div className="d-flex flex-column flex-md-row align-items-md-center">
                        <Form>
                          <Form.Check
                            aria-label="oneOnOne"
                            className="me-2"
                            onChange={(e) => {
                              setIsCoaching(e.target.checked);
                            }}
                          />
                        </Form>
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="me-2">
                            Dengan ini saya menyatakan sudah melakukan evaluasi
                            kinerja (one on one) dengan karyawan yang
                            bersangkutan pada tanggal :
                          </span>
                          <span className="position-relative">
                            <Form.Control
                              type="date"
                              placeholderText="dd/mm/yyyy"
                              as={FlatPickr}
                              className="ms-2 form-control-sm rounded-3"
                              setDate={setCoachingDate}
                              required
                            />
                            <Icon
                              path={mdiCalendarRange}
                              size={0.8}
                              className="position-absolute text-secondary"
                              style={{
                                top: "10px",
                                right: "5px",
                                color: "secondary",
                              }}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="ms-md-2 mt-2 mt-md-0 text-end">
                        <OverlayTrigger
                          placement="top"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip id="button-tooltip">
                              Dengan menchecklist pernyataan ini maka sistem
                              akan mengrimkan email notifikasi kepada karyawan
                              terkait, tentang info ini.
                            </Tooltip>
                          }
                        >
                          <InfoCircleFill size={25} />
                        </OverlayTrigger>
                      </div>
                    </Alert>
                    <Col xl={6} md={12} xs={12} className="mb-4 ps-2">
                      <CoreCompetency setTotal={setCom} />
                    </Col>
                    <Col xl={6} md={12} xs={12} className="mb-4">
                      <TechnicalCompetency setTotal={setTech} />
                    </Col>
                    <Col xl={4} md={4} xs={12} className="mb-4">
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
                            <span className="text-warning pe-2">
                              {" "}
                              Achieved{" "}
                            </span>
                            3,5-4 <span className="text-success"> Exceed </span>
                          </p>
                        </Row>
                      </Card>
                    </Col>

                    <Col xl={8} md={8} xs={12} className="mb-4">
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
                            onChange={(e) => {
                              const inputValue = e.target.value.trim(); // Remove leading/trailing whitespace
                              if (inputValue !== "") {
                                // Check if the input is not empty
                                setNote(inputValue);
                              }
                            }}
                            onBlur={(e) => {
                              const inputValue = e.target.value.trim(); // Remove leading/trailing whitespace
                              if (inputValue === "") {
                                // Check if the input is empty
                                setNote("");
                              }
                            }}
                          />
                        </Form.Group>
                      </Card>
                    </Col>
                  </>
                ) : null}
                <Button
                  className="d-flex justify-content-center"
                  onClick={apptype === "1" ? approveEPCN : submitEPCN}
                  disabled={
                    isAdmin
                      ? effDate === ""
                      : apptype === "1"
                      ? !(note !== "" && !hasNullScore) ||
                        disableFile ||
                        !isCoaching ||
                        coachingDate === ""
                      : !(setEffDate !== "" && note !== "" && !hasNullScore) ||
                        disableFile ||
                        !isCoaching ||
                        coachingDate === ""
                  }
                >
                  Submit
                </Button>
              </Row>
            </Fragment>
          );
        })}
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
        {warningFile && (
          <NotifSuccessModal show={warningFile} setShow={setWarningFile}>
            <ErrorAlert
              setState={setWarningFile}
              text1="File yang diunggah lebih dari 1 MB,"
              span="Mohon unggah ulang dibawah 1 MB"
              className="mb-0"
            />
          </NotifSuccessModal>
        )}
      </div>
    </Fragment>
  );
};
