// import node module libraries
import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import GKAccordionDefault from "../../../onboard/GKAccordionDefault";
import TicketPage from "../../../../components/components/dashboard/ticketing/hero/TicketPage";
import Footer from "../../../footers/Footer";
import NewEzoneLayout from "../../../../components/ezone/new/Header/NewEzoneLayout";

export const CourseEzone = (props) => {
  const {
    text1,
    link1,
    setModuleData,
    arrPPT,
    arrVideo,
    arrMeeting,
    title,
    arrCustom,
    titleCustom,
    withoutLink,
    withTitle,
    linkClassName,
    handleFunc,
  } = props;

  return (
    <Fragment>
      <NewEzoneLayout>
        <main
          className="bg-wrapper d-flex flex-column flex-lg-row pt-2 pt-lg-3"
          style={{ maxHeight: "100%" }}
        >
          {/*  Card */}
          <section
            className="card course-sidebar w-80 w-lg-25"
            id="courseAccordion"
          >
            <SimpleBar>
              <Card className="sidebar-course-card pt-8 pt-lg-6">
                <Card.Header style={{ paddingLeft: "20px" }}>
                  <h4 className="mb-0">{title}</h4>
                </Card.Header>
                {/* Course Index Accordion */}
                {arrCustom?.length > 0 && (
                  <GKAccordionDefault
                    ezoneItems={arrCustom}
                    titleCustom={titleCustom}
                    setModuleData={setModuleData}
                    handleFunc={handleFunc}
                  />
                )}
                {arrPPT?.length > 0 && (
                  <GKAccordionDefault
                    ezoneItems={arrPPT}
                    titleCustom="Module"
                    setModuleData={setModuleData}
                  />
                )}
                {arrVideo?.length > 0 && (
                  <GKAccordionDefault
                    ezoneItems={arrVideo}
                    titleCustom="Video"
                    setModuleData={setModuleData}
                  />
                )}
                {arrMeeting?.length > 0 && (
                  <GKAccordionDefault
                    ezoneItems={arrMeeting}
                    titleCustom="Zoom Record"
                    setModuleData={setModuleData}
                  />
                )}
              </Card>
            </SimpleBar>
          </section>
          <section className="course-container bg-wrapper w-100 w-lg-75">
            <Container fluid>
              <Row>
                <Col sm={12} lg={12}>
                  <div>
                    {withoutLink ? (
                      <div
                        className={`${linkClassName} pt-2 d-flex flex-column flex-sm-row justify-content-end align-items-center mb-4 mb-sm-2 content-course`}
                      >
                        {withTitle && (
                          <h3
                            className="text-kinda-dark"
                            style={{ fontWeight: "600" }}
                          >
                            ILEAD QUIZ
                          </h3>
                        )}
                        {/* <Link to="/ezone/ilead/diagnostic">Back to ILEAD</Link> */}
                      </div>
                    ) : (
                      <div className="pt-2 d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 mb-sm-0 content-course">
                        <TicketPage
                          text1="ILEAD Zone"
                          link1="/ezone/ilead/diagnostic"
                          text2="ILEAD Room"
                          link2="/ezone/ilead/room"
                          text4={text1}
                        />
                        {/* <Link to="/ezone/ilead/diagnostic">Back to ILEAD</Link> */}
                      </div>
                    )}

                    <div className="w-100 h-100 pb-3 d-flex flex-column justify-content-center align-items-center px-5 px-lg-0">
                      {props.children}
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </NewEzoneLayout>
    </Fragment>
  );
};

export default CourseEzone;
