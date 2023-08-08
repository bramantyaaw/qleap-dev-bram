import React from "react";
import { Alert, CloseButton } from "react-bootstrap";

const ErrorAlert = ({
  setState,
  text1,
  text2,
  span,
  className,
  title,
  textClassName,
  noClose,
}) => {
  return (
    <Alert
      variant="danger"
      className={`d-flex align-items-center alert-upload-ticket ${className}`}
    >
      {noClose ? null : <CloseButton onClick={() => setState(false)} />}

      <div className="ms-3">
        <h4 className="fw-bolder text-danger ">{title ? title : "Alert!"}</h4>
        <p className={`text-danger fw-normal ${textClassName}`}>
          {text1}
          <span className="fw-bolder"> {span} </span>
          {text2}
        </p>
      </div>
    </Alert>
  );
};

export default ErrorAlert;
