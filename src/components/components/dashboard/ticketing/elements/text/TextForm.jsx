import React from "react";
import { Form } from "react-bootstrap";

const TextForm = ({ text, span, htmlFor, className }) => {
  return (
    <Form.Label htmlFor={htmlFor} className={`${className}`}>
      {text} <span className="text-danger">{span}</span>
    </Form.Label>
  );
};

export default TextForm;
