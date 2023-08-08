import React, { Fragment } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const RejectModal = ({
  show,
  setShow,
  handleApprove,
  setAppNotes,
  note,
  disableButton,
  score,
  appType,
}) => {
  const handleClose = () => setShow(false);

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="close-ticket-wrapper d-flex justify-content-center flex-column justify-content-between">
          <p className="lh-sm">
            {score === "Failed" && appType === "bp"
              ? `Are you sure want to "Terminate" this application? If yes, this submission will not be continued by the next approval.`
              : `Are you sure you want to reject this application?`}
          </p>
          <Form.Control
            as="textarea"
            rows={3}
            id="note"
            name="note"
            placeholder="Reason Note"
            // onChange={(e) => setAppNotes(e.target.value)}
            onChange={(e) => {
              const inputValue = e.target.value.trim(); // Remove leading/trailing whitespace
              if (inputValue !== "") {
                // Check if the input is not empty
                setAppNotes(inputValue);
              }
            }}
            onBlur={(e) => {
              const inputValue = e.target.value.trim(); // Remove leading/trailing whitespace
              if (inputValue === "") {
                // Check if the input is empty
                setAppNotes("");
              }
            }}
          />
          <div className="mt-3 align-self-end">
            <Button
              variant="outline-primary"
              size="xs"
              className="me-3"
              onClick={handleClose}
            >
              Cancel
            </Button>
            {note !== "" ? (
              <Button
                size="xs"
                variant="primary"
                onClick={(e) => handleApprove(e, "rejected")}
                disabled={disableButton}
              >
                Yes
              </Button>
            ) : (
              <Button size="xs" variant="primary" disabled>
                Yes
              </Button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
