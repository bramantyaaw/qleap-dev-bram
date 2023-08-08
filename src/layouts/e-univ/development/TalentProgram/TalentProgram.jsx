import React, { useState } from "react";
import DevelopmentEUniv from "../DevelopmentEUniv";
import { Card, Col, Row, Tab } from "react-bootstrap";
import GKAccordionProgress from "../../../../components/components/dashboard/e-univ/GKAccordionProgress";

export const TalentProgram = (props) => {
  const [clickCourse, setClickCourse] = useState(false);
  const [selectedDataCourse, setSelectedDataCourse] = useState({});
  const [activeSubitem, setActiveSubitem] = useState(null);
  const [goToQuiz, setGoToQuiz] = useState(false);
  const [finishedQuiz, setFinishedQuiz] = useState(false);

  const CourseIndex = [
    {
      id: 1,
      title: "Talet Development Program",
      total_videos: 4,
      completed: 20, // Percent
      topics: [
        {
          id: 1,
          topic: "Training List",
          duratoin: "Done",
          status: "finished",
          locked: false,
          link: "/e-univ/talent-program/training-list",
        },
        {
          id: 2,
          topic: "Mentoring Form",
          duratoin: "Process",
          status: "continue",
          locked: false,
          link: "/e-univ/talent-program/mentoring-form",
        },
        {
          id: 3,
          topic: "Upload Project",
          duratoin: "Process",
          status: "pending",
          locked: false,
          link: "/e-univ/talent-program/upload-project",
        },
        {
          id: 4,
          topic: "Coaching Form",
          duratoin: "Not Done",
          status: "pending",
          locked: true,
        },
      ],
    },
  ];

  return (
    <DevelopmentEUniv
      text2="Talent Development Program"
      text1="Development"
      text4="Learning Page"
      link1="/learning/tech-competency"
      reverse="false"
    >
      <Row style={{ width: "100%" }} className="ps-4 pb-4">
        <Col lg={3} md={12} sm={12}>
          <Card>
            <GKAccordionProgress
              accordionItems={CourseIndex}
              setClickCourse={setClickCourse}
              setSelectedDataCourse={setSelectedDataCourse}
              setActiveSubitem={setActiveSubitem}
              activeSubitem={activeSubitem}
              setGoToQuiz={setGoToQuiz}
            />
          </Card>
        </Col>

        <Col lg={9} md={12} sm={12}>
          {props.children}
        </Col>
      </Row>
    </DevelopmentEUniv>
  );
};
