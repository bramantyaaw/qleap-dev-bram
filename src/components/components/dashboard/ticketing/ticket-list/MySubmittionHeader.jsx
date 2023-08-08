// import node module libraries
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderSubmit from "../../../../../assets/images/svg/bg-submit.svg";

// import custom components

const MySubmittionHeader = () => {
  return (
    <Row className="align-items-center">
      <Col xl={12} lg={12} md={12} sm={12} className="w-100">
        <div
          className="pt-16 rounded-top header-submit-ticket position-relative"
          style={{
            background: `url(${HeaderSubmit})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "196px",
          }}
        >
          <div className="text-wrapper-submit position-absolute p-3 p-sm-0">
            <h1 className="text-white mt-0 mt-sm-1">My Submission</h1>
            <p className="text-white fsc-16">
              My submission is a page to see all self service and ticketing
              submission processes
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default MySubmittionHeader;
