// import node module libraries
import { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Image,
  Card,
  Row,
  Col,
  ProgressBar,
  ListGroup,
  Badge,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import PathBootstrap from "../../../../../../assets/images/svg/CARD_NO_IMAGE.svg";
import Icon from "@mdi/react";
import { mdiCalendarClock, mdiCalendarRange } from "@mdi/js";

const CourseCard = ({ item, free, viewby, showprogressbar, extraclass }) => {
  /** Used in Course Index, Course Category, Course Filter Page, Student Dashboard etc...  */
  const GridView = () => {
    const currentDate = new Date();
    const end = new Date(
      item?.syllabus_end_date?.replace(
        /(\d{2})\/(\d{2})\/(\d{4}), (\d{2}:\d{2})/,
        "$2/$1/$3 $4"
      )
    );
    const start = new Date(
      item?.syllabus_start_date?.replace(
        /(\d{2})\/(\d{2})\/(\d{4}), (\d{2}:\d{2})/,
        "$2/$1/$3 $4"
      )
    );
    const isBetweenDates = currentDate >= start && currentDate <= end;
    const remainingTime = end.getTime() - Date.now();
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    return (
      <Link
        to={`/e-univ/learning/courses/${item?.id}`}
        state={item}
        onClick={() => {
          localStorage.setItem("lastProgramId", item?.id);
          localStorage.setItem("lastProgram", JSON.stringify(item));
        }}
      >
        {" "}
        <Card
          style={{ height: "100%" }}
          className={`mb-4 card-hover ${extraclass}`}
        >
          <div className="position-relative">
            <Image
              src={
                item?.files?.length > 0 ? item?.files[0]?.url : PathBootstrap
              }
              alt=""
              style={{
                objectFit: "cover",
                height: "175px",
              }}
              className="card-img-top rounded-top-md"
            />
            {isBetweenDates && (
              <span
                className="position-absolute bg-white rounded-2 px-1"
                style={{ top: 8, right: 5, color: "red" }}
              >
                <Icon
                  path={mdiCalendarClock}
                  size={0.8}
                  className="text-danger me-1"
                />
                <span className="fw-bold">
                  End Date {item?.syllabus_end_date?.split(",")[0]}
                </span>{" "}
                {days <= 3 && <>• {days} days left</>}
              </span>
            )}
          </div>
          {/* Card body  */}
          <Card.Body className="d-flex justify-content-between h-100 flex-column">
            <h3 className="h4 mb-2 text-truncate-line-2 ">{item?.name}</h3>
            <div className={`lh-1 d-flex align-items-center mb-2`}>
              <span
                className="me-1 fs-5 text-kinda-light-dark"
                dangerouslySetInnerHTML={{ __html: item?.description }}
              ></span>
            </div>
            <ListGroup
              as="ul"
              bsPrefix="list-inline"
              className="mb-0 text-kinda-light-dark"
            >
              <ListGroup.Item
                as="li"
                bsPrefix="list-inline-item"
                className="me-1"
              >
                Module :{" "}
                <span className="text-black">{item?.count_module}</span> •
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                bsPrefix="list-inline-item"
                className="me-1"
              >
                Exam : <span className="text-black">{item?.count_exam}</span> •
              </ListGroup.Item>
              {item?.count_module === 1 && item?.count_exam === 1 ? (
                <>
                  <ListGroup.Item
                    as="li"
                    bsPrefix="list-inline-item"
                    className="me-1"
                  >
                    Chance :{" "}
                    <span className="text-black">
                      {item?.total_exam_attempt}x
                    </span>{" "}
                    {item?.total_exam_attempt === 0 && (
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                          <Tooltip id="button-tooltip">
                            Waiting exam open access by trainer
                          </Tooltip>
                        }
                      >
                        <i className="fe fe-alert-circle text-danger fs-6"></i>
                      </OverlayTrigger>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    bsPrefix="list-inline-item"
                    className="me-1"
                  >
                    Final Score :{" "}
                    <span className="fw-bold text-black">
                      {item?.max_grade}
                    </span>
                    /100{" "}
                    {item?.total_remedial_exam > 0 && (
                      <span className="text-danger">(Remedial)</span>
                    )}
                  </ListGroup.Item>
                </>
              ) : (
                <>
                  <ListGroup.Item
                    as="li"
                    bsPrefix="list-inline-item"
                    className="me-1"
                  >
                    Average Score :{" "}
                    <span className="text-black">{item?.avg_score}</span>
                  </ListGroup.Item>
                  {item?.total_remedial_exam > 0 && (
                    <ListGroup.Item
                      as="li"
                      bsPrefix="list-inline-item"
                      className="me-1 text-danger"
                    >
                      Remedial Exam :
                      <span className={`text-danger fw-bold`}>
                        {item?.total_remedial_exam}
                      </span>
                    </ListGroup.Item>
                  )}
                </>
              )}
            </ListGroup>
            <span className="text-secondary mt-2 text-end pb-0">
              {item?.count_exam_user + item?.count_module_user}/
              {item?.count_exam + item?.count_module} Completed
            </span>
            <span>
              <ProgressBar
                variant={
                  item?.total_remedial_exam > 0
                    ? "danger"
                    : ((item?.count_exam_user + item?.count_module_user) /
                        (item?.count_exam + item?.count_module)) *
                        100 ===
                      100
                    ? "success"
                    : "warning"
                }
                now={
                  ((item?.count_exam_user + item?.count_module_user) /
                    (item?.count_exam + item?.count_module)) *
                  100
                }
                className="mt-0"
                style={{ height: "5px" }}
              />
            </span>
          </Card.Body>
          {/* Card Footer */}
          {/* <Card.Footer>
            <Row className="g-0">
              <Link
                className="d-flex align-items-center"
                to={`/e-univ/learning/courses/${item?.id}`}
                state={item}
              >
                <p className="mb-0 text-primary">See Program</p>
                <i className="fa fa-arrow-right text-primary ms-1"></i>
              </Link>
            </Row>
            <span className={`${showprogressbar ? "" : "d-none"}`}>
              {" "}
              <ProgressBar
                variant="success"
                now={item?.progress}
                className="mt-3"
                style={{ height: "5px" }}
              />
            </span>
          </Card.Footer> */}
        </Card>
      </Link>
    );
  };

  /** Used in Course Filter Page  */
  const ListView = () => {
    return (
      <Card className="mb-4 card-hover">
        <Row className="g-0">
          <Link
            to="#"
            className="bg-cover img-left-rounded col-12 col-md-12 col-xl-3 col-lg-3 "
            style={{
              background: `url(${item.image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          >
            <Image
              src={item.image}
              alt="..."
              className="img-fluid d-lg-none invisible"
            />
          </Link>
          <Col lg={9} md={12} sm={12}>
            {/* <!-- Card body --> */}
            <Card.Body>
              <h3 className="mb-2 text-truncate-line-2 ">
                <Link to="#" className="text-inherit">
                  {item.title}
                </Link>
              </h3>
              {/* <!-- List inline --> */}
              <ListGroup as="ul" bsPrefix="list-inline" className="mb-5">
                <ListGroup.Item as="li" bsPrefix="list-inline-item">
                  <i className="far fa-clock me-1"></i>
                  {item.duration}
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix="list-inline-item">
                  {item.level}
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix="list-inline-item">
                  <span className="text-warning">
                    {" "}
                    {item.rating.toFixed(1)}
                  </span>
                  <span className="fs-6 text-muted"> rrr </span>
                </ListGroup.Item>
              </ListGroup>
              {/* <!-- Row --> */}
              <Row className="align-items-center g-0">
                <Col className="col-auto">
                  <Image
                    src={item.instructor_image}
                    className="rounded-circle avatar-xs"
                    alt=""
                  />
                </Col>
                <Col className="col ms-2">
                  <span>{item.instructor_name}</span>
                </Col>
                <Col className="col-auto"></Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  };

  /** Used in Instructor Profile Page  */
  const ListGroupView = () => {
    return (
      <div className="d-lg-flex align-items-center">
        <div>
          <Image src={item.image} alt="" className="rounded img-4by3-lg" />
        </div>
        <div className="ms-lg-3 mt-2 mt-lg-0">
          <h4 className="text-primary-hover">
            {item.title}{" "}
            <Badge bg="light-success" className="text-success">
              New
            </Badge>
          </h4>
          <ListGroup
            as="ul"
            bsPrefix="list-inline"
            className="fs-6 mb-0 text-inherit"
          >
            <ListGroup.Item as="li" bsPrefix="list-inline-item">
              <i className="far fa-clock me-1"></i>
              {item.duration}
            </ListGroup.Item>
            <ListGroup.Item as="li" bsPrefix="list-inline-item">
              {item.level}
            </ListGroup.Item>
            <ListGroup.Item as="li" bsPrefix="list-inline-item">
              <span className="text-warning"> {item.rating.toFixed(1)}</span>
              <span className="fs-6 text-muted"> jjj</span>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      {viewby === "grid" ? (
        <GridView />
      ) : viewby === "list" ? (
        <ListView />
      ) : (
        <ListGroupView />
      )}
    </Fragment>
  );
};

// Specifies the default values for props
CourseCard.defaultProps = {
  free: false,
  viewby: "grid",
  showprogressbar: false,
  extraclass: "",
};

// Typechecking With PropTypes
CourseCard.propTypes = {
  item: PropTypes.object.isRequired,
  free: PropTypes.bool,
  viewby: PropTypes.string,
  showprogressbar: PropTypes.bool,
  extraclass: PropTypes.string,
};

export default CourseCard;
