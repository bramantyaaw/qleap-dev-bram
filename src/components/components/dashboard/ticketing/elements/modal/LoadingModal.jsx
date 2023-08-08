import React from "react";
import { Modal } from "react-bootstrap";

const LoadingModal = (show, setShow) => {
  const handleClose = () => setShow(true);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="loading-modal"
    >
      <Modal.Body className="bg-success p-3 rounded text-center fw-bold">
        <p className="mb-0 h4 text-white ">Loading..</p>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
