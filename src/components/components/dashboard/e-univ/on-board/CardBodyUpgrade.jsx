import React from "react";
import Icon from "@mdi/react";
import { Card, Image } from "react-bootstrap";
import { mdiLockOutline } from "@mdi/js";

const CardBodyUpgrade = ({
  src,
  icon,
  title,
  text1,
  span,
  text2,
  className,
  notDisabled,
  srcColor,
}) => {
  return (
    <div className="pt-3 p-3 pe-0 h-100 w-100 w-xl-50">
      {notDisabled ? (
        <Card.Body
          className={`d-flex flex-column justify-content-center ${className} ps-0 pt-0 pb-0 pe-0 h-100 position-relative`}
        >
          <div className="d-flex align-items-center h-100">
            <div
              className={`icon-shape icon-xl bg-light-${srcColor} text-dark-${srcColor} rounded-circle`}
            >
              <Icon path={src} size={1} />
            </div>
            <div className="ms-2">
              <p className="mb-0 mt-3 text-start fs-5 fw-bold  text-black">
                {title}
              </p>
              <p className="little-text pe-0">
                {text1}
                <span className="fst-italic"> {span} </span>
                {text2}
              </p>
            </div>
          </div>
          <p className="text-primary mb-0 fs-6">
            See Competency
            <Icon path={icon} size={0.5} className="ms-1" />
          </p>
        </Card.Body>
      ) : (
        <Card.Body
          className={`d-flex flex-column justify-content-center ${className} ps-0 pt-0 pb-0 pe-3 h-100 position-relative`}
        >
          <Icon
            path={mdiLockOutline}
            size={1}
            className="position-absolute icon-card-body-upgrade"
          />
          <div className="d-flex align-items-center h-100">
            <Image src={src} width="40" height="40" className="w-25" />
            <div className="ms-2">
              <p className="mb-0 mt-3 text-start fs-5 fw-bold ">{title}</p>
              <p className="little-text">
                {text1}
                <span className="fst-italic"> {span} </span>
                {text2}
              </p>
            </div>
          </div>
          <p className="pointer-none mb-0 fs-6">
            View Competency
            <Icon path={icon} size={0.5} className="ms-1" />
          </p>
        </Card.Body>
      )}
    </div>
  );
};

export default CardBodyUpgrade;
