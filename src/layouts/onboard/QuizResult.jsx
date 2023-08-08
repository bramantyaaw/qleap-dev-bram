// import node module libraries
import { Link, useLocation } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import ApexCharts from "../../components/components/elements/charts/ApexCharts";

const QuizResult = ({
  withoutNavbar,
  scoreResult,
  quizChance,
  linkNavigate,
  buttonText,
  minScore,
  setGoToQuiz,
  setGoToResultQuiz,
  setUpdateSyllabus,
  setIsDone,
  participant,
  title,
  setModuleData,
}) => {
  const location = useLocation();
  const score =
    scoreResult !== undefined ? scoreResult : location?.state?.score?.score;

  const QuizResultChartSeries = [score];
  const QuizResultChartOptions = {
    colors: [
      minScore
        ? score < minScore
          ? "#e53e3e"
          : "#38a169"
        : score < 80
        ? "#e53e3e"
        : "#38a169",
    ],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: -2,
          size: "50%",
          background: minScore
            ? score < minScore
              ? "#dbbdc6"
              : "#d1f5ea"
            : score < 80
            ? "#dbbdc6"
            : "#d1f5ea",
        },
        dataLabels: {
          name: { show: true, fontSize: "18px", fontWeight: 600, offsetY: 7 },
          value: { show: false },
        },
      },
    },
    labels: [score],
  };

  return (
    <>
      {withoutNavbar ? (
        <Card>
          <Card.Body className="p-10 text-center">
            {score < 80 ? (
              <div className="mb-4 ">
                <h2>☹️ Sorry. You’re not passed!</h2>
                <p className="mb-0 px-lg-14">
                  Kamu belum berhasil menyelesaikan Quiz ini. Kamu bisa klik{" "}
                  <span className="fst-italic fw-bold">Try Again</span> untuk
                  mengerjakan ulang Quiz ini
                </p>
              </div>
            ) : (
              <div className="mb-4 ">
                <h2>🎉 Congratulations. You passed!</h2>
                <p className="mb-0 px-lg-14">
                  You are successfully completed the quiz. Now you click on
                  finish and back to your quiz page.
                </p>
              </div>
            )}

            <div className="d-flex justify-content-center">
              <div className="resultChart">
                <ApexCharts
                  options={QuizResultChartOptions}
                  series={QuizResultChartSeries}
                  type="radialBar"
                  height={150}
                />
              </div>
            </div>
            <div className="mt-3">
              <span>
                Your Score: <span className="text-dark">{score}</span>
              </span>
              <br />

              <span className="mt-0 d-block">
                Passing Score: <span className="text-dark">80</span>
              </span>

              {score < 80 && (
                <span className="mt-3 d-block">
                  Kesempatanmu tersisa :{" "}
                  <span className="text-dark">{quizChance}</span>
                </span>
              )}
            </div>
            {score < 80 ? (
              <div className="mt-5">
                <Link to={linkNavigate} className="btn btn-primary">
                  {buttonText}
                </Link>
              </div>
            ) : (
              <div className="mt-5">
                <Link to={linkNavigate} className="btn btn-primary">
                  {buttonText}
                </Link>
              </div>
            )}
          </Card.Body>
        </Card>
      ) : (
        <div>
          {score < minScore ? (
            <div className="mb-2 ">
              <h2 style={{ fontFamily: "Roboto" }}>
                ☹️ Sorry. You’re not passed!
              </h2>
              <p className="mb-0 px-lg-14">
                {participant?.name} - {participant?.nik}
              </p>
              <p className="mb-0 px-lg-14">
                Kamu belum berhasil menyelesaikan {""}
                <span className="text-body fw-bold"> {title}</span>
              </p>
              <p className="mb-0 px-lg-14">
                Pada {""}
                <span className="text-body fw-bold">
                  {participant.current_time}
                </span>
              </p>
            </div>
          ) : (
            <div className="mb-2">
              <h2 style={{ fontFamily: "Roboto" }}>
                🎉 Congratulations. You passed!
              </h2>
              <p className="mb-0 px-lg-14">
                {participant?.name} - {participant?.nik}
              </p>
              <p className="mb-0 px-lg-14">
                Kamu berhasil menyelesaikan Quiz
                <span className="text-body fw-bold"> {title}</span>
              </p>
              <p className="mb-0 px-lg-14">
                Pada {""}
                <span className="text-body fw-bold">
                  {participant.current_time}
                </span>
              </p>
            </div>
          )}
          <div className="d-flex justify-content-center">
            <div className="resultChart">
              <ApexCharts
                options={QuizResultChartOptions}
                series={QuizResultChartSeries}
                type="radialBar"
                height={200}
              />
            </div>
          </div>
          <div className="mt-1">
            <span>
              Your Score: <span className="text-dark">{score}</span>
            </span>
            <br />

            <span className="mt-0 d-block">
              Passing Score: <span className="text-dark">{minScore}</span>
            </span>

            {score < minScore ? (
              <div>
                <span className="mt-3 d-block">
                  Kesempatanmu tersisa :{" "}
                  <span className="text-dark">{quizChance}x</span>
                </span>
                <span className="mt-1 d-block">
                  Klik
                  <span className="fst-italic fw-bold text-body">
                    Try Again{" "}
                  </span>
                  untuk mengerjakan ulang Quiz ini
                </span>
              </div>
            ) : (
              <div>
                <span className="mt-3 d-block">
                  Kamu bisa klik {""}
                  <span className="fst-italic fw-bold text-body">Done</span>
                  {""} untuk melanjutkan materi
                </span>
              </div>
            )}
          </div>

          {score < minScore ? (
            <div className="mt-5">
              <div className="d-flex align-items-end text-end justify-content-end">
                <Button
                  size="sm"
                  className="rounded-3 mt-2 "
                  onClick={() => {
                    setGoToQuiz(false);
                    setGoToResultQuiz(false);
                    setUpdateSyllabus(true);
                    setIsDone(true);
                    setModuleData(null);
                  }}
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-end text-end justify-content-end">
              <Button
                size="sm"
                className="rounded-3 mt-2 "
                onClick={() => {
                  setGoToQuiz(false);
                  setGoToResultQuiz(false);
                  setUpdateSyllabus(true);
                  setIsDone(true);
                  setModuleData(null);
                }}
              >
                Done
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default QuizResult;
