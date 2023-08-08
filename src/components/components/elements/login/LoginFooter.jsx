import React from "react";
import { useState } from "react";
import { Form, Image } from "react-bootstrap";
import ModalResetPass from "./ModalResetPass";
import LoginModal from "../../../../layouts/login/LoginModal";
import checkEmailImg from "../../../../assets/images/svg/check-email.svg";

const LoginFooter = ({ handleShowPassword, setPdfModal, checkerSSO }) => {
  const [forgotPass, setForgotPass] = useState(false);
  const [popUpCheckEmail, setPopUpCheckEmail] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <>
      {popUpCheckEmail && (
        <LoginModal
          setModalData={setPopUpCheckEmail}
          modalData={popUpCheckEmail}
          title="Email Verification"
        >
          <Image src={checkEmailImg} alt="icon" className="img-custom" />
          <h1 className="text-center">Please check your email</h1>
          <p className="text-center">
            We have sent a verification link to the email address{" "}
            <span className="fw-bold text-black">{email},</span> please click
            the link to reset your password.
          </p>
        </LoginModal>
      )}
      <Form.Group className="d-flex flex-sm-row flex-column justify-content-between align-items-start">
        <Form.Group
          className="mb-3 d-flex align-items-start lh-1 pb-sm-0 pb-3 btn-view-pass"
          controlId="formBasicCheckbox"
        >
          <Form.Check
            type="checkbox"
            label="Show Password"
            className="lh-1 check-password"
            onClick={handleShowPassword}
          />
        </Form.Group>
        {checkerSSO ? (
          <Form.Text
            onClick={() => setPdfModal(true)}
            role="button"
            className="problem-text"
          >
            Having Problem ?
          </Form.Text>
        ) : (
          <Form.Text
            onClick={() => setForgotPass(true)}
            role="button"
            className="problem-text"
          >
            Forgot Password ?
          </Form.Text>
        )}
        {/* <Form.Text
        onClick={() => setPdfModal(true)}
        role="button"
        className="problem-text"
      >
        Having Problem ?
      </Form.Text> */}
        {forgotPass && (
          <ModalResetPass
            show={forgotPass}
            setShow={setForgotPass}
            setPopUpCheckEmail={setPopUpCheckEmail}
            setEmail={setEmail}
          />
        )}
      </Form.Group>
    </>
  );
};

export default LoginFooter;
