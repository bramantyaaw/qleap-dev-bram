import React from "react";
import { Button } from "react-bootstrap";

export const JobEvaluationButton = ({
  onClick,
  className,
  buttonName,
  variant,
  size,
  disabled,
}) => {
  return (
    <>
      {disabled ? (
        <Button
          onClick={onClick}
          size={size}
          className={className}
          variant={variant}
          disabled
        >
          {buttonName}
        </Button>
      ) : (
        <Button
          onClick={onClick}
          size={size}
          className={className}
          variant={variant}
        >
          {buttonName}
        </Button>
      )}
    </>
  );
};
