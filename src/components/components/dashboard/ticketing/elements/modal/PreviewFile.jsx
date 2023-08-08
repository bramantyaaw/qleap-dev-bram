import React, { Fragment } from "react";
import { Modal, Image } from "react-bootstrap";

const PreviewFile = ({ show, setShow, src }) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        className="modal-preview-photo"
        centered
      >
        <Modal.Body>
          <Image src={src} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PreviewFile;
