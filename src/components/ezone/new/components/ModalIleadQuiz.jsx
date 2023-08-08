import React from "react";
import { Modal } from "react-bootstrap";

const ModalIleadQuiz = ({ show, setShow, children, h1, p }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      dialogClassName={"my-modal-70"}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3 className="mb-0" style={{ fontWeight: "800" }}>
            {h1}
          </h3>
          <p className="mb-0 text-kinda-grey font-xssss">{p}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalIleadQuiz;
