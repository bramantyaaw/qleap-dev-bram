import React from "react";
import { Form } from "react-bootstrap";

const GPSInput = ({ id, name, value, handleChange }) => {
  return (
    <Form.Control
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      type="text"
      placeholder=""
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
};

export default GPSInput;
