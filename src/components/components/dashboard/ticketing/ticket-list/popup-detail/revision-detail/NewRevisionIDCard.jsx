import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ProcessLoadingModal from "../../../../../elements/modal/ProcessLoadingModal";
import ErrorAlert from "../../../elements/alerts/ErrorAlert";
import RevisionHilangIDCard from "./RevisionHilangIDCard";
import RevisionRusakIDCard from "./RevisionRusakIDCard";

const NewRevisionIDCard = ({ detailArr, show, token, selectedId }) => {
  const arrOption = [
    { id: "KERUSAKAN", name: "KERUSAKAN" },
    { id: "KEHILANGAN", name: "KEHILANGAN" },
  ];

  const [reason, setReason] = useState("");
  const [warningFile, setWarningFile] = useState(false);

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const reasonIDCard =
      detailArr !== null ? detailArr[0]?.reason_submission : "";
    setReason(reasonIDCard);
  }, [detailArr]);

  return (
    <Modal.Body className="submit-data-menu-file">
      {warning && <ErrorAlert setState={setWarning} text1={warningMessage} />}
      {warningFile && (
        <ErrorAlert
          setState={setWarningFile}
          text1="Foto yang diunggah lebih dari 1 MB,"
          span="Mohon unggah ulang dibawah 1 MB"
        />
      )}
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
      {reason === "KERUSAKAN" ? (
        <RevisionRusakIDCard
          detailArr={detailArr}
          reason={reason}
          setReason={setReason}
          arrOption={arrOption}
          setWarningFile={setWarningFile}
          token={token}
          selectedId={selectedId}
          setWarning={setWarning}
          setWarningMessage={setWarningMessage}
          setDisableButton={setDisableButton}
          setModalLoading={setModalLoading}
          disableButton={disableButton}
        />
      ) : (
        <RevisionHilangIDCard
          detailArr={detailArr}
          reason={reason}
          setReason={setReason}
          arrOption={arrOption}
          setWarningFile={setWarningFile}
          token={token}
          selectedId={selectedId}
          setWarning={setWarning}
          setWarningMessage={setWarningMessage}
          setDisableButton={setDisableButton}
          setModalLoading={setModalLoading}
          disableButton={disableButton}
        />
      )}
    </Modal.Body>
  );
};

export default NewRevisionIDCard;
