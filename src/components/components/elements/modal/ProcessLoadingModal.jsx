import React from "react";
import { Spinner, Button, Modal } from "react-bootstrap";

const ProcessLoadingModal = ({ show, setShow }) => {
  // const handleClose = () => setShow(false);
  return (
    <>
      <Modal
        show={show}
        // onHide={handleClose}
        className="w-fit border-0"
        centered
      >
        <Button variant="primary" className="bg-primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="ms-3">Loading...</span>
        </Button>
      </Modal>
    </>
  );
};

export default ProcessLoadingModal;
