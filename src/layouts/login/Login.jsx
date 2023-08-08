import React, { useEffect, useState } from "react";
import { Image, Form } from "react-bootstrap";
import QleapIcon from "../../assets/images/svg/qleap-icon.svg";
import ImageEmpty from "../../assets/images/svg/empty-login-icon.svg";
import WrongImg from "../../assets/images/svg/wrong-login-icon.svg";
import CreatePassword from "../../assets/images/svg/create-password.svg";
import LoginForm from "./LoginForm";
import LoginModal from "./LoginModal";
import LoginWithoutSSO from "./LoginWithoutSSO";
import LoginResetPass from "./LoginResetPass";
import FileSSO from "../../assets/files/sso.pdf";
import { useLocation, useNavigate } from "react-router-dom";

// import axios from "axios";

const Login = () => {
  const ssoStatus = localStorage.getItem("sso");
  const [checkerSSO, setCheckerSSO] = useState(
    ssoStatus === "false" ? false : true
  );
  const [resetPass, setResetPass] = useState(false);
  const [emptyEmailModal, setEmptyEmailModal] = useState(false);
  const [wrongEmailModal, setWrongEmailModal] = useState(false);
  const [pdfModal, setPdfModal] = useState(false);
  const [emptyPasswordModal, setEmptyPasswordModal] = useState(false);
  const [createPassModal, setCreatePassModal] = useState(false);

  // const [pdfFile, setPDFFile] = useState("");
  // const getAsset = async () => {
  //   try {
  //     const { data } = await axios.get("/auth/assets");
  //     setPDFFile(data?.data?.sso_assets);
  //   } catch (err) {
  //      return err;
  //   }
  // };

  // useEffect(() => {
  //   getAsset();
  // }, [pdfModal]);

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken !== null) {
      state ? navigate(state) : navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {emptyEmailModal && (
        <LoginModal
          setModalData={setEmptyEmailModal}
          modalData={emptyEmailModal}
        >
          <Image src={ImageEmpty} alt="icon" className="img-custom" />
          <h1 className="text-center">
            Your {checkerSSO ? "email" : "NIK"} or password is still empty
          </h1>
          <p className="text-center">
            Please fill the {checkerSSO ? "email" : "NIK"} and password for Sign
            in
          </p>
        </LoginModal>
      )}

      {emptyPasswordModal && (
        <LoginModal
          setModalData={setEmptyPasswordModal}
          modalData={emptyPasswordModal}
        >
          <Image src={ImageEmpty} alt="icon" className="img-custom" />
          <h1 className="text-center">
            Your password or new password is still empty
          </h1>
          <p className="text-center">
            Please fill the new password or confirm password for Sign in
          </p>
        </LoginModal>
      )}
      {wrongEmailModal && (
        <LoginModal
          setModalData={setWrongEmailModal}
          modalData={wrongEmailModal}
        >
          <Image src={WrongImg} alt="icon" className="img-custom" />
          <h1 className="text-center">
            Sorry your {checkerSSO ? "email" : "username"} or password is wrong
          </h1>
          <p className="text-center">
            If any problem please click
            <span onClick={() => setPdfModal(true)}> “Having Problem ?” </span>
            for more information
          </p>
        </LoginModal>
      )}
      {pdfModal && (
        <LoginModal setModalData={setPdfModal} modalData={pdfModal}>
          <iframe
            src={`${FileSSO}`}
            title="SSO Login Tutorial"
            className="w-100 body-385"
          ></iframe>
        </LoginModal>
      )}
      {createPassModal && (
        <LoginModal
          setModalData={setCreatePassModal}
          modalData={createPassModal}
          title="Create New Password"
        >
          <Image src={CreatePassword} alt="icon" className="img-custom" />
          <h1 className="text-center">Password must be changed to a new one</h1>
          <p className="text-center">
            The password that you enter is default password. If you want to log
            in, you must be create a new password.
          </p>
        </LoginModal>
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
          {resetPass ? (
            <>
              <h1 className="text-start">Create New Password</h1>
              <p className="text-sign-in text-start">
                Fill the form to create your new password.
              </p>
              <LoginResetPass setEmptyPasswordModal={setEmptyPasswordModal} />
            </>
          ) : (
            <>
              <div className="d-flex justify-content-center align-items-center">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={checkerSSO ? "SSO Mode" : "switch into SSO"}
                  className="check-login-sso"
                  onChange={(e) => setCheckerSSO(e.target.checked)}
                  defaultChecked={checkerSSO}
                />
              </div>

              <h1 className="text-start">
                {checkerSSO ? "Sign in With SSO" : "Sign in"}
              </h1>

              {checkerSSO ? (
                <>
                  <p className="text-sign-in text-start">
                    Please sign in using your email
                  </p>
                  <LoginForm
                    setEmptyEmailModal={setEmptyEmailModal}
                    setWrongEmailModal={setWrongEmailModal}
                    setPdfModal={setPdfModal}
                    checkerSSO={checkerSSO}
                  />
                </>
              ) : (
                <>
                  <p className="text-sign-in text-start">
                    Please sign in using your Erajaya NIK
                  </p>
                  <LoginWithoutSSO
                    setEmptyEmailModal={setEmptyEmailModal}
                    setWrongEmailModal={setWrongEmailModal}
                    setPdfModal={setPdfModal}
                    setResetPass={setResetPass}
                    checkerSSO={checkerSSO}
                    setCreatePassModal={setCreatePassModal}
                  />
                </>
              )}
            </>
          )}
          <div className="py-2 text-copyright">
            <p className="text-center mb-0">
              © 2016 - 2023, PT Erajaya Swasembada Tbk.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
