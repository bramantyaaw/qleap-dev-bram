import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import NotifSuccessModal from "../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import ProcessLoadingModal from "../../components/components/elements/modal/ProcessLoadingModal";
import Avatar from "../../assets/images/svg/icon user-01.svg";

const LoginResetPass = ({ setEmptyPasswordModal, uidCustom }) => {
  const navigate = useNavigate();
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorPassword, setErrorPassword] = useState(false);
  const [successPassword, setSuccessPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [notMatchPassword, setNotMatchPassword] = useState(false);

  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setDisableButton(true);
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,64}$/;

    if (password === "" || confirmPassword === "") {
      setDisableButton(false);
      return setEmptyPasswordModal(true);
    } else {
      let passRegex = regex.test(password);
      let confirmRegex = regex.test(confirmPassword);

      if (passRegex === true && confirmRegex === true) {
        if (password !== confirmPassword) {
          setNotMatchPassword(true);
          setDisableButton(false);
        } else {
          try {
            setModalLoading(true);
            await axios
              .post("/auth/add-password", {
                uid: uidCustom ? uidCustom : uid,
                new_password: confirmPassword,
              })
              .then((res) => {
                setDisableButton(false);
                if (res?.status === 200) {
                  localStorage.clear();
                  localStorage.setItem("sso", "false");
                  setModalLoading(false);

                  const newData = res?.data;
                  const message = newData?.message;
                  setSuccessMessage(message);
                  setSuccessPassword(true);
                  const dataSession = res?.data?.data;
                  dataSession?.forEach((data) => {
                    localStorage.setItem("access_token", data?.access_token);
                    localStorage.setItem("refresh_token", data?.refresh_token);
                    localStorage.setItem("uid", data?.uid);
                    localStorage.setItem("photo", Avatar);
                    localStorage.setItem("sub_dept", data?.sub_dept);
                    localStorage.setItem("bu", data?.matrix_competency);
                  });
                  setTimeout(() => {
                    navigate("/");
                  }, 1000);
                } else {
                  setModalLoading(false);
                  setErrorModal(true);
                  setErrorMessage(res?.data?.message);
                }
              });
          } catch (err) {
            return err;
          }
        }
      } else {
        setModalLoading(false);
        setDisableButton(false);
        setErrorPassword(true);
      }
    }
  };

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
    //eslint-disable-next-line
  }, [localStorage]);

  return (
    <Form className="form-login">
      {errorModal && (
        <NotifSuccessModal show={errorModal} setShow={setErrorModal}>
          <ErrorAlert
            setState={setErrorModal}
            text1={errorMessage}
            className="mb-0"
          />
        </NotifSuccessModal>
      )}
      {successPassword && (
        <NotifSuccessModal show={successPassword} setShow={setSuccessPassword}>
          <div className="bg-success rounded border-success py-2">
            <p className="mb-0 text-center text-white fw-bold">
              {successMessage}
            </p>
          </div>
        </NotifSuccessModal>
      )}
      {errorPassword && (
        <NotifSuccessModal show={errorPassword} setShow={setErrorPassword}>
          <ErrorAlert
            setState={setErrorPassword}
            text1="To make the password stronger, use at least 8 characters, upper & lower case & numbers"
            // span=" 8 karakter, huruf besar, huruf kecil, angka & simbol"
            className="mb-0"
            textClassName="mt-2"
            title="Password Is Not Strong Enough"
          />
        </NotifSuccessModal>
      )}
      {notMatchPassword && (
        <NotifSuccessModal
          show={notMatchPassword}
          setShow={setNotMatchPassword}
        >
          <ErrorAlert
            setState={setNotMatchPassword}
            text1="Password tidak sesuai"
            className="mb-0"
          />
        </NotifSuccessModal>
      )}
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="form-text">New Password</Form.Label>
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Group
          className="mb-3 d-flex align-items-start lh-1 pb-sm-0 pb-3 btn-view-pass mt-1"
          controlId="formBasicCheckbox"
        >
          <Form.Check
            type="checkbox"
            label="Show Password"
            className="lh-1 check-password"
            onClick={handleShowPassword}
          />
        </Form.Group>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="form-text">Confirm Password</Form.Label>
        <Form.Control
          type={showconfirmPassword ? "text" : "password"}
          placeholder="******"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Form.Group
          className="mb-3 d-flex align-items-start lh-1 pb-sm-0 pb-3 btn-view-pass mt-1"
          controlId="formBasicCheckboxNew"
        >
          <Form.Check
            type="checkbox"
            label="Show Password"
            className="lh-1 check-password"
            onClick={handleShowConfirmPassword}
          />
        </Form.Group>
      </Form.Group>

      <Button
        onClick={handleLogin}
        type="submit"
        className="w-100"
        data-toggle="modal"
        data-target="#exampleModal"
        disabled={disableButton}
      >
        Create New Password
      </Button>
    </Form>
  );
};

export default LoginResetPass;
