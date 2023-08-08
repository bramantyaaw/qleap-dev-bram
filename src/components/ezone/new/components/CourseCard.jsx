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
} from "react-bootstrap";

const CourseCard = ({ item, link }) => {
  const ListView = () => {
    return (
      <Card className="mb-4 card-hover ">
        <Row className="g-0">
          <Link
            to={link}
            className="bg-cover img-left-rounded col-12 col-md-12 col-xl-3 col-lg-3 "
            style={{
              background: `url(${item?.thumbnail})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          >
            {/* <Image
              src={item?.thumbnail}
              alt="..."
              className="img-fluid d-lg-none invisible"
            /> */}
          </Link>
          <Col lg={9} md={12} sm={12} className="">
            {/* <!-- Card body --> */}
            <Card.Body>
              <h3 className="">
                <Link to={link} className="text-inherit">
                  {item?.title}
                </Link>
              </h3>
              {/* <!-- List inline --> */}
              <ListGroup as="ul" bsPrefix="list-inline" className="mb-2">
                <ListGroup.Item as="li" bsPrefix="list-inline-item">
                  {item?.description}
                </ListGroup.Item>
              </ListGroup>
              {/* <!-- Row --> */}
              <Row className=" g-0">
                <Col className="col">
                  <span>{item?.created_date}</span>
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  };

  return (
    <Fragment>
      <ListView />
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
