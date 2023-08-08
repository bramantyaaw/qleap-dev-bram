import React from "react";
import { Card } from "react-bootstrap";
import IconPrev from "../../../../elements/next-prev/IconPrev";
import IconNext from "../../../../elements/next-prev/IconNext";
import Timer from "../quiz/Timer";

const CardHeaderCourse = (props) => {
  const { title, notIcon, className, note } = props;
  return (
    <Card className={`${className} mb-3 border-0 w-100`}>
      <Card.Header className="border-bottom px-3 py-3 d-flex justify-content-between align-items-center">
        {note === " " || note === "" ? (
          <h6 className="mb-0 fw-bold h4">{title}</h6>
        ) : (
          <h6 className="mb-0 fw-bold h4">
            {title} - {note}
          </h6>
        )}
        {notIcon ? null : (
          <div className="d-flex">
            <IconPrev disable="true" />
            <IconNext className="ms-4" />
          </div>
        )}
      </Card.Header>
      {props.children}
    </Card>
  );
};

export default CardHeaderCourse;
