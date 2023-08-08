import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingComponent = ({ className }) => {
  return (
    <div
      className={`${className} d-flex justify-content-center align-items-center`}
    >
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <span className="ms-3">Loading...</span>
    </div>
  );
};

export default LoadingComponent;
