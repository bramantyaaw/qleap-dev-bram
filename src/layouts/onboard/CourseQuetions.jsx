import React, { useEffect, useRef, useState } from "react";
import CourseResume from "./CourseResume";
import QuizStart from "../../components/components/dashboard/e-univ/on-board/quiz/QuizStart";
import IdleCourse from "../../components/components/dashboard/e-univ/on-board/IdleCourse";
import IdleAssesmentNewEmployee from "../../components/components/dashboard/e-univ/on-board/IdleAssesmentNewEmployee";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CardHeaderCourse from "../../components/components/dashboard/e-univ/on-board/details/CardHeaderCourse";
import { Button, Card } from "react-bootstrap";
import QuizResult from "./QuizResult";
import ModalPICTicket from "../../components/components/database-admin/elements/ModalPICTicket";
import Timer from "../../components/components/dashboard/e-univ/on-board/quiz/Timer";
import ProcessLoadingModal from "../../components/components/elements/modal/ProcessLoadingModal";
import NotifSuccessModal from "../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";

const CourseQuetions = () => {
  const { program_id } = useParams();
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [scoreResults, setScoreResults] = useState(0);
  const [modalLoading, setModalLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [goToModule, setGoToModule] = useState(false);
  const [goToQuiz, setGoToQuiz] = useState(false);
  const [goToResultQuiz, setGoToResultQuiz] = useState(false);
  const [timeChecker, setTimeChecker] = useState(null);
  const [time, setTime] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [lastProgram, setLastProgram] = useState([]);
  const [participant, setParticipant] = useState("");

  const [warningPopUp, setWarningPopUp] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [popUpLoading, setPopUpLoading] = useState(false);

  const [caution, setCaution] = useState(false); //exam modal
  const [warning, setWarning] = useState(false); //module modal

  const [moduleData, setModuleData] = useState(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  const [updateSyllabus, setUpdateSyllabus] = useState(false);
  const [updatedId, setUpdatedId] = useState(0);

  const [itemList, setItemList] = useState([]);
  const [itemCache, setItemCache] = useState({});
  const [isDone, setIsDone] = useState(false);
  const navigate = useNavigate();
  const linkName = lastProgram?.name;
  const [silabusData, setSilabusData] = useState([]);
  const idProgram = parseInt(program_id, 10);

  const arrSplit = moduleData?.link_url?.split("watch?v==");
  const idYoutube = arrSplit ? arrSplit[1] : "";

  const fetchSilabus = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          "/euniv/get-syllabus-program",
          {
            program_id: idProgram,
            uid: uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setLoading(false);
            const newData = res?.data?.data;
            setSilabusData(newData);
          } else {
            setLoading(false);
          }
        });
    } catch (e) {
      setWarningPopUp(true);
      return setWarningMessage("Something went wrong, please try again later");
    }
  };

  const fetchActivity = async (syllabus_id) => {
    try {
      // Check if the questionList data is already in the cache
      if (itemCache[syllabus_id] && updateSyllabus === false) {
        setItemList(itemCache[syllabus_id]);
      } else {
        setModalLoading(true);
        await axios
          .post(
            "/euniv/get-syllabus-activity",
            {
              syllabus_id: parseInt(syllabus_id),
              uid,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then(async (res) => {
            if (res?.status === 200) {
              setModalLoading(false);
              // Update the itemList state
              setItemList(res?.data?.data);
              // Store the itemList data in the cache
              setItemCache((prevCache) => ({
                ...prevCache,
                [syllabus_id]: res?.data?.data,
              }));
            } else if (res?.status === 500) {
              setWarningPopUp(true);
              setWarningMessage(res?.data?.message);
              setModalLoading(false);
            } else if (res?.status === 429) {
              setWarningPopUp(true);
              setWarningMessage(
                "Too many  at one moment. Please try again later."
              );
              setModalLoading(false);
            } else {
              setWarningPopUp(true);
              return setWarningMessage(
                "Something went wrong, please try again later"
              );
            }
          });
      }
    } catch (e) {
      setWarningPopUp(true);
      return setWarningMessage("Something went wrong, please try again later");
    }
  };

  const submitExam = async (selectedAnswers, totalTime) => {
    setDisableButton(true);
    try {
      const transformedAnswers = selectedAnswers?.map((answer) => ({
        question_id: answer.questionId,
        selected_options: answer.answerId,
      }));
      setPopUpLoading(true);

      await axios
        .post(
          "/euniv/calculate-grade",
          {
            exam_id: moduleData.id,
            uid,
            answers: transformedAnswers,
            times: totalTime,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(async (data) => {
          if (data?.status === 200) {
            const score = data?.data?.data.score;
            setParticipant(data?.data?.data);
            setScoreResults(score);
            setGoToResultQuiz(true);
            // setUpdateSyllabus(true);
            localStorage.removeItem("selectedAnswers");
            setPopUpLoading(false);
            setDisableButton(false);
          } else if (data?.status === 500) {
            setWarningPopUp(true);
            setPopUpLoading(false);
            setDisableButton(false);
            return setWarningMessage(data?.data?.message);
          } else if (data?.status === 429) {
            setWarningPopUp(true);
            setPopUpLoading(false);
            setDisableButton(false);
            return setWarningMessage(
              "Too many request at one moment, please try again later.."
            );
          } else if (data?.status === 400) {
            setWarningPopUp(true);
            setPopUpLoading(false);
            setDisableButton(false);
            return setWarningMessage("Please select all options");
          } else {
            setPopUpLoading(false);
          }
        });
    } catch (e) {
      setPopUpLoading(false);
      setDisableButton(false);
      setWarningPopUp(true);
      return setWarningMessage("Something went wrong, please try again later");
    }
  };

  const submitModule = async () => {
    try {
      setPopUpLoading(true);
      setDisableButton(true);
      await axios
        .post(
          "/euniv/submit-module-result",
          {
            id: moduleData.id,
            uid,
            times: totalTime,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setGoToModule(false);
            setWarning(false);
            setPopUpLoading(false);
            setDisableButton(false);
            setUpdateSyllabus(true);
            setModuleData(null);
          } else if (res?.status === 500) {
            setWarningPopUp(true);
            setPopUpLoading(false);
            setDisableButton(false);
            return setWarningMessage(res?.data?.message);
          } else if (res?.status === 429) {
            setWarningPopUp(true);
            setPopUpLoading(false);
            setDisableButton(false);
            return setWarningMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            setPopUpLoading(false);
            setDisableButton(false);
            setWarningPopUp(true);
            return setWarningMessage(
              "Something went wrong, please try again later"
            );
          }
        });
    } catch (e) {
      setWarningPopUp(true);
      return setWarningMessage("Something went wrong, please try again later");
    }
  };

  useEffect(() => {
    setGoToQuiz(false);
  }, [moduleData]);

  useEffect(() => {
    fetchSilabus();
  }, []);

  //view module
  useEffect(() => {
    if (goToModule === true) {
      const delayedAPICall = async () => {
        try {
          const res = await axios.post(
            "/euniv/submit-view",
            {
              uid,
              trx_id: parseInt(moduleData?.id),
              type_view: "module",
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (res?.status === 200) {
            return res;
          } else {
            return res;
          }
        } catch (e) {
          return e;
        }
      };

      const timer = setTimeout(() => {
        delayedAPICall();
      }, 60000); // 30 seconds

      return () => {
        clearTimeout(timer); // Clean up the timer when the component unmounts
      };
    }
  }, [goToModule]);

  //view program
  useEffect(() => {
    const delayedAPICall = async () => {
      try {
        const res = await axios.post(
          "/euniv/submit-view",
          {
            uid,
            trx_id: parseInt(idProgram),
            type_view: "program",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res?.status === 200) {
          return res;
        } else {
          return res;
        }
      } catch (e) {
        return e;
      }
    };

    const timer = setTimeout(() => {
      delayedAPICall();
    }, 60000); // 30 seconds

    return () => {
      clearTimeout(timer); // Clean up the timer when the component unmounts
    };
  }, [idProgram]);

  useEffect(() => {
    if (updateSyllabus === true) {
      const syllabus = async () => {
        await fetchSilabus();
        await fetchActivity(updatedId);
        setUpdateSyllabus(false);
      };
      syllabus();
      if (currentModuleIndex + 1 < itemList?.length) {
        // Set the next module as the new moduleData
        setModuleData(itemList[currentModuleIndex + 1]);
        // Increment the currentModuleIndex to point to the next module
        setCurrentModuleIndex(currentModuleIndex + 1);
        // Reset any other state variables or perform other actions as needed
        setGoToModule(false);
        setWarning(false);
        setUpdateSyllabus(true);
      }
    }
  }, [updateSyllabus, updatedId]);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, []);

  //disable reload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (goToQuiz || goToModule) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    // if (isDone === true) {
    //   return window.location.reload(true);
    // } else {
    window.addEventListener("beforeunload", handleBeforeUnload);
    // }

    return () => {
      // isDone === false &&
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [goToQuiz, goToModule, isDone]);

  useEffect(() => {
    const storedLastProgram = localStorage.getItem("lastProgram");
    if (storedLastProgram) {
      setLastProgram(JSON.parse(storedLastProgram));
    }
  }, []);

  return (
    <CourseResume
      program_id={program_id}
      setModuleData={setModuleData}
      setGoToModule={setGoToModule}
      setGoToQuiz={setGoToQuiz}
      moduleData={moduleData}
      itemList={itemList}
      linkName={linkName}
      data={silabusData}
      goToModule={goToModule}
      setWarning={setWarning}
      goToQuiz={goToQuiz}
      setUpdatedId={setUpdatedId}
      fetchActivity={fetchActivity}
      modalLoading={modalLoading}
      loading={loading}
    >
      {moduleData !== null ? (
        <>
          {moduleData?.type === "module" ? (
            <CardHeaderCourse title={moduleData?.name} note="" notIcon={true}>
              <Card.Body className="">
                {moduleData?.files?.length !== 0 ? (
                  <>
                    <div>
                      {moduleData?.files[0].file_extension === ".html" ? (
                        <iframe
                          src={`${moduleData?.files[0].url}`}
                          frameborder="0"
                          title="iframe-modal"
                          className=""
                          style={{
                            borderRadius: "8px",
                            width: "100%",
                            height: "100%",
                            minHeight: "500px",
                          }}
                        ></iframe>
                      ) : (
                        <iframe
                          src={`${moduleData?.files[0].url}`}
                          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
                          frameborder="0"
                          title="iframe-modal"
                          className=""
                          style={{
                            borderRadius: "8px",
                            width: "100%",
                            height: "100%",
                            minHeight: "500px",
                          }}
                        ></iframe>
                      )}
                    </div>
                    <div className="mt-7 d-flex w-100 flex-column flex-md-row ">
                      <div className="py-2 border rounded-6 border-light-white align-items-center w-100 w-md-85 justify-content-center flex-column">
                        <p className="mb-0 mt-1 text-kinda-light-dark h6 text-center">
                          Klik "DONE" jika kamu sudah selesai membaca/menonton
                          module ini
                        </p>
                      </div>
                      <Button
                        variant="primary"
                        disabled={disableButton}
                        onClick={() => {
                          submitModule();
                        }}
                        className="btn btn-primary ms-0 ms-md-4 mt-3 mt-md-0 rounded-6 w-100 w-md-15 h-100"
                      >
                        Done
                      </Button>
                    </div>
                    <Timer
                      setTotalTime={setTotalTime}
                      setTime={setTime}
                      isCountDown={false}
                      style={{ display: "none" }}
                    />
                  </>
                ) : moduleData?.link_url ? (
                  <>
                    <div>
                      <iframe
                        src={`https://www.youtube.com/embed/${idYoutube}`}
                        title="iframe-modal"
                        className=""
                        style={{
                          borderRadius: "8px",
                          width: "100%",
                          height: "100%",
                          minHeight: "500px",
                        }}
                      ></iframe>
                    </div>
                    <div className="mt-7 d-flex w-100 flex-column flex-md-row ">
                      <div className="py-2 border rounded-6 border-light-white align-items-center w-100 w-md-85 justify-content-center flex-column">
                        <p className="mb-0 mt-1 text-kinda-light-dark h6 text-center">
                          Klik "DONE" jika kamu sudah selesai membaca/menonton
                          module ini
                        </p>
                      </div>
                      <Button
                        variant="primary"
                        disabled={disableButton}
                        onClick={() => {
                          submitModule();
                        }}
                        className="btn btn-primary ms-0 ms-md-4 mt-3 mt-md-0 rounded-6 w-100 w-md-15 h-100"
                      >
                        Done
                      </Button>
                    </div>
                    <Timer
                      setTotalTime={setTotalTime}
                      setTime={setTime}
                      isCountDown={false}
                      style={{ display: "none" }}
                    />
                  </>
                ) : (
                  <p className="text-center">There is no data</p>
                )}
              </Card.Body>
            </CardHeaderCourse>
          ) : (
            <>
              {goToQuiz ? (
                goToResultQuiz ? (
                  <CardHeaderCourse
                    title={moduleData?.name}
                    note=""
                    notIcon={true}
                  >
                    <Card.Body className="p-4 text-center">
                      <QuizResult
                        withoutNavbar={false}
                        scoreResult={scoreResults}
                        quizChance={
                          moduleData?.max_attempt - moduleData?.user_attempt - 1
                        }
                        setGoToQuiz={setGoToQuiz}
                        setGoToResultQuiz={setGoToResultQuiz}
                        minScore={moduleData?.min_score}
                        setUpdateSyllabus={setUpdateSyllabus}
                        setIsDone={setIsDone}
                        participant={participant}
                        title={moduleData?.name}
                        setModuleData={setModuleData}
                      />
                    </Card.Body>
                  </CardHeaderCourse>
                ) : (
                  <QuizStart
                    withoutNavbar={false}
                    title={moduleData?.name}
                    examId={moduleData?.id}
                    handleSubmitExam={submitExam}
                    linkNavigate="/"
                    styles={{ width: "fit" }}
                    setTimeChecker={setTimeChecker}
                    customTime={true}
                    disableButton={disableButton}
                  />
                )
              ) : (
                <IdleAssesmentNewEmployee
                  data={moduleData}
                  onClick={() => {
                    setGoToQuiz(true);
                    setGoToResultQuiz(false);
                  }}
                />
              )}
            </>
          )}
        </>
      ) : (
        <IdleCourse />
      )}

      {caution && (
        <ModalPICTicket
          setShow={setCaution}
          show={caution}
          buttonClassName="py-2 px-3 rounded-3  h4"
          onClick={() => {
            navigate(`learning/courses/${idProgram}`);
            localStorage.removeItem("selectedAnswers");
          }}
          title="Caution"
        >
          <p className="mb-0 text-kinda-dark">
            Are you sure want to quit this quiz ?
          </p>
        </ModalPICTicket>
      )}
      {warning && (
        <ModalPICTicket
          setShow={setWarning}
          show={warning}
          buttonClassName="py-2 px-3 rounded-3  h4"
          onClick={() => {
            submitModule();
            // window.location.reload();
          }}
          title="Caution"
        >
          <p className="mb-0 text-kinda-dark">
            Are you done reading this module ?
          </p>
        </ModalPICTicket>
      )}

      {warningPopUp && (
        <NotifSuccessModal show={warningPopUp} setShow={setWarningPopUp}>
          <ErrorAlert
            setState={setWarningPopUp}
            text1={warningMessage}
            className="mb-0"
          />
        </NotifSuccessModal>
      )}
      {popUpLoading && (
        <ProcessLoadingModal show={popUpLoading} setShow={setPopUpLoading} />
      )}
    </CourseResume>
  );
};

export default CourseQuetions;
