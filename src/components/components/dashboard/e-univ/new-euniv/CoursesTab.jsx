// import node module libraries
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";

// import custom components
import CourseCard from "./card/CourseCard";

// import data files

const CoursesTab = ({ items }) => {
  return (
    <Fragment>
      <Row>
        {items
          ?.filter(function (datasource) {
            return datasource;
          })
          ?.map((item, index) => (
            <Col lg={3} md={6} sm={12} key={index} className="mb-4">
              <CourseCard item={item} />
            </Col>
          ))}
      </Row>
    </Fragment>
  );
};
export default CoursesTab;
