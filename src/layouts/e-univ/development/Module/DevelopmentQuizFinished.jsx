import React from "react";
import { Link } from "react-router-dom";
import ApexCharts from "../../../../components/components/elements/charts/ApexCharts";
import { Card } from "react-bootstrap";

const DevelopmentQuizFinished = () => {
  const score = 80;
  return (
    <div className="py-10 text-center">
      {score < 80 ? (
        <div className="mb-4">
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
            You are successfully completed the quiz. Now you click on finish and
            back to your quiz page.
          </p>
        </div>
      )}

      <div className="d-flex justify-content-center">
        <div className="resultChart">
          {/* <ApexCharts
              options={QuizResultChartOptions}
              series={QuizResultChartSeries}
              type="radialBar"
              height={150}
            /> */}
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
            Kesempatanmu tersisa : <span className="text-dark">2x</span>
          </span>
        )}
      </div>
      {score < 80 ? (
        <div className="mt-5">
          <Link to="/learning/courses" className="btn btn-primary">
            Try Again
          </Link>
        </div>
      ) : (
        <div className="mt-5">
          <Link to="/e-univ" className="btn btn-primary">
            Back To Competency
          </Link>
        </div>
      )}
    </div>
  );
};

export default DevelopmentQuizFinished;
