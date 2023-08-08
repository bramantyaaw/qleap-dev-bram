import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const PopupCloseTicket = ({ show, setShow, selectedId, token }) => {
  // const [newId, setNewId] = useState(selectedId);
  const handleClose = () => setShow(false);

  const idToString = selectedId?.toString();

  // useEffect(() => {
  //   setNewId(selectedId);
  // }, [selectedId]);

  const updateTicket = async () => {
    try {
      await axios
        .post(
          `/services/ticketing/update-ticket-status`,
          {
            ticket_id: idToString,
            status: "C",
            uid_in_charge: "",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            return window.location.reload(true);
          }
        });
    } catch (err) {
      return err;
    }
  };
  return (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="close-ticket-wrapper d-flex justify-content-center flex-column align-items-center">
          <p className="lh-sm">
            Has your problem been resolved? and want to close this ticket?
          </p>
          <div className="btn-popup">
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={updateTicket}>Yes</Button>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default PopupCloseTicket;
