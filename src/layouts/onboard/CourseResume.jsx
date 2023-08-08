// import node module libraries
import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";
import GKAccordionDefault from "./GKAccordionDefault";
import MainNavbar from "../navbars/MainNavbar";
import TicketPage from "../../components/components/dashboard/ticketing/hero/TicketPage";
import axios from "axios";
import ModalPICTicket from "../../components/components/database-admin/elements/ModalPICTicket";
// import GKAccordionDefault from "../../components/components/marketing/common/accordions/GKAccordionDefault";

import NewNavbar from "../navbars/NewNavbar";
import LoadingComponent from "../../components/components/elements/loading/LoadingComponent";
import EUnivLayout from "../navbars/EUnivLayout";

export const CourseResume = (props) => {
  const {
    program_id,
    children,
    data,
    setModuleData,
    linkName,
    moduleData,
    setGoToModule,
    goToModule,
    setWarning,
    goToQuiz,
    setGoToQuiz,
    itemList,
    setUpdatedId,
    fetchActivity,
    modalLoading,
    loading
  } = props;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <EUnivLayout>
        <main className="bg-wrapper d-flex flex-column flex-lg-row">
          <section
            className="card course-sidebar w-80 w-lg-25 mt-2"
            id="courseAccordion"
          >
            <SimpleBar style={{ maxHeight: "93vh" }}>
              <Card className="sidebar-course-card">
                <Card.Header>
                  <h4 className="mb-0 fw-bold ps-0">
                    {linkName ? linkName : "Table of Contents"}
                  </h4>
                </Card.Header>
                {loading ? (
                  <LoadingComponent className="mt-3" />
                ) : (
                  <>
                    {data.length === 0 && (
                      <div className="my-4 fst-italic align-items-center text-center">
                        There is no Syllabus in this Program.
                      </div>
                    )}
                    <GKAccordionDefault
                      accordionItems={data}
                      euniv
                      setModuleData={(moduleData) => setModuleData(moduleData)}
                      setGoToQuiz={setGoToQuiz}
                      goToQuiz={goToQuiz}
                      setGoToModule={setGoToModule}
                      goToModule={goToModule}
                      setWarning={setWarning}
                      itemList={itemList}
                      setUpdatedId={setUpdatedId}
                      fetchActivity={fetchActivity}
                      modalLoading={modalLoading}
                    />
                  </>
                )}
              </Card>
            </SimpleBar>
          </section>
          <section className="course-container bg-wrapper w-100 w-lg-75">
            <Container fluid>
              <Row>
                <Col sm={12} lg={12}>
                  <div>
                    <div className="pt-2 d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 mb-sm-0 content-course">
                      {goToQuiz ? (
                        <>
                          <TicketPage
                            text1={linkName}
                            text2={moduleData?.name}
                            text4="Learning Page"
                            link1="#"
                            onClick={() => setShowModal(true)}
                            reverse="true"
                          />
                        </>
                      ) : goToModule ? (
                        <>
                          <TicketPage
                            text1={linkName}
                            text2={moduleData?.name}
                            text4="Learning Page"
                            link1="#"
                            onClick={() => setWarning(true)}
                            reverse="true"
                          />
                        </>
                      ) : (
                        <>
                          <TicketPage
                            text1={linkName}
                            text2={moduleData?.name}
                            text4="Learning Page"
                            link1="/e-univ/learning"
                            reverse="true"
                          />
                        </>
                      )}
                    </div>
                    <div className="w-100 h-100 pb-3 d-flex flex-column justify-content-center align-items-center">
                      {children}
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        {showModal && (
          <ModalPICTicket
            setShow={setShowModal}
            show={showModal}
            buttonClassName="py-2 px-3 rounded-3  h4"
            onClick={() => navigate(`/e-univ/learning`)}
            title="Caution"
          >
            <p className="mb-0 text-kinda-dark">
              Are you sure want to quit this quiz ?
            </p>
          </ModalPICTicket>
        )}
      </EUnivLayout>
    </Fragment>
  );
};

export default CourseResume;
