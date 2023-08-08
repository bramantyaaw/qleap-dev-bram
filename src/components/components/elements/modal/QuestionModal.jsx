import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  CloseButton,
  Col,
  Form,
  InputGroup,
  ListGroup,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import TextForm from "../../dashboard/ticketing/elements/text/TextForm";
import FormSelect from "../form-select/FormSelect";
import ReactQuill from "react-quill";
import axios from "axios";
import ErrorAlert from "../../dashboard/ticketing/elements/alerts/ErrorAlert";
import { mdiClose as CloseIcon } from "@mdi/js";
import Icon from "@mdi/react";
import LoadingComponent from "../loading/LoadingComponent";

export const QuestionModal = ({
  show,
  setShow,
  updatedId,
  setUpdatedQuestion,
  edit,
  question,
  setWarning,
  setDisableButton,
  setModalLoading,
  setWarningMessage,
}) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const [loading, setLoading] = useState(false);
  const [warningFile, setWarningFile] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFile, setErrorFile] = useState(false);

  const [banner, setBanner] = useState(null);
  const [file, setFile] = useState({
    fileName: "",
    folderName: "",
    fileExtension: "",
    prevFolder: "",
  });

  const [disabled, setDisabled] = useState(false);
  const [title, setTitle] = useState(edit ? question.desc_question : "");
  const [selectedType, setSelectedType] = useState(edit ? question.type : "");
  const [answers, setAnswers] = useState([
    { option_text: "", option_id: 1, is_correct: false },
    { option_text: "", option_id: 2, is_correct: false },
    { option_text: "", option_id: 3, is_correct: false },
    { option_text: "", option_id: 4, is_correct: false },
  ]);

  const answerType = [
    { value: "mc", label: "Multiple Choice" },
    { value: "mr", label: "Multiple Answer" },
    { value: "tf", label: "True and False" },
  ];

  function handleChange(value) {
    setTitle(value);
  }
  const submitQuestion = async (e, value) => {
    e.preventDefault();
    try {
      setModalLoading(true);
      setDisableButton(true);
      let dataInput = banner
        ? {
            exam_id: value,
            uid,
            type_submit: "new",
            description: title,
            option_type: selectedType,
            options: answers,
            files: [
              {
                folder_name: file.folderName,
                file_name: file.fileName,
                file_extension: file.fileExtension,
                collection_name: "banner_questions",
              },
            ],
          }
        : {
            exam_id: value,
            uid,
            type_submit: "new",
            description: title,
            option_type: selectedType,
            options: answers,
          };
      await axios
        .post("/euniv/submit-question", dataInput, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            setShow(false);
            setUpdatedQuestion(true);
            setModalLoading(false);
            setDisableButton(false);
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

  const updateQuestion = async (e, value) => {
    e.preventDefault();
    try {
      setModalLoading(true);
      setDisableButton(true);
      let dataInput = banner
        ? {
            id: value,
            uid,
            description: title,
            option_type: selectedType,
            options: answers,
            files: [
              {
                folder_name: file.folderName,
                file_name: file.fileName,
                file_extension: file.fileExtension,
                collection_name: "banner_questions",
              },
            ],
          }
        : {
            id: value,
            uid,
            description: title,
            option_type: selectedType,
            options: answers,
          };
      await axios
        .post("/euniv/update-question", dataInput, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            setShow(false);
            setUpdatedQuestion(true);
            setModalLoading(false);
            setDisableButton(false);
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
          setModalLoading(false);
          setDisableButton(false);
        });
    } catch (e) {
      return e;
    }
  };
  const ref = useRef();
  const deleteFile = () => {
    ref.current.value = "";
    setBanner(null);
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
          } else {
          }
        });
    } catch (e) {
      return e;
    }
  };

  const handleDeleteRecentFile = async () => {
    let folder = question?.files[0]?.folder_name;
    try {
      await axios
        .delete(`euniv/delete-file/${folder}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            setFile({
              fileName: "",
              folderName: "",
              fileExtension: "",
              prevFolder: "",
            });
          } else if (res?.status === 500) {
            setErrorFile(true);
            setErrorMessage(res?.data?.message);
          } else if (res?.status === 429) {
            setWarning(true);
            setErrorMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            return res;
          }
        });
    } catch (err) {
      return err;
    }
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size >= 1000000) {
        setWarningFile(true);
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
            setErrorFile(true);
            setErrorMessage(res?.data?.message);
          } else if (res?.status === 429) {
            setLoading(false);
            setErrorFile(true);
            setErrorMessage(
              "Too many request at one moment, please try again later.."
            );
          } else if (res?.status === 400) {
            setLoading(false);
            setErrorFile(true);
            setErrorMessage(res?.data?.message);
          } else {
            setLoading(false);
          }
        });
    } catch (err) {
      setLoading(false);
    }
  };
  const prevType = question ? question.type : "";

  useEffect(() => {
    // Reset is_correct to false when the selectedType changes to "mc"
    if (selectedType === "mc") {
      setAnswers((prevAnswers) => {
        if (prevAnswers.length < 4) {
          if (prevType === "mc") {
            return question.option;
          } else {
            // Add new options if there are less than four
            const newOptions = Array.from(
              { length: 4 - prevAnswers.length },
              (_, index) => ({
                option_text: "",
                option_id: 0,
                is_correct: false,
              })
            );
            return [...prevAnswers, ...newOptions];
          }
        } else if (prevAnswers.length === 4 && prevType === "mc") {
          return prevAnswers;
        } else {
          // Return the previous options if there are already four
          const updatedAnswers = prevAnswers?.map((answer) => {
            return { ...answer, is_correct: false };
          });
          return setAnswers(updatedAnswers);
        }
      });
    } else if (selectedType === "tf") {
      // If the selectedType is "tf", set the answers state to only two options.
      if (prevType === "tf") {
        setAnswers(question.option);
      } else {
        setAnswers([
          { option_text: "", option_id: 0, is_correct: false },
          { option_text: "", option_id: 0, is_correct: false },
        ]);
      }
    } else {
      // If the selectedType is "mr", reset the answers state to four options.
      setAnswers((prevAnswers) => {
        if (prevAnswers.length < 4) {
          // Add new options if there are less than four
          if (prevType === "mr") {
            return question.option;
          } else {
            const newOptions = Array.from(
              { length: 4 - prevAnswers.length },
              (_, index) => ({
                option_text: "",
                option_id: 0,
                is_correct: false,
              })
            );
            return [...prevAnswers, ...newOptions];
          }
        } else {
          // Return the previous options if there are already four
          return prevAnswers;
        }
      });
    }
  }, [selectedType, edit, question]);

  useEffect(() => {
    const hasEmptyDescAnswer = answers.some(
      (answer) => answer.option_text === ""
    );
    const allIsAnswerFalse = answers.every((answer) => !answer.is_correct);
    setDisabled(hasEmptyDescAnswer || allIsAnswerFalse);
  }, [answers]);

  useEffect(() => {
    banner !== null && uploadFile();
  }, [banner]);

  useEffect(() => {
    if (edit === true) {
      setTitle(question.desc_question ? question.desc_question : "");
      setSelectedType(question.type ? question.type : "");
      setAnswers(
        question.option
          ? question.option
          : [
              { option_text: "", option_id: 1, is_correct: false },
              { option_text: "", option_id: 2, is_correct: false },
              { option_text: "", option_id: 3, is_correct: false },
              { option_text: "", option_id: 4, is_correct: false },
            ]
      );
      if (question.files && question.files.length > 0) {
        const fileData = question.files[0];
        setFile({
          prevFolder: fileData.folder_name,
        });
      }
    }
  }, [edit, question]);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, []);

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 style={{ fontFamily: "Roboto" }} className="fw-bold mb-0">
              {edit ? "Edit Question" : "Create Question"}
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Col md={12} sm={12} className="mb-1">
            <Form.Group className="mb-3">
              <TextForm text="Question" />
              <ReactQuill value={title} onChange={handleChange} />
            </Form.Group>
          </Col>
          {warningFile && (
            <ErrorAlert
              setState={setWarningFile}
              text1="Foto yang diunggah lebih dari 1 MB,"
              span="Mohon unggah ulang dibawah 1 MB"
            />
          )}
          {errorFile && (
            <ErrorAlert
              setState={setErrorFile}
              text1={errorMessage}
              // className="mb-0"
            />
          )}
          <Col md={12} xs={12} className="mb-3">
            <Form.Label>
              Add Image or Video <span className="text-muted">(if any)</span>{" "}
            </Form.Label>
            {file.prevFolder !== "" ? (
              <div className="position-relative">
                <input type="file" id="file" className="d-none" disabled />
                <label
                  htmlFor="file"
                  className="p-0 w-100 h-100 label-input-excel"
                  role="button"
                >
                  Disabled
                </label>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="delete-tooltip">
                      The file will be deleted permanently
                    </Tooltip>
                  }
                >
                  <Icon
                    path={CloseIcon}
                    size={1}
                    role="button"
                    className="position-absolute icon-file-upload h-100"
                    onClick={handleDeleteRecentFile}
                  />
                </OverlayTrigger>
              </div>
            ) : (
              <div className="position-relative">
                <Form.Control
                  type="file"
                  id="formFileLg"
                  accept="image/*,video/*"
                  ref={ref}
                  onChange={(e) => onChangeFile(e)}
                />
                {banner || warningFile ? (
                  <div>
                    <CloseButton
                      onClick={deleteFile}
                      className="btn-close form-contol position-absolute"
                      style={{ top: "15px", right: "10px" }}
                    />
                  </div>
                ) : null}
              </div>
            )}
            <div className="d-flex justify-content-between">
              <Form.Text>Pastikan tidak melebihi 1 MB</Form.Text>{" "}
              {loading && <LoadingComponent className="mt-3" />}
            </div>
          </Col>
          <Col md={12} sm={12} className="mb-1">
            <Form.Group className="mb-3">
              <TextForm text="Answer Type" />
              <FormSelect
                options={answerType}
                placeholder="Please select Answer Type"
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col md={12} sm={12} className="mb-1">
            <Form.Group className="mb-3">
              <TextForm text="Answer" />
              <Row>
                {answers?.map((answer, index) => {
                  return (
                    <Col md={12} key={index}>
                      <InputGroup className="mb-3">
                        {selectedType === "mr" ? (
                          <InputGroup.Checkbox
                            aria-label={`Checkbox for following text input ${index}`}
                            checked={answer.is_correct}
                            onChange={(e) => {
                              const newAnswerOptions = [...answers];
                              newAnswerOptions[index].is_correct =
                                e.target.checked;
                              setAnswers(newAnswerOptions);
                            }}
                          />
                        ) : (
                          <InputGroup.Radio
                            aria-label={`Radio for following text input ${index}`}
                            checked={answer.is_correct}
                            onChange={(e) => {
                              const newAnswerOptions = [...answers];
                              newAnswerOptions.forEach((option) => {
                                option.is_correct = false;
                              });
                              newAnswerOptions[index].is_correct = true;
                              setAnswers(newAnswerOptions);
                            }}
                          />
                        )}
                        <Form.Control
                          aria-label={`Text input with ${
                            selectedType === "mr" ? "checkbox" : "radio"
                          } ${index}`}
                          value={answer.option_text}
                          onChange={(e) => {
                            const newAnswerOptions = [...answers];
                            newAnswerOptions[index].option_text =
                              e.target.value;
                            setAnswers(newAnswerOptions);
                          }}
                        />
                      </InputGroup>
                    </Col>
                  );
                })}
              </Row>
            </Form.Group>
          </Col>
          <div className="d-flex justify-content-end ">
            {edit ? (
              <>
                <Button
                  className="rounded-3 me-2"
                  size="sm"
                  variant="outline-primary"
                  onClick={() => setShow(false)}
                >
                  Cancel{" "}
                </Button>
                <Button
                  className="rounded-3"
                  size="sm"
                  disabled={disabled || !title || !selectedType ? true : false}
                  onClick={(e) => updateQuestion(e, updatedId)}
                >
                  Save
                </Button>
              </>
            ) : (
              <Button
                className="rounded-3"
                size="sm"
                disabled={
                  disabled || !title || !selectedType || loading ? true : false
                }
                onClick={(e) => submitQuestion(e, updatedId)}
              >
                Add Question
              </Button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
