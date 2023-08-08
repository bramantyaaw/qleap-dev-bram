import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import LoginFooter from "../../components/components/elements/login/LoginFooter";
import NotifSuccessModal from "../../components/components/elements/modal/NotifSuccessModal";
import ProcessLoadingModal from "../../components/components/elements/modal/ProcessLoadingModal";
import { loginActionWithoutSSO } from "../../redux/action/authAction";
import { useEffect } from "react";
import Avatar from "../../assets/images/svg/icon user-01.svg";
import axios from "axios";

const LoginWithoutSSO = ({
  setEmptyEmailModal,
  setWrongEmailModal,
  setPdfModal,
  setResetPass,
  checkerSSO,
  setCreatePassModal,
}) => {
  const [NIKChecker, setNIKChecker] = useState("");
  const [NIK, setNIK] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setDisableButton(true);
    if (NIKChecker === "" || password === "") {
      setDisableButton(false);
      return setEmptyEmailModal(true);
    } else {
      try {
        setModalLoading(true);
        const data = await dispatch(
          loginActionWithoutSSO(NIKChecker, password)
        );
        setModalLoading(false);
        setDisableButton(false);

        if (data?.data === [] || data?.data === null || data === "") {
          setWrongEmailModal(true);
        } else if (data?.data !== [] || data?.data !== null) {
          const newData = data?.data;
          localStorage.clear();

          newData?.forEach((data) => {
            localStorage.setItem("sso", "false");
            if (data?.change_password === true) {
              localStorage.setItem("access_token", data?.access_token);
              localStorage.setItem("refresh_token", data?.refresh_token);
              localStorage.setItem("uid", data?.uid);
              localStorage.setItem("photo", Avatar);
              localStorage.setItem("sub_dept", data?.sub_dept);
              localStorage.setItem("bu", data?.matrix_competency);

              navigate("/");
            } else {
              localStorage.setItem("uid", data?.uid);
              setResetPass(true);
              setCreatePassModal(true);
            }
          });
        } else {
          setErrorModal(true);
          setErrorMessage(data?.message);
        }
      } catch (err) {
        setModalLoading(false);
        setDisableButton(false);
        return setWrongEmailModal(true);
      }
    }
  };

  useEffect(() => {
    const regex = /^[0-9]*$/;
    let regexChecker = regex.test(NIK);
    if (regexChecker === true) {
      return setNIKChecker(NIK);
    } else if (NIK?.length === 0) {
      return setNIKChecker("");
    }
  }, [NIK]);

  return (
    <Form className="form-login">
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
      {errorModal && (
        <NotifSuccessModal show={errorModal} setShow={setErrorModal}>
          <ErrorAlert
            setState={setErrorModal}
            text1={errorMessage}
            className="mb-0"
          />
        </NotifSuccessModal>
      )}
      <Form.Group className="mb-3" controlId="formBasicNIK">
        <Form.Label className="mb-2 form-text">NIK</Form.Label>
        <Form.Control
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          placeholder="Number Indetification of Employee"
          value={NIKChecker}
          onChange={(e) => setNIK(e.target.value)}
          maxLength={9}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="form-text">Password</Form.Label>
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <LoginFooter
        handleShowPassword={handleShowPassword}
        setPdfModal={setPdfModal}
        checkerSSO={checkerSSO}
      />
      {NIKChecker?.length !== 9 ? (
        <Button
          type="submit"
          className="w-100"
          data-toggle="modal"
          data-target="#exampleModal"
          disabled
        >
          Sign In
        </Button>
      ) : (
        <Button
          onClick={handleLogin}
          type="submit"
          className="w-100"
          data-toggle="modal"
          data-target="#exampleModal"
          disabled={disableButton}
        >
          Sign In
        </Button>
      )}
    </Form>
  );
};

export default LoginWithoutSSO;
