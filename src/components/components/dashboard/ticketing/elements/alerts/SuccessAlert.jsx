import React from "react";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SuccessAlert = ({
  text1,
  span1,
  text2,
  span2,
  link,
  isLinkNull,
  clasNameText1,
  classNameAlert,
}) => {
  return (
    <div className="w-100">
      <Alert variant="success" className={classNameAlert}>
        <Alert.Heading className="fw-bold">Success!</Alert.Heading>
        <p className={clasNameText1}>
          {text1}
          <span> {span1}</span>
        </p>
        <p className="mb-0">
          {text2}
          <span> {span2}</span>
        </p>
      </Alert>
      {isLinkNull ? null : (
        <div className="w-100 d-flex justify-content-center">
          <Link to={link}>
            <Button className="btn-return">Return To Page Help Center</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SuccessAlert;
