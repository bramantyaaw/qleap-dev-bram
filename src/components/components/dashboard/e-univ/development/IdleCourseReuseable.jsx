import React from "react";
import { Card, Image, Button } from "react-bootstrap";
import AssesmentIcon from "../../../../../assets/images/svg/e-univ-assesment-new-employee.svg";
import TitleInCourse from "../on-board/details/TitleInCourse";

const IdleCourseReuseable = ({ arrTitleCourse, arrDescCourse, setState }) => {
  return (
    <Card.Body className="p-3 p-sm-6 d-flex w-100 flex-column flex-sm-row">
      <Image
        src={AssesmentIcon}
        width="234"
        height="234"
        className="w-100 w-sm-25"
      />
      <div className="w-100 w-sm-75 ps-0 ps-sm-3 ps-md-10 h-100 mt-6 mt-sm-0">
        <div className="d-flex flex-row w-100 align-items-start justify-content-between h-100">
          {arrTitleCourse?.map((data) => {
            return (
              <TitleInCourse
                title={data?.title}
                text={data?.text}
                className={data?.className}
                score={data?.score}
                noBorder={data?.noBorder}
              />
            );
          })}
        </div>
        <div className="mt-3">
          <p className="text-primary h4 fw-bold">Description</p>
          {arrDescCourse?.map((data) => {
            return <p className="mb-0 text-kinda-dark">{data?.desc}</p>;
          })}
        </div>
        <div className="mt-7 d-flex w-100 flex-column flex-sm-row ">
          <div className="py-2 border rounded-6 border-light-white align-items-center w-100 w-sm-75 justify-content-center flex-column">
            <p className="mb-0 mt-1 text-kinda-light-dark h6 text-center">
              Please click "Start" to start working on the Quiz or Assessment
            </p>
          </div>
          <Button
            onClick={() => setState(true)}
            className="btn btn-primary ms-0 ms-sm-4 mt-3 mt-sm-0 rounded-6 w-100 w-sm-25 h-100"
          >
            Start Quiz
          </Button>
        </div>
      </div>
    </Card.Body>
  );
};

export default IdleCourseReuseable;
