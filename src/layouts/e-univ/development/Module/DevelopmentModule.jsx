import React, { useState, useEffect } from "react";
import DevelopmentEUniv from "../DevelopmentEUniv";
import { Card, Row, Col, Tab } from "react-bootstrap";
import GKAccordionProgress from "../../../../components/components/dashboard/e-univ/GKAccordionProgress";
import IdleCourse from "../../../../components/components/dashboard/e-univ/on-board/IdleCourse";
import SelectedDevModule from "./SelectedDevModule";

const DevelopmentModule = () => {
  const [clickCourse, setClickCourse] = useState(false);
  const [selectedDataCourse, setSelectedDataCourse] = useState({});
  const [activeSubitem, setActiveSubitem] = useState(null);
  const [goToQuiz, setGoToQuiz] = useState(false);
  const [finishedQuiz, setFinishedQuiz] = useState(false);

  const CourseIndex = [
    {
      id: 1,
      title: "Introduction to JavaScript",
      total_videos: 4,
      total_duratoin: "1 hour and 17 minutes",
      completed: 5, // Percent
      topics: [
        {
          id: 1,
          topic: "Introduction",
          duratoin: "1m 7s",
          status: "finished",
          locked: false,
        },
        {
          id: 2,
          topic: "Installing Development Software",
          duratoin: "3m 11s",
          status: "continue",
          locked: false,
        },
        {
          id: 3,
          topic: "Hello World Project from GitHub",
          duratoin: "2m 33s",
          status: "pending",
          locked: false,
        },
        {
          id: 4,
          topic: "Our Sample Website",
          duratoin: "2m 15s",
          status: "pending",
          locked: true,
        },
      ],
    },
    {
      id: 2,
      title: "JavaScript Beginning",
      total_videos: 8,
      total_duratoin: "34 minutes",
      completed: 0, // Percent
      topics: [
        {
          id: 1,
          topic: "Introduction",
          duratoin: "1m 41s",
          status: "pending",
          locked: true,
        },
        {
          id: 2,
          topic: "Adding JavaScript Code to a Web Page",
          duratoin: "3m 39s",
          status: "pending",
          locked: true,
        },
        {
          id: 3,
          topic: "Working with JavaScript Files",
          duratoin: "6m 18s",
          status: "pending",
          locked: true,
        },
        {
          id: 4,
          topic: "Formatting Code",
          duratoin: "2m 18s",
          status: "pending",
          locked: true,
        },
        {
          id: 5,
          topic: "Detecting and Fixing Errors",
          duratoin: "3m 14s",
          status: "pending",
          locked: true,
        },
        {
          id: 6,
          topic: "Case Sensitivity",
          duratoin: "1m 48s",
          status: "pending",
          locked: true,
        },
        {
          id: 7,
          topic: "Commenting Code",
          duratoin: "2m 24s",
          status: "pending",
          locked: true,
        },
        {
          id: 8,
          topic: "Summary",
          duratoin: "2m 14s",
          status: "pending",
          locked: true,
        },
      ],
    },
  ];

  useEffect(() => {
    setGoToQuiz(false);
    setFinishedQuiz(false);
  }, [activeSubitem]);

  return (
    <>
      <DevelopmentEUniv
        text2="ERO Certification"
        text1="Development"
        text4="Learning Page"
        link1="/learning/tech-competency"
        reverse="true"
      >
        <Row style={{ width: "100%" }}>
          <Col xl={4} lg={12} md={12} sm={12} className="pe-0 ">
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

          <Col xl={8} lg={12} md={12} sm={12} className="mb-4 mb-xl-0 pe-0">
            {clickCourse ? (
              <SelectedDevModule
                selectedDataCourse={selectedDataCourse}
                setGoToQuiz={setGoToQuiz}
                goToQuiz={goToQuiz}
                finishedQuiz={finishedQuiz}
                setFinishedQuiz={setFinishedQuiz}
              />
            ) : (
              <Tab.Container defaultActiveKey="description">
                <Card className="mb-5 p-15">
                  <IdleCourse
                    texth1="Select Learning Syllabus"
                    textp="Mohon pilih salah satu materi di menu samping untuk melihat materi yang kamu ingin pelajari"
                    classNamep="opacity-50"
                  />
                </Card>
              </Tab.Container>
            )}
          </Col>
        </Row>
      </DevelopmentEUniv>
    </>
  );
};

export default DevelopmentModule;
