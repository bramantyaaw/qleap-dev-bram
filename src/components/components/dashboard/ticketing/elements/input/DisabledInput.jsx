import React from "react";
import { Form } from "react-bootstrap";

const DisabledInput = ({
  type,
  placeholder,
  value,
  id,
  name,
  maxLength,
  className,
  setState,
  onChange,
  withOutClassName,
}) => {
  return (
    <Form.Control
      type={type}
      placeholder={placeholder}
      value={value}
      id={id}
      name={name}
      maxLength={maxLength}
      className={`${withOutClassName ? null : "input-default"} ${className}`}
      onChange={(e) => onChange(e.target.value)}
      disabled
    />
  );
};

export default DisabledInput;
