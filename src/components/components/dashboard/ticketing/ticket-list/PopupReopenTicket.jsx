import React, { Fragment } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const PopupReopenTicket = ({
  show,
  setShow,
  dialogClassName,
  children,
  setDetailArr,
  handleClose,
}) => {
  return (
    // <Fragment>
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName={dialogClassName}
      centered
    >
      <Modal.Body className="close-ticket-wrapper d-flex flex-column ">
        {children}
      </Modal.Body>
    </Modal>
    // </Fragment>
  );
};

export default PopupReopenTicket;
