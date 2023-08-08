import React from "react";
import { Modal, Button } from "react-bootstrap";

const LoginModal = ({ setModalData, modalData, children, title }) => {
  return (
    <Modal
      show={modalData}
      onHide={() => setModalData(false)}
      className="modal-login"
      // dialogClassName={"my-modal-70"}
      centered
      dialogClassName="my-modal-50"
    >
      <Modal.Header>
        {title ? (
          <Modal.Title>{title}</Modal.Title>
        ) : (
          <Modal.Title>Failed Sign in</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body className={"d-flex flex-column align-items-center"}>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setModalData(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
