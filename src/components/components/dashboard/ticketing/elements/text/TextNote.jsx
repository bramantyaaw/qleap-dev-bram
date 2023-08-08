import React from "react";
import { Form } from "react-bootstrap";

const TextNote = ({ note, className }) => {
  return (
    <Form.Group className={`note-wrapper ${className}`}>
      <p>{note}</p>
    </Form.Group>
  );
};

export default TextNote;
