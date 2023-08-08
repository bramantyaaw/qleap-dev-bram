import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Row, Col } from "react-bootstrap";
import ButtonBadgePIC from "../../../../../../layouts/database-admin/ticket/elements/ButtonBadgePIC";
import ThreeDisabledInputs from "../../../../database-admin/elements/input/ThreeDisabledInputs";
import TwoDisabledInput from "../../../../database-admin/elements/input/TwoDisabledInputs";
import PopupReopenTicket from "../PopupReopenTicket";
import RevisionPembuatanLokasi from "./revision-detail/RevisionPembuatanLokasi";
import TextForm from "../../elements/text/TextForm";
import DisabledInput from "../../elements/input/DisabledInput";
import ErrorAlert from "../../elements/alerts/ErrorAlert";
import ProcessLoadingModal from "../../../../elements/modal/ProcessLoadingModal";
import NewTwoDisabledInputs from "../../../../database-admin/elements/input/NewTwoDisabledInputs";
import SingleDisableInput from "../../../../database-admin/elements/input/SingleDisableInput";

const PopupPembuatanLokasi = ({
  show,
  setShow,
  detailArr,
  setOpenPopUp,
  openPopUp,
  selectedId,
  setDetailArr,
  statusCheck,
  token,
  setSelectedId,
}) => {
  const [arrId, setArrId] = useState("");
  const [reopenReason, setReopenReason] = useState("");
  const [notePIC, setNotePIC] = useState("");
  const [wrongTicket, setWrongTicket] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [warningClose, setWarningClose] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [closedDate, setClosedDate] = useState("");

  const handlePopUp = () => {
    setOpenPopUp(true);
    setShow(false);
  };

  const handleClose = () => {
    setDetailArr([]);
    setShow(false);
    setSelectedId(0);
    // setNewStoreName("");
  };

  const postReOpen = async (status) => {
    // const idToString = selectedId?.toString();
    try {
      setDisableButton(true);
      setModalLoading(true);
      let dataInput =
        status === "P"
          ? {
              id: parseInt(selectedId),
              reason_for_reopen: reopenReason,
              status_to: "RO",
              submit_by: "employee",
            }
          : {
              id: parseInt(selectedId),
              status_to: "F",
              submit_by: "employee",
            };
      await axios
        .post(`/services/ticketing/update-ticket`, dataInput, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setModalLoading(false);
          setDisableButton(false);
          if (res?.status === 200) {
            return window.location.reload(true);
          } else {
            setErrorMessage(res?.data?.message);
            if (status === "P") {
              setWrongTicket(true);
            } else {
              setWarningClose(true);
            }
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    const arrId = detailArr ? detailArr[0]?.id : "";
    setArrId(arrId);

    const notePIC = detailArr ? detailArr[0]?.note_pic : "";
    setNotePIC(notePIC);

    const closedDate = detailArr ? detailArr[0]?.close_at : "";
    setClosedDate(closedDate);
  }, [detailArr]);

  return (
    <>
      {arrId === selectedId && (
        <PopupReopenTicket
          show={show}
          setShow={setShow}
          setDetailArr={setDetailArr}
          dialogClassName={"my-modal"}
          handleClose={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">
              CREATE MASTER LOCATION PROINT
            </Modal.Title>
          </Modal.Header>
          {warningClose && (
            <div className="mb-3">
              <ErrorAlert
                setState={setWarningClose}
                text1={errorMessage}
                className="mb-0"
              />
            </div>
          )}
          {statusCheck !== "R" &&
            detailArr?.map((data, id) => {
              return (
                <Modal.Body className="body-modal-detail-ticket" key={id}>
                  <div>
                    <ThreeDisabledInputs
                      text1="Type"
                      value1={data?.type_store}
                      text2="Store Name"
                      value2={data?.store_name}
                      text3="City / Districts"
                      value3={data?.city + ` - ` + data?.province}
                      classNameDiv="mt-2 mt-md-0"
                    />
                    <NewTwoDisabledInputs
                      text1="Address"
                      value1={data?.address}
                      text2="Effective Date"
                      value2={data?.effective_date}
                      classNameDiv="mt-2"
                    />
                    <SingleDisableInput
                      text1="Note"
                      value1={data?.note_employee}
                      classNameDiv="mt-2"
                    />
                  </div>
                </Modal.Body>
              );
            })}

          {statusCheck === "R" && (
            <RevisionPembuatanLokasi
              detailArr={detailArr}
              show={show}
              token={token}
              selectedId={selectedId}
            />
          )}
          {(statusCheck === "A" || statusCheck === "F") && (
            <Modal.Body className="py-0">
              <Row>
                <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                  <TextForm text="Note PIC" />
                  <DisabledInput
                    type="text"
                    placeholder={notePIC}
                    value={notePIC}
                    className="wrapper-div"
                  />
                </Col>
                <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                  {statusCheck === "F" && (
                    <div className="mt-2 mt-md-0">
                      <TextForm text="Closed Date" />
                      <DisabledInput
                        type="text"
                        placeholder={closedDate}
                        value={closedDate}
                        className="wrapper-div"
                      />
                    </div>
                  )}
                </Col>
              </Row>

              {statusCheck === "A" && (
                <div className="w-100 d-flex justify-content-end btn-z-index">
                  <ButtonBadgePIC
                    text="Re-Open"
                    className="mb-0"
                    bg="outline-primary"
                    onClick={handlePopUp}
                    condition={disableButton}
                  />

                  <ButtonBadgePIC
                    text="Close"
                    className="mb-0 ms-3"
                    bg="primary"
                    onClick={() => postReOpen("F")}
                    condition={disableButton}
                  />
                </div>
              )}
            </Modal.Body>
          )}
        </PopupReopenTicket>
      )}

      <PopupReopenTicket
        show={openPopUp}
        setShow={setOpenPopUp}
        setDetailArr={setDetailArr}
      >
        <p className="lh-sm fw-bolder">
          Are you sure want to re-open this ticket?
        </p>
        {wrongTicket && (
          <ErrorAlert setState={setOpenPopUp} text1={errorMessage} />
        )}
        <p className="text-start mb-1 fs-5">Re-Open Reason:</p>
        <Form.Control
          as="textarea"
          rows={3}
          id="note"
          name="note"
          placeholder="Note"
          onChange={(e) => setReopenReason(e.target.value)}
        />
        <div className="w-100 d-flex justify-content-end">
          <ButtonBadgePIC
            text="Submit"
            className="mb-0 mt-3"
            onClick={() => postReOpen("P")}
          />
        </div>
      </PopupReopenTicket>
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </>
  );
};

export default PopupPembuatanLokasi;
