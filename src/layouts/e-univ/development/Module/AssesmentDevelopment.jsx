import React from "react";
import IdleCourseReuseable from "../../../../components/components/dashboard/e-univ/development/IdleCourseReuseable";
import DevelopmentQuiz from "./DevelopmentQuiz";
import DevelopmentQuizFinished from "./DevelopmentQuizFinished";

const AssesmentDevelopment = ({
  setGoToQuiz,
  goToQuiz,
  finishedQuiz,
  setFinishedQuiz,
}) => {
  const arrTitleCourse = [
    {
      title: "Total Questions",
      text: "25 Questions",
      className: "pe-3",
    },
    {
      title: "Time",
      text: "90 Minutes",
      className: "ps-3",
    },
    {
      title: "Your Score",
      score: "0",
      className: "ps-3",
    },
    {
      title: "Your Chances",
      score: "0",
      noBorder: "true",
      className: "ps-3",
    },
  ];

  const arrDescCourse = [
    {
      desc: "1. Peserta harus mendapatkan nilai minimal 80 Poin",
    },
    {
      desc: "2. Peserta memiliki 3 kali kesempatan dalam mengerjakan",
    },
    {
      desc: "3. Peserta yang telah mengerjakan lebih dari 3 kali harap menghubungi trainer/superior",
    },
  ];

  // useEffect(() => {
  //   setGoToQuiz(false);
  //   setFinishedQuiz(false);
  // }, [activeSubitem]);
  return (
    <>
      {goToQuiz ? (
        finishedQuiz ? (
          <DevelopmentQuizFinished />
        ) : (
          <DevelopmentQuiz setFinishedQuiz={setFinishedQuiz} />
        )
      ) : (
        <IdleCourseReuseable
          arrTitleCourse={arrTitleCourse}
          arrDescCourse={arrDescCourse}
          setState={setGoToQuiz}
        />
      )}
    </>
  );
};

export default AssesmentDevelopment;
