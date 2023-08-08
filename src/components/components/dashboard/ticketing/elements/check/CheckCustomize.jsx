import React from "react";
import { Link } from "react-router-dom";

const CheckCustomize = ({
  width,
  leftText,
  rightText,
  leftPathname,
  rightPathname,
}) => {
  let location = window.location.pathname;
  return (
    <div
      style={{ width }}
      className="d-flex justify-content-between  border border-kinda-grey bg-light-white rounded-pill px-3 py-2 "
    >
      {location === leftPathname ? (
        <div>
          <div
            style={{ top: "0", left: "0" }}
            className="position-absolute bg-primary text-white h-100 text-center px-3 py-2 rounded-pill"
          >
            {leftText}
          </div>
        </div>
      ) : (
        <div>
          <Link to={leftPathname}>
            <p className="text-kinda-dark mb-0">{leftText}</p>
          </Link>
        </div>
      )}

      {location === rightPathname ? (
        <div
          style={{ top: "0", right: "0" }}
          className="position-absolute bg-primary text-white h-100 text-center px-3 py-2 rounded-pill"
        >
          {rightText}
        </div>
      ) : (
        <div>
          <Link to={rightPathname}>
            <p className="text-kinda-dark mb-0">{rightText}</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CheckCustomize;
