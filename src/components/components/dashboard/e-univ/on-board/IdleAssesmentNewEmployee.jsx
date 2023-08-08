import React from "react";
import { Card, Image, Button } from "react-bootstrap";
import AssessmentIcon from "../../../../../assets/images/svg/e-univ-assesment-new-employee.svg";
import TitleInCourse from "./details/TitleInCourse";
import CardHeaderCourse from "./details/CardHeaderCourse";

const IdleAssesmentNewEmployee = (props) => {
  const { data, onClick, hasSubmmited, scoreResults } = props;

  const remedial =
    data?.user_attempt !== 0 &&
    data?.highest_score < data?.min_score &&
    data?.user_attempt !== data?.max_attempt
      ? true
      : false;

  const noChance =
    data?.user_attempt === data?.max_attempt &&
    data?.highest_score < data?.min_score
      ? true
      : false;

  return (
    <CardHeaderCourse title={data?.name} note="" notIcon={true}>
      <Card.Body className="p-3 p-sm-6 d-flex w-100 flex-column flex-sm-row">
        <Image
          src={AssessmentIcon}
          width="234"
          height="234"
          className="w-100 w-sm-25"
        />
        <div className="w-100 w-sm-75 ps-0 ps-sm-3 ps-md-10 h-100 mt-6 mt-sm-0">
          <div className="d-flex flex-row w-100 align-items-start justify-content-between h-100">
            <TitleInCourse
              title="Total Questions"
              text={`${data?.question_show} Questions`}
            />
            {/* {hasSubmmited ? (
              <TitleInCourse
                title="Your Score"
                className="ps-5"
                perTotal="/100"
                score={scoreResults?.toString()}
                remedial={remedial}
                noChance={noChance}
              />
            ) : ( */}
            <TitleInCourse
              title="Your Score"
              className="ps-5"
              perTotal="/100"
              score={data?.highest_score ? data?.highest_score : "0"}
              remedial={remedial}
              noChance={noChance}
            />
            {/* )} */}

            <TitleInCourse
              perTotal={
                data?.max_attempt - data?.user_attempt === 0 ? "   " : "x"
              }
              score={
                data?.max_attempt - data?.user_attempt !== 0 &&
                data?.max_attempt - data?.user_attempt > 0
                  ? data?.max_attempt - data?.user_attempt
                  : data?.max_attempt - data?.user_attempt < 0
                  ? "0"
                  : "0"
              }
              title="Your Chance"
              className="ps-5"
              noBorder="true"
            />
          </div>
          <div className="mt-3">
            <p className="text-primary h4 fw-bold">Description</p>
            {data?.description ? (
              <p
                className="mb-0 text-kinda-dark"
                dangerouslySetInnerHTML={{ __html: data?.description }}
              ></p>
            ) : (
              <>
                {" "}
                <p className="mb-0 text-kinda-dark">
                  1. Peserta harus mendapatkan nilai minimal {data?.min_score}{" "}
                  Poin
                </p>
                <p className="mb-0 text-kinda-dark">
                  2. Peserta yang gagal wajib mengerjakan ulang dengan
                  menghubungi trainernya terlebih dahulu
                </p>
              </>
            )}
          </div>
          <div className="mt-7 d-flex w-100 flex-column flex-sm-row ">
            <div className="py-2 border rounded-6 border-light-white align-items-center w-100 w-sm-75 justify-content-center flex-column">
              <p className="mb-0 mt-1 text-kinda-light-dark h6 text-center">
                Please click "Start Quiz" to start working on the Quiz or
                Assessment
              </p>
            </div>
            <Button
              variant="primary"
              onClick={onClick}
              disabled={
                data?.user_attempt === data?.max_attempt ||
                data?.max_attempt - data?.user_attempt <= 0
                  ? true
                  : false
              }
              className="btn btn-primary ms-0 ms-sm-4 mt-3 mt-sm-0 rounded-6 w-100 w-sm-25 h-100"
            >
              Start Quiz
            </Button>
          </div>
        </div>
      </Card.Body>
    </CardHeaderCourse>
  );
};

export default IdleAssesmentNewEmployee;
