// import node module libraries
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Image, Card, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const CoursePathCard = ({ item, link, arrCourse, isNotFold }) => {
  const isNotMobile = useMediaQuery({
    query: "(min-width: 576px)",
  });
  return (
    <>
      {/* <Card className="card-hover w-100 h-100">
        
        <div className="d-flex justify-content-between align-items-center rounded h-100 w-100"> */}
      {arrCourse?.map((data) => {
        return (
          <div className="d-flex flex-column flex-sm-row w-100">
            <div className="ms-3 d-flex flex-column justify-content-center w-sm-75 w-100 pt-3 me-3 me-sm-0 pt-sm-0">
              <h4 className="mb-1">
                <p
                  className="text-primary h6 mb-0"
                  style={{ fontWeight: "700" }}
                >
                  {data?.name}
                </p>
              </h4>
              <p className="mb-0 fs-6 longtext">
                {/* <span className="me-2 h6"></span> */}
                {data?.desc}
              </p>
              <span className="text-gray-500 h6 mb-0">
                <span>{data?.startDate} - </span>
                <span>{data?.endDate}</span>
              </span>
            </div>

            <div
              className={`${
                isNotFold ? "" : "ms-3 mt-2"
              } pe-3 d-flex align-items-center`}
            >
              <Link to={link} state={data}>
                <Button variant="primary">Mulai Quiz</Button>
              </Link>
            </div>
          </div>
        );
      })}

      {/* </div>
   
      </Card> */}
    </>
  );
};

// Typechecking With PropTypes
CoursePathCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CoursePathCard;
