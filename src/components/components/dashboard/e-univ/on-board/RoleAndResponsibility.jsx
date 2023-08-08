import React from "react";
import { Card } from "react-bootstrap";
import CardHeaderCourse from "./details/CardHeaderCourse";
import CourseFile from "./file/CourseFile";

const RoleAndResponsibility = () => {
  return (
    <>
      <CardHeaderCourse
        notIcon
        note=""
        title="Role and Responsibility"
        className="ps-0"
      >
        <Card.Body>
          <p className="mb-0 text-kinda-dark">
            Berikut terlampir
            <span className="fst-italic"> Role and Responsibility </span>kamu.
            Kamu bisa<span className="fst-italic"> download file </span>ini
            untuk dibaca.
          </p>
        </Card.Body>
        <CourseFile />
      </CardHeaderCourse>
    </>
  );
};

export default RoleAndResponsibility;
