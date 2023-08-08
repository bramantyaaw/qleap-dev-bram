import React from "react";
import CardHeaderCourse from "../details/CardHeaderCourse";
import { Button, Card } from "react-bootstrap";
import ReactQuill from "react-quill";
import { useState } from "react";

const BusinessProcessQuiz = () => {
  const [desc, setDesc] = useState("");
  const handleChange = (value) => {
    setDesc(value);
  };

  return (
    <div>
      <CardHeaderCourse
        notIcon
        note=""
        title="Business Process"
        className="ps-0"
      >
        <Card.Body>
          <p className="mb-0 text-kinda-dark">
            Setelah New Erajaya Employee memahami materi{" "}
            <span className="fst-italic">Business process,</span> tolong
            jelaskan mengenai{" "}
            <span className="fst-italic">Business process,</span> yang telah
            anda dapatkan!
          </p>
          <ReactQuill value={desc} onChange={handleChange} className="mt-3" />
        </Card.Body>
        {/* <CourseFile /> */}
      </CardHeaderCourse>

      <div className="d-flex justify-content-end">
        <Button variant="outline-primary" className="px-4 py-1 font-xssss">
          EDIT AND CHANGE
        </Button>
      </div>
    </div>
  );
};

export default BusinessProcessQuiz;
