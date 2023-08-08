import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ButtonBadgePIC from "../../../../../layouts/database-admin/ticket/elements/ButtonBadgePIC";
import ThreeDisabledInputs from "../../../database-admin/elements/input/ThreeDisabledInputs";
import TwoDisabledInput from "../../../database-admin/elements/input/TwoDisabledInputs";
import PopupReopenTicket from "./PopupReopenTicket";

const PopupDetailTicket = (props) => {
  const { setShow, show, title, detailArr } = props;
  const [reOpenPopUp, setOpenPopUp] = useState(false);

  const handleClose = () => setShow(false);

  const handlePopUp = () => {
    setOpenPopUp(true);
    setShow(false);
  };

  return (
    <>
      {/* <Modal show={show} onHide={handleClose}> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
          <div className="w-100 d-flex justify-content-end btn-z-index">
            <ButtonBadgePIC
              text="Reopen Ticket"
              className="mb-0"
              onClick={handlePopUp}
            />
          </div>
        </Modal.Footer>
      </Modal>

      {/* </Modal> */}
      <PopupReopenTicket
        show={reOpenPopUp}
        setShow={setOpenPopUp}
      ></PopupReopenTicket>
    </>
  );
};

export default PopupDetailTicket;
