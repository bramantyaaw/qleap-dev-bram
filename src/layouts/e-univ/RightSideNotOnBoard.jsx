import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Learning from "../../assets/images/icon/Erafone-01.png";

import weeklyIcon from "../../assets/images/icon/weekly_book_icon.svg";
import talentIcon from "../../assets/images/icon/talent_book_icon.svg";
import { WeeklyTask } from "../../components/components/marketing/common/task/WeeklyTask";

const RightSideNotOnBoard = ({ data }) => {
  const weekly = data?.weekly;

  const task = [
    {
      src: weeklyIcon,
      title: "New Weekly Quiz",
      date: "19/03/2023",
    },
    {
      src: weeklyIcon,
      title: "New Weekly Quiz",
      now: 25,
      progress: "1/2",
      date: "19/03/2023",
    },
  ];
  return (
    <>
      <Card className="mb-3 mb-4">
        <div className="p-3">
          <div
            className="d-flex justify-content-center position-relative rounded py-10 border-white border rounded-3 bg-cover"
            style={{
              background: `url(${Learning})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          ></div>
        </div>
        {task?.map((data, index) => {
          return <WeeklyTask data={data} />;
        })}
        {/* {weekly?.map((item) => {
          return (
            <Card.Body key={item?.programId} className="pt-0">
              <div className="mb-3">
                <h5 className=" mb-0">{item?.title}</h5>

                <span className="text-muted mt-0 h6 me-1">
                  Period : {item?.startDate} - {item?.endDate}
                </span>
              </div>
              <div className="d-grid">
                <Link
                  to="/learning/courses"
                  className="btn btn-outline-primary btn-xs"
                >
                  Start Quiz
                </Link>
              </div>
            </Card.Body>
          );
        })} */}
      </Card>
      {/* Card */}
      <Card className="mb-4">
        {/* Card header */}

        {/* Card Body */}
        <Card.Body className="pt-5">
          <h6 className="text-muted mb-0">Your Last Module</h6>
          {/* Price single page */}
          <div className="mb-3">
            <span className="text-dark mt-0 fw-bold h4 me-1">Innovation -</span>
            <span className="fs-4 text-muted">Introduction</span>
          </div>
          <div className="d-grid">
            <Link
              to="/marketing/pages/pricing/"
              className="btn btn-outline-primary btn-sm"
            >
              Continue Learning
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default RightSideNotOnBoard;
