import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";

const RejectReason = ({ setShow, show }) => {
  return (
    <Fragment>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold fs-3">Reject Reason </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border rounded border-gray-700 p-2">
            <p className="mb-0">
              Foto/gambar yang dilampirkan salah, mohon ganti foto dengan kartu
              nikah, setelah itu kilk “save & change”
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default RejectReason;
