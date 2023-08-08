import React from "react";
import { Link } from "react-router-dom";

const Faq = ({ text }) => {
  return (
    <div className="fst-italic faq-text">
      <p className="d-flex flex-column flex-sm-row fw-normal justify-content-center align-items-center">
        <span>{text}, </span>
        <span>
          &nbsp; please access the&nbsp;
          <Link to="/help/faq">
            <span className="fw-bold text-decoration-underline">
              FAQ Help Center
            </span>
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Faq;
