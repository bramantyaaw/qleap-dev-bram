// import node module libraries
import React, { useContext, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
  ListGroup,
} from "react-bootstrap";

import Icon from "@mdi/react";
import {
  mdiNote,
  mdiFitToScreen,
  mdiMicrosoftPowerpoint as pptIcon,
  mdiVideo as videoIcon,
  mdiFolderPlay as vidIcon,
  mdiYoutube as youtubeIcon,
  mdiHelpBoxMultiple as QuizIcon,
} from "@mdi/js";
import ModalPICTicket from "../../components/components/database-admin/elements/ModalPICTicket";
import LoadingComponent from "../../components/components/elements/loading/LoadingComponent";

const GKAccordionDefault = ({
  accordionItems,
  ezoneItems,
  itemClass,
  onItemClick,
  titleCustom,
  euniv,
  setModuleData,
  handleFunc,
  goToQuiz,
  goToModule,
  setGoToModule,
  setGoToQuiz,
  fetchActivity,
  itemList,
  setUpdatedId,
  modalLoading,
  setWarning,
}) => {
  const [showModal, setShowModal] = useState(false);

  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    const isCurrentEventKey = activeEventKey === eventKey;

    return (
      <Fragment>
        <Link
          to="#"
          onClick={decoratedOnClick}
          aria-expanded={isCurrentEventKey}
          className={`d-flex align-items-center text-inherit text-decoration-none h4 mb-0 ${
            euniv && children.count_syllabus_activity === 0 ? "disabled" : ""
          }`}
          data-bs-toggle={
            euniv && children.count_syllabus_activity === 0 ? "" : "collapse"
          }
          aria-controls="courseTwo"
        >
          <div
            style={euniv ? { fontFamily: "Roboto", fontWeight: "500" } : {}}
            className={euniv ? "me-auto w-sm-65" : "me-auto"}
          >
            {euniv ? children?.name : titleCustom}
          </div>
          {euniv ? (
            <div className="d-flex align-items-center w-sm-35">
              <span
                className={`fs-6 text-center fw-semi-bold me-1 ${
                  children.count_user_result ===
                    children.count_syllabus_activity &&
                  children.count_syllabus_activity !== 0
                    ? "text-success"
                    : children.count_user_result > 0
                    ? "text-warning"
                    : "text-body"
                }`}
              >
                {children.count_user_result}/{children.count_syllabus_activity}{" "}
                Complete
              </span>
              <span className="chevron-arrow">
                <i className="fe fe-chevron-down fs-4 align-middle"></i>
              </span>
            </div>
          ) : (
            <span className="chevron-arrow mt-4">
              <i className="fe fe-chevron-down fs-4"></i>
            </span>
          )}
        </Link>
      </Fragment>
    );
  };

  const handleAccordionClick = async (syllabus_id) => {
    await fetchActivity(syllabus_id);
    await setUpdatedId(syllabus_id);
  };

  return (
    <Fragment>
      {ezoneItems ? (
        <Accordion>
          <ListGroup as="ul" variant="flush">
            <ListGroup.Item as="li" className={`${itemClass ? itemClass : ""}`}>
              <ContextAwareToggle></ContextAwareToggle>
              <Accordion.Collapse className="test">
                <ListGroup className="py-4" as="ul">
                  {ezoneItems?.map((subitem, subindex) => (
                    <ListGroup.Item
                      key={subindex}
                      as="li"
                      className="px-0 py-1 border-0"
                    >
                      <div
                        onClick={() => {
                          setModuleData(subitem);
                          handleFunc && handleFunc();
                        }}
                        role="button"
                        className={`d-flex justify-content-between align-items-center text-inherit text-decoration-none`}
                      >
                        <div className="d-flex align-items-center ">
                          {subitem?.Type === "ppt" ? (
                            <span className="icon-shape bg-warning text-light-warning icon-xs rounded-3 me-2">
                              <Icon path={pptIcon} size={0.8} />
                            </span>
                          ) : subitem?.Type === "meeting" ? (
                            <span className="icon-shape bg-primary text-white icon-xs rounded-3 me-2">
                              <Icon path={videoIcon} size={0.8} />
                            </span>
                          ) : subitem?.Type === "video" ? (
                            <span className="icon-shape bg-danger text-light-danger icon-xs rounded-3 me-2">
                              <Icon path={youtubeIcon} size={0.8} />
                            </span>
                          ) : subitem?.Type === "quiz" ? (
                            <span className="icon-shape bg-success text-light-success icon-xs rounded-3 me-2">
                              <Icon path={QuizIcon} size={0.6} />
                            </span>
                          ) : (
                            <span className="icon-shape bg-success text-light-success icon-xs rounded-3 me-2">
                              <Icon path={mdiFitToScreen} size={0.8} />
                            </span>
                          )}

                          <span className="fs-5">{subitem?.title}</span>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Accordion.Collapse>
            </ListGroup.Item>

            {/* ezone */}
          </ListGroup>
        </Accordion>
      ) : (
        <>
          {accordionItems?.length > 0 && (
            <Accordion defaultActiveKey={null}>
              <ListGroup as="ul" variant="flush">
                {accordionItems?.map((item, index) => {
                  return (
                    <ListGroup.Item
                      key={item?.id}
                      as="li"
                      className={`${itemClass ? itemClass : "pe-2"}`}
                    >
                      <ContextAwareToggle
                        eventKey={item?.id}
                        callback={handleAccordionClick}
                      >
                        {item}
                      </ContextAwareToggle>
                      <Accordion.Collapse eventKey={item?.id}>
                        {modalLoading ? (
                          <LoadingComponent className="mt-3" />
                        ) : (
                          <>
                            {itemList?.length === 0 && (
                              <div className="text-center mt-4 fst-italic text-body">
                                There is no Module/Exam in this Syllabus.
                              </div>
                            )}
                            <ListGroup className="py-4" as="ul">
                              {itemList?.map((subitem, subindex) => {
                                return (
                                  <ListGroup.Item
                                    key={subindex}
                                    as="li"
                                    className="px-0 py-1 border-0"
                                  >
                                    <div
                                      onClick={
                                        goToQuiz
                                          ? () => setShowModal(true)
                                          : goToModule
                                          ? () => setWarning(true)
                                          : () => {
                                              setModuleData(subitem);
                                              subitem?.type === "module" &&
                                                setGoToModule(true);
                                              handleFunc && handleFunc();
                                            }
                                      }
                                      role="button"
                                      className={`d-flex justify-content-between align-items-center text-inherit text-decoration-none`}
                                    >
                                      <div className="text-truncate ">
                                        {subitem?.type === "module" ? (
                                          <span className="icon-shape bg-success text-light icon-xs rounded-3 me-2">
                                            <Icon
                                              path={mdiFitToScreen}
                                              size={0.8}
                                            />
                                          </span>
                                        ) : (
                                          <span className="icon-shape bg-info text-light icon-xs rounded-3 me-2">
                                            <Icon path={mdiNote} size={0.5} />
                                          </span>
                                        )}
                                        <span className="fs-5">
                                          {subitem?.name}
                                        </span>
                                      </div>
                                      <div
                                        className={`text-${
                                          subitem?.status === "Done"
                                            ? "success"
                                            : "secondary"
                                        }`}
                                      >
                                        <span className={`fs-6 fw-normal`}>
                                          {subitem?.status}
                                        </span>
                                      </div>
                                    </div>
                                  </ListGroup.Item>
                                );
                              })}
                            </ListGroup>
                          </>
                        )}
                      </Accordion.Collapse>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Accordion>
          )}
        </>
      )}

      {showModal && (
        <ModalPICTicket
          setShow={setShowModal}
          show={showModal}
          buttonClassName="py-2 px-3 rounded-3  h4"
          onClick={() => {
            setGoToQuiz(false);
            setShowModal(false);
            localStorage.removeItem("selectedAnswers");
          }}
          // onClick={() => navigate("/e-univ/learning/")}
          title="Caution"
        >
          <p className="mb-0 text-kinda-dark">
            Are you sure want to quit this quiz ?
          </p>
        </ModalPICTicket>
      )}
    </Fragment>
  );
};

export default GKAccordionDefault;
