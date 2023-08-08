// import node module libraries
import React, {
  useContext,
  Fragment,
  useState,
  useEffect,
  useRef,
} from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  Accordion,
  Card,
  useAccordionButton,
  AccordionContext,
  OverlayTrigger,
  Tooltip,
  Button,
  InputGroup,
  Form,
  Image,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import { MdDragHandle } from "react-icons/md";
import Icon from "@mdi/react";
import { mdiNote, mdiFitToScreen } from "@mdi/js";
import { AddNewModal } from "../../../../../layouts/e-digital/maindesk/category/modal/AddNewModal";
import { QuestionModal } from "../../../elements/modal/QuestionModal";
import GKAccordionQuestion from "./GKAccordionQuestion";
import axios from "axios";
import Select from "react-select";
import ReactQuill from "react-quill";
import { async } from "regenerator-runtime";
import { ReportExam } from "../../../../../layouts/e-digital/maindesk/program/report/ReportExam";
import ModalPICTicket from "../../../database-admin/elements/ModalPICTicket";
import NotifSuccessModal from "../../../elements/modal/NotifSuccessModal";
import ProcessLoadingModal from "../../../elements/modal/ProcessLoadingModal";
import ErrorAlert from "../../../dashboard/ticketing/elements/alerts/ErrorAlert";
import { mdiClose as CloseIcon } from "@mdi/js";
import LoadingComponent from "../../../elements/loading/LoadingComponent";
import { CloseButton } from "react-bootstrap";
import { saveAs } from "file-saver";

