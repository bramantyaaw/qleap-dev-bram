import React from "react";
import { Button } from "react-bootstrap";

const ButtonBadgePIC = ({
  disabled,
  onClick,
  text,
  bg,
  className,
  condition,
  hidden
}) => {
  return (
    <>
      {hidden ? (
        <Button
          variant="light-secondary"
          className={`cursor-not-allow ${className} fw-bold text-secondary`}
          hidden
        >
          {text}
        </Button>
      ) : (
        disabled ? (
          <Button
            variant="light-secondary"
            className={`cursor-not-allow ${className} fw-bold text-secondary`}
            disabled
          >
            {text}
          </Button>
        ) : (
          <Button
            variant={bg}
            className={`${className} fw-bold `}
            onClick={onClick}
            disabled={condition}
          >
            {text}
          </Button>
        ))}
    </>
  );
};

export default ButtonBadgePIC;
