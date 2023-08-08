import React from "react";
import { Modal } from "react-bootstrap";

const TutorialModal = ({ modalPopup, setModalPopup }) => {
  return (
    <>
      <Modal
        show={modalPopup}
        onHide={() => setModalPopup(false)}
        centered
        dialogClassName="my-modal-70"
      >
        <iframe
          src={`https://www.youtube.com/embed/b4GnGxRQVPY`}
          title="tutorial"
          style={{ height: "400px" }}
        ></iframe>
      </Modal>
    </>
  );
};

export default TutorialModal;