const GKAccordionExam = ({
  accordionItems,
  uid,
  token,
  fetchSilabus,
  silabusId,
  report,
  questionCache,
  questionList,
  fetchQuestion,
  updatedQuestion,
  setUpdatedQuestion,
  setQuestionList,
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showExisting, setShowExisting] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [reportExam, setReportExam] = useState(false);
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const [title, setTitle] = useState("");
  const [examTitle, setExamTitle] = useState("");
  const [chance, setChance] = useState("");
  const [minScore, setMinScore] = useState("");
  const [questionShow, setQuestionShow] = useState("");
  const [desc, setDesc] = useState("");
  const [trainingCode, setTrainingCode] = useState("");

  const [updatedId, setUpdatedId] = useState(""); //for exam_id

  const [questionExisting, setQuestionExisting] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search_term, setSearchTerm] = useState("");
  const [examOptions, setExamOptions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [warningFile, setWarningFile] = useState(false);
  const [banner, setBanner] = useState(null);
  const [file, setFile] = useState();

  const [caution, setCaution] = useState(false);

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));

  const ActionMenu = ({ id, title }) => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <i className="fs-5 fe fe-more-vertical text-muted"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu align="end">
          <Dropdown.Header>Settings</Dropdown.Header>
          <Dropdown.Item
            onClick={() => {
              setReportExam(true);
              setUpdatedId(id);
              setTitle(title);
            }}
            eventKey="1"
          >
            {" "}
            <i className="dropdown-item-icon fe fe-eye text-black"></i>See
            Learning Status
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const ContextAwareToggle = ({
    children,
    eventKey,
    callback,
    idx,
    count,
    show,
    item,
  }) => {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    const isCurrentEventKey = currentEventKey === eventKey;
    const overlayKeyEdit = uuid();
    const overlayKeyDelete = uuid();

    return (
      <Fragment>
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="mb-0 fw-bold">
            <Link
              onClick={decoratedOnClick}
              aria-expanded={isCurrentEventKey}
              to="#"
              className="text-inherit"
            >
              <span className="align-middle p-1">{children}</span>
            </Link>
          </h5>
          <div>
            {report ? (
              <ActionMenu id={eventKey} title={item?.name} />
            ) : (
              <>
                <Link
                  to="#"
                  className={
                    count < show ? "me-1 text-danger" : "me-1 text-primary"
                  }
                >
                  <i className="fe fe-alert-circle fs-6"></i> {count} Questions
                </Link>
                <OverlayTrigger
                  key={overlayKeyEdit}
                  placement="top"
                  overlay={<Tooltip id="tooltip-top"> Edit</Tooltip>}
                >
                  <Link
                    to="#"
                    onClick={() => {
                      setShowUpdate(true);
                      setUpdatedId(eventKey);
                      setExamTitle(item?.name);
                      setMinScore(item?.min_score);
                      setChance(item?.max_attempt);
                      setQuestionShow(item?.question_show);
                      setDesc(item?.description);
                      setTrainingCode(item?.training_code);
                    }}
                    className="me-1 text-inherit"
                    title="Edit"
                  >
                    <i className="fe fe-edit fs-6"></i>
                  </Link>
                </OverlayTrigger>

                <OverlayTrigger
                  key={overlayKeyDelete}
                  placement="top"
                  overlay={<Tooltip id="tooltip-top"> Delete</Tooltip>}
                >
                  <Link
                    to="#"
                    onClick={
                      count > 0
                        ? () => setCaution(true)
                        : () => deleteExam(silabusId, eventKey, idx)
                    }
                    className="me-1 text-inherit"
                    title="Delete"
                  >
                    <i className="fe fe-trash-2 fs-6"></i>
                  </Link>
                </OverlayTrigger>

                <Link
                  to="#"
                  className="text-inherit"
                  data-bs-toggle="collapse"
                  onClick={decoratedOnClick}
                  aria-expanded={isCurrentEventKey}
                >
                  <span className="chevron-arrow">
                    <i className="fe fe-chevron-down fs-5"></i>
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
        {caution && (
          <ModalPICTicket
            setShow={setCaution}
            show={caution}
            buttonClassName="py-2 px-3 rounded-3  h4"
            onClick={() => {
              deleteExam(silabusId, eventKey, idx);
              setCaution(false);
            }}
            title="Caution"
          >
            <p className="mb-0 text-kinda-dark">
              Are you sure want to delete this exam ? There is a questions in
              this exam.
            </p>
          </ModalPICTicket>
        )}
      </Fragment>
    );
  };

  function handleChange(value) {
    setDesc(value);
  }

  const handleSelectedExam = (selectedOption) => {
    // fetchExistingQuestion(selectedOption?.value);
    fetchQuestion(selectedOption?.value);
  };

  const handleInputChange = (inputValue) => {
    if (inputValue?.length <= 14) {
      if (inputValue?.length % 3 === 0) {
        setSearchTerm(inputValue);
      }
    } else if (inputValue?.length >= 14) {
      setSearchTerm(inputValue);
    }
  };

  const updateExam = async (e, value) => {
    e.preventDefault();
    try {
      setModalLoading(true);
      setDisableButton(true);
      await axios
        .post(
          "/euniv/update-exam",
          {
            id: parseInt(value),
            uid: uid,
            name: examTitle,
            description: desc,
            questions_show: parseInt(questionShow),
            max_attempt: parseInt(chance),
            minimum_score: parseInt(minScore),
            training_code: trainingCode,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(async (res) => {
          if (res?.status === 200) {
            setShowUpdate(false);
            setModalLoading(false);
            setDisableButton(false);
            await fetchSilabus();
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
    } catch (e) {
      return e;
    }
  };

  const deleteExam = async (silabusId, updatedId, idx) => {
    try {
      setModalLoading(true);
      await axios
        .delete(`/euniv/delete-exam/${silabusId}/${updatedId}/${idx}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          if (res?.status === 200) {
            await fetchSilabus();
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 1000);
            setModalLoading(false);
          } else if (res?.status === 500) {
            setWarning(true);
            setModalLoading(false);
            return setWarningMessage(res?.data?.message);
          } else if (res?.status === 429) {
            setWarning(true);
            setModalLoading(false);
            return setWarningMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            setModalLoading(false);
          }
        });
    } catch (e) {
      return e;
    }
  };

  //Searh Exam
  const fetchExam = async (value) => {
    try {
      await axios
        .post(
          "/euniv/get-exam",
          {
            search_term: search_term,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          const newData = res?.data?.data;
          const newObjArr = newData?.map((data) => {
            const obj = {
              value: data?.id,
              label: data?.name,
            };
            return obj;
          });
          setExamOptions(newObjArr);
        });
    } catch (e) {
      return e;
    }
  };

  const submitExistingQuestion = async (e, exam_id, type) => {
    e.preventDefault();
    try {
      let dataInput =
        type === "existing"
          ? {
              exam_id: parseInt(exam_id),
              uid,
              type_submit: "existing",
              question_id: selectedIds,
            }
          : {
              exam_id: parseInt(exam_id),
              uid,
              type_submit: "excel",
              files: [
                {
                  folder_name: file.folderName,
                  file_name: file.fileName,
                  file_extension: file.fileExtension,
                  collection_name: "question_files",
                },
              ],
            };
      setModalLoading(true);
      setDisableButton(true);
      await axios
        .post("/euniv/submit-question", dataInput, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            setQuestionExisting(res?.data?.data);
            setUpdatedQuestion(true);
            setShowExisting(false);
            setModalLoading(false);
            setDisableButton(false);
            setShowAdd(false);
            setFile({
              ...file,
              fileName: "",
              folderName: "",
              fileExtension: "",
            });
            setBanner(null);
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
    } catch (e) {
      return e;
    }
  };

  const handleAccordionClick = (exam_id) => {
    fetchQuestion(exam_id);
    setUpdatedId(exam_id);
  };

  const ref = useRef();
  const deleteFile = () => {
    ref.current.value = "";
    setWarningFile(false);
    deleteFolder(file.folderName);
  };

  const deleteFolder = async (folderName) => {
    try {
      await axios
        .delete(`/upload/remove-temp-folder/${folderName}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          if (res?.status === 200) {
            setFile({
              ...file,
              fileName: "",
              folderName: "",
              fileExtension: "",
            });
            setBanner(null);
          } else {
            return res;
          }
        });
    } catch (e) {
      return e;
    }
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size >= 1000000) {
        setWarningFile(true);
        setWarningMessage("File size must be less than 1MB");
      } else {
        setBanner(file);
      }
    }
  };

  const uploadFile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", banner);
    try {
      await axios
        .post("/upload/single-file", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            setLoading(false);

            const newFile = res?.data?.data?.file_name;
            const newFolder = res?.data?.data?.folder_name;
            const newExt = res?.data?.data?.file_ext;
            setFile({
              ...file,
              fileName: newFile,
              folderName: newFolder,
              fileExtension: newExt,
            });
          } else if (res?.status === 500) {
            setLoading(false);
            return setWarningMessage(res?.data?.message);
          } else if (res?.status === 400) {
            setLoading(false);
            return setWarningMessage(res?.data?.message);
          } else {
            return res;
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    banner !== null && uploadFile();
  }, [banner]);

  useEffect(() => {
    if (updatedQuestion) {
      fetchQuestion(updatedId);

      fetchSilabus();
      setUpdatedQuestion(false); // Reset the updatedQuestion state after fetching
    }
  }, [updatedQuestion, updatedId]);

  useEffect(() => {
    showExisting && fetchExam();
  }, [search_term]);

  const downloadTemplate = async () => {
    try {
      const response = await axios.get("/euniv/download-excel-question", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fileUrl = response.data.data.file_path;
      const fileName = "template.xlsx";

      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      // Clean up after the download
      document.body.removeChild(link);
    } catch (e) {
      return e;
    }
  };

  const saveFile = (fileUrl) => {
    const fileName = fileUrl.split("/").pop();
    saveAs(fileUrl, fileName);
  };

  // useEffect(() => {
  //   fetchTemplate();
  // }, []);

  return (
    <Fragment>
      {" "}
      {/* {accordionItems?.length > 0 && ( */}
      <Accordion defaultActiveKey={null}>
        {/* {accordionItems?.map((item) => ( */}
        <Card className="px-2 py-2 mb-1 shadow-none">
          <Card.Header className="bg-transparent border-0 p-0">
            <div className="border-0">
              <ContextAwareToggle
                eventKey={accordionItems?.id}
                item={accordionItems}
                callback={handleAccordionClick}
                idx={accordionItems?.idx}
                count={accordionItems?.count_questions}
                show={accordionItems?.question_show}
              >
                <MdDragHandle />{" "}
                <Icon
                  path={mdiNote}
                  size={0.8}
                  className="text-white bg-info p-1 me-1 icon-md icon-shape rounded-2"
                />
                {accordionItems?.name}
              </ContextAwareToggle>
            </div>
          </Card.Header>
          {!report && (
            <Accordion.Collapse eventKey={accordionItems?.id}>
              <Card.Body className="py-2">
                <GKAccordionQuestion
                  accordionItems={questionCache[accordionItems?.id]}
                  setUpdatedQuestion={setUpdatedQuestion}
                  token={token}
                  updatedQuestion={updatedQuestion}
                  fetchQuestion={fetchQuestion}
                />
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="rounded-3 "
                  onClick={() => {
                    setShowAdd(true);
                    setUpdatedId(accordionItems?.id);
                  }}
                >
                  Add Question
                </Button>
              </Card.Body>
            </Accordion.Collapse>
          )}
        </Card>
        {/* ))} */}
      </Accordion>
      {/* )} */}
      {showAdd && (
        <AddNewModal
          size="lg"
          setShow={setShowAdd}
          show={showAdd}
          title="Create Question"
        >
          <Row>
            <p className="fs-6">
              Pilih{" "}
              <span className="fw-bold text-body fst-italic">“New Add”</span>{" "}
              jika ingin menambahkan question baru, pilih{" "}
              <span className="fw-bold text-body fst-italic">
                “Add From Existing”
              </span>
              jika ingin menambahkan dari question yang sudah ada
            </p>
            <div className="">
              <Button
                variant="outline-primary"
                size="sm"
                className="rounded-3 me-2"
                onClick={() => {
                  setShowNew(true);
                  setShowAdd(false);
                }}
              >
                New Add
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                className="rounded-3"
                onClick={() => {
                  setShowExisting(true);
                  setShowAdd(false);
                }}
              >
                Add From Existing
              </Button>
            </div>
            <p className="fs-6 text-center mt-4">
              Atau pilih{" "}
              <span className="fw-bold text-body fst-italic">
                “Upload Excel”
              </span>{" "}
              jika ingin mengunggah melalui template Excel
            </p>
            <div>
              <Col md={12} xs={12} className="mb-3">
                <div className="d-flex justify-content-between">
                  <Form.Label>Upload Excel</Form.Label>
                  <Link
                    className="text-black text-decoration-underline"
                    onClick={() => downloadTemplate()}
                  >
                    <i className="fe fe-download fs-5"></i> Download Template
                    Excel
                  </Link>
                </div>
                {warningFile && (
                  <ErrorAlert
                    setState={setWarning}
                    text1={warningMessage}
                    className="mb-3"
                  />
                )}
                <div className="position-relative">
                  <Form.Control
                    type="file"
                    id="formFileLg"
                    accept=".xlsx"
                    ref={ref}
                    disabled={banner !== null ? true : false}
                    onChange={(e) => onChangeFile(e)}
                  />
                  {file?.fileName || warningFile ? (
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
                    Pastikan upload sesuai dengan template{" "}
                    <span className="fst-italic">Excel</span>
                  </Form.Text>{" "}
                  {loading && <LoadingComponent className="mt-3" />}
                </div>
              </Col>
              <div className="d-flex justify-content-end">
                <Button
                  className="rounded-3"
                  size="sm"
                  variant="primary"
                  disabled={banner === null || disableButton}
                  onClick={(e) => submitExistingQuestion(e, updatedId, "excel")}
                >
                  Add Excel
                </Button>
              </div>
            </div>
          </Row>
        </AddNewModal>
      )}
      {showNew && (
        <QuestionModal
          show={showNew}
          setShow={setShowNew}
          updatedId={updatedId}
          setUpdatedQuestion={setUpdatedQuestion}
          setWarning={setWarning}
          setDisableButton={setDisableButton}
          setModalLoading={setModalLoading}
          setWarningMessage={setWarningMessage}
        />
      )}
      {showExisting && (
        <AddNewModal
          size="lg"
          setShow={setShowExisting}
          show={showExisting}
          title="Add Exam Questions Existing"
          onClick={(e) => {
            submitExistingQuestion(e, updatedId, "existing");
            setSelectedIds([]);
            setQuestionList([]);
          }}
          text1="Cancel"
          text2="Add"
          variant1="outline-primary"
          variant2="primary"
          buttonClassName="py-2 px-3 rounded-3"
          onHide={() => {
            setShowExisting(false);
            setUpdatedId("");
            setQuestionList([]);
          }}
        >
          <Row>
            <Col md={12} xs={12} className="mb-3 border-bottom pb-4">
              <Form.Label>
                Exam Tittle <span className="text-danger"> *</span>{" "}
              </Form.Label>
              <Select
                name="colors"
                placeholder="Sarch Exam"
                options={examOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleSelectedExam}
                onInputChange={handleInputChange}
              />
            </Col>
            <Col md={12} xs={12} className="">
              <div className="bg-light rounded-3 p-4 ">
                <GKAccordionQuestion
                  accordionItems={questionList}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                  existing
                />
              </div>
            </Col>
          </Row>
        </AddNewModal>
      )}
      {showUpdate && (
        <AddNewModal
          size="lg"
          setShow={setShowUpdate}
          show={showUpdate}
          buttonClassName="py-2 px-3 rounded-3"
          text1="Cancel"
          text2="Save"
          variant1="outline-primary"
          variant2="primary"
          title="Edit Exam"
          onClick={(e) => updateExam(e, updatedId)}
        >
          <Row>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label>
                Exam Tittle <span className="text-danger"> *</span>{" "}
              </Form.Label>
              <Form.Control
                onChange={(e) => setExamTitle(e.target.value)}
                type="text"
                value={examTitle}
              />
              <Form.Text>
                Pastikan tidak melebihi dari 60 karakter dan tuliskan judul yang
                menggambarkan topik yang akan dibahas
              </Form.Text>
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Label>
                Questions Show <span className="text-danger"> *</span>{" "}
              </Form.Label>
              <Form.Control
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numericValue = inputValue.replace(/[^0-9]/g, "");

                  setQuestionShow(numericValue);
                }}
                value={questionShow}
                type="text"
                placeholder="Jumlah questions yang akan ditampilkan pada Exam "
              />
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Label>
                Training Code <span className="text-muted">(optional)</span>{" "}
              </Form.Label>
              <Form.Control
                onChange={(e) => setTrainingCode(e.target.value)}
                placeholder="Contoh : 1111-AAAA-11111"
                type="text"
                value={trainingCode}
                maxlength={20}
              />
              <Form.Text>Tulis Training Code berdasarkan Proint</Form.Text>
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Label>
                Chance <span className="text-danger"> *</span>{" "}
              </Form.Label>
              <Form.Control
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numericValue = inputValue.replace(/[^0-9]/g, "");

                  setChance(numericValue);
                }}
                value={chance}
                type="text"
                placeholder="Tuliskan dalam angka"
              />
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Label>
                Minimum Score <span className="text-danger"> *</span>{" "}
              </Form.Label>
              <Form.Control
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numericValue = inputValue.replace(/[^0-9]/g, "");

                  setMinScore(numericValue);
                }}
                value={minScore}
                type="text"
                placeholder="Tuliskan dalam angka"
              />
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label>
                Description <span className="text-danger"> *</span>
              </Form.Label>
              <ReactQuill value={desc} onChange={handleChange} />
            </Col>
          </Row>
        </AddNewModal>
      )}
      {reportExam && (
        <ReportExam
          show={reportExam}
          setShow={setReportExam}
          id={updatedId}
          title={title}
        />
      )}
      {success && (
        <NotifSuccessModal
          show={success}
          setShow={setSuccess}
          text="Success Delete Exam"
        ></NotifSuccessModal>
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
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </Fragment>
  );
};

export default GKAccordionExam;
