import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import LoadingComponent from "../loading/LoadingComponent";
import ErrorAlert from "../../dashboard/ticketing/elements/alerts/ErrorAlert";

const ModalResetPass = ({ show, setShow, setPopUpCheckEmail, setEmail }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [NIKChecker, setNIKChecker] = useState("");
  const [NIK, setNIK] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    // eslint-disable-next-line
  }, [localStorage]);

  useEffect(() => {
    const regex = /^[0-9]*$/;
    let regexChecker = regex.test(NIK);
    if (regexChecker === true) {
      return setNIKChecker(NIK);
    } else if (NIK?.length === 0) {
      return setNIKChecker("");
    }
  }, [NIK]);

  const handleSubmitResetPass = async (e) => {
    e.preventDefault();
    setDisableButton(true);
    setLoading(true);
    try {
      await axios
        .post(
          "auth/send-email-reset-password",
          {
            NIK: NIKChecker,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setLoading(false);
          setDisableButton(false);
          if (res?.status === 200) {
            setPopUpCheckEmail(true);
            setShow(false);
            setNIKChecker("");
            setNIK("");
            const email = res?.data?.data?.email;
            setEmail(email);
          } else {
            setError(true);
            setErrorMessage(res?.data?.message);
          }
        });
    } catch (err) {
      return err;
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Body>
          {error && (
            <ErrorAlert
              setState={setError}
              text1={errorMessage}
              className="mb-3"
            />
          )}
          <Form.Group className="mb-3" controlId="formBasicNIK">
            <p className="mb-4 text-center fw-bold">
              Input your NIK and confirm through your Erajaya email or personal
              email{" "}
              <span className="text-gray-400">
                (in case don't have Erajaya email)
              </span>{" "}
              to change your password
            </p>

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
          {loading ? (
            <LoadingComponent />
          ) : (
            <Button
              variant="primary"
              onClick={handleSubmitResetPass}
              className="w-100 mt-4"
              disabled={
                NIKChecker?.length === 9 ? false : disableButton ? true : false
              }
            >
              Submit
            </Button>
          )}
        </Modal.Body>
        {/* <Modal.Footer>
  
    </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ModalResetPass;
