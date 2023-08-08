// import node module libraries
import { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Timer from "../../../../components/components/dashboard/e-univ/on-board/quiz/Timer";
import QuizProgress from "../../../../components/components/dashboard/e-univ/on-board/quiz/QuizProgress";
import { Question } from "react-bootstrap-icons";
import QuizPagination from "../../../../components/components/dashboard/e-univ/on-board/quiz/QuizPagination";
import ModalPICTicket from "../../../../components/components/database-admin/elements/ModalPICTicket";
import QuizQuestion from "../../../../components/components/dashboard/e-univ/on-board/quiz/Question";

// import sub/custom components

// import media files

const DevelopmentQuiz = ({ setFinishedQuiz }) => {
  const data = {
    examId: 1,
    startDate: "14/03/2023 13:40:00",
    endDate: "14/04/2023 13:40:00",
    change: 3,
    questionShow: 10,
    minScore: 80,
    question: [
      {
        questionId: 20,
        descQuestion:
          "Pengguna dapat menjalankan iPhone sebagai Webcam jika memiliki iPhone dengan tipe berikut… (Pilih semua yang tepat)",
        type: "mr",
        img: "",
        video: "",
        answer: [
          {
            answerId: "42",
            descAnswer: "iPhone 8",
          },
          {
            answerId: "47",
            descAnswer: "iPhone 14 Series",
          },
          {
            answerId: "46",
            descAnswer: "iPhone 13 Series",
          },
          {
            answerId: "43",
            descAnswer: "iPhone Xr",
          },
          {
            answerId: "44",
            descAnswer: "iPhone 11 Series",
          },
          {
            answerId: "45",
            descAnswer: "iPhone 12 Series",
          },
        ],
      },
      {
        questionId: 16,
        descQuestion:
          "Fitur ini memungkinkan pengguna untuk menjadikan iPhone sebagai webcam pada mac.",
        type: "mc",
        img: "",
        video: "",
        answer: [
          {
            answerId: "24",
            descAnswer: "Handoff FaceTime",
          },
          {
            answerId: "28",
            descAnswer: "Share Group Tab",
          },
          {
            answerId: "23",
            descAnswer: "Stage Manager",
          },
          {
            answerId: "27",
            descAnswer: "Pass Key",
          },
          {
            answerId: "26",
            descAnswer: "Spotlight",
          },
          {
            answerId: "25",
            descAnswer: "Kamera Berkelanjutan",
          },
        ],
      },
      {
        questionId: 15,
        descQuestion:
          "Fitur ini memungkinkan pengguna untuk melanjutkan panggilan FaceTime dari satu perangkat Apple ke perangkat Apple lainnya",
        type: "mc",
        img: "",
        video: "",
        answer: [
          {
            answerId: "22",
            descAnswer: "Share Group Tab",
          },
          {
            answerId: "18",
            descAnswer: "Handoff FaceTime",
          },
          {
            answerId: "17",
            descAnswer: "Stage Manager",
          },
          {
            answerId: "19",
            descAnswer: "Kamera Berkelanjutan",
          },
          {
            answerId: "20",
            descAnswer: "Spotlight",
          },
          {
            answerId: "21",
            descAnswer: "Pass Key",
          },
        ],
      },
      {
        questionId: 18,
        descQuestion:
          "Desk View memungkinkan orang lain melihat meja dan wajah pengguna secara bersamaan selama panggilan di Mac",
        type: "tf",
        img: "",
        video: "",
        answer: [
          {
            answerId: "35",
            descAnswer: "salah",
          },
          {
            answerId: "34",
            descAnswer: "benar",
          },
        ],
      },
      {
        questionId: 19,
        descQuestion:
          "Pengguna dapat menjalankan fitur DeskView jika memiliki iPhone dengan tipe berikut… (Pilih semua yang tepat)",
        type: "mr",
        img: "",
        video: "",
        answer: [
          {
            answerId: "38",
            descAnswer: "iPhone 13 Series",
          },
          {
            answerId: "39",
            descAnswer: "iPhone 14 Series",
          },
          {
            answerId: "41",
            descAnswer: "iPhone Xr",
          },
          {
            answerId: "36",
            descAnswer: "iPhone 11 Series",
          },
          {
            answerId: "40",
            descAnswer: "iPhone SE",
          },
          {
            answerId: "37",
            descAnswer: "iPhone 12 Series",
          },
        ],
      },
      {
        questionId: 17,
        descQuestion:
          "Berikut adalah beberapa effect / hal yang bisa dilakukan dengan iPhone sebagai WebCam pada mac. (Pilih semua yang tepat)",
        type: "mr",
        img: "",
        video: "",
        answer: [
          {
            answerId: "32",
            descAnswer: "Desk View",
          },
          {
            answerId: "29",
            descAnswer: "Center Stage",
          },
          {
            answerId: "33",
            descAnswer: "FaceID",
          },
          {
            answerId: "31",
            descAnswer: "Studio Light",
          },
          {
            answerId: "30",
            descAnswer: "Potrait",
          },
        ],
      },
      {
        questionId: 23,
        descQuestion:
          "Handoff FaceTime memerlukan device yang sudah menjalankan macOS terbaru dan iOS 16 / iPadOS 16",
        type: "tf",
        img: "",
        video: "",
        answer: [
          {
            answerId: "53",
            descAnswer: "salah",
          },
          {
            answerId: "52",
            descAnswer: "benar",
          },
        ],
      },
      {
        questionId: 13,
        descQuestion:
          "Tiga fitur macOS yang dibahas di minggu ini adalah : … (Pilih tiha fitur yang tepat)",
        type: "mr",
        img: "",
        video: "",
        answer: [
          {
            answerId: "9",
            descAnswer: "Pass Key",
          },
          {
            answerId: "10",
            descAnswer: "Share Group Tab",
          },
          {
            answerId: "8",
            descAnswer: "Spotlight",
          },
          {
            answerId: "7",
            descAnswer: "Kamera Berkelanjutan",
          },
          {
            answerId: "5",
            descAnswer: "Stage Manager",
          },
          {
            answerId: "6",
            descAnswer: "Handoff FaceTime",
          },
        ],
      },
      {
        questionId: 22,
        descQuestion:
          "iPhone SE dapat digunakan untuk menjalankan fitur DeskView pada Mac dengan macOS terbaru",
        type: "tf",
        img: "",
        video: "",
        answer: [
          {
            answerId: "51",
            descAnswer: "salah",
          },
          {
            answerId: "50",
            descAnswer: "benar",
          },
        ],
      },
      {
        questionId: 1,
        descQuestion: "macOS terbaru dari Apple memiliki nama\r\n",
        type: "mc",
        img: null,
        video: null,
        answer: [
          {
            answerId: "3",
            descAnswer: "macOS X Ventura",
          },
          {
            answerId: "1",
            descAnswer: "macOS Ventura",
          },
          {
            answerId: "2",
            descAnswer: "macOS Monterey",
          },
          {
            answerId: "4",
            descAnswer: "macOS X Monterey",
          },
        ],
      },
    ],
  };

  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("access_token"));
  // const [uid, setUid] = useState(localStorage.getItem("uid"));
  // const [data, setData] = useState([]);
  const [time, setTime] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [score, setScore] = useState("");
  const questionList = data?.question;

  const { state } = useLocation();
  const silabusId = state?.silabusId;
  const pathId = state?.pathId;

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
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const answersIds = selectedAnswers
    .map((item) => item.answerId)
    .flat()
    .filter((id) => id !== undefined)
    .map(Number);

  const questionIds = selectedAnswers
    .map((item) => item.questionId)
    .filter((id) => id !== undefined)
    .map(Number);

  // const fetchData = async () => {
  //   try {
  //     await axios
  //       .post(
  //         "/euniv/get-exam",
  //         {
  //           pathId, //int
  //         },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       )
  //       .then((res) => setData(res?.data?.data));
  //   } catch (e) {
  //  return e
  //   }
  // };

  // const submitData = async () => {
  //   try {
  //     await axios
  //       .post(
  //         "/euniv/submit-progress",
  //         {
  //           silabusId,
  //           times: time,
  //           uid: "ID0013345",
  //           answersIds: answersIds,
  //           questionIds: questionIds,
  //         },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       )
  //       .then((res) => {
  //         if (res?.status === 200) {
  //           setScore(res?.data?.data);
  //           navigate("/learning/courses/result", {
  //             state: {
  //               score: res?.data?.data,
  //               time: time,
  //               silabusId: silabusId,
  //             },
  //           });
  //         } else {
  //       return res;
  //         }
  //       });
  //   } catch (e) {
  // return e
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleSubmitData = () => {
    setFinishedQuiz(true);
  };

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    // setUid(localStorage.getItem("uid"));
  }, []);

  return (
    <>
      <div className="mb-3 ps-2 pb-3 border-0 w-100">
        {/* Question Title + Timer */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
          {/* Timer */}
          <Timer setTime={setTime} setTotalTime={setTotalTime} />
          <Button
            className="ms-3 mb-0"
            size="xs"
            variant="outline-primary"
            onClick={() => setShow(true)}
          >
            Cancel
          </Button>
        </div>

        {/* Progress */}
        <QuizProgress
          currentQuestion={currentPage}
          totalQuestion={questionList?.length}
          customSpan="Assignment Progress:"
        />

        {/* Question(s) */}
        <div className="mt-5">
          {questionList ? (
            <>
              <span>Question {currentPage}</span>
              <QuizQuestion
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

        {/* Quiz Pagination */}
        <div className="mt-3">
          <QuizPagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            handleFinishClick={handleSubmitData}
            isAnswerSelected={isAnswerSelected}
          />
        </div>
      </div>

      <ModalPICTicket
        setShow={setShow}
        show={show}
        buttonClassName="py-2 px-3 h4"
        onClick={() => navigate("/learning/courses")}
        title="Caution"
      >
        <p className="mb-0 text-kinda-dark">
          Are you sure want to quit this quiz ?
        </p>
      </ModalPICTicket>
    </>
  );
};

export default DevelopmentQuiz;
