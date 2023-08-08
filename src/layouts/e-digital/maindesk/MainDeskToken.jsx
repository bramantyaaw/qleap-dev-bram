import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProcessLoadingModal from "../../../components/components/elements/modal/ProcessLoadingModal";
import NotifSuccessModal from "../../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";

const MainDeskToken = ({ linkNavigate, custom, customNik }) => {
  const { nik } = useParams();
  const navigate = useNavigate();

  const [modalLoading, setModalLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchLoginUsingNIK = async () => {
    const ssoStatus = localStorage.getItem("sso");
    localStorage.clear();
    localStorage.setItem("sso", ssoStatus);
    try {
      setModalLoading(true);
      await axios
        .post(`/auth/temp-login`, {
          nik: custom ? customNik : nik,
        })
        .then((data) => {
          if (data?.status === 200) {
            const newData = data?.data?.data;
            newData?.map((data) => {
              localStorage.setItem("access_token", data?.access_token);
              localStorage.setItem("refresh_token", data?.refresh_token);
              localStorage.setItem("uid", data?.uid);
              localStorage.setItem("photo", data?.photo);
              localStorage.setItem("sub_dept", data?.sub_dept);
              localStorage.setItem("level", data?.level);
            });

            setTimeout(() => {
              navigate(linkNavigate);
              setModalLoading(false);
            }, 1000);
          } else {
            setModalLoading(false);
            setErrorModal(true);
            setErrorMessage(
              "We're sorry, there is something error. Please contact QLEAP Support."
            );
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchLoginUsingNIK();
  }, []);
  return (
    <div>
      {errorModal && (
        <NotifSuccessModal show={errorModal} setShow={setErrorModal}>
          <ErrorAlert
            setState={setErrorModal}
            text1={errorMessage}
            className="mb-0"
          />
        </NotifSuccessModal>
      )}
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </div>
  );
};

export default MainDeskToken;
