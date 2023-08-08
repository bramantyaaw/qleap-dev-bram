import React, { useEffect, useState } from "react";
import RightSideEzoneComponent from "../../../components/ezone/new/components/RightSideEzoneComponent";
import IleadDiagnostic from "./IleadDiagnostic";
import ILEADRoomComponent from "./ILEADRoomComponent";
import IleadInsight from "./IleadInsight";
import ErrorAlert from "../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import NotifSuccessModal from "../../../components/components/elements/modal/NotifSuccessModal";
import IleadMenu from "./IleadMenu";

const Ilead = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const [modalLoading, setModalLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
    // eslint-disable-next-line
  }, [localStorage]);

  return (
    <IleadMenu>
      <IleadDiagnostic
        token={token}
        uid={uid}
        setModalLoading={setModalLoading}
        modalLoading={modalLoading}
        setErrorModal={setErrorModal}
        setErrorMessage={setErrorMessage}
      />
      {errorModal && (
        <NotifSuccessModal show={errorModal} setShow={setErrorModal}>
          <ErrorAlert
            setState={setErrorModal}
            text1={errorMessage}
            className="mb-0"
          />
        </NotifSuccessModal>
      )}
    </IleadMenu>
  );
};

export default Ilead;
