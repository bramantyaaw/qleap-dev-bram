import React, { useEffect, useState } from "react";
import RightSideEzoneComponent from "../../../components/ezone/new/components/RightSideEzoneComponent";
import IleadDiagnostic from "./IleadDiagnostic";
import ILEADRoomComponent from "./ILEADRoomComponent";
import IleadInsight from "./IleadInsight";
import ErrorAlert from "../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import NotifSuccessModal from "../../../components/components/elements/modal/NotifSuccessModal";
import IleadMenu from "./IleadMenu";
import IleadInsightComponent from "./IleadInsightComponent";

const Ileadinsight = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  const [modalLoading, setModalLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));

    // eslint-disable-next-line
  }, [localStorage]);

  return (
    <IleadMenu>
      <IleadInsightComponent />
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

export default Ileadinsight;
