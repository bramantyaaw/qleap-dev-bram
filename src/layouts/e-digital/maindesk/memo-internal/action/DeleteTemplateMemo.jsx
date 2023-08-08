import React from 'react'
import { Modal, Button } from 'react-bootstrap';

export default function DeleteTemplateMemo({show, onClose, onDelete}) {
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "1rem" }}> Are You Sure? </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onClose}>
            No
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
