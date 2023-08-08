import React from "react";

const NoArrComponent = ({ text, className }) => {
  return (
    <div
      className={`w-100 h-100 d-flex justify-content-center align-items-center ${className}`}
    >
      <p className="mb-0 fst-italic opacity-75">{text}</p>
    </div>
  );
};

export default NoArrComponent;
