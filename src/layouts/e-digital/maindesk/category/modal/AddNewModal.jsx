import React from "react";
import { Button, Modal } from "react-bootstrap";

export const AddNewModal = (props) => {
  const {
    setShow,
    show,
    buttonClassName,
    onClick,
    disabled,
    title,
    className,
    size,
    variant1,
    variant2,
    text1,
    text2,
    onHide,
    classBody,
  } = props;

  return (
    <Modal
      size={size}
      show={show}
      onHide={onHide ? onHide : () => setShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title className={`text-darkest fw-bold ${className}`}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={classBody}>{props.children}</Modal.Body>
      {variant1 && (
        <Modal.Footer>
          <Button
            variant={variant1}
            onClick={() => setShow(false)}
            className={buttonClassName}
          >
            {text1}
          </Button>
          <Button
            variant={variant2}
            disabled={disabled}
            onClick={onClick}
            className={buttonClassName}
          >
            {text2}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};
