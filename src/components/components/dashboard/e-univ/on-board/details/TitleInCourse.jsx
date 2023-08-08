import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

const TitleInCourse = ({
  title,
  text,
  noBorder,
  className,
  score,
  perTotal,
  remedial,
  noChance,
}) => {
  return (
    <>
      {noBorder ? (
        <div
          className={`${className} pe-2 w-50 d-flex flex-column h-100 justify-content-between title-in-course`}
        >
          <p className="text-primary fw-bold mb-2 h4">{title}</p>
          {score ? (
            <p className="text-kinda-dark">
              <span className="text-primary fw-bold">{score}</span>
              {perTotal ? perTotal : "/3"}
            </p>
          ) : (
            <p className="text-kinda-dark ">{text}</p>
          )}
        </div>
      ) : (
        <div
          className={`pe-2 border-end border-light-white w-50 d-flex flex-column ${className} h-100 justify-content-between title-in-course`}
        >
          <p className="text-primary fw-bold mb-2 h4">{title}</p>
          {score ? (
            <p className="text-kinda-dark">
              <span className="text-primary fw-bold">{score}</span>
              {perTotal ? perTotal : "/100"}
              {remedial ? (
                <span className="ms-1 text-danger">- REMEDIAL</span>
              ) : noChance ? (
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="button-tooltip">
                      Mohon hubungi trainer/superior kamu untuk meminta akses
                      pengerjaan ulang
                    </Tooltip>
                  }
                >
                  <span className="ms-2 text-danger text-decoration-underline">
                    REMEDIAL
                  </span>
                </OverlayTrigger>
              ) : (
                ""
              )}
            </p>
          ) : (
            <p className="text-kinda-dark ">{text}</p>
          )}
        </div>
      )}
    </>
  );
};

export default TitleInCourse;
