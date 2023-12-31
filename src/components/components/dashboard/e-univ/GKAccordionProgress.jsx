// import node module libraries
import React, { useContext, Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
  ListGroup,
  ProgressBar,
} from "react-bootstrap";

// import MDI icons
import Icon from "@mdi/react";
import {
  mdiPlay,
  mdiCheckboxMarkedCircleOutline as ChecklistIcon,
  mdiCheckboxBlankCircleOutline as ProcessIcon,
} from "@mdi/js";

const GKAccordionProgress = ({
  accordionItems,
  setSelectedDataCourse,
  setClickCourse,
  setActiveSubitem,
  activeSubitem,
}) => {
  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    const isCurrentEventKey = currentEventKey === eventKey;

    return (
      <Fragment>
        <Link
          to="#"
          onClick={decoratedOnClick}
          aria-expanded={isCurrentEventKey}
          className="h4 mb-0 d-flex align-items-center text-inherit text-decoration-none py-3 px-4 collapsed "
          data-bs-toggle="collapse"
          role="button"
          aria-controls="courseTwo"
        >
          <div className={`me-auto ${isCurrentEventKey ? "text-primary" : ""}`}>
            {children.title}
            <p className="mb-0 text-muted fs-6 mt-1 fw-normal">
              {children.total_videos} Steps
              {children.total_duratoin ? children.total_duratoin : null}
            </p>
          </div>
          <span className="chevron-arrow ms-4">
            <i className="fe fe-chevron-down fs-4"></i>
          </span>
        </Link>
      </Fragment>
    );
  };

  const location = useLocation();
  const naigate = useNavigate();

  const handleSubitemClick = (subitem) => {
    setClickCourse(true);
    setSelectedDataCourse(subitem);
    setActiveSubitem(subitem.id);
    // if (subitem.link) {
    //   naigate(subitem.link);
    // }
  };

  return (
    <Accordion defaultActiveKey={accordionItems[0].id} className="card">
      <ListGroup as="ul" variant="flush">
        {accordionItems.map((item, index) => {
          if (item.topics.length === 0) {
            return (
              <ListGroup.Item key={index} as="li" className="p-0">
                <ContextAwareToggle eventKey={item.id}>
                  {item}
                </ContextAwareToggle>
                <Accordion.Collapse eventKey={item.id}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="fs-5  rounded-3">
                      {item.summary}
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Collapse>
              </ListGroup.Item>
            );
          } else {
            return (
              <ListGroup.Item key={index} as="li" className="p-0">
                <ContextAwareToggle eventKey={item.id}>
                  {item}
                </ContextAwareToggle>
                <Accordion.Collapse eventKey={item.id}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-top-0">
                      <ProgressBar
                        variant="success"
                        className="mb-2 progress"
                        now={item.completed}
                        style={{ height: "6px" }}
                      />
                      <small>{item.completed}% Completed</small>
                    </ListGroup.Item>
                    {item.topics.map((subitem, index) => (
                      <ListGroup.Item
                        key={index}
                        active={activeSubitem === subitem?.id}
                        disabled={subitem.locked}
                        onClick={() => handleSubitemClick(subitem)}
                      >
                        <Link
                          to={subitem.link ? subitem.link : "#"}
                          className={`d-flex justify-content-between align-items-center text-${
                            activeSubitem === subitem?.id ? "white" : "inherit"
                          }  text-decoration-none `}
                        >
                          <div className="text-truncate ">
                            <span
                              className={`icon-shape bg-${
                                activeSubitem === subitem?.id || subitem.locked
                                  ? "light"
                                  : subitem.status === "finished"
                                  ? "success"
                                  : "light"
                              } text-${
                                subitem.locked
                                  ? "muted"
                                  : activeSubitem === subitem.id ||
                                    subitem.status === "pending" ||
                                    subitem.status === "continue"
                                  ? "primary"
                                  : "white"
                              } icon-sm rounded-circle me-2`}
                            >
                              {subitem.locked ? (
                                <i className="fe fe-lock fs-4"></i>
                              ) : subitem?.status === "finished" ? (
                                <Icon path={ChecklistIcon} size={0.8} />
                              ) : subitem?.status === "continue" ||
                                subitem?.status === "pending" ? (
                                <Icon path={ProcessIcon} size={0.8} />
                              ) : (
                                <Icon path={mdiPlay} size={0.8} />
                              )}
                            </span>
                            <span className="fs-5">{subitem.topic}</span>
                          </div>
                          <div className="text-truncate fs-5">
                            <span>{subitem.duratoin}</span>
                          </div>
                        </Link>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Collapse>
              </ListGroup.Item>
            );
          }
        })}
      </ListGroup>
    </Accordion>
  );
};

export default GKAccordionProgress;
