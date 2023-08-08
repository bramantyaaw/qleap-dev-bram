import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ProcessLoadingModal from "../../elements/modal/ProcessLoadingModal";
import LoginResetPass from "../../../../layouts/login/LoginResetPass";
import QleapIcon from "../../../../assets/images/svg/qleap-icon.svg";
import ImageEmpty from "../../../../assets/images/svg/empty-login-icon.svg";
import { Image } from "react-bootstrap";
import LoginModal from "../../../../layouts/login/LoginModal";
import ErrorAlert from "../../dashboard/ticketing/elements/alerts/ErrorAlert";
import NotifSuccessModal from "../../elements/modal/NotifSuccessModal";

const ResetPassword = ({ getTokenReset }) => {
  const [modalLoading, setModalLoading] = useState(false);
  const [emptyPasswordModal, setEmptyPasswordModal] = useState(false);
  const [uidReset, setUidReset] = useState("");

  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGetTokenReset = async () => {
    setModalLoading(true);
    try {
      await axios
        .post("auth/check-reset-password-token", {
          token: getTokenReset,
        })
        .then((res) => {
          setModalLoading(false);
          if (res?.status === 200) {
            setUidReset(res?.data?.data?.uid);
          } else {
            setErrorModal(true);
            setErrorMessage(res?.data?.message);
          }
        });
    } catch {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    handleGetTokenReset();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {emptyPasswordModal && (
        <LoginModal
          setModalData={setEmptyPasswordModal}
          modalData={emptyPasswordModal}
        >
          <Image src={ImageEmpty} alt="icon" className="img-custom" />
          <h1 className="text-center">
            Your new password or confirm password is still empty
          </h1>
          <p className="text-center">
            Please fill the new password or confirm password for Sign in
          </p>
        </LoginModal>
      )}
      {errorModal && (
        <NotifSuccessModal show={errorModal} setShow={setErrorModal} noClose>
          <ErrorAlert
            setState={setErrorModal}
            text1={errorMessage}
            className="mb-0"
            noClose
          />
        </NotifSuccessModal>
      )}
      <div className="box">
        <div className="wave wave-one"></div>
        <div className="wave wave-two"></div>
        <div className="wave wave-three"></div>
      </div>

      <div className="d-flex align-items-center w-100 h-100 justify-content-center login-wrapper">
        <div className="form-wrapper bg-white">
          <div className="d-flex justify-content-center flex-column align-items-center logo">
            <Image src={QleapIcon} alt="qleap" height="49px" width="191px" />
            <p>Powered by SSO</p>
          </div>
          <h1 className="text-start">Create New Password</h1>
          <p className="text-sign-in text-start">
            Fill the form to create your new password.
          </p>
          <LoginResetPass
            setEmptyPasswordModal={setEmptyPasswordModal}
            uidCustom={uidReset}
          />

          <div className="py-2 text-copyright">
            <p className="text-center mb-0">
              © 2016 - 2023, PT Erajaya Swasembada Tbk.
            </p>
          </div>
        </div>
      </div>
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </>
  );
};

export default ResetPassword;
