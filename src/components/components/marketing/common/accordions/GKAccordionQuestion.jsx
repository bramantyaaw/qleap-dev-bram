// import node module libraries
import React, { useContext, Fragment, useState } from "react";
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
  Col,
  Row,
} from "react-bootstrap";
import { MdDragHandle } from "react-icons/md";
import TextForm from "../../../dashboard/ticketing/elements/text/TextForm";
import { QuestionModal } from "../../../elements/modal/QuestionModal";
import axios from "axios";
import ModalPICTicket from "../../../database-admin/elements/ModalPICTicket";
import Icon from "@mdi/react";
import { mdiCheckCircle, mdiCloseCircle } from "@mdi/js";
import NotifSuccessModal from "../../../elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../dashboard/ticketing/elements/alerts/ErrorAlert";
import ProcessLoadingModal from "../../../elements/modal/ProcessLoadingModal";

const GKAccordionQuestion = ({
  accordionItems,
  existing, // for add from existing exam
  selectedIds,
  setSelectedIds,
  setUpdatedQuestion,
  token,
  report, //for report modal Question List
}) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [updatedId, setUpdatedId] = useState(""); //for exam_id
  const [success, setSuccess] = useState(false);
  const [caution, setCaution] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const [question, setQuestion] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      setModalLoading(true);
      await axios
        .delete(`/euniv/delete-question/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          if (res?.status === 200) {
            setUpdatedQuestion(true);
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 1500);
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

  const ContextAwareToggle = ({ children, eventKey, callback, item }) => {
    const isCurrentEventKey = useContext(AccordionContext) === eventKey;

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );

    const overlayKeyEdit = uuid();
    const overlayKeyDelete = uuid();

    return (
      <Fragment>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex pb-0 mb-0">
            <Link
              onClick={decoratedOnClick}
              aria-expanded={isCurrentEventKey}
              to="#"
              className="text-inherit mb-0"
            >
              {children}
            </Link>
          </div>
          <div className="d-flex align-items-center">
            {!report && (
              <>
                <OverlayTrigger
                  key={overlayKeyEdit}
                  placement="top"
                  overlay={<Tooltip id="tooltip-top">Edit</Tooltip>}
                >
                  <Link
                    to="#"
                    onClick={() => {
                      setShowUpdate(true);
                      setUpdatedId(eventKey);
                      setQuestion(item);
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
                  overlay={<Tooltip id="tooltip-top">Delete</Tooltip>}
                >
                  <Link
                    to="#"
                    onClick={() => {
                      setCaution(true);
                      setUpdatedId(eventKey);
                    }}
                    className="me-1 text-inherit"
                    title="Delete"
                  >
                    <i className="fe fe-trash-2 fs-6"></i>
                  </Link>
                </OverlayTrigger>
              </>
            )}

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
          </div>
        </div>

        {/* popup caution modal */}
        {caution && (
          <ModalPICTicket
            setShow={setCaution}
            show={caution}
            buttonClassName="py-2 px-3 rounded-3  h4"
            onClick={() => {
              deleteQuestion(updatedId);
              setCaution(false);
            }}
            title="Caution"
          >
            <p className="mb-0 text-kinda-dark">
              Are you sure want to delete this question ?
            </p>
          </ModalPICTicket>
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      {accordionItems?.length > 0 && (
        <Accordion defaultActiveKey={report ? accordionItems?.[0]?.id : null}>
          {accordionItems.map((item) => (
            <Card
              key={item?.question_id}
              className={
                existing
                  ? "px-2 py-2 mb-1 shadow-none mb-2"
                  : "px-2 py-2 mb-0 shadow-none"
              }
            >
              <Card.Header className="bg-transparent border-0 p-0">
                <div className="border-0">
                  <ContextAwareToggle eventKey={item?.question_id} item={item}>
                    <Row className="d-flex">
                      <Col md="auto" className="p-0 m-0">
                        {existing ? (
                          <Form.Check
                            type="checkbox"
                            checked={selectedIds.includes(item?.question_id)}
                            className="ps-3"
                            onChange={() =>
                              handleCheckboxChange(item?.question_id)
                            }
                          />
                        ) : (
                          <MdDragHandle />
                        )}
                      </Col>
                      <Col>
                        <div className="d-flex align-items-center">
                          <p
                            className="text-black mb-0"
                            dangerouslySetInnerHTML={{
                              __html: item?.desc_question,
                            }}
                          ></p>
                        </div>
                      </Col>
                    </Row>
                  </ContextAwareToggle>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey={item?.question_id}>
                <Card.Body className="p-0">
                  <div key={item.question_id}>
                    {/* <Form.Group className="mb-3">
                      <Form.Control type="file" accept=".doc,.docx,.pdf" />
                    </Form.Group> */}
                    {item?.files?.length > 0 && (
                      <Image
                        src={item.files ? item.files[0]?.url : ""}
                        alt=""
                        height={100}
                        width={200}
                        className="rounded-2"
                      />
                    )}
                    <Form.Group className="mb-0">
                      {report ? (
                        <div className="d-flex justify-content-between">
                          <TextForm text="Answer" />
                          <div>
                            <span className="text-success">
                              <Icon
                                path={mdiCheckCircle}
                                className="text-success me-1"
                                size={0.7}
                              />
                              {item?.total_correct} Correct
                            </span>
                            <span className="ms-2 text-danger">
                              <Icon
                                path={mdiCloseCircle}
                                className="text-danger me-1"
                                size={0.7}
                              />
                              {item?.total_wrong} Incorrect
                            </span>
                          </div>
                        </div>
                      ) : (
                        <TextForm text="Answer" />
                      )}
                      <Row>
                        {item?.option?.map((answer, subindex) => (
                          <Col md={12} key={subindex}>
                            {item?.type == "mr" ? (
                              <InputGroup className="mb-3">
                                <InputGroup.Checkbox
                                  checked={answer.is_correct}
                                  disabled={!answer.is_correct}
                                  readOnly
                                />
                                <Form.Control
                                  value={answer.option_text}
                                  disabled={!answer.is_correct}
                                  readOnly
                                  className={
                                    report
                                      ? answer.is_correct
                                        ? "bg-light-success"
                                        : "bg-light-danger"
                                      : ""
                                  }
                                />
                                {report && (
                                  <span
                                    className={
                                      answer.is_correct
                                        ? "position-absolute text-dark-success"
                                        : "position-absolute text-dark-danger"
                                    }
                                    style={{ top: 10, right: 10 }}
                                  >
                                    {answer?.is_correct
                                      ? `${answer?.total_correct_per_option}/${answer?.total_answer_per_option} Answered `
                                      : `${answer?.total_wrong_per_option}/${answer?.total_answer_per_option}  Answered `}
                                  </span>
                                )}
                              </InputGroup>
                            ) : (
                              <InputGroup className="mb-3">
                                <InputGroup.Radio
                                  checked={answer.is_correct}
                                  disabled={!answer.is_correct}
                                  readOnly
                                />
                                <Form.Control
                                  value={answer.option_text}
                                  disabled={!answer.is_correct}
                                  readOnly
                                  className={
                                    report
                                      ? answer.is_correct
                                        ? "bg-light-success"
                                        : "bg-light-danger"
                                      : ""
                                  }
                                />
                                {report && (
                                  <span
                                    className={
                                      answer.is_correct
                                        ? "position-absolute text-dark-success"
                                        : "position-absolute text-dark-danger"
                                    }
                                    style={{ top: 10, right: 10 }}
                                  >
                                    {answer?.is_correct
                                      ? `${answer?.total_correct_per_option}/${answer?.total_answer_per_option} Answered `
                                      : `${answer?.total_wrong_per_option}/${answer?.total_answer_per_option}  Answered `}
                                  </span>
                                )}
                              </InputGroup>
                            )}
                          </Col>
                        ))}
                      </Row>
                    </Form.Group>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      )}
      {showUpdate && (
        <QuestionModal
          show={showUpdate}
          setShow={setShowUpdate}
          updatedId={updatedId}
          setUpdatedQuestion={setUpdatedQuestion}
          edit
          question={question}
          setWarning={setWarning}
          setDisableButton={setDisableButton}
          setModalLoading={setModalLoading}
          setWarningMessage={setWarningMessage}
        />
      )}

      {success && (
        <NotifSuccessModal
          show={success}
          setShow={setSuccess}
          text="Success Delete Question"
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

export default GKAccordionQuestion;
