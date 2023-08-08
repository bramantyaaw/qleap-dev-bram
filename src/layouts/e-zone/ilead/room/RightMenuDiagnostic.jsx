import React, { useState } from "react";
import ComingSoon from "../../../../components/components/marketing/specialty/ComingSoon";
import ComingSoonImg from "../../../../assets/ezone/images/svg/ComingSoonILEAD.svg";
import FinishedQuiz from "../../../../assets/ezone/images/svg/quiz-ilead-finished.svg";
import WellDoneIlead from "../../../../assets/ezone/images/svg/welldone-ilead.svg";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalIleadQuiz from "../../../../components/ezone/new/components/ModalIleadQuiz";
import TableILEADQuiz from "./TableILEADQuiz";

const RightMenuDiagnostic = ({ isStatus, arrIleadExam, arrIsNotDoneYet }) => {
  const [modalIleadQuiz, setModalIleadQuiz] = useState(false);
  return (
    <div
      style={{
        backgroundColor: "#88B0FC",
        height: "100%",
        boxShadow: "0px 0.853301px 2.5599px rgba(17, 24, 39, 0.09",
      }}
      className="d-flex flex-column flex-xl-row align-items-center justify-content-between rounded px-4 py-4 py-xl-2"
    >
      {/* {isStatus === "done" ? (
        <div className="d-flex">
          <Image src={FinishedQuiz} height={85} />
          <div className="d-flex flex-column justify-content-center align-items-start ms-3 ">
            <Image src={WellDoneIlead} height={25} className="mb-2 mt-2" />
            <p className="text-white mb-0" style={{ fontWeight: "400" }}>
              You have finished ILEAD Quiz,
            </p>
          </div>
        </div>
      ) : isStatus === "coming soon" || isStatus === "" ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Image
            src={ComingSoonImg}
            height={arrIsNotDoneYet?.length > 0 ? 50 : 65}
          />
          {arrIsNotDoneYet?.length > 0 && (
            <Button
              variant="light"
              className="text-primary rounded-2 px-0 py-0 mt-2"
              style={{ width: "100px", fontSize: "12px" }}
              onClick={() => setModalIleadQuiz(true)}
            >
              View Quiz List
            </Button>
          )}
        </div>
      ) : (
        <>
          {arrIleadExam?.map((data, id) => {
            return (
              <div className="d-flex flex-column flex-sm-row h-100" key={id}>
                <Image
                  src={data?.image}
                  alt={data?.image}
                  style={{ height: "85px" }}
                  className=" rounded"
                />
                <div className="d-flex flex-column align-items-start justify-content-center ms-3">
                  <h3 className="text-white">{data?.type}</h3>
                  <Link to="/ezone/ilead/diagnostic/course" state={data}>
                    <Button
                      variant={
                        arrIsNotDoneYet?.length > 0 ? "kinda-grey" : "primary"
                      }
                      style={{ width: "144px", height: "30px" }}
                      className="d-flex align-items-center justify-content-center"
                      disabed={arrIsNotDoneYet?.length > 0 ? true : false}
                    >
                      Start Quiz
                    </Button>
                  </Link>
                  {arrIsNotDoneYet?.length > 0 && (
                    <Button
                      variant="light"
                      className="text-primary rounded-2 px-0 py-0 mt-2"
                      style={{ width: "100px", fontSize: "12px" }}
                      onClick={() => setModalIleadQuiz(true)}
                    >
                      View Quiz List
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </>
      )} */}

      <div className="d-flex flex-column justify-content-center align-items-center">
        <Image src={ComingSoonImg} height={65} />
      </div>

      <div className={`mt-3 mt-xl-0 d-flex flex-column align-items-center`}>
        <h6
          className=" text-kinda-dark text-center mb-0"
          style={{ fontWeight: "700" }}
        >
          QUIZ TIME LIMIT :
        </h6>
        {/* {isStatus === "" ? (
          <div>
            <ComingSoon launchdate={"2023-06-20 18:00:00"} />
          </div>
        ) : (
          arrIleadExam?.map((data, id) => {
            let date = data?.startDate?.split(" ");
            let firstElement = date && date[0]?.split("/");
            let dateTime = date && date[1];
            let year = firstElement && firstElement[2];
            let month = firstElement && firstElement[1];
            let day = firstElement && firstElement[0];
            let launchDate = `${year}-${month}-${day} ${dateTime}`;

            return (
              <div key={id}>
                <ComingSoon launchdate={launchDate} />
              </div>
            );
          })
        )} */}
        <div>
          <ComingSoon launchdate={"2023-06-20 18:00:00"} />
        </div>
      </div>
      {modalIleadQuiz && (
        <ModalIleadQuiz
          show={modalIleadQuiz}
          setShow={setModalIleadQuiz}
          h1="ILEAD Quiz List"
          p="This is a list of ILEAD quiz that you haven't finished yet"
        >
          <TableILEADQuiz dataArr={arrIsNotDoneYet} />
        </ModalIleadQuiz>
      )}
    </div>
  );
};

export default RightMenuDiagnostic;
