import React from "react";
import { Modal } from "react-bootstrap";

const NotifSuccessModal = ({ show, setShow, text, children, noClose }) => {
  const handleClose = () => setShow(false);

  return (
    <>
      {noClose ? (
        <Modal show={show} className="w-fit border-0" centered>
          {children ? (
            children
          ) : (
            <Modal.Body className="bg-light-success rounded border-success">
              <p className="mb-0 text-center text-dark-success fw-bold">
                {text}
              </p>
            </Modal.Body>
          )}
        </Modal>
      ) : (
        <Modal
          show={show}
          onHide={handleClose}
          className="w-fit border-0"
          centered
        >
          {children ? (
            children
          ) : (
            <Modal.Body className="bg-light-success rounded border-success">
              <p className="mb-0 text-center text-dark-success fw-bold">
                {text}
              </p>
            </Modal.Body>
          )}
        </Modal>
      )}
    </>
  );
};

export default NotifSuccessModal;
