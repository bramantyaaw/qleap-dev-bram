import React from "react";
import { Modal, Button } from "react-bootstrap";

const NewLoginModal = ({ setShow, show, modalTitle, children }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} className="modal-login">
      <Modal.Header>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={"d-flex flex-column align-items-center"}>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewLoginModal;
