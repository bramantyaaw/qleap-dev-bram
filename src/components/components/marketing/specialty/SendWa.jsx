import React, { useState, useEffect } from "react";
import axios from "axios";
import FileInput from "../../dashboard/ticketing/elements/input/FileInput";
import ProcessLoadingModal from "../../elements/modal/ProcessLoadingModal";
import { Button } from "react-bootstrap";
import SuccessAlert from "../../dashboard/ticketing/elements/alerts/SuccessAlert";
import NotifSuccessModal from "../../elements/modal/NotifSuccessModal";
import ErrorAlert from "../../dashboard/ticketing/elements/alerts/ErrorAlert";

const SendWa = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  const [fileExcel, setFileExcel] = useState(null);
  const [message, setMessage] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const onChangeFileExcel = (e) => {
    setFileExcel(e.target.files[0]);
  };

  const uploadExcel = async () => {
    const formData = new FormData();
    formData.append("file", fileExcel);
    formData.append("message", message);
    try {
      setModalLoading(true);
      await axios
        .post("/send-wa-d3", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setModalLoading(false);
          if (res?.status === 200) {
            setSuccess(true);
          } else {
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    // eslint-disable-next-line
  }, [localStorage]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center bg-light-primary py-10 ">
      <div className="card p-4">
        <div>
          <h2 className="text-center mb-4" style={{ fontWeight: "600" }}>
            Upload File
          </h2>
          <FileInput handleChange={onChangeFileExcel} accept=".xls, .xlsx" />

          <textarea
            className="my-4 form-control border border-secondary"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) => setMessage(e.target.value)}
            style={{ height: "300px", width: "300px" }}
          ></textarea>
        </div>

        <Button variant="primary" onClick={uploadExcel}>
          Upload
        </Button>
      </div>
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
      {success && (
        <NotifSuccessModal
          show={success}
          setShow={setSuccess}
          text="File is uploaded"
        />
      )}
      {errorModal && (
        <NotifSuccessModal show={errorModal} setShow={setErrorModal}>
          <ErrorAlert
            setState={setErrorModal}
            text1="Error Occurred"
            className="mb-0"
          />
        </NotifSuccessModal>
      )}
    </div>
  );
};

export default SendWa;
