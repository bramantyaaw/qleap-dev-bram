// import node module libraries
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const QuizPagination = ({
  nPages,
  currentPage,
  setCurrentPage,
  handleFinishClick,
  totalTime,
  answersIds,
  questionIds,
  selectedAnswers,
  euniv,
  disableButton,
}) => {
  // const [disableButton, setDisableButton] = useState(false);
  const handleClickScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
      handleClickScrollUp();
    }
    // setIsAnswerSelected(false);
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      handleClickScrollUp();
    }
    // setIsAnswerSelected(true);
  };

  // useEffect(() => {

  // })

  useEffect(() => {
    handleClickScrollUp();
  }, [currentPage]);

  return (
    <div
      className={`d-flex justify-content-${
        currentPage > 1 ? "between" : "end"
      }`}
    >
      {currentPage > 1 && (
        <Button variant="secondary" className="rounded-3" onClick={prevPage}>
          <i className="fe fe-arrow-left"></i> Previous
        </Button>
      )}
      {currentPage === nPages ? (
        disableButton ? (
          <>
            <Button className="btn btn-primary rounded-3" disabled>
              Finish
            </Button>
          </>
        ) : (
          <>
            <Button
              className="btn btn-primary rounded-3"
              onClick={() => {
                euniv
                  ? handleFinishClick(selectedAnswers, totalTime)
                  : handleFinishClick(answersIds, questionIds, totalTime);
              }}
              disabled={currentPage <= selectedAnswers?.length ? false : true}
            >
              Finish
            </Button>
          </>
        )
      ) : (
        <Button
          variant="primary"
          onClick={nextPage}
          // disabled={!isAnswerSelected}
          disabled={
            currentPage === selectedAnswers?.length ||
            currentPage <= selectedAnswers?.length
              ? false
              : true
          }
          className="rounded-3"
        >
          {" "}
          Next <i className="fe fe-arrow-right"></i>
        </Button>
      )}
    </div>
  );
};

export default QuizPagination;
