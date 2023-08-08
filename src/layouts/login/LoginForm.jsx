import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import LoginFooter from "../../components/components/elements/login/LoginFooter";
import NotifSuccessModal from "../../components/components/elements/modal/NotifSuccessModal";
import ProcessLoadingModal from "../../components/components/elements/modal/ProcessLoadingModal";
import { loginAction } from "../../redux/action/authAction";
import Avatar from "../../assets/images/svg/icon user-01.svg";
// import NewLoginModal from "./NewLoginModal";

const LoginForm = ({
  setEmptyEmailModal,
  setWrongEmailModal,
  setPdfModal,
  checkerSSO,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();

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

    if (email === "" || password === "") {
      setDisableButton(false);
      return setEmptyEmailModal(true);
    } else {
      try {
        setModalLoading(true);
        const data = await dispatch(loginAction(email, password));
        setModalLoading(false);
        setDisableButton(false);
        if (data?.data?.length > 0) {
          const newData = data?.data;

          localStorage.clear();

          newData?.forEach((data) => {
            localStorage.setItem("access_token", data?.access_token);
            localStorage.setItem("refresh_token", data?.refresh_token);
            localStorage.setItem("uid", data?.uid);
            localStorage.setItem("photo", Avatar);
            // localStorage.setItem("photo", data?.photo);
            localStorage.setItem("sub_dept", data?.sub_dept);
            localStorage.setItem("level", data?.level);
            localStorage.setItem("bu", data?.matrix_competency);
            // Cookies.set("sso", "true");
            localStorage.setItem("sso", "true");
          });
          if (newData?.length > 0) {
            state ? navigate(state) : navigate("/");

            // return navigate("/");
            // return navigate(state);
          } else {
            setErrorModal(true);
            setErrorMessage(data?.message);
          }
        } else {
          return setWrongEmailModal(true);
        }
      } catch (err) {
        setModalLoading(false);
        setDisableButton(false);
        return setWrongEmailModal(true);
      }
    }
  };

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
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="mb-2 form-text">Email</Form.Label>
        <Form.Control
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
    </Form>
  );
};

export default LoginForm;
