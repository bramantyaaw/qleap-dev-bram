import React, { useState } from "react";
import { Form } from "react-bootstrap";

const FillInput = ({
  type,
  placeholder,
  id,
  name,
  maxLength,
  setState,
  value,
  className,
  withOutInputClassName,
  handleOnKeyDown,
  style,
}) => {
  return (
    <Form.Control
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      type={type}
      placeholder={placeholder}
      id={id}
      value={value}
      name={name}
      style={style}
      maxLength={maxLength}
      onChange={(e) => setState(e.target.value)}
      onKeyDown={(e) => handleOnKeyDown && handleOnKeyDown(e)}
      className={`${
        withOutInputClassName ? null : "input-default"
      } ${className}`}
    />
  );
};

export default FillInput;
