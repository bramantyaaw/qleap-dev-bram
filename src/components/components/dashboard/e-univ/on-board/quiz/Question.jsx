// import node module libraries
import { Fragment, useState } from "react";
import { ListGroup, Form, Image } from "react-bootstrap";

const QuizQuestion = (props) => {
  const {
    item,
    setIsAnswerSelected,
    selectedAnswers,
    setSelectedAnswers,
    euniv,
  } = props;

  const handleAnswerSelected = (answerId, questionId) => {
    setIsAnswerSelected(true);
    const index = selectedAnswers.findIndex((a) => a.questionId === questionId);
    if (index === -1) {
      const newAnswer = { questionId: questionId, answerId: [answerId] };
      setSelectedAnswers([...selectedAnswers, newAnswer]);
    } else {
      const answerIds = selectedAnswers[index].answerId;
      if (answerIds.includes(answerId)) {
        const newAnswerIds = answerIds.filter((id) => id !== answerId);
        const updatedAnswer = {
          ...selectedAnswers[index],
          answerId: newAnswerIds,
        };
        setSelectedAnswers([
          ...selectedAnswers.slice(0, index),
          updatedAnswer,
          ...selectedAnswers.slice(index + 1),
        ]);
      } else {
        if (item?.type === "mr" || item?.type === "multiple") {
          const newAnswerIds = [...answerIds, answerId];
          const updatedAnswer = {
            ...selectedAnswers[index],
            answerId: newAnswerIds,
          };
          setSelectedAnswers([
            ...selectedAnswers.slice(0, index),
            updatedAnswer,
            ...selectedAnswers.slice(index + 1),
          ]);
        } else {
          const newAnswerIds = [answerId];
          const updatedAnswer = {
            questionId: questionId,
            answerId: newAnswerIds,
          };
          setSelectedAnswers([
            ...selectedAnswers.slice(0, index),
            updatedAnswer,
            ...selectedAnswers.slice(index + 1),
          ]);
        }
      }
    }
  };

  const type =
    item?.type === "mr" || item?.type === "multiple" ? "checkbox" : "radio";

  return (
    <Fragment>
      {euniv ? (
        <>
          <h4
            className="mb-0"
            dangerouslySetInnerHTML={{ __html: item?.descQuestion }}
          ></h4>
          {item?.files?.length > 0 && (
            <div className="d-flex text-center justify-content-center align-self-center">
              <Image
                src={item.files ? item.files[0]?.url : ""}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "500px",
                  maxWidth: "500px",
                }}
                className="rounded-2 mb-4"
              />
            </div>
          )}
        </>
      ) : (
        <h4 className="mb-3 pt-1">{item?.descQuestion}</h4>
      )}

      <ListGroup>
        {item?.answer?.map((ans, index) => {
          return (
            <ListGroup.Item
              key={index}
              className={`list-group-item-action ${
                selectedAnswers.some(
                  (a) =>
                    a.questionId === item?.questionId &&
                    a.answerId.includes(ans?.answerId)
                )
                  ? "bg-light"
                  : ""
              }`}
              aria-current="true"
              onClick={() =>
                handleAnswerSelected(ans?.answerId, item?.questionId)
              }
            >
              <Form.Check
                type={type}
                id={ans?.answerId}
                name={"answer-" + item?.questionId}
                label={ans?.descAnswer}
                checked={
                  type === "checkbox"
                    ? selectedAnswers.some(
                        (a) =>
                          a.questionId === item?.questionId &&
                          a.answerId.includes(ans?.answerId)
                      )
                    : selectedAnswers.some(
                        (a) =>
                          a.questionId === item?.questionId &&
                          a.answerId[0] === ans?.answerId
                      )
                }
                // style={{
                //   whiteSpace: "wrap",
                //   overflow: "visible",
                //   textOverflow: "clip",
                // }}
                onChange={() => null}
              />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Fragment>
  );
};

export default QuizQuestion;
