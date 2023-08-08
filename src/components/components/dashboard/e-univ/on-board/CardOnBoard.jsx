import React from "react";
import Icon from "@mdi/react";
import { mdiLockOutline } from "@mdi/js";
import { Badge, Button, Card, Col, Image, Row } from "react-bootstrap";
import lessons from "../../../../../assets/images/svg/lessons.svg";

import { Link, useNavigate } from "react-router-dom";

const CardOnBoard = ({
  title,
  text1,
  span,
  text2,
  className,
  icon,
  notDisabled,
  linkName,
  img,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(linkName);
  };

  return (
    <>
      {!notDisabled ? (
        <Card
          className={`mb-3 mb-4 attention-onboard first-card-onboard card-onboard  ${className} w-100`}
        >
          <Card.Body className="pt-3 d-flex flex-column justify-content-between p-3 ">
            <div className="position-relative">
              <Icon
                path={mdiLockOutline}
                size={1}
                className="position-absolute first-icon-card-body-upgrade"
              />
              <div className="d-flex justify-content-between align-items-center flex-row w-100">
                <Image src={icon} width="40" height="40" className="w-25" />
              </div>
              <p className="mb-0 mt-3 text-start fs-5 fw-bold ">{title}</p>
            </div>
            <p className="little-text">
              {text1}
              <span className="fst-italic"> {span} </span>
              {text2}
            </p>
            <Button variant="secondary" disabled className="align-items-end">
              SEE COMPETENCY
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card
          style={{ height: "100%" }}
          className={`mb-3 mb-4 competency-card attention-onboard ${className} w-100`}
        >
          <Card.Body className="pt-3 d-flex flex-column justify-content-between p-3 ">
            <div className="d-flex justify-content-between align-items-center flex-row w-100">
              {/* <Card className="p-2 py-0 bg-primary ">
                  <span className="text-white little-text">24 Lessons</span>
                </Card> */}
              <Image src={lessons} className="justify-content-center" />
            </div>
            <Image
              src={img}
              className="d-flex justify-content-end align-self-center text-center me-0 pt-5"
              height={170}
            />
            <p className="mb-0 mt-3 text-start fs-5 text-black fw-bold pb-2">
              {title}
            </p>

            <p className="little-text fs-6 pb-4">{text1}</p>
            {/* <Link
              to={linkName}
              className="competency-button btn btn-primary btn-xs align-self-end fs-6 fw-light"
            >
              SEE COMPETENCY
            </Link> */}
            <Button
              variant="primary"
              size="sm"
              onClick={handleClick}
              className="align-self-end  align-items-end"
            >
              SEE COMPETENCY
            </Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default CardOnBoard;
