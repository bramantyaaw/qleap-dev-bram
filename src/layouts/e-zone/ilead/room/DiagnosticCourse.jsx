import React, { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import IdleCourse from "../../../../components/components/dashboard/e-univ/on-board/IdleCourse";
import IdleCourseReuseable from "../../../../components/components/dashboard/e-univ/development/IdleCourseReuseable";
import NotifSuccessModal from "../../../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import ProcessLoadingModal from "../../../../components/components/elements/modal/ProcessLoadingModal";
import QuizStart from "../../../../components/components/dashboard/e-univ/on-board/quiz/QuizStart";
import QuizResult from "../../../onboard/QuizResult";
import NewEzoneLayout from "../../../../components/ezone/new/Header/NewEzoneLayout";

const DiagnosticCourse = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [goToQuiz, setGoToQuiz] = useState(false);
  const [goToResultQuiz, setGoToResultQuiz] = useState(false);
  const [arrFetchQuiz, setArrFetchQuiz] = useState([]);
  const [scoreResults, setScoreResults] = useState(0);
  const [timeChecker, setTimeChecker] = useState(null);
  const [arrIleadExam, setArrIleadExam] = useState([]);
  // const [ileadExamChance, setArrIleadExamChance] = useState(0);

  const [modalLoading, setModalLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { state } = useLocation();
  const navigate = useNavigate();

  const arrTitleCourse = [
    {
      title: "Total Questions",
      text: arrFetchQuiz?.length,
      className: "pe-3",
    },
    {
      title: "Time",
      text: "60 Minutes",
      className: "ps-3",
    },
    {
      title: "Your Score",
      score: `${state?.lastScore}`,
      className: "ps-3",
    },
    {
      title: "Your Chances",
      score: `${state?.retries}`,
      noBorder: "true",
      className: "ps-3",
    },
  ];

  const arrDescCourse = [
    {
      desc: `1. Peserta harus mendapatkan nilai minimal ${state?.minScore} Poin`,
    },
    {
      desc: `2. Peserta memiliki ${state?.chance} kali kesempatan dalam mengerjakan`,
    },
    {
      desc: `3. Peserta yang telah mengerjakan lebih dari ${state?.chance} kali harap menghubungi trainer/superior`,
    },
  ];

  const handleIleadQuestion = async () => {
    try {
      setModalLoading(true);
      await axios
        .post(
          "/ezone/get-ilead-question",
          {
            pathId: 1,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setModalLoading(false);
          if (data?.status === 200) {
            setArrFetchQuiz(data?.data?.data);
          } else if (data?.status === 404) {
            setErrorModal(true);
            setErrorMessage(data?.data);
          } else {
            setErrorModal(true);
            setErrorMessage(data?.data?.message);
          }
        });
    } catch (err) {
      return err;
    }
  };

  const handleSubmitILEADExam = async (answers, questions, time) => {
    const countQuizTime = 3600 - time;
    try {
      setModalLoading(true);
      await axios
        .post(
          "/ezone/post-ilead-answer",
          {
            examId: state?.examId,
            uid,
            answersIds: answers,
            questionIds: questions,
            time: countQuizTime,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setModalLoading(false);
          if (data?.status === 200) {
            const score = data?.data?.data?.score;
            setScoreResults(score);
            setGoToResultQuiz(true);
            localStorage.removeItem("selectedAnswers");
          } else if (data?.status === 404) {
            setErrorModal(true);
            setErrorMessage(data?.data);
          } else {
            setErrorModal(true);
            setErrorMessage(data?.data?.message);
          }
        });
    } catch (err) {
      return err;
    }
  };

  const fetchIleadExam = async () => {
    try {
      setModalLoading(true);
      await axios
        .post(
          "/ezone/get-ilead-exam",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setModalLoading(false);
          if (data?.status === 200) {
            const newData = data?.data?.data;
            let active = newData?.filter((data) => data?.isActive === "active");
            setArrIleadExam(active);
          } else if (data?.status === 404) {
            setErrorModal(true);
            setErrorMessage(data?.data);
          } else {
            setErrorModal(true);
            setErrorMessage(data?.data?.message);
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
    // eslint-disable-next-line
  }, [localStorage]);

  useEffect(() => {
    handleIleadQuestion();
    fetchIleadExam();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (timeChecker === 0) {
      return navigate("/ezone/ilead/diagnostic");
    }
    // eslint-disable-next-line
  }, [timeChecker]);

  useEffect(() => {
    arrIleadExam?.map((data) => {
      // setArrIleadExamChance(data?.retries);
      if (data?.retries > 3) {
        return navigate("/ezone/ilead/diagnostic");
      }
    });
    // eslint-disable-next-line
  }, [arrIleadExam]);

  return (
    <div className="bg-gray-100 h-100">
      <Fragment className="h-100">
        <NewEzoneLayout>
          <div className="py-3 container h-100">
            <main
              className="bg-wrapper d-flex  justify-content-center pt-14 pt-lg-9 "
              style={{ height: "100%", minHeight: "100%" }}
            >
              <div className="h-100 w-100">
                {goToQuiz ? (
                  goToResultQuiz ? (
                    <QuizResult
                      withoutNavbar={true}
                      scoreResult={scoreResults}
                      quizChance={`${state?.retries + 1}/3`}
                      linkNavigate="/ezone/ilead/diagnostic"
                      buttonText="Back to ILEAD"
                    />
                  ) : (
                    <QuizStart
                      withoutNavbar={true}
                      title="ILEAD Quiz"
                      arrQuestion={arrFetchQuiz}
                      handleSubmitExam={handleSubmitILEADExam}
                      linkNavigate="/ezone/ilead/diagnostic"
                      styles={{ width: "fit" }}
                      setTimeChecker={setTimeChecker}
                      customTime={true}
                    />
                  )
                ) : (
                  <div
                    className="bg-wrapper"
                    style={{ height: "100vh", minHeight: "100vh" }}
                  >
                    <Card className="">
                      <IdleCourseReuseable
                        detailData={state}
                        arrTitleCourse={arrTitleCourse}
                        arrDescCourse={arrDescCourse}
                        setState={setGoToQuiz}
                      />
                    </Card>
                  </div>
                )}
              </div>
            </main>
          </div>
        </NewEzoneLayout>
      </Fragment>

      {errorModal && (
        <NotifSuccessModal show={errorModal} setShow={setErrorModal}>
          <ErrorAlert
            setState={setErrorModal}
            text1={errorMessage}
            className="mb-0"
          />
        </NotifSuccessModal>
      )}

      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </div>
  );
};

export default DiagnosticCourse;
