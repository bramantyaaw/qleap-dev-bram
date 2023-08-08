// import node module libraries
import { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// import sub/custom components
import Question from "./Question";
import QuizProgress from "./QuizProgress";
import QuizPagination from "./QuizPagination";

// import media files
import axios from "axios";
import Timer from "./Timer";
import CourseResume from "../../../../../../layouts/onboard/CourseResume";
import ButtonBadgePIC from "../../../../../../layouts/database-admin/ticket/elements/ButtonBadgePIC";
import ButtonCardTicket from "../../../../database-admin/elements/ButtonCardTicket";
import PopupReopenTicket from "../../../ticketing/ticket-list/PopupReopenTicket";
import ModalPICTicket from "../../../../database-admin/elements/ModalPICTicket";
import NotifSuccessModal from "../../../../elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../ticketing/elements/alerts/ErrorAlert";

const QuizStart = ({
  withoutNavbar,
  title,
  arrQuestion,
  handleSubmitExam,
  linkNavigate,
  styles,
  setTimeChecker,
  customTime,
  examId,
  disableButton,
}) => {
  const navigate = useNavigate();

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const isExam = true;

  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [data, setData] = useState([]);
  const [time, setTime] = useState("");
  const [totalTime, setTotalTime] = useState(customTime ? null : 0);
  const [score, setScore] = useState("");
  const questionList = arrQuestion ? arrQuestion : data;

  const [show, setShow] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = questionList?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math?.ceil(questionList?.length / recordsPerPage);

  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  // const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const storedAnswers = localStorage.getItem("selectedAnswers");
    // Or const storedAnswers = sessionStorage.getItem("selectedAnswers");
    return storedAnswers ? JSON.parse(storedAnswers) : [];
  });

  const answersIds = selectedAnswers
    .map((item) => item.answerId)
    .flat()
    .filter((id) => id !== undefined)
    .map(Number);

  const questionIds = selectedAnswers
    .map((item) => item.questionId)
    .filter((id) => id !== undefined)
    .map(Number);

  const fetchData = arrQuestion
    ? () => {}
    : async () => {
        try {
          await axios
            .post(
              "/euniv/start-quiz",
              {
                exam_id: examId,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((res) => {
              if (res?.status === 200) {
                const newData = res?.data?.data;
                const newObjArr = newData?.map((data) => {
                  const opt = data?.option?.map((item) => {
                    const ans = {
                      answerId: item?.option_id,
                      descAnswer: item?.option_text,
                    };
                    return ans;
                  });
                  const obj = {
                    questionId: data?.question_id,
                    descQuestion: data?.desc_question,
                    answer: opt,
                    type: data?.type,
                    files: data?.files,
                  };
                  return obj;
                });
                setData(newObjArr);
              } else if (res?.status === 500) {
                setWarning(true);
                setWarningMessage(res?.data?.message);
              } else {
                setWarning(true);
                setWarningMessage("Problem occured, please try again later...");
              }
            });
        } catch (e) {
          setWarning(true);
          setWarningMessage("Problem occured, please try again later...");
          return e;
        }
      };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
    // eslint-disable-next-line
  }, [localStorage]);

  useEffect(() => {
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  useEffect(() => {
    setTimeChecker(totalTime);
    // eslint-disable-next-line
  }, [totalTime]);

  return (
    <>
      {withoutNavbar ? (
        <>
          <div className="mb-3 ps-2 pb-3 border-0" style={styles}>
            <Card className="mb-4">
              <Card.Body>
                {/* Question Title + Timer */}
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                  <div className="d-flex align-items-center">
                    {/* quiz img */}
                    <Link to="#"> </Link>
                    {/* quiz content */}
                    <div className="ms-0">
                      <h3 className="mb-0">
                        <Link to="#" className="text-inherit">
                          {title}
                        </Link>
                      </h3>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    {/* Timer */}
                    <Timer
                      setTime={setTime}
                      setTotalTime={setTotalTime}
                      isCountDown={true}
                      timeCountDown={3600}
                    />
                    <Button
                      className="ms-3 mb-0"
                      size="xs"
                      variant="outline-primary"
                      onClick={() => setShow(true)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>

                {/* Progress */}
                <QuizProgress
                  currentQuestion={currentPage}
                  totalQuestion={questionList?.length}
                />

                {/* Question(s) */}
                <div className="mt-5">
                  {questionList ? (
                    <>
                      <span>Question {currentPage}</span>
                      <Question
                        item={currentRecords[0]}
                        setIsAnswerSelected={setIsAnswerSelected}
                        selectedAnswers={selectedAnswers}
                        setSelectedAnswers={setSelectedAnswers}
                      />
                    </>
                  ) : (
                    <div>Loading questions...</div>
                  )}
                </div>
              </Card.Body>
            </Card>

            {/* Quiz Pagination */}
            <QuizPagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleFinishClick={handleSubmitExam}
              totalTime={totalTime}
              answersIds={answersIds}
              questionIds={questionIds}
              setIsAnswerSelected={setIsAnswerSelected}
              isAnswerSelected={isAnswerSelected}
              selectedAnswers={selectedAnswers}
            />
          </div>
        </>
      ) : (
        <div className="mb-3 ps-2 pb-3 border-0 w-100">
          <Card className="mb-4">
            <Card.Body>
              <Row className="d-flex justify-content-between  align-items-center border-bottom pb-3 mb-3">
                <Col className="d-flex align-items-center">
                  <div className="ms-0">
                    <h3 style={{ fontFamily: "Roboto" }} className="mb-0">
                      <Link to="#" className="text-inherit">
                        {title}
                      </Link>
                    </h3>
                  </div>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Timer
                    setTime={setTime}
                    setTotalTime={setTotalTime}
                    isCountDown={false}
                  />
                  <Button
                    className="ms-3 mb-0"
                    size="xs"
                    variant="outline-primary"
                    onClick={() => setShow(true)}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>

              {/* Progress */}
              <QuizProgress
                currentQuestion={currentPage}
                totalQuestion={questionList?.length}
              />

              {/* Question(s) */}
              <div className="mt-5">
                {data === undefined ? (
                  <div>No Available question...</div>
                ) : questionList?.length !== 0 ? (
                  <>
                    <span>Question {currentPage}</span>
                    <Question
                      euniv
                      item={currentRecords[0]}
                      setIsAnswerSelected={setIsAnswerSelected}
                      selectedAnswers={selectedAnswers}
                      setSelectedAnswers={setSelectedAnswers}
                    />
                  </>
                ) : (
                  <div>Loading questions...</div>
                )}
              </div>
            </Card.Body>
          </Card>

          {/* Quiz Pagination */}
          <QuizPagination
            euniv
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalTime={totalTime}
            handleFinishClick={handleSubmitExam}
            setIsAnswerSelected={setIsAnswerSelected}
            isAnswerSelected={isAnswerSelected}
            selectedAnswers={selectedAnswers}
            disableButton={disableButton}
          />
        </div>
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
      {show && (
        <ModalPICTicket
          setShow={setShow}
          show={show}
          buttonClassName="py-2 px-3 rounded-3  h4"
          onClick={() =>
            navigate(linkNavigate ? linkNavigate : "/learning/courses")
          }
          title="Caution"
        >
          <p className="mb-0 text-kinda-dark">
            Are you sure want to quit this quiz ?
          </p>
        </ModalPICTicket>
      )}
    </>
  );
};

export default QuizStart;
